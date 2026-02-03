import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cta rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3 opacity-30" />
      </div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <p className="hero-subtitle fade-in">
            Global IT Solutions Partner
          </p>
          <h1 className="hero-title text-4xl md:text-6xl mb-8 fade-in">
            Reliable Offshore IT & <br className="hidden md:block" /> Digital Services
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-10 fade-in fade-in-delay-1 font-sans font-normal max-w-2xl leading-relaxed">
            We help global businesses reduce costs, improve reliability, and scale faster with our dedicated offshore delivery team.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6 fade-in fade-in-delay-2">
            <a href="#contact" className="btn-cta">
              Book a Consultation
            </a>
            <a href="#services" className="text-sm font-sans font-medium hover:text-cta transition-colors flex items-center gap-2">
              View Our Services <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
