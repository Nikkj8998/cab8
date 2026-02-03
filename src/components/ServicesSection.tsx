import ServiceCard from "./ServiceCard";

const services = [
  {
    title: "Managed IT Support (Global)",
    price: "$1,500 per month",
    includes: [
      "L1 and L2 remote IT support",
      "Ticket-based support with defined response times",
      "Desktop, server, and network monitoring",
      "Patch management and routine maintenance",
    ],
    idealFor: "Companies with 10–100 employees",
    cta: "Book a 15-minute IT discussion",
  },
  {
    title: "Cloud & Microsoft 365 Managed Service",
    price: "$750 per month",
    includes: [
      "Microsoft 365 or Google Workspace support",
      "Cloud backup and monitoring",
      "Firewall and basic security checks",
      "Cloud cost and usage optimization",
    ],
    cta: "Request a cloud assessment",
  },
  {
    title: "Software Development (Fixed Scope)",
    price: "$4,000 per project",
    includes: [
      "Business website or web application",
      "Admin panel or dashboard",
      "Fixed scope and delivery timeline (4–6 weeks)",
      "30 days post-delivery support",
    ],
    terms: [
      "Fixed scope only",
      "Milestone-based delivery",
      "Advance payment required",
    ],
    cta: "Discuss your project",
  },
  {
    title: "Digital Marketing (Global Starter Plan)",
    price: "$750 per month",
    includes: [
      "Social media management",
      "Basic SEO setup",
      "Campaign execution and monthly reporting",
      "Focus on lead generation and conversions",
    ],
    minEngagement: "3 months",
    cta: "Start a 30-day pilot",
  },
  {
    title: "Website Care & Maintenance (AMC)",
    price: "$300 per month",
    includes: [
      "Website security and backups",
      "Bug fixes and updates",
      "Performance monitoring",
      "Minor content updates",
    ],
    cta: "Secure your website",
  },
  {
    title: "Cybersecurity – Lite Service",
    price: "$1,000 per month",
    includes: [
      "Firewall monitoring",
      "Quarterly security review",
      "Endpoint protection support",
      "Incident response guidance",
    ],
    cta: "Request a security review",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-[#0b0e14]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-white">
            Our Services
          </h2>
          <p className="text-white/80 text-sm max-w-xl mx-auto">
            Fixed pricing with defined scope. No hidden costs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
