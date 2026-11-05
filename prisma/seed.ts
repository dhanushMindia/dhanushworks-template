import { PrismaClient, ProjectStatus, Visibility } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed with neutral template data...");

  // 1. Clean existing database
  console.log("Cleaning database...");
  await prisma.journalEntryProject.deleteMany({});
  await prisma.journalEntrySkill.deleteMany({});
  await prisma.projectSkill.deleteMany({});
  await prisma.projectTopic.deleteMany({});
  await prisma.projectRelation.deleteMany({});
  await prisma.articleTopic.deleteMany({});
  await prisma.articleTag.deleteMany({});

  await prisma.journalEntry.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.article.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.topic.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Create admin user
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
  console.log(`Created user: ${user.email}`);

  // 3. Create site profile
  await prisma.profile.create({
    data: {
      name: "Policy Researcher",
      tagline: "Research Analyst & Public Policy Researcher",
      bio: "Dedicated researcher focused on public finance, economic policy, and data-driven state research. Producing comprehensive analytical reports, policy impulses, and quantitative data insights. Committed to rigorous empirical research that informs public policy dialogue and institutional decision-making.\n\nSupervisor: Senior Faculty Lead (PhD), Center for Economic and Policy Studies.",
      currentRole: "Research Fellow",
      currentFocus: ["Public Finance", "Economic Policy", "Data Analysis", "Research Communication"],
      linkedinUrl: "https://www.linkedin.com/in/research-scholar",
      email: "admin@example.com",
    },
  });

  // 4. Create base taxonomy & Skills
  const topicEcon = await prisma.topic.create({ data: { name: "Economic Policy", slug: "economic-policy" }});
  const topicData = await prisma.topic.create({ data: { name: "Data Analysis", slug: "data-analysis" }});
  const topicHealth = await prisma.topic.create({ data: { name: "Healthcare Policy", slug: "healthcare-policy" }});

  const getSkill = async (name: string, category: string) => {
    return prisma.skill.create({ data: { name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), category }});
  };

  const sStata = await getSkill("STATA", "Tools");
  const sR = await getSkill("R", "Tools");
  const sTableau = await getSkill("Tableau", "Tools");
  const sPowerBi = await getSkill("PowerBi", "Tools");
  const sEViews = await getSkill("EViews", "Tools");
  const sExcel = await getSkill("Excel", "Tools");
  const sOcr = await getSkill("OCR Tool", "Tools");
  const sPubFin = await getSkill("Public Finance", "Research");
  const sPubAcc = await getSkill("Public Account Auditing", "Research");
  const sResMeth = await getSkill("Research Methodology", "Research");

  // 5. Seed Projects
  const projFiscal = await prisma.project.create({
    data: {
      title: "State Budget & Fiscal Rigidity Analysis",
      slug: "state-budget-analysis",
      subtitle: "Budget Rigidity & Efficiency Benchmarking",
      shortDescription: "Comprehensive analysis of state budget statements across multiple fiscal years. Derived insights on expenditure rigidity, debt sustainability, and sectoral allocation efficiency relative to peer jurisdictions.",
      status: ProjectStatus.PUBLISHED,
      visibility: Visibility.PUBLIC,
      organization: "Policy Research Center",
      role: "Research Fellow",
      startDate: new Date("2026-07-13"),
      projectType: "Fiscal Analysis",
      topics: { create: [{ topicId: topicEcon.id }, { topicId: topicData.id }] },
      skills: { create: [{ skillId: sExcel.id }, { skillId: sPubFin.id }] },
      blocks: [
        { type: "rich-text", content: "<p>Extracted state budget tables from official government publications. Computed multi-year growth rates, modeled committed expenditure ratios (salaries, pensions, interest payments), and built comparative efficiency indices.</p>" },
        { type: "link", title: "Project Methodology & Working Notes", url: "https://example.com/research-notes" }
      ]
    }
  });

  const projDemographic = await prisma.project.create({
    data: {
      title: "Demographic Survey & Health Disparities Assessment",
      slug: "demographic-health-assessment",
      subtitle: "Socioeconomic Indicators and Health Outcomes",
      shortDescription: "Visual exploration of large-scale demographic and health survey datasets focusing on regional health markers, urban-rural convergence, and delivery system metrics.",
      status: ProjectStatus.PUBLISHED,
      visibility: Visibility.PUBLIC,
      organization: "Policy Research Center",
      startDate: new Date("2026-07-20"),
      topics: { create: [{ topicId: topicData.id }, { topicId: topicHealth.id }] },
      skills: { create: [{ skillId: sTableau.id }, { skillId: sStata.id }, { skillId: sResMeth.id }] },
      blocks: [
        { type: "rich-text", content: "<p>Analyzed key health survey indicators, tracking trends in healthcare access, clinical procedures, and nutritional outcomes. Validated empirical data against international benchmarks and constructed comparative analytical dashboards.</p>" },
        { type: "link", title: "Survey Reference Documentation", url: "https://example.com/survey-docs" }
      ]
    }
  });

  const projPolicyEval = await prisma.project.create({
    data: {
      title: "Healthcare System Incentives & Institutional Impact",
      slug: "healthcare-incentives-impact",
      subtitle: "Policy Incentives and Healthcare Delivery",
      shortDescription: "Investigated quantitative relationships between institutional insurance frameworks, regulatory policies, and healthcare service delivery outcomes across regions.",
      status: ProjectStatus.PUBLISHED,
      visibility: Visibility.PUBLIC,
      startDate: new Date("2026-07-27"),
      topics: { create: [{ topicId: topicHealth.id }, { topicId: topicEcon.id }] },
      skills: { create: [{ skillId: sTableau.id }, { skillId: sStata.id }] },
      blocks: [
        { type: "rich-text", content: "<p>Conducted empirical microdata analysis to establish quantitative links between insurance structures and clinical service adoption. Workstreams covered provider incentives, cross-state benchmarking, and regulatory compliance mapping.</p>" },
        { type: "link", title: "Global Health Standards Reference", url: "https://example.com/health-standards" }
      ]
    }
  });

  const projMacro = await prisma.project.create({
    data: {
      title: "Sub-National Fiscal Health & Liability Assessment",
      slug: "subnational-fiscal-health",
      shortDescription: "Consolidated multi-year state budget documents and audit reports into structured datasets covering public debt, contingent liabilities, and off-budget borrowing.",
      status: ProjectStatus.PUBLISHED,
      visibility: Visibility.PUBLIC,
      startDate: new Date("2026-08-17"),
      topics: { create: [{ topicId: topicEcon.id }] },
      skills: { create: [{ skillId: sPubFin.id }, { skillId: sPubAcc.id }] },
      blocks: [
        { type: "rich-text", content: "<p>Developed a structured sub-national fiscal health dataset and guarantee/SPV database. Moved beyond simple debt-to-GSDP ratios toward a comprehensive fiscal liability index distinguishing legal ownership from economic incidence.</p>" }
      ]
    }
  });

  const projAutomation = await prisma.project.create({
    data: {
      title: "Automated Fiscal Report Reproduction Pipeline",
      slug: "automated-fiscal-pipeline",
      subtitle: "Automation and Framework Scaling",
      shortDescription: "Created a replicable automated data extraction and reporting pipeline to scale financial status report frameworks across multiple state jurisdictions.",
      status: ProjectStatus.PUBLISHED,
      visibility: Visibility.PUBLIC,
      startDate: new Date("2026-08-24"),
      topics: { create: [{ topicId: topicData.id }] },
      skills: { create: [{ skillId: sOcr.id }] },
      blocks: [
        { type: "rich-text", content: "<p>Integrated OCR and script-based parsing tools to extract complex statistical tables from legacy policy documents, establishing a continuous and reliable workflow for analytical publication.</p>" }
      ]
    }
  });

  const projWorkflow = await prisma.project.create({
    data: {
      title: "Comparative Regional Fiscal Research Workflow",
      slug: "comparative-fiscal-workflow",
      shortDescription: "Established standardized protocols and analytical workflows for comparative fiscal studies across regional jurisdictions as part of the core research team.",
      status: ProjectStatus.PUBLISHED,
      visibility: Visibility.PUBLIC,
      startDate: new Date("2026-08-24"),
      topics: { create: [{ topicId: topicEcon.id }] },
      skills: { create: [{ skillId: sResMeth.id }] }
    }
  });

  // 6. Seed Journal Entries
  await prisma.journalEntry.create({
    data: {
      weekNumber: 2,
      startDate: new Date("2026-07-13"),
      endDate: new Date("2026-07-19"),
      title: "Week 2: Budget Analysis & Data Ingestion",
      focus: "Orientation with core research mandates. Compilation of multi-year time series financial data and extraction of state budget tables.",
      workCompleted: "- Compiled time series dataset (2014-2026) covering over 50 core fiscal variables across peer states.\n- Extracted budget schedules using automated parsing and spreadsheet tools.\n- Modeled committed expenditure ratios and benchmarked fiscal efficiency metrics.\n- Coordinated research task distribution across project streams.",
      reflection: "Win: Strong team alignment and smooth initial execution. Challenge: Complex legacy tables required rigorous data cleaning. Learned: Nuances of committed expenditure structures and measuring true fiscal flexibility.",
      status: ProjectStatus.PUBLISHED,
      visibility: Visibility.PUBLIC,
      projects: { create: [{ projectId: projFiscal.id }] },
      skills: { create: [{ skillId: sExcel.id }, { skillId: sPubFin.id }] }
    }
  });

  await prisma.journalEntry.create({
    data: {
      weekNumber: 3,
      startDate: new Date("2026-07-20"),
      endDate: new Date("2026-07-26"),
      title: "Week 3: Demographic Survey Exploration & Synthesis",
      focus: "Analyzing state-level health survey factsheets and synthesizing core socioeconomic indicators.",
      workCompleted: "- Examined key demographic and health survey indicators, focusing on urban-rural differentials and public-private healthcare utilization.\n- Corroborated clinical delivery metrics against established health thresholds.\n- Synthesized key takeaways for the research publication series.",
      reflection: "Win: Clear data identification validated by faculty review. Challenge: Filtering auxiliary variables to isolate core causal pathways. Learned: Detailed mechanics of large-scale survey methodologies.",
      status: ProjectStatus.PUBLISHED,
      visibility: Visibility.PUBLIC,
      projects: { create: [{ projectId: projDemographic.id }] },
      skills: { create: [{ skillId: sResMeth.id }] }
    }
  });

  await prisma.journalEntry.create({
    data: {
      weekNumber: 4,
      startDate: new Date("2026-07-27"),
      endDate: new Date("2026-08-02"),
      title: "Week 4: Healthcare Incentives Causal Analysis",
      focus: "Cross-referencing administrative health databases and developing empirical visualizations on institutional insurance and healthcare delivery.",
      workCompleted: "- Evaluated health management information systems and regulatory frameworks.\n- Structured parallel analytical workstreams covering provider incentives, benchmarking, and regulatory mapping.\n- Produced intuitive data visualizations for the periodic research dispatch.",
      reflection: "Win: Delivered clean, highly accessible visual summaries from complex econometric inputs. Learned: Balancing empirical rigor with clear policy communication.",
      status: ProjectStatus.PUBLISHED,
      visibility: Visibility.PUBLIC,
      projects: { create: [{ projectId: projDemographic.id }, { projectId: projPolicyEval.id }] },
      skills: { create: [{ skillId: sTableau.id }, { skillId: sStata.id }] }
    }
  });

  await prisma.journalEntry.create({
    data: {
      weekNumber: 7,
      startDate: new Date("2026-08-17"),
      endDate: new Date("2026-08-23"),
      title: "Week 7: Sub-National Fiscal Health & Liability Auditing",
      focus: "Analyzing sub-national debt burdens, contingent liabilities, and fiscal responsibility framework compliance.",
      workCompleted: "- Computed debt burden, guarantee exposure, and own-revenue strength ratios.\n- Synthesized data from official state budget volumes, audit reports, and fiscal responsibility compliance reviews.\n- Built an entity-level guarantee database documenting sanctioned versus outstanding liabilities.",
      reflection: "Win: Established robust benchmarks for multi-year fiscal comparison. Challenge: Information fragmented across multiple reporting volumes; synthesized carefully with transparent assumptions.",
      status: ProjectStatus.PUBLISHED,
      visibility: Visibility.PUBLIC,
      projects: { create: [{ projectId: projMacro.id }] },
      skills: { create: [{ skillId: sPubAcc.id }, { skillId: sPubFin.id }] }
    }
  });

  await prisma.journalEntry.create({
    data: {
      weekNumber: 8,
      startDate: new Date("2026-08-24"),
      endDate: new Date("2026-08-30"),
      title: "Week 8: Core Research Operations & Automation Pipeline",
      focus: "Expanding fiscal sustainability assessments and scaling automated reporting workflows across state datasets.",
      workCompleted: "- Calculated debt sustainability indicators linked to public capital formation.\n- Reviewed major contingent liability and public enterprise audit reports.\n- Contributed to core team research standards and cross-state workflow protocols.\n- Prototyped an automated document parsing and table extraction pipeline.",
      reflection: "Win: Successfully scaled the analytical framework across multiple state datasets. Learned: Advanced approaches for assessing capital expenditure expansion against long-term debt sustainability.",
      status: ProjectStatus.PUBLISHED,
      visibility: Visibility.PUBLIC,
      projects: { create: [{ projectId: projMacro.id }, { projectId: projAutomation.id }, { projectId: projWorkflow.id }] },
      skills: { create: [{ skillId: sOcr.id }, { skillId: sPubFin.id }] }
    }
  });

  console.log("Seed completed successfully with clean neutral placeholder data!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
