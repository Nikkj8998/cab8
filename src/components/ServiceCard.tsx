import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  price: string;
  priceNote?: string;
  includes: string[];
  terms?: string[];
  idealFor?: string;
  cta: string;
  minEngagement?: string;
}

const ServiceCard = ({
  title,
  price,
  priceNote,
  includes,
  terms,
  idealFor,
  cta,
  minEngagement,
}: ServiceCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 flex flex-col h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10 flex flex-col h-full">
        <h3 className="text-2xl text-white mb-2">{title}</h3>
        {idealFor && (
          <p className="text-sm text-gray-400 mb-4">{idealFor}</p>
        )}

        <div className="mb-6">
          <div className="text-xl font-bold text-white mb-1">{price}</div>
          {priceNote && (
            <p className="text-gray-500 text-xs uppercase tracking-wide">{priceNote}</p>
          )}
        </div>

        <ul className="space-y-3 mb-8 text-gray-300 text-sm flex-1">
          {includes.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <svg className="w-5 h-5 text-[#14539a] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {terms && terms.length > 0 && (
          <div className="mb-6 pt-4 border-t border-gray-800">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Terms:</span>
            <ul className="space-y-1">
              {terms.map((term, index) => (
                <li key={index} className="text-gray-400 text-xs flex items-start gap-1">
                  <span className="text-[#14539a]">•</span> {term}
                </li>
              ))}
            </ul>
          </div>
        )}

        {minEngagement && (
          <p className="text-gray-500 text-[10px] mb-6 italic">
            Min engagement: {minEngagement}
          </p>
        )}

        <Button
          onClick={() => navigate('/contact')}
          className="w-full bg-transparent border border-white/20 hover:bg-primary/20 hover:border-primary text-white mt-auto"
        >
          {cta}
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
