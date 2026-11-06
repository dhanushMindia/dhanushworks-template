import { PrismaClient, ProjectStatus, Visibility } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed with Dribbble-grade Creative Studio data...");

  await prisma.journalEntry.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});

  const hashedPassword = await bcrypt.hash("admin@123", 10);
  const user = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Dhanush Mendu",
    },
  });

  await prisma.profile.create({
    data: {
      name: "Dhanush Mendu",
      tagline: "Quantitative Finance & Systems Architecture",
      bio: "Engineering high-throughput algorithmic systems, public economic research frameworks, and modern digital interfaces.",
      currentRole: "Lead Researcher & Engineer",
      currentFocus: ["Algorithmic Trading", "State Economic Policy", "Distributed Systems", "Design Engineering"],
      linkedinUrl: "https://linkedin.com",
      email: "admin@example.com",
      theme: "creative",
    },
  });

  await prisma.journalEntry.createMany({
    data: [
      {
        weekNumber: 1,
        startDate: new Date("2026-10-01"),
        endDate: new Date("2026-10-07"),
        title: "Architecting High-Throughput Liquidity Engines",
        focus: "Designing ultra-low latency order matching algorithms and robust state reconciliation protocols.",
        workCompleted: "Benchmarked memory-mapped order book structures in Rust and TypeScript. Achieved sub-millisecond execution matching on simulated FIX drops.",
        outcomes: "Latency reduced by 42% under synthetic peak load.",
        reflection: "Deterministic state management eliminates race conditions in high-concurrency environments.",
        challenges: "Managing garbage collection jitter in event loops under heavy network ingestion.",
        nextWeekFocus: "Integrate WebSocket streaming telemetry and failover clustering.",
        status: ProjectStatus.PUBLISHED,
        visibility: Visibility.PUBLIC,
        publishedAt: new Date(),
      },
      {
        weekNumber: 2,
        startDate: new Date("2026-10-08"),
        endDate: new Date("2026-10-14"),
        title: "Macroeconomic Fiscal Simulations & State Policy",
        focus: "Modelling multi-tier taxation shocks and resource allocation efficiency across municipal sectors.",
        workCompleted: "Constructed dynamic stochastic general equilibrium (DSGE) parameter matrices using Python and vectorized NumPy pipelines.",
        outcomes: "Completed baseline economic sensitivity report for regional infrastructure grants.",
        reflection: "Empirical calibration is only as robust as the granular tax receipt telemetry feeding it.",
        challenges: "Resolving non-linear convergence loops in multi-variable state tax models.",
        nextWeekFocus: "Publish interactive policy dashboard and policy brief attachments.",
        status: ProjectStatus.PUBLISHED,
        visibility: Visibility.PUBLIC,
        publishedAt: new Date(),
      },
      {
        weekNumber: 3,
        startDate: new Date("2026-10-15"),
        endDate: new Date("2026-10-21"),
        title: "Design Systems & Zero-Latency Component Architecture",
        focus: "Crafting bespoke dark-mode interfaces with CSS variable tokenization and fluid typography.",
        workCompleted: "Released the Obsidian & Neon Creative theme featuring Bento grid layouts, micro-interactions, and instant ISR page revalidation.",
        outcomes: "Lighthouse performance score reached 99/100 across mobile and desktop.",
        reflection: "Minimalist brutalism and neon precision deliver an unforgettable visual fingerprint.",
        challenges: "Fine-tuning contrast ratios for accessibility compliance on deep charcoal surfaces.",
        nextWeekFocus: "Deploy automated CI/CD pipeline and encrypted vault backup protocols.",
        status: ProjectStatus.PUBLISHED,
        visibility: Visibility.PUBLIC,
        publishedAt: new Date(),
      },
    ],
  });

  console.log("Seeding completed successfully with rich Creative data.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
