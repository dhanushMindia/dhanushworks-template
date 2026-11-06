import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * S3-compatible object storage client.
 * Works with AWS S3, Supabase Storage, Cloudflare R2, and any S3-compatible service.
 *
 * REQUIRED environment variables:
 *   S3_ENDPOINT   — Service endpoint (e.g., https://xxx.supabase.co/storage/v1/s3)
 *   S3_REGION     — Region or "auto" for providers like R2
 *   S3_BUCKET     — Bucket name
 *   S3_ACCESS_KEY — Access key ID
 *   S3_SECRET_KEY — Secret access key
 *
 * OPTIONAL:
 *   S3_PUBLIC_URL — Custom public CDN URL (overrides default public URL format)
 */
const s3Client = new S3Client({
  region: process.env.S3_REGION || "auto",
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_KEY || "",
  },
});

const BUCKET_NAME = process.env.S3_BUCKET || "";
const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function hasSupabaseStorage(): boolean {
  return Boolean(supabaseUrl && supabaseServiceKey && process.env.SUPABASE_STORAGE_BUCKET);
}

function supabaseHeaders(extra: HeadersInit = {}): HeadersInit {
  return {
    Authorization: `Bearer ${supabaseServiceKey}`,
    apikey: supabaseServiceKey || "",
    ...extra,
  };
}

function supabaseObjectUrl(key: string): string {
  return `${supabaseUrl}/storage/v1/object/${process.env.SUPABASE_STORAGE_BUCKET}/${key}`;
}

function ensureConfigured(): void {
  if (!BUCKET_NAME || !process.env.S3_ENDPOINT) {
    throw new Error(
      "Object storage not configured. Set S3_BUCKET, S3_ENDPOINT, S3_REGION, S3_ACCESS_KEY, S3_SECRET_KEY."
    );
  }
}

/**
 * Upload a file to object storage and return its storage key.
 * The key is the canonical identifier — never use filesystem paths.
 */
export async function uploadFile(
  file: File,
  folder: string = "media"
): Promise<{ key: string }> {
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `${folder}/${timestamp}-${safeName}`;

  if (hasSupabaseStorage()) {
    const response = await fetch(supabaseObjectUrl(key), {
      method: "POST",
      headers: supabaseHeaders({ "Content-Type": file.type || "application/octet-stream", "x-upsert": "false" }),
      body: Buffer.from(await file.arrayBuffer()),
    });
    if (!response.ok) throw new Error(`Supabase Storage upload failed: ${await response.text()}`);
    return { key };
  }

  ensureConfigured();

  const buffer = Buffer.from(await file.arrayBuffer());

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    })
  );

  return { key };
}

/**
 * Delete a file from object storage by its key.
 */
export async function deleteFile(key: string): Promise<void> {
  if (hasSupabaseStorage()) {
    const response = await fetch(supabaseObjectUrl(key), {
      method: "DELETE",
      headers: supabaseHeaders(),
    });
    if (!response.ok && response.status !== 404) throw new Error(`Supabase Storage deletion failed: ${await response.text()}`);
    return;
  }

  ensureConfigured();

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })
  );
}

/**
 * Generate a signed URL for temporary private access.
 * Default expiration: 1 hour.
 */
export async function getSignedFileUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  if (hasSupabaseStorage()) {
    const response = await fetch(
      `${supabaseUrl}/storage/v1/object/sign/${process.env.SUPABASE_STORAGE_BUCKET}/${key}`,
      {
        method: "POST",
        headers: supabaseHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ expiresIn }),
      }
    );
    if (!response.ok) throw new Error(`Supabase Storage signing failed: ${await response.text()}`);
    const { signedURL } = await response.json();
    return `${supabaseUrl}/storage/v1${signedURL}`;
  }

  ensureConfigured();

  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Get an access URL for a media asset based on its visibility.
 * - PUBLIC: returns the canonical public URL
 * - PRIVATE / UNLISTED: returns a signed URL valid for 1 hour
 */
export async function getMediaUrl(asset: {
  fileUrl: string;
  visibility: string;
}): Promise<string> {
  if (hasSupabaseStorage() && asset.visibility === "PUBLIC") {
    return `${supabaseUrl}/storage/v1/object/public/${process.env.SUPABASE_STORAGE_BUCKET}/${asset.fileUrl}`;
  }

  if (asset.visibility === "PUBLIC") {
    const publicBase = process.env.S3_PUBLIC_URL
      || `https://${BUCKET_NAME}.s3.amazonaws.com`;
    return `${publicBase}/${asset.fileUrl}`;
  }

  return await getSignedFileUrl(asset.fileUrl);
}
