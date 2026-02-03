import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, LayoutDashboard, Users, BarChart2, Clock, Kanban, Workflow, Target, Zap, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import agileHero from "@/assets/agile-hero.jpg";

const Agile = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-b from-black to-gray-900">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px] animate-blob" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] animate-blob animation-delay-4000" />
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-muted-foreground">In-House Product • Live & Active</span>
              </div>
              
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="gradient-text text-shadow-glow">Agile</span>
                <span className="block text-white mt-2">Project Management</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
                A comprehensive agile project management platform designed to help teams 
                plan, track, and deliver projects with precision and speed.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 mb-10">
                {[
                  { value: "500+", label: "Daily Users" },
                  { value: "99.9%", label: "Uptime" },
                  { value: "10K+", label: "Tasks Managed" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="https://cybaemtech.in/Agile" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30">
                    Launch Agile Platform
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
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Sprint Goal</div>
                    <div className="text-xs text-muted-foreground">85% Complete</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 glass-card p-4 rounded-2xl animate-float z-20" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Velocity</div>
                    <div className="text-xs text-muted-foreground">+23% this sprint</div>
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20">
                <img 
                  src={agileHero} 
                  alt="Agile Project Management Dashboard"
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                 */}
                {/* Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-800 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-gray-900" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-300">Team active now</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary">
                        <Star className="w-4 h-4 fill-primary" />
                        <span className="text-sm font-medium text-white">4.9</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Glow Effects */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary to-accent rounded-full blur-[60px] opacity-40" />
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary rounded-full blur-[50px] opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-8 border-y border-gray-800 bg-gray-900 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 mx-12">
              {["Sprint Planning", "Kanban Boards", "Backlog Management", "Team Velocity", "Burndown Charts", "Real-time Sync"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-gray-400">
                  <ChevronRight className="w-4 h-4 text-primary" />
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
              <span className="text-white">Powerful </span>
              <span className="text-primary">Features</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Everything you need to manage agile projects effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Kanban, title: "Kanban Boards", desc: "Visual workflow management with drag-and-drop cards and customizable columns", color: "primary" },
              { icon: LayoutDashboard, title: "Sprint Planning", desc: "Plan and track sprints with velocity metrics and capacity planning", color: "accent" },
              { icon: Users, title: "Team Collaboration", desc: "Real-time updates, comments, and team communication built-in", color: "primary" },
              { icon: BarChart2, title: "Burndown Charts", desc: "Track progress with insightful analytics and visual reports", color: "accent" },
              { icon: Clock, title: "Time Tracking", desc: "Log hours, monitor productivity, and track billable time", color: "primary" },
              { icon: Workflow, title: "Custom Workflows", desc: "Design workflows that match your unique team process", color: "accent" },
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

      {/* Interactive Showcase */}
      <section className="py-16 md:py-20 bg-black relative overflow-hidden z-10">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                <span className="text-white">Why Teams Love </span>
                <span className="text-primary">Agile</span>
              </h2>
              <div className="w-20 h-1 bg-primary mb-6"></div>
              
              <div className="space-y-4">
                {[
                  { title: "Intuitive Interface", desc: "Drag-and-drop simplicity that anyone can master in minutes" },
                  { title: "Real-time Collaboration", desc: "See changes instantly as your team works together" },
                  { title: "Powerful Analytics", desc: "Data-driven insights to optimize team performance" },
                  { title: "Customizable Workflows", desc: "Adapt the tool to match your unique process" },
                  { title: "Mobile Ready", desc: "Access your projects anywhere, anytime" },
                  { title: "Enterprise Security", desc: "Bank-grade encryption keeps your data safe" },
                ].map((benefit, index) => (
                  <div 
                    key={benefit.title} 
                    className="bg-gray-900/50 border border-gray-800 hover:border-primary/50 transition-all duration-300 group rounded-2xl p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{benefit.title}</h4>
                        <p className="text-sm text-gray-400">{benefit.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "3x", label: "Faster Delivery", color: "primary" },
                  { value: "45%", label: "More Efficient", color: "accent" },
                  { value: "99.9%", label: "Uptime SLA", color: "accent" },
                  { value: "24/7", label: "Support", color: "primary" },
                ].map((stat, index) => (
                  <div 
                    key={stat.label}
                    className="bg-gray-900/50 border border-gray-800 hover:border-primary/50 transition-all duration-300 group rounded-2xl p-8 text-center"
                  >
                    <div className="font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gray-900 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-800/50 border border-gray-700 hover:border-primary/30 transition-all duration-300 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Ready to Transform Your Workflow?
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto">
              Join hundreds of teams already using Agile to deliver projects faster and more efficiently.
            </p>
            <a href="https://cybaemtech.in/Agile" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30">
                Launch Agile Platform
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 border-t border-gray-800 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              <span className="text-white">What Teams Are </span>
              <span className="text-primary">Saying</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                name: "Sarah Chen", 
                role: "Engineering Lead", 
                quote: "Agile transformed how our team manages projects. Sprints are now 40% faster." 
              },
              { 
                name: "Marcus Johnson", 
                role: "Product Manager", 
                quote: "The intuitive dashboard gives us complete visibility into our backlog and velocity." 
              },
              { 
                name: "Elena Rodriguez", 
                role: "Scrum Master", 
                quote: "Our retrospectives are now data-driven. The analytics are incredibly valuable." 
              }
            ].map((testimonial, idx) => (
              <div key={testimonial.name} className="bg-gray-900/50 border border-gray-800 hover:border-primary/50 transition-all duration-300 group rounded-2xl p-8">
                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  );
};

export default Agile;