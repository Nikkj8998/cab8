import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, LayoutDashboard, Users, BarChart2, Clock, Kanban, Workflow, Target, Zap, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import cybaemLogo from "@/assets/cybaem-logo.png";
import agileHero from "@/assets/agile-hero.jpg";

const Agile = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={cybaemLogo} alt="Cybaem Tech" className="h-16 w-auto transition-transform duration-300 group-hover:scale-105" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Link to="/itsm_app">
              <Button variant="hero-outline" size="sm">View ITSM</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 mesh-gradient">
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
                <span className="block text-foreground mt-2">Project Management</span>
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
                  <Button variant="hero" size="lg" className="group">
                    Launch Agile Platform
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </a>
                <a href="#features">
                  <Button variant="hero-outline" size="lg">
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
              <div className="relative rounded-3xl overflow-hidden border border-border/50 shadow-2xl">
                <img 
                  src={agileHero} 
                  alt="Agile Platform Dashboard"
                  className="w-full h-auto transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                
                {/* Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-card p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-card" />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">Team active now</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary">
                        <Star className="w-4 h-4 fill-primary" />
                        <span className="text-sm font-medium">4.9</span>
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
      <section className="py-8 border-y border-border/50 bg-card/50 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 mx-12">
              {["Sprint Planning", "Kanban Boards", "Backlog Management", "Team Velocity", "Burndown Charts", "Real-time Sync"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-muted-foreground">
                  <ChevronRight className="w-4 h-4 text-primary" />
                  <span className="text-lg font-medium">{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent_70%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm text-primary">Core Features</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Powerful <span className="gradient-text">Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                className={`glass-card-hover p-8 group relative overflow-hidden animate-bounce-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Hover Glow */}
                <div className={`absolute inset-0 bg-${feature.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${feature.color}/20 to-${feature.color}/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}`} />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                
                {/* Arrow on hover */}
                <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Showcase */}
      <section className="py-32 mesh-gradient relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <span className="text-sm text-accent">Why Choose Agile</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
                Why Teams Love <span className="gradient-text">Agile</span>
              </h2>
              
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
                    className="glass-card p-5 group hover:border-primary/30 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors duration-300">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.desc}</p>
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
                    className="glass-card-hover p-8 text-center group animate-bounce-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`font-display text-4xl md:text-5xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300`}>
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Ready to <span className="gradient-text">Transform</span> Your Workflow?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join hundreds of teams already using Agile to deliver projects faster and more efficiently.
            </p>
            <a href="https://cybaemtech.in/Agile" target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="xl" className="group">
                Launch Agile Platform
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              What Teams Are <span className="gradient-text">Saying</span>
            </h2>
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
              <div key={testimonial.name} className={`glass-card p-8 hover:border-primary/30 transition-all duration-300 animate-slide-in-right`} style={{ animationDelay: `${idx * 150}ms` }}>
                <p className="text-foreground mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <img src={cybaemLogo} alt="Cybaem Tech" className="h-20 w-auto" />
              <div>
                <p className="text-sm font-medium">CybaemTech</p>
                <p className="text-xs text-muted-foreground">Agile Project Management</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors duration-300">Home</Link>
              <Link to="/itsm_app" className="text-muted-foreground hover:text-primary transition-colors duration-300">ITSM</Link>
              <a href="https://www.cybaemtech.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">cybaemtech.com</a>
            </div>
          </div>
          <div className="pt-8 border-t border-border/30 text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} CybaemTech. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Agile;