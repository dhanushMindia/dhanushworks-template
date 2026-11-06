import { PrismaClient, ProjectStatus, Visibility } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Checking database state for dhanushworks-template initialization...");

  const existingUsersCount = await prisma.user.count();

  if (existingUsersCount > 0) {
    console.log("Database already has users. Skipping initial seed to preserve user data.");
    return;
  }

  console.log("No users found. Performing initial neutral schema setup...");

  // If ADMIN_EMAIL and ADMIN_PASSWORD are provided during provisioning, create the first administrator
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPlainPassword = process.env.ADMIN_PASSWORD;

  if (adminEmail && adminPlainPassword) {
    const hashedPassword = await bcrypt.hash(adminPlainPassword, 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: "Administrator",
      },
    });
    console.log(`First administrator account created for: ${adminEmail}`);
  } else {
    console.log("No ADMIN_EMAIL/ADMIN_PASSWORD provided in environment. First administrator will be created via setup wizard on first launch.");
  }

  // Create the first profile from installer-provided configuration.
  const existingProfile = await prisma.profile.findFirst();
  if (!existingProfile) {
    const focus = process.env.PROFILE_FOCUS
      ? process.env.PROFILE_FOCUS.split("|").map((item) => item.trim()).filter(Boolean)
      : ["Research", "Analysis", "Documentation"];
    await prisma.profile.create({
      data: {
        name: process.env.PROFILE_NAME || "Research Portfolio",
        tagline: process.env.PROFILE_TAGLINE || "Independent Research & Systems Documentation",
        bio: process.env.PROFILE_BIO || "Empirical inquiry, technical systems, and research logs.",
        currentRole: process.env.PROFILE_ROLE || "Researcher",
        currentFocus: focus,
        linkedinUrl: "",
        email: adminEmail || "",
        // The installer validates and supplies one of the registered theme IDs.
        // Keep editorial as the safe default for direct template deployments.
        theme: process.env.PROFILE_THEME || "editorial",
      },
    });
    console.log("Created neutral default profile.");
  }

  console.log("Database initialization completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
