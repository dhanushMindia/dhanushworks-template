import { PrismaClient, ProjectStatus, Visibility } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting reset & neutral seed for dhanushworks-template...");

  await prisma.journalEntry.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});

  const hashedPassword = await bcrypt.hash("admin@123", 10);
  const user = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Template Owner",
    },
  });

  await prisma.profile.create({
    data: {
      name: "Alex Rivera",
      tagline: "Design Engineer & Researcher",
      bio: "Exploring systems architecture, interactive web graphics, and empirical research notes.",
      currentRole: "Principal Engineer",
      currentFocus: ["Design Systems", "Interactive Graphics", "Distributed Performance"],
      linkedinUrl: "",
      email: "admin@example.com",
      theme: "editorial",
    },
  });

  await prisma.journalEntry.createMany({
    data: [
      {
        weekNumber: 1,
        startDate: new Date("2026-10-01"),
        endDate: new Date("2026-10-07"),
        title: "Establishing Foundational Architecture",
        focus: "Setting up design system tokens, layout primitives, and typography hierarchies.",
        workCompleted: "Configured multi-theme wrapper, responsive typography scales, and modular grid components.",
        outcomes: "Baseline architecture operational with zero build errors.",
        reflection: "Modular design tokens enable rapid iteration across disparate visual identities.",
        challenges: "Balancing strict contrast ratios with expressive typography.",
        nextWeekFocus: "Integrate CMS journaling and authentication gateways.",
        status: ProjectStatus.PUBLISHED,
        visibility: Visibility.PUBLIC,
        publishedAt: new Date(),
      },
    ],
  });

  console.log("Reset & neutral seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
