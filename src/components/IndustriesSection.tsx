const IndustriesSection = () => {
  const industries = [
    "Professional services",
    "E-commerce",
    "Manufacturing",
    "SaaS & Technology",
    "Healthcare & Education",
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 font-heading text-white text-center">
            Industries We Support
          </h2>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {industries.map((industry, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full border border-gray-800 bg-gray-900/50 text-white/80 text-sm font-medium hover:border-[#14539a]/50 hover:text-white transition-all duration-300"
              >
                {industry}
              </span>
            ))}
          </div>

          <div className="p-8 rounded-2xl bg-gray-900/30 border border-gray-800 text-center">
            <h3 className="text-xl font-bold text-white mb-4">
              Pricing Note
            </h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-2xl mx-auto">
              Pricing is based on standard scope and usage. Custom requirements
              or higher workloads may require a tailored quote.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
