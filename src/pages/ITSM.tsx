import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Headphones, Database, AlertTriangle, FileText, Network, Settings2, Zap, Clock, BarChart3, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import itsmHero from "@/assets/itsm-hero.jpg";

const ITSM = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center pt-20 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm text-muted-foreground">In-House Product • Live</span>
              </div>
              
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="gradient-text">ITSM</span>
                <span className="block text-white">Software</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                A complete IT Service Management solution for handling incidents, 
                managing assets, and streamlining your IT operations with ease.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 mb-10">
                {[
                  { value: "500+", label: "Organizations" },
                  { value: "99.9%", label: "Uptime" },
                  { value: "100K+", label: "Tickets Resolved" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="https://cybaemtech.in/itsm_app" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30">
                    Launch ITSM Platform
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <a href="#features">
                  <Button variant="outline" size="lg" className="border-2 border-gray-700 hover:border-primary text-blue font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105">
                    Explore Features
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative animate-fade-up" style={{ animationDelay: "200ms" }}>
              {/* Floating Cards */}
              <div className="absolute -top-8 -left-8 glass-card p-4 rounded-2xl animate-float z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Incidents Resolved</div>
                    <div className="text-xs text-muted-foreground">98% SLA Met</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 glass-card p-4 rounded-2xl animate-float z-20" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Response Time</div>
                    <div className="text-xs text-muted-foreground">&lt;5 minutes</div>
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-gradient-to-br from-accent/20 via-accent/10 to-primary/20">
                <img 
                  src={itsmHero} 
                  alt="ITSM Service Management Dashboard"
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" /> */}
                
                {/* Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-800 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-gray-900" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-300">Support team active</span>
                      </div>
                      <div className="flex items-center gap-1 text-accent">
                        <Star className="w-4 h-4 fill-accent" />
                        <span className="text-sm font-medium text-white">4.8</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Glow Effects */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-accent to-primary rounded-full blur-[60px] opacity-40" />
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent rounded-full blur-[50px] opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-8 border-y border-gray-800 bg-gray-900 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 mx-12">
              {["Incident Tracking", "Asset Management", "Change Control", "Service Catalog", "SLA Monitoring", "Knowledge Base"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-gray-400">
                  <ChevronRight className="w-4 h-4 text-accent" />
                  <span className="text-lg font-medium">{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 md:py-20 bg-gradient-to-b from-gray-900 to-black relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              <span className="text-white">Comprehensive </span>
              <span className="text-primary">Features</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Everything you need to manage IT services efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: AlertTriangle, title: "Incident Management", desc: "Track and resolve incidents with automated workflows", color: "accent" },
              { icon: Headphones, title: "Service Desk", desc: "Centralized hub for all IT support requests", color: "primary" },
              { icon: Database, title: "Asset Management", desc: "Complete visibility into your IT assets", color: "accent" },
              { icon: FileText, title: "Knowledge Base", desc: "Self-service portal with searchable articles", color: "primary" },
              { icon: Network, title: "Change Management", desc: "Controlled change implementation processes", color: "accent" },
              { icon: Settings2, title: "Automation", desc: "Automate repetitive tasks and workflows", color: "primary" },
            ].map((feature, index) => (
              <div 
                key={feature.title} 
                className="bg-gray-900/50 border border-gray-800 hover:border-primary/50 transition-all duration-300 group rounded-2xl p-8"
              >
                <div className="mb-4">
                  <div className="p-3 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors w-fit">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 bg-black relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                <span className="text-white">Why IT Teams Love </span>
                <span className="text-primary">ITSM</span>
              </h3>
              <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Streamlined ticket management",
                  "SLA tracking and alerts",
                  "Comprehensive asset tracking",
                  "Customizable dashboards",
                  "Automated escalation rules",
                  "Detailed reporting & analytics",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 border-y border-gray-800 bg-gradient-to-b from-black to-gray-900 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { value: "99.9%", label: "Uptime SLA" },
              { value: "<5min", label: "Response Time" },
              { value: "24/7", label: "Support" },
              { value: "ROI", label: "In 6 Months" },
            ].map((stat, idx) => (
              <div key={stat.label} className={`group animate-bounce-in`} style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              <span className="text-white">Seamless </span>
              <span className="text-primary">Integration</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Connect with your existing tools and create a unified IT ecosystem
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Zap, title: "Real-time Sync", desc: "Live data synchronization across all integrated systems" },
              { icon: Clock, title: "Quick Setup", desc: "Get up and running in hours, not weeks" },
              { icon: BarChart3, title: "Unified Dashboard", desc: "Single pane of glass for your entire IT environment" }
            ].map((item) => (
              <div key={item.title} className="bg-gray-900/50 border border-gray-800 hover:border-primary/50 transition-all duration-300 group rounded-2xl p-8">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 text-center">{item.title}</h3>
                <p className="text-gray-400 text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-black relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-800/50 border border-gray-700 hover:border-primary/30 transition-all duration-300 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Ready to Transform IT Operations?
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto">
                Access the ITSM platform and streamline your IT service management today.
              </p>
              <a href="https://cybaemtech.in/itsm_app" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30">
                  Launch ITSM Platform
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  );
};

export default ITSM;
