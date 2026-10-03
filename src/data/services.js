import { Code, Smartphone, ShoppingCart, Users, Clock, Settings, Brain, TrendingUp, Search } from 'lucide-react';

export const services = [
  {
    id: 'website-development',
    icon: Code,
    title: 'Web Application Development',
    overview: 'Scalable, high-performance web applications built with modern frontend frameworks and robust cloud APIs.',
    description: 'We architect and build responsive web applications focused on performance, accessibility, and clean code. From customer-facing platforms to enterprise SaaS products, our systems are built for long-term maintainability.',
    features: ['Component-Driven Architecture', 'Server-Side Rendering (SSR)', 'Core Web Vitals Optimization', 'Headless CMS & API Integration'],
    benefits: ['Sub-second page load times', 'Higher organic search visibility', 'Easier ongoing maintenance and scaling'],
    techStack: ['React 19', 'Next.js', 'Tailwind CSS', 'Node.js', 'TypeScript'],
    process: ['Technical Discovery', 'Architecture & Wireframes', 'Sprint Development', 'QA & Performance Audit', 'Deployment']
  },
  {
    id: 'mobile-app-development',
    icon: Smartphone,
    title: 'Mobile App Development',
    overview: 'High-performance iOS and Android applications engineered for fluid UX and offline reliability.',
    description: 'We build cross-platform and native mobile apps with smooth user experiences, secure authentication, and resilient offline data caching tailored to real user conditions.',
    features: ['Cross-Platform Engineering', 'Offline Data Synchronization', 'Native Device API Integration', 'Biometric Authentication'],
    benefits: ['Unified codebase for iOS & Android', 'Consistent native performance', 'Lower long-term maintenance costs'],
    techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    process: ['User Flow Mapping', 'Interactive Prototyping', 'Sprint Engineering', 'Device QA Testing', 'App Store Deployment']
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'E-Commerce Platforms',
    overview: 'Custom e-commerce platforms and checkout workflows designed for speed, security, and transaction scale.',
    description: 'From custom storefronts to headless architectures, we deliver secure, high-conversion shopping experiences integrated with your inventory and fulfillment systems.',
    features: ['Headless Commerce Architecture', 'Secure Multi-Gateway Checkout', 'Real-Time Inventory Sync', 'Custom Pricing & Promotion Rules'],
    benefits: ['Reduced cart abandonment', 'Reliable handling of traffic spikes', 'Seamless ERP & fulfillment connections'],
    techStack: ['Shopify Plus', 'Next.js Commerce', 'Stripe', 'PostgreSQL', 'Redis'],
    process: ['Catalog & Data Scoping', 'Storefront Architecture', 'Payment & ERP Integration', 'Load & Stress Testing', 'Launch']
  },
  {
    id: 'crm',
    icon: Users,
    title: 'Internal Tools & Custom CRM',
    overview: 'Tailored operations dashboards, internal tooling, and customer relationship management systems.',
    description: 'We replace fragmented spreadsheets and rigid off-the-shelf software with purpose-built internal applications that match your exact operational workflows.',
    features: ['Granular Role-Based Permissions (RBAC)', 'Operational Analytics & KPI Dashboards', 'Automated Record Lifecycles', 'Third-Party API Webhooks'],
    benefits: ['Reduced operational bottlenecks', 'Centralized business records', 'Better team productivity'],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'GraphQL', 'Tailwind CSS'],
    process: ['Workflow Analysis', 'Database Schema Modeling', 'Interface Engineering', 'Data Migration', 'Team Onboarding']
  },
  {
    id: 'attendance-systems',
    icon: Clock,
    title: 'Workforce & Attendance Systems',
    overview: 'Automated time tracking, shift scheduling, and compliance management for distributed and on-premise teams.',
    description: 'Reliable workforce management software supporting biometric hardware sync, automated leave policies, overtime rules, and direct payroll reconciliation.',
    features: ['Biometric & Geo-Fence Check-In', 'Automated Leave Approval Workflows', 'Shift Scheduling & Overtime Rules', 'Payroll & HRMS Data Sync'],
    benefits: ['Accurate payroll reconciliation', 'Clear labor compliance records', 'Zero manual timesheet tracking'],
    techStack: ['Python', 'Node.js', 'PostgreSQL', 'IoT Hardware Gateways'],
    process: ['Policy & Workflow Review', 'Hardware & Network Setup', 'System Configuration', 'Pilot Testing', 'Full Rollout']
  },
  {
    id: 'business-automation',
    icon: Settings,
    title: 'Workflow & Cloud Automation',
    overview: 'Background integrations, automated document processing, and cloud services that eliminate manual busywork.',
    description: 'We connect your disparate business tools, automate repetitive multi-step tasks, and deploy background worker queues that keep data synchronized in real time.',
    features: ['Event-Driven Webhook Pipelines', 'Automated Document & Invoice Generation', 'Scheduled Data Sync Jobs', 'Error Recovery & Dead-Letter Queues'],
    benefits: ['Elimination of manual re-keying', 'Faster customer turnaround', 'Reliable audit trails'],
    techStack: ['Node.js', 'Python', 'AWS Lambda', 'Redis BullMQ', 'Docker'],
    process: ['Process Mapping', 'Integration Architecture', 'Pipeline Development', 'Security & Error Testing', 'Monitoring Setup']
  },
  {
    id: 'ai-integration',
    icon: Brain,
    title: 'Applied AI & Model Integration',
    overview: 'Practical language model workflows, document intelligence, and predictive features embedded directly into your software.',
    description: 'We build purposeful AI features that solve concrete operational challenges—including retrieval-augmented generation (RAG), intelligent search, and automated ticket classification.',
    features: ['RAG & Document Intelligence', 'Custom LLM API Integrations', 'Domain-Specific Classification', 'Automated Sentiment & Intent Routing'],
    benefits: ['Faster customer support resolution', 'Automated document extraction', 'Actionable insights from unstructured data'],
    techStack: ['Python', 'OpenAI API', 'LangChain', 'PostgreSQL pgvector', 'AWS Bedrock'],
    process: ['Feasibility & Data Assessment', 'Prompt & Model Prototyping', 'API Integration', 'Evaluation & Guardrails', 'Production Monitoring']
  },
  {
    id: 'digital-marketing',
    icon: TrendingUp,
    title: 'Technical Digital Marketing',
    overview: 'Performance-focused search marketing, technical SEO, and conversion analytics to grow qualified inbound pipeline.',
    description: 'We combine technical optimization with conversion rate science to improve search engine rankings and increase lead generation from your digital assets.',
    features: ['Conversion Rate Optimization (CRO)', 'Full-Funnel Analytics Setup', 'Technical SEO Architecture', 'Campaign Performance Tracking'],
    benefits: ['Qualified inbound leads', 'Accurate revenue attribution', 'Higher organic search visibility'],
    techStack: ['Google Analytics 4', 'Google Tag Manager', 'Search Console', 'Ahrefs'],
    process: ['Analytics Audit', 'Funnel & Conversion Strategy', 'Tracking Implementation', 'A/B Testing', 'Continuous Optimization']
  },
  {
    id: 'seo',
    icon: Search,
    title: 'Technical SEO Optimization',
    overview: 'Core Web Vitals remediation, structured data architecture, and crawlability optimization for sustained organic growth.',
    description: 'We resolve technical barriers that prevent search engines from discovering and indexing your pages, improving page speed, site architecture, and content hierarchy.',
    features: ['Core Web Vitals Remediation', 'Structured Schema & JSON-LD', 'Information Architecture & URL Hierarchy', 'Crawl Budget & Sitemap Optimization'],
    benefits: ['Faster page rendering speeds', 'Higher indexation rates', 'Sustainable search performance'],
    techStack: ['Lighthouse', 'Schema.org', 'Next.js Metadata', 'Search Console'],
    process: ['Site Audit & Gap Analysis', 'Technical Issue Remediation', 'Schema & Metadata Implementation', 'Speed Optimization', 'Rank & Traffic Monitoring']
  }
];
