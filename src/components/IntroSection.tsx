const IntroSection = () => {
  const benefits = [
    { number: "01", title: "Clear SLAs", desc: "Offshore delivery with defined service levels" },
    { number: "02", title: "30–50% Savings", desc: "Cost reduction vs local hiring" },
    { number: "03", title: "Fixed Pricing", desc: "Defined scope, no surprises" },
    { number: "04", title: "Fast Onboarding", desc: "Quick response and setup time" },
    { number: "05", title: "No Lock-in", desc: "Flexible contract terms" },
  ];

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-base md:text-lg text-white/80 leading-relaxed mb-16 max-w-3xl">
          We help small and mid-sized companies reduce IT costs, improve reliability,
          and scale faster using a dedicated offshore delivery team based in India,
          aligned to global standards.
        </p>

        <div className="section-heading-wrapper">
          <h2 className="section-heading text-white">
            Why Global Clients Work With Us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative p-5 md:p-6 rounded-xl bg-[#1e3a5f] border border-blue-900/50 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-m font-bold text-blue-400/30 absolute top-4 right-4 group-hover:text-blue-400/50 transition-colors duration-300">
                {benefit.number}
              </span>
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
