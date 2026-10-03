import { HeartPulse, GraduationCap, ShoppingBag, Landmark, Truck, Building2, Rocket, Briefcase } from 'lucide-react';

export const industries = [
  {
    id: 'healthcare',
    icon: HeartPulse,
    title: 'Healthcare',
    challenge: 'Managing patient data securely and improving remote access to care.',
    solution: 'We build HIPAA-compliant telehealth apps and patient management portals.',
    features: ['Telemedicine integration', 'Secure EMR/EHR', 'Patient scheduling', 'Prescription management'],
    benefits: ['Improved patient outcomes', 'Reduced administrative burden', 'Enhanced data security'],
    examples: ['HealthTrack Mobile App', 'MediPortal Dashboard']
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education',
    challenge: 'Transitioning to digital learning and managing student progress effectively.',
    solution: 'Custom Learning Management Systems (LMS) and interactive learning platforms.',
    features: ['Video streaming', 'Interactive quizzes', 'Student progress tracking', 'Virtual classrooms'],
    benefits: ['Wider reach for educational content', 'Personalized learning experiences', 'Efficient administration'],
    examples: ['LearnNova Platform', 'EduTrack CRM']
  },
  {
    id: 'retail',
    icon: ShoppingBag,
    title: 'Retail & E-commerce',
    challenge: 'Providing seamless omnichannel shopping experiences and managing inventory.',
    solution: 'High-performance e-commerce platforms and inventory management systems.',
    features: ['Omnichannel integration', 'Real-time inventory syncing', 'AI-powered recommendations', 'Secure checkout'],
    benefits: ['Increased sales conversion', 'Better inventory control', 'Enhanced customer loyalty'],
    examples: ['StyleStore E-commerce', 'RetailSync App']
  },
  {
    id: 'finance',
    icon: Landmark,
    title: 'Finance',
    challenge: 'Ensuring absolute security while providing real-time financial insights.',
    solution: 'Secure fintech apps, trading platforms, and data visualization dashboards.',
    features: ['Bank-grade encryption', 'Real-time market data integration', 'Automated reporting', 'Fraud detection AI'],
    benefits: ['Secure transactions', 'Actionable financial insights', 'Regulatory compliance'],
    examples: ['FinMetrics Dashboard', 'TradeSecure Mobile App']
  },
  {
    id: 'logistics',
    icon: Truck,
    title: 'Logistics',
    challenge: 'Tracking shipments in real-time and optimizing delivery routes.',
    solution: 'Comprehensive fleet management and shipment tracking CRMs.',
    features: ['GPS tracking integration', 'Route optimization algorithms', 'Automated dispatching', 'Client portals'],
    benefits: ['Reduced delivery times', 'Lower fuel costs', 'Improved customer transparency'],
    examples: ['LogiFlow CRM', 'FleetTrack App']
  },
  {
    id: 'real-estate',
    icon: Building2,
    title: 'Real Estate',
    challenge: 'Managing property listings, leads, and client communications effectively.',
    solution: 'Custom property portals and real estate CRMs with virtual tour integrations.',
    features: ['Property matching algorithms', 'Virtual tours (3D/360)', 'Lead management', 'Automated follow-ups'],
    benefits: ['Faster property sales', 'Better lead conversion', 'Streamlined agent workflows'],
    examples: ['PropView Portal', 'AgentCRM']
  },
  {
    id: 'startups',
    icon: Rocket,
    title: 'Startups',
    challenge: 'Getting an MVP to market quickly while maintaining scalability.',
    solution: 'Agile MVP development and scalable architecture planning for rapid growth.',
    features: ['Rapid prototyping', 'Scalable cloud architecture', 'Analytics integration', 'Flexible tech stack'],
    benefits: ['Faster time to market', 'Cost-effective initial build', 'Ready for investor pitching'],
    examples: ['Various MVP projects across industries']
  },
  {
    id: 'professional-services',
    icon: Briefcase,
    title: 'Professional Services',
    challenge: 'Automating appointment booking, billing, and client management.',
    solution: 'Integrated practice management software tailored to specific professions.',
    features: ['Automated scheduling', 'Client invoicing', 'Document management', 'Secure messaging'],
    benefits: ['Reduced no-shows', 'Faster payment processing', 'Professional client experience'],
    examples: ['ConsultPro CRM', 'LegalDoc Manager']
  }
];
