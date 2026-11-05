import { PrismaClient, ProjectStatus, Visibility } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed with neutral template data...");

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
      name: "Policy Researcher",
    },
  });

  await prisma.profile.create({
    data: {
      name: "Policy Researcher",
      tagline: "Research Analyst & Public Policy Researcher",
      bio: "Dedicated researcher focused on public finance, economic policy, and data-driven state research.",
      currentRole: "Research Fellow",
      currentFocus: ["Public Finance", "Economic Policy", "Data Analysis"],
      linkedinUrl: "https://www.linkedin.com/in/research-scholar",
      email: "admin@example.com",
      theme: "editorial",
    },
  });

  await prisma.journalEntry.create({
    data: {
      weekNumber: 38,
      startDate: new Date("2026-09-14"),
      endDate: new Date("2026-09-18"),
      title: "Fiscal Deficit Projections & Sub-National Debt Sustainability",
      focus: "Completed secondary econometric modelling of debt-to-GSDP ratios across 14 major states.",
      workCompleted: "Synthesized revenue-expenditure elasticity coefficients.",
      outcomes: "Produced working paper draft.",
      reflection: "Discovered noticeable divergence in capital outlay efficiency.",
      challenges: "Inconsistent reporting formats.",
      nextWeekFocus: "Expand analysis.",
      status: ProjectStatus.PUBLISHED,
      visibility: Visibility.PUBLIC,
      publishedAt: new Date(),
    },
  });

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
