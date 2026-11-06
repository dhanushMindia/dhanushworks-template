import { PrismaClient, ProjectStatus, Visibility } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting reset & neutral CSPR seed for dhanushworks-template...");

  await prisma.journalEntry.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});

  const hashedPassword = await bcrypt.hash("admin@123", 10);
  await prisma.user.create({
    data: {
      email: "admin@cspr.org",
      password: hashedPassword,
      name: "CSPR Administrator",
    },
  });

  await prisma.profile.create({
    data: {
      name: "CSPR Research Participant",
      tagline: "Centre for Social and Policy Research — Public Economics & State Policy",
      bio: "Empirical research repository documenting state policy interventions, quantitative economic models, and institutional analysis.",
      currentRole: "Senior Research Fellow",
      currentFocus: ["Quantitative Public Economics", "State Policy Impact Analysis", "Institutional Governance Systems"],
      linkedinUrl: "",
      email: "research@cspr.org",
      theme: "editorial",
    },
  });

  await prisma.journalEntry.createMany({
    data: [
      {
        weekNumber: 1,
        startDate: new Date("2026-10-01"),
        endDate: new Date("2026-10-07"),
        title: "Macroeconomic Policy Frameworks & Regional Impact",
        focus: "Initial data synthesis and baseline modeling for regional economic development indices across state jurisdictions.",
        workCompleted: "Compiled longitudinal household expenditure datasets and established econometric regression models for fiscal policy simulation.",
        outcomes: "Validated preliminary correlation between infrastructure spending and local employment growth.",
        reflection: "Granular administrative data reveals significant regional variance not captured in aggregated state-level metrics.",
        challenges: "Data sanitization and missing historical records in rural municipal archives.",
        nextWeekFocus: "Expand sample size to include cross-border trade coefficients.",
        status: ProjectStatus.PUBLISHED,
        visibility: Visibility.PUBLIC,
        publishedAt: new Date(),
      },
      {
        weekNumber: 2,
        startDate: new Date("2026-10-08"),
        endDate: new Date("2026-10-14"),
        title: "Public Healthcare Allocation & Efficiency Metrics",
        focus: "Investigating resource distribution efficiency across decentralized district health centers.",
        workCompleted: "Mapped facility-level staffing ratios against patient admission turnover and emergency response times.",
        outcomes: "Identified a 24% operational efficiency deficit in middle-tier administrative bottlenecks.",
        reflection: "Decentralized procurement autonomy consistently outperforms centralized supply chains in acute care settings.",
        challenges: "Standardizing disparate electronic health record (EHR) schemas across regional districts.",
        nextWeekFocus: "Draft policy recommendations for administrative streamlining.",
        status: ProjectStatus.PUBLISHED,
        visibility: Visibility.PUBLIC,
        publishedAt: new Date(),
      },
      {
        weekNumber: 3,
        startDate: new Date("2026-10-15"),
        endDate: new Date("2026-10-21"),
        title: "Educational Expenditure & Long-term Workforce Outcomes",
        focus: "Evaluating vocational training subsidies and regional employment retention rates over a 10-year horizon.",
        workCompleted: "Cross-referenced tax receipt registries with Department of Education enrollment cohorts.",
        outcomes: "Demonstrated positive wage premiums for dual-track technical certification programs.",
        reflection: "Targeted regional subsidies yield higher sustained employment retention than broad tax credits.",
        challenges: "Controlling for demographic migration shifts during economic downturns.",
        nextWeekFocus: "Finalize empirical paper draft for peer review.",
        status: ProjectStatus.PUBLISHED,
        visibility: Visibility.PUBLIC,
        publishedAt: new Date(),
      },
    ],
  });

  console.log("CSPR neutral seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
