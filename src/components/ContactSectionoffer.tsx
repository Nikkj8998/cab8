import { useNavigate } from "react-router-dom";

const ContactSection = () => {
  const navigate = useNavigate();

  return (
    <section id="contact" className="contact-section-dark relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="hero-title mb-6">
            Let's Discuss Your Requirements
          </h2>
          <p className="text-lg opacity-90 mb-10 leading-relaxed font-sans font-normal max-w-2xl mx-auto">
            Schedule a short discussion to understand how we can reduce costs
            and improve reliability for your business.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button onClick={() => navigate("/contact")} className="btn-cta px-10">
              Book a 15-minute consultation
            </button>
            <a
              href="mailto:info@cybaemtech.com"
              className="contact-email"
            >
              info@cybaemtech.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
