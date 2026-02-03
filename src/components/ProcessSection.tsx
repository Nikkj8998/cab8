const ProcessSection = () => {
  const steps = [
    "Requirement discussion and scope confirmation",
    "Fixed pricing and service agreement",
    "Dedicated offshore team assignment",
    "SLA-based delivery and reporting",
    "Ongoing support and optimization",
  ];

  return (
    <section id="process" className="py-20 bg-[#0b0e14]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-heading text-white text-center">
          How We Work
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-[#14539a]/50 transition-all duration-300"
            >
              <span className="text-3xl font-bold text-[#14539a]/30 absolute top-4 right-4 group-hover:text-[#14539a]/50 transition-colors duration-300">
                {index + 1}
              </span>
              <p className="text-white/80 relative z-10">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
