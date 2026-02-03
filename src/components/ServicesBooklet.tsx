import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  Cloud,
  Globe,
  Database,
  Headphones,
  Shield,
  Briefcase,
  Code,
  Users,
} from "lucide-react";

const ServicesBooklet = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  const services = [
    {
      icon: Share2,
      title: "Digital Marketing Services",
      gradient: "from-slate-50 to-blue-50",
      accent: "bg-blue-600",
      link: "/digital-marketing",
      services: [
        "Search Engine Optimization (SEO)",
        "Pay-Per-Click (PPC) & Google Ads",
        "Social Media Marketing",
        "Content Marketing & Copywriting",
        "Email Marketing Campaigns",
        "Influencer Marketing",
      ],
    },
    {
      icon: Cloud,
      title: "Cloud, Hosting & Microsoft 365",
      gradient: "from-slate-50 to-cyan-50",
      accent: "bg-cyan-600",
      link: "/cloud-solutions",
      services: [
        "Cloud Architecture & Deployment",
        "Web & Email Hosting",
        "Microsoft 365 Licensing & Setup",
        "Cloud Migration",
        "Hybrid & Multi-Cloud Solutions",
        "Backup & Disaster Recovery",
      ],
    },
    {
      icon: Database,
      title: "AI and Data Analytics",
      gradient: "from-slate-50 to-violet-50",
      accent: "bg-violet-600",
      link: "/ai-data-analytics",
      services: [
        "Machine Learning & AI Development",
        "Business Intelligence & Analytics",
        "Real-Time Data Processing",
        "Computer Vision & NLP",
        "Data Engineering & Pipelines",
        "Intelligent Automation",
      ],
    },
    {
      icon: Globe,
      title: "IT Infrastructure & Networking",
      gradient: "from-slate-50 to-emerald-50",
      accent: "bg-emerald-600",
      link: "/managed-services",
      services: [
        "Server Implementation & Support",
        "LAN/WAN Setup & Management",
        "VPN & Remote Connectivity",
        "Network Monitoring & Optimization",
        "Datacenter Setup",
        "Structured Cabling",
      ],
    },
    {
      icon: Headphones,
      title: "IT Support, Remote Support & AMC",
      gradient: "from-slate-50 to-amber-50",
      accent: "bg-amber-600",
      link: "/computer-amc-services",
      services: [
        "Helpdesk & Ticketing",
        "Annual Maintenance Contract",
        "Hardware & Software Support",
        "Remote Tuning & Fixes",
        "RMM Monitoring",
        "Security Patches",
      ],
    },
    {
      icon: Shield,
      title: "Cybersecurity Solutions",
      gradient: "from-slate-50 to-rose-50",
      accent: "bg-rose-600",
      link: "/cybersecurity-services",
      services: [
        "VAPT (Penetration Testing)",
        "Firewall, IDS/IPS",
        "Endpoint Security & Antivirus",
        "SIEM & SOC Monitoring",
        "Encryption & Secure Backup",
        "User Awareness Training",
      ],
    },
    {
      icon: Briefcase,
      title: "ITSM, Compliance & Consulting",
      gradient: "from-slate-50 to-indigo-50",
      accent: "bg-indigo-600",
      link: "/itsm-consulting",
      services: [
        "ITIL Process Implementation",
        "IT Strategy & Roadmap",
        "Risk Management Audits",
        "Digital Transformation",
        "Cloud Adoption Strategy",
        "Regulatory Compliance (PCI-DSS, SOC 2)",
      ],
    },
    {
      icon: Code,
      title: "Software Development & Web Design",
      gradient: "from-slate-50 to-purple-50",
      accent: "bg-purple-600",
      link: "/software-development",
      services: [
        "Website Development",
        "Mobile App Development",
        "CRM & ERP Development",
        "API Integrations",
        "UI/UX Design",
        "Website Maintenance",
      ],
    },
    {
      icon: Users,
      title: "IT Staff Augmentation",
      gradient: "from-slate-50 to-teal-50",
      accent: "bg-teal-600",
      link: "/it-augmentation",
      services: [
        "Dedicated Onsite IT Engineers",
        "Remote IT Specialists",
        "Project-Based Staffing",
        "Network & System Admins",
        "Helpdesk Outsourcing",
        "Contract / Long-Term Hiring",
      ],
    },
  ];

  // Auto-rotation effect
  useEffect(() => {
    const startAutoRotate = () => {
      autoRotateTimerRef.current = setInterval(() => {
        if (!isPaused && !isFlipping) {
          setCurrentPage((prev) => {
            if (prev >= services.length - 1) {
              return 0; // Loop back to first page
            }
            return prev + 1;
          });
        }
      }, 5000);
    };

    if (!isPaused) {
      startAutoRotate();
    }

    return () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
      }
    };
  }, [isPaused, isFlipping, services.length]);

  // Handle pause timer
  useEffect(() => {
    if (isPaused) {
      // Clear any existing pause timer
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }

      // Set new pause timer for 10 seconds
      pauseTimerRef.current = setTimeout(() => {
        setIsPaused(false);
      }, 10000);
    }

    return () => {
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }
    };
  }, [isPaused]);

  const handleNext = () => {
    if (currentPage < services.length - 1 && !isFlipping) {
      setIsPaused(true); // Pause auto-rotation
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 400);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsPaused(true); // Pause auto-rotation
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 400);
    }
  };

  const CurrentIcon = services[currentPage].icon;

  return (
    <div className="py-10 md:py-14 bg-black relative overflow-hidden">
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
      <div className="container mx-auto mobile-padding relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            <span className="text-white">Our </span>
            <span className="text-primary">Services</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
            Comprehensive IT solutions tailored to your business needs
          </p>
        </div>

        {/* Booklet Container */}
        <div className="relative max-w-5xl mx-auto bg-black">
          {/* Book Shadow */}
          <div className="absolute inset-0 bg-primary/20 blur-3xl transform translate-y-8 opacity-50"></div>

          {/* Main Book */}
          <div className="relative overflow-hidden shadow-2xl">
            <div
              className={`relative bg-white transition-all duration-400 ${
                isFlipping ? "scale-98" : "scale-100"
              }`}
              style={{
                transformStyle: "preserve-3d",
                minHeight: "550px",
              }}
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Left Page - Cover/Info */}
                <div className="w-full md:w-1/2 min-h-[300px] md:h-auto border-b md:border-b-0 md:border-r border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 flex flex-col justify-between z-10">
                  <div>
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${services[currentPage].accent} mb-6 shadow-lg`}
                    >
                      <CurrentIcon className="w-8 h-8 text-white" />
                    </div>

                    <h2 className="text-3xl font-bold text-white leading-tight mb-4">
                      {services[currentPage].title}
                    </h2>

                    <div className="w-16 h-0.5 bg-white/30 mb-6"></div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      Professional solutions designed to elevate your business
                      operations and drive sustainable growth.
                    </p>
                  </div>

                  <div className="mt-8 md:mt-0 space-y-3">
                    <div className="flex items-center gap-3 text-white/60 text-xs">
                      <div className="w-8 h-0.5 bg-white/30"></div>
                      <span>
                        Page {currentPage + 1} of {services.length}
                      </span>
                    </div>

                    {/* Page Dots */}
                    <div className="flex gap-1.5 flex-wrap">
                      {services.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (!isFlipping && idx !== currentPage) {
                              setIsPaused(true); // Pause auto-rotation
                              setIsFlipping(true);
                              setTimeout(() => {
                                setCurrentPage(idx);
                                setIsFlipping(false);
                              }, 400);
                            }
                          }}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            idx === currentPage
                              ? "bg-white w-8"
                              : "bg-white/30 w-1 hover:bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Page - Content */}
                <div
                  className={`w-full md:w-1/2 min-h-[300px] md:h-auto bg-gradient-to-br ${services[currentPage].gradient} p-8 md:p-12`}
                >
                  <div className="h-full flex flex-col">
                    <div className="mb-6 md:mb-8">
                      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                        Services Included
                      </h3>
                    </div>

                    <div className="space-y-2 flex-1">
                      {services[currentPage].services.map((service, idx) => (
                        <div
                          key={idx}
                          className="group bg-white border border-slate-200 rounded-lg p-3 hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer"
                          style={{
                            animation: `slideIn 0.5s ease-out ${idx * 0.08}s both`,
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${services[currentPage].accent} mt-2 flex-shrink-0`}
                            ></div>
                            <p className="text-slate-700 font-medium text-xs md:text-sm group-hover:text-slate-900 transition-colors">
                              {service}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-200">
                      <button
                        onClick={() => {
                          const link = services[currentPage].link;
                          if (link) {
                            navigate(link);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }}
                        className={`w-full ${services[currentPage].accent} text-white py-3 px-6 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity shadow-md`}
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Spine Effect */}
              <div className="absolute left-1/2 top-0 hidden md:block w-1 h-full bg-gradient-to-b from-slate-300 via-slate-400 to-slate-300 transform -translate-x-1/2 shadow-lg z-20"></div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 0 || isFlipping}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-20 bg-slate-900 text-white rounded-full p-3 shadow-xl transition-all duration-200 z-30 ${
              currentPage === 0 || isFlipping
                ? "opacity-20 cursor-not-allowed"
                : "hover:bg-slate-800 hover:scale-110"
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentPage === services.length - 1 || isFlipping}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-20 bg-slate-900 text-white rounded-full p-3 shadow-xl transition-all duration-200 z-30 ${
              currentPage === services.length - 1 || isFlipping
                ? "opacity-20 cursor-not-allowed"
                : "hover:bg-slate-800 hover:scale-110"
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesBooklet;
