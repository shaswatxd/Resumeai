export type RoleCategory = {
  id: string
  name: string
  icon: string
  roles: {
    title: string
    summary: string
    bullets: string[]
    skills: string[]
  }[]
}

export const ROLE_CATEGORIES: RoleCategory[] = [
  {
    id: 'engineering',
    name: 'Software & Tech',
    icon: 'Code2',
    roles: [
      {
        title: 'Full Stack Developer',
        summary:
          'Full Stack Developer with 4+ years of experience architecting scalable web applications using React, Next.js, and Node.js. Proven track record of improving application performance by 40% and deploying robust microservices.',
        skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'GraphQL', 'AWS', 'TailwindCSS', 'CI/CD'],
        bullets: [
          'Architected and delivered full-stack microservices using Next.js, TypeScript, and Node.js, supporting 150k+ monthly active users with 99.9% uptime.',
          'Optimized database queries and Redis caching layers, reducing API response latency by 42% across critical endpoints.',
          'Spearheaded the migration of legacy monolithic architecture to containerized Docker workflows, decreasing build and deployment cycle times by 65%.',
          'Integrated end-to-end payment gateway (Stripe & Razorpay) and automated billing pipelines, processing over $2.5M in annual transactions.',
          'Mentored 4 junior developers and established automated code linting and CI/CD testing pipelines that reduced production bugs by 35%.',
        ],
      },
      {
        title: 'Frontend Developer',
        summary:
          'Performance-focused Frontend Engineer specializing in React, Next.js, and modern CSS architectures. Passionate about building pixel-perfect, accessible UI components with 100% Core Web Vitals compliance.',
        skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux Toolkit', 'Next.js', 'Webpack/Vite', 'Jest', 'Accessibility (a11y)'],
        bullets: [
          'Engineered a responsive component design system in React and Tailwind CSS, standardizing UI across 6 internal products and boosting team velocity by 50%.',
          'Revamped web vital metrics (LCP, CLS, FID) to achieve 98+ Lighthouse performance scores, increasing organic user conversion by 28%.',
          'Implemented robust state management using Zustand and React Query, eliminating redundant API polling and reducing memory overhead by 30%.',
          'Collaborated closely with product designers to implement interactive data dashboards and dynamic chart visualizations using D3.js and Recharts.',
        ],
      },
      {
        title: 'Backend & Cloud Engineer',
        summary:
          'Backend Engineer with deep expertise in distributed systems, REST/gRPC APIs, and cloud infrastructure on AWS. Strong background in database optimization and event-driven architecture.',
        skills: ['Node.js', 'Go', 'Python', 'PostgreSQL', 'Redis', 'Kafka', 'AWS (EC2, S3, Lambda)', 'Kubernetes', 'Microservices'],
        bullets: [
          'Designed high-throughput event-driven microservices using Go and Apache Kafka, processing 10M+ daily events with sub-50ms latency.',
          'Implemented horizontal auto-scaling and AWS ECS container orchestration, cutting monthly cloud infrastructure costs by 22%.',
          'Automated data backup, failover clustering, and disaster recovery policies for multi-region PostgreSQL databases, ensuring zero data loss.',
          'Developed secure OAuth2, JWT, and RBAC authentication mechanisms across all public and internal REST/GraphQL endpoints.',
        ],
      },
    ],
  },
  {
    id: 'data-ml',
    name: 'Data Science & Analytics',
    icon: 'Database',
    roles: [
      {
        title: 'Data Scientist / ML Engineer',
        summary:
          'Data Scientist experienced in building predictive machine learning models, NLP pipelines, and LLM integrations. Proficient in Python, PyTorch, SQL, and deploying models to cloud production environments.',
        skills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Pandas', 'SQL', 'LLM Fine-tuning', 'FastAPI', 'MLOps', 'Tableau'],
        bullets: [
          'Developed and deployed end-to-end customer churn prediction models using XGBoost, improving customer retention by 18% within 6 months.',
          'Fine-tuned open-source LLMs using LoRA and RAG architectures, automating 70% of routine customer support inquiry classifications.',
          'Constructed automated ETL data pipelines in Apache Airflow and Snowflake, handling 5TB+ daily transaction data for executive reporting.',
          'Designed A/B testing experimentation frameworks with rigorous statistical significance validation for feature release decisions.',
        ],
      },
      {
        title: 'Data Analyst',
        summary:
          'Insight-driven Data Analyst skilled in transforming complex raw datasets into actionable business intelligence dashboards using SQL, Python, PowerBI, and Tableau.',
        skills: ['SQL', 'Python', 'Power BI', 'Tableau', 'Excel (VBA)', 'Data Modeling', 'A/B Testing', 'Google Analytics'],
        bullets: [
          'Built executive Power BI dashboards tracking KPIs, MRR, and CAC across 5 product verticals, saving leadership 12+ reporting hours weekly.',
          'Identified funnel bottlenecks through advanced cohort analysis, leading to a 15% increase in user checkout conversion rates.',
          'Automated weekly data reconciliation scripts in Python, eliminating manual spreadsheet entry errors and reducing report generation time by 80%.',
        ],
      },
    ],
  },
  {
    id: 'product-management',
    name: 'Product & Design',
    icon: 'Layout',
    roles: [
      {
        title: 'Product Manager',
        summary:
          'User-centric Product Manager with a track record of taking products from 0 to 1. Skilled in agile roadmapping, data-driven prioritization, market research, and cross-functional team leadership.',
        skills: ['Product Strategy', 'Agile / Scrum', 'Roadmapping', 'User Research', 'Data Analytics', 'Jira', 'Figma', 'Go-To-Market (GTM)'],
        bullets: [
          'Spearheaded the 0-to-1 launch of an enterprise SaaS collaboration tool, reaching $500k ARR within the first 9 months of launch.',
          'Conducted 45+ user interviews and analyzed in-app telemetry to refine product roadmap, increasing monthly user retention by 24%.',
          'Led cross-functional team of 8 engineers, 2 designers, and marketing leads using two-week sprint cycles with a 95% on-time feature delivery rate.',
          'Defined and tracked core product North Star metrics (DAU, NPS, churn), driving continuous iterative improvements based on quantitative data.',
        ],
      },
      {
        title: 'UI/UX Designer',
        summary:
          'Product Designer passionate about crafting intuitive, accessible, and delightful digital experiences. Expert in design systems, user flows, rapid prototyping, and usability testing.',
        skills: ['Figma', 'UI Design', 'UX Research', 'Design Systems', 'Prototyping', 'Wireframing', 'Usability Testing', 'Information Architecture'],
        bullets: [
          'Designed a comprehensive multi-platform design system in Figma comprising 300+ accessible components, accelerating design-to-dev handoff by 40%.',
          'Conducted remote usability testing sessions with 30+ participants, identifying key friction points and reducing onboarding drop-off by 32%.',
          'Created interactive high-fidelity prototypes and micro-animations to align stakeholders on complex user flows before engineering sprints.',
        ],
      },
    ],
  },
  {
    id: 'marketing-sales',
    name: 'Marketing & Sales',
    icon: 'TrendingUp',
    roles: [
      {
        title: 'Digital Marketing & Growth',
        summary:
          'Growth & Digital Marketing Specialist experienced in paid acquisition, SEO, content marketing, and lifecycle email automation. Proven record of scaling organic traffic and lowering CAC.',
        skills: ['SEO / SEM', 'Google Ads', 'Meta Ads', 'Email Marketing', 'Content Strategy', 'HubSpot', 'Google Analytics 4', 'Conversion Rate Optimization (CRO)'],
        bullets: [
          'Scaled organic search traffic by 180% year-over-year through technical SEO audits, keyword clustering, and high-converting content hubs.',
          'Managed a monthly paid advertising budget of $40,000 across Google and Meta, maintaining an average ROAS of 3.8x.',
          'Designed personalized drip email onboarding sequences in HubSpot, improving trial-to-paid conversion rates by 22%.',
          'Executed multi-variant A/B landing page tests that boosted signup conversion rates from 3.2% to 5.8%.',
        ],
      },
      {
        title: 'Sales & Business Development',
        summary:
          'Results-oriented Sales & BD Executive with a track record of exceeding quotas in B2B SaaS sales. Skilled in lead generation, consultative selling, deal negotiation, and CRM pipeline management.',
        skills: ['B2B Sales', 'Lead Generation', 'Salesforce', 'Cold Outreach', 'Contract Negotiation', 'Account Management', 'Client Relations'],
        bullets: [
          'Exceeded annual sales quota by 135%, generating $1.8M in closed-won new business contracts across mid-market enterprise accounts.',
          'Built and qualified an active outbound pipeline of 200+ qualified leads per quarter using LinkedIn Sales Navigator and customized email sequences.',
          'Maintained a 40% deal close rate through consultative discovery calls and tailored solution demonstrations for C-level executives.',
        ],
      },
    ],
  },
  {
    id: 'student-entry',
    name: 'Students & Fresh Graduates',
    icon: 'GraduationCap',
    roles: [
      {
        title: 'Computer Science Graduate / Intern',
        summary:
          'Motivated Computer Science graduate with strong fundamentals in Data Structures, Algorithms, and Modern Web Development. Eager to contribute to fast-paced software engineering teams.',
        skills: ['Java', 'Python', 'JavaScript/TypeScript', 'React', 'SQL', 'Git & GitHub', 'Data Structures & Algorithms', 'REST APIs'],
        bullets: [
          'Developed a full-stack web application featuring user authentication, database caching, and responsive UI as a capstone project.',
          'Solved 300+ algorithmic and data structure problems on LeetCode/GeeksforGeeks, honing problem-solving and optimization skills.',
          'Collaborated with a team of 4 in an agile hackathon project, earning 2nd place out of 45 participating teams.',
          'Maintained active open-source contributions on GitHub, including bug fixes, documentation updates, and unit test suites.',
        ],
      },
    ],
  },
]

export const ACTION_VERBS_BY_CATEGORY = [
  {
    category: 'Leadership & Execution',
    verbs: ['Spearheaded', 'Orchestrated', 'Architected', 'Directed', 'Pioneered', 'Steered', 'Championed', 'Mobilized', 'Delegated', 'Governed'],
  },
  {
    category: 'Building & Engineering',
    verbs: ['Constructed', 'Engineered', 'Developed', 'Deployed', 'Implemented', 'Programmed', 'Automated', 'Integrated', 'Synthesized', 'Standardized'],
  },
  {
    category: 'Optimization & Growth',
    verbs: ['Accelerated', 'Amplified', 'Maximized', 'Streamlined', 'Optimized', 'Reduced', 'Eliminated', 'Boosted', 'Elevated', 'Consolidated'],
  },
  {
    category: 'Analysis & Strategy',
    verbs: ['Formulated', 'Analyzed', 'Evaluated', 'Identified', 'Diagnosed', 'Synthesized', 'Audited', 'Forecasted', 'Uncovered', 'Navigated'],
  },
  {
    category: 'Collaboration & Mentorship',
    verbs: ['Mentored', 'Facilitated', 'Partnered', 'Empowered', 'Negotiated', 'Fostered', 'Educated', 'Advocated', 'Aligned', 'Coordinated'],
  },
]

export const QUANTIFIABLE_METRIC_TEMPLATES = [
  'Increased [metric] by [X]% within [timeframe] by implementing [action].',
  'Reduced [cost/time/latency] from [X] to [Y], saving [$Z / hours] annually.',
  'Architected [feature/system] supporting [X,000+] active users with [Y]% uptime.',
  'Delivered [project] [X] weeks ahead of schedule while managing a budget of [$Y].',
  'Mentored [X] team members and reduced onboarding time by [Y]%.',
  'Automated manual workflows, eliminating [X] hours of repetitive work per week.',
]
