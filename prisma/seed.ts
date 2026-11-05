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
      name: "CSPR Participant",
    },
  });

  await prisma.profile.create({
    data: {
      name: "CSPR Participant",
      tagline: "Student | Learner | Independent Professional",
      bio: "A personal space to document learning, experiences, and weekly journal records.",
      currentRole: "Participant",
      currentFocus: ["Continuous Learning", "Projects", "Reflections"],
      linkedinUrl: "",
      email: "admin@example.com",
      theme: "editorial",
    },
  });

  await prisma.journalEntry.create({
    data: {
      weekNumber: 1,
      startDate: new Date("2026-09-14"),
      endDate: new Date("2026-09-18"),
      title: "Initial Setup & Core Objectives",
      focus: "Setting up the portfolio workspace, defining weekly learning goals, and outlining initial project scopes.",
      workCompleted: "Initialized repository structure, configured design system, and drafted foundational notes.",
      outcomes: "Completed baseline environment configuration.",
      reflection: "Clear initial structure makes subsequent iterations much faster.",
      challenges: "Balancing multiple competing priorities.",
      nextWeekFocus: "Execute first core milestone deliverables.",
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
