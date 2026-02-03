import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Gauge, Users, BarChart3, Settings, Rocket, TrendingUp, Award, Sparkles, CheckCircle2, Database, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import digitalTransformationHero from "@/assets/digital-transformation-hero.jpg";
import enterpriseSolutionsHero from "@/assets/enterprise-solutions-hero.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-black to-gray-900">
        {/* Advanced Animated Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Multiple animated gradient orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-purple-600/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
            <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-t from-blue-500/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
            <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-purple-500/15 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '0.5s' }} />
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
          </div>
        </div>

        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-800/80 shadow-lg border border-blue-500/30 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm font-medium text-gray-200">Powering Enterprise Solutions</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-up text-white" style={{ animationDelay: "100ms" }}>
              Enterprise Tools
              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mt-2">Built In-House</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 animate-fade-up" style={{ animationDelay: "200ms" }}>
              Streamline your operations with our powerful Agile Project Management 
              and IT Service Management solutions—crafted by CybaemTech for excellence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "300ms" }}>
              <Link to="/agile">
                <Button variant="default" size="lg" className="group bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all">
                  Explore Agile
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/itsm">
                <Button variant="outline" size="lg" className="group border-primary text-primary hover:bg-primary hover:text-white transition-all">
                  Discover ITSM
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              {/* <Link to="/backend">
                <Button variant="outline" size="lg" className="group border-accent text-accent hover:bg-accent hover:text-white transition-all">
                  View Backend
                  <Server className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link> */}
            </div>
            
            {/* Explore Products Link */}
            <div className="mt-8 animate-fade-up" style={{ animationDelay: "400ms" }}>
              <a 
                href="https://www.cybaemtech.com/software-development" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="group">
                  Explore our products and services
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-32 relative bg-gradient-to-b from-gray-900 to-black z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              <span className="text-white">Our </span>
              <span className="text-primary">Products</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Two powerful solutions designed to transform how your organization operates
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Agile Card */}
            <Link to="/agile" className="group">
              <div className="overflow-hidden h-full bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:transform hover:scale-105">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={digitalTransformationHero} 
                    alt="Agile Project Management" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm backdrop-blur-sm">
                      <Zap className="w-4 h-4" />
                      Live & Active
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-display text-3xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                    Agile Software
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Comprehensive agile project management with sprint planning, kanban boards, 
                    backlog management, and real-time collaboration tools for modern development teams.
                  </p>
                  <div className="flex items-center gap-2 text-blue-400 font-medium">
                    Access Platform
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </Link>

            {/* ITSM Card */}
            <Link to="/itsm" className="group">
              <div className="overflow-hidden h-full bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:transform hover:scale-105">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={enterpriseSolutionsHero} 
                    alt="ITSM Software" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-sm backdrop-blur-sm">
                      <Shield className="w-4 h-4" />
                      Enterprise Ready
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-display text-3xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors duration-300">
                    ITSM Software
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Complete IT service management solution with incident tracking, service desk, 
                    asset management, and workflow automation for seamless IT operations.
                  </p>
                  <div className="flex items-center gap-2 text-purple-400 font-medium">
                    Access Platform
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Backend Card */}
            <div className="group">
              <div className="overflow-hidden h-full bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:transform hover:scale-105">
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-green-600/10 via-green-500/5 to-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Database className="w-32 h-32 text-green-500/30 group-hover:text-green-500/50 transition-colors duration-500" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-sm backdrop-blur-sm">
                      <Server className="w-4 h-4" />
                      Coming Soon
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-display text-3xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors duration-300">
                    Backend System
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Robust backend infrastructure with scalable APIs, database management, 
                    authentication systems, and powerful server-side processing capabilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 bg-black relative z-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              <span className="text-white">Why Choose </span>
              <span className="text-primary">CybaemTech</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Built with enterprise needs in mind, our solutions deliver exceptional performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Gauge, title: "High Performance", desc: "Lightning-fast response times with optimized architecture for enterprise scale" },
              { icon: Shield, title: "Enterprise Security", desc: "Bank-grade security with role-based access control and data encryption" },
              { icon: Users, title: "Team Collaboration", desc: "Real-time collaboration features that keep your teams synchronized" },
              { icon: BarChart3, title: "Advanced Analytics", desc: "Comprehensive dashboards and reports for data-driven decisions" },
              { icon: Settings, title: "Highly Customizable", desc: "Flexible workflows and configurations to match your processes" },
              { icon: Zap, title: "Seamless Integration", desc: "Connect with your existing tools and automate workflows effortlessly" },
            ].map((feature, index) => (
              <div 
                key={feature.title} 
                className={`bg-gray-900/50 border border-gray-800 hover:border-primary/50 transition-all duration-300 group rounded-2xl p-8`}
                style={{ animationDelay: `${index * 100}ms` }}
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

      {/* Stats Section */}
      <section className="py-20 border-y border-gray-800 bg-gradient-to-b from-black to-gray-900 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { value: "99.9%", label: "Uptime" },
              { value: "500+", label: "Daily Users" },
              { value: "10K+", label: "Tasks Managed" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label} className="group">
                <div className="font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-20 bg-gray-900 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white">
              <span className="text-white">Built by </span>
              <span className="text-primary">CybaemTech</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              At CybaemTech, we believe in building tools that solve real problems. Our Agile and ITSM 
              platforms are born from our own operational needs—refined through daily use and 
              continuously improved based on real-world feedback.
            </p>
            <p className="text-gray-300 leading-relaxed">
              These aren't just products we sell—they're the same tools we rely on every day to 
              manage our projects and IT services. This commitment to using what we build ensures 
              quality, reliability, and constant innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-20 border-y border-gray-800 bg-black relative z-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              <span className="text-white">Trusted by </span>
              <span className="text-primary">Enterprise Teams</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Award, title: "Industry Leading", desc: "Recognized for excellence and innovation in enterprise software" },
              { icon: TrendingUp, title: "Proven ROI", desc: "Customers report 40% efficiency gains within first quarter" },
              { icon: Sparkles, title: "Continuous Innovation", desc: "Regular updates and new features based on user feedback" }
            ].map((item) => (
              <div key={item.title} className="bg-gray-900/50 border border-gray-800 hover:border-primary/50 transition-all duration-300 group rounded-2xl p-8">
                <div className="mb-4">
                  <div className="p-3 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors w-fit">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gray-900 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-800/50 border border-gray-700 hover:border-primary/30 transition-all duration-300 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Transform Your Operations Today
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto">
                Choose the platform that fits your needs and start seeing results immediately
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/agile">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30">
                    Try Agile Platform
                  </Button>
                </Link>
                <Link to="/itsm">
                  <Button size="lg"  className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30">
                    Try ITSM Platform
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  );
};

export default Index;
