import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  MapPin,
  Users,
  Utensils,
  Heart,
  Phone,
  Mail,
  Menu,
  X,
  Globe,
  LogIn,
  UserPlus,
  Send,
  Award,
  Sparkles,
  Star,
  ChefHat,
  Coffee,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const colorStyles = {
  amber: {
    border: "border-amber-200/50 hover:border-amber-300",
    text: "text-amber-600",
  },
  green: {
    border: "border-green-200/50 hover:border-green-300",
    text: "text-green-600",
  },
  red: {
    border: "border-red-200/50 hover:border-red-300",
    text: "text-red-600",
  },
};

const FoodRescueNetwork = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [venueFormOpen, setVenueFormOpen] = useState(false);
  const [ngoFormOpen, setNgoFormOpen] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(
    new Set()
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      const sections = ["home", "register", "articles", "map", "contact"];
      let currentSection = "home";
      for (const id of sections) {
        const section = document.getElementById(id);
        if (
          section &&
          section.getBoundingClientRect().top < window.innerHeight / 2
        ) {
          currentSection = id;
        }
      }
      setActiveSection(currentSection);
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id =
              entry.target.id || entry.target.getAttribute("data-animate");
            if (id) {
              setVisibleElements((prev) => new Set(prev).add(id));
              observerRef.current?.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll("[data-animate]");
    animatedElements.forEach((el) => observerRef.current?.observe(el));

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observerRef.current?.disconnect();
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 120;
      const targetPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const FloatingFoodIcons = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[
        { icon: <Coffee className="w-4 h-4" />, delay: 0, duration: 15 },
        { icon: <ChefHat className="w-3 h-3" />, delay: 3, duration: 18 },
        { icon: <Utensils className="w-3 h-3" />, delay: 6, duration: 20 },
        { icon: <Star className="w-2 h-2" />, delay: 9, duration: 12 },
        { icon: <Sparkles className="w-3 h-3" />, delay: 12, duration: 16 },
      ].map((item, i) => (
        <div
          key={i}
          className="absolute text-amber-400/20 animate-float-slow"
          style={{
            left: `${10 + i * 18}%`,
            top: `${20 + Math.sin(i) * 30}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );

  type ElegantOrbProps = {
    className?: string;
    gradient: string;
    delay?: number;
  };

  const ElegantOrb = ({
    className = "",
    gradient,
    delay = 0,
  }: ElegantOrbProps) => (
    <div
      className={`absolute rounded-full opacity-10 blur-3xl animate-pulse-slow ${className}`}
      style={{
        background: gradient,
        animationDelay: `${delay}s`,
        animationDuration: "8s",
      }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 text-slate-800 overflow-x-hidden">
      {/* Elegant Top Bar */}
      <div className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-amber-200/50 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <button className="flex items-center space-x-2 text-amber-700 hover:text-amber-800 transition-all duration-300 text-sm font-medium">
                <Globe className="w-4 h-4" />
                <span>Language</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-amber-100 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-amber-50 rounded-lg text-sm transition-colors"
                >
                  हिन्दी
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-amber-50 rounded-lg text-sm transition-colors"
                >
                  English
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <button className="flex items-center space-x-2 text-amber-700 hover:text-amber-800 transition-all duration-300 text-sm font-medium">
                <LogIn className="w-4 h-4" />
                <span>Account</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full right-0 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-amber-100 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-amber-50 rounded-lg text-sm transition-colors flex items-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-amber-50 rounded-lg text-sm transition-colors flex items-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Header */}
      <header
        className={`fixed top-12 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl shadow-xl border-b border-amber-200/50"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-xl">
                <ChefHat className="w-7 h-7 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full animate-ping opacity-20" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent tracking-tight">
                Food Rescue Network
              </h1>
              <p className="text-xs text-amber-600 font-medium tracking-wider uppercase">
                Nourishing Communities
              </p>
            </div>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-12">
            {["home", "register", "articles", "map", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize font-semibold transition-all duration-300 relative group text-sm tracking-wide ${
                  activeSection === item
                    ? "text-amber-700"
                    : "text-slate-700 hover:text-amber-700"
                }`}
              >
                {item === "home"
                  ? "Home"
                  : item === "register"
                  ? "Join Network"
                  : item}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-300 ${
                    activeSection === item ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
                <div
                  className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full transition-all duration-300 ${
                    activeSection === item
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-0"
                  }`}
                />
              </button>
            ))}
          </nav>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 hover:bg-amber-50 rounded-xl transition-all duration-300 border border-amber-200"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-amber-700" />
            ) : (
              <Menu className="w-6 h-6 text-amber-700" />
            )}
          </button>
        </div>
        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-500 overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-xl border-t border-amber-200/50 shadow-inner">
            {["home", "register", "articles", "map", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-6 py-4 capitalize hover:bg-amber-50 transition-all duration-300 font-medium text-slate-700 hover:text-amber-700 border-b border-amber-100/50 last:border-0"
              >
                {item === "home"
                  ? "Home"
                  : item === "register"
                  ? "Join Network"
                  : item}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center pt-32"
        >
          <FloatingFoodIcons />
          <ElegantOrb
            className="w-96 h-96 top-20 left-20"
            gradient="linear-gradient(135deg, #f59e0b, #d97706)"
            delay={0}
          />
          <ElegantOrb
            className="w-80 h-80 bottom-40 right-20"
            gradient="linear-gradient(135deg, #10b981, #059669)"
            delay={2}
          />
          <ElegantOrb
            className="w-72 h-72 top-60 right-40"
            gradient="linear-gradient(135deg, #ef4444, #dc2626)"
            delay={4}
          />

          <div className="container mx-auto px-6 text-center relative z-10">
            <div
              data-animate="hero"
              className={`transition-all duration-1000 ${
                visibleElements.has("hero")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="inline-block mb-6">
                <div className="bg-amber-100 border border-amber-200 rounded-full px-6 py-2 mb-8">
                  <p className="text-amber-700 font-medium text-sm tracking-wide flex items-center justify-center space-x-2">
                    <Award className="w-4 h-4" />
                    <span>Connecting Communities Since 2024</span>
                  </p>
                </div>
              </div>

              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent leading-tight">
                Food Rescue
                <br />
                <span className="text-4xl md:text-6xl lg:text-7xl font-light">
                  Network
                </span>
              </h2>

              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed font-light">
                  Bridging the gap between abundance and need. We orchestrate
                  seamless connections between wedding venues and NGOs,
                  transforming surplus into sustenance for communities and
                  wildlife.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-amber-200 shadow-sm">
                    <span className="text-amber-700 font-semibold text-sm">
                      Zero Waste Initiative
                    </span>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-green-200 shadow-sm">
                    <span className="text-green-700 font-semibold text-sm">
                      Community Impact
                    </span>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-red-200 shadow-sm">
                    <span className="text-red-700 font-semibold text-sm">
                      Sustainable Future
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mt-16">
                  {[
                    {
                      icon: <Users className="w-8 h-8" />,
                      title: "Community Bridge",
                      description:
                        "Connecting venues with NGOs through intelligent matching",
                      color: "amber",
                      delay: "0s",
                    },
                    {
                      icon: <ChefHat className="w-8 h-8" />,
                      title: "Culinary Conservation",
                      description:
                        "Preserving the value of excess through redistribution",
                      color: "green",
                      delay: "0.2s",
                    },
                    {
                      icon: <Heart className="w-8 h-8" />,
                      title: "Compassionate Impact",
                      description:
                        "Nourishing both human communities and wildlife",
                      color: "red",
                      delay: "0.4s",
                    },
                  ].map((card, index) => (
                    <div
                      key={index}
                      className={`group bg-white/70 backdrop-blur-sm rounded-2xl p-8 border ${
                        colorStyles[card.color as keyof typeof colorStyles]
                          ?.border
                      } transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl`}
                      style={{ animationDelay: `${card.delay || 0}s` }} // Ensure it's a valid string
                    >
                      <div
                        className={`${
                          colorStyles[card.color as keyof typeof colorStyles]
                            ?.text
                        } mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {card.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-slate-800">
                        {card.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed font-light">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => scrollToSection("register")}
                  className="group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Join Our Network</span>
                    <ChevronDown className="w-5 h-5 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button
                  onClick={() => scrollToSection("articles")}
                  className="group bg-white/80 hover:bg-white text-slate-700 hover:text-slate-800 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-amber-200 hover:border-amber-300"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Learn More</span>
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Register Section */}
        <section
          id="register"
          className="py-24 relative bg-gradient-to-b from-white to-amber-50"
        >
          <FloatingFoodIcons />
          <div className="container mx-auto px-6">
            <div
              data-animate="register-title"
              className={`text-center mb-20 transition-all duration-1000 ${
                visibleElements.has("register-title")
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-12"
              }`}
            >
              <div className="inline-block mb-6">
                <div className="bg-amber-100 border border-amber-200 rounded-full px-6 py-2">
                  <p className="text-amber-700 font-medium text-sm tracking-wide">
                    Join Our Mission
                  </p>
                </div>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent">
                Become a Partner
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
                Whether you're a venue with surplus or an organization in need,
                join our network to make a meaningful impact in your community.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {/* Wedding Venues Registration */}
              <div
                data-animate="venue-form"
                className={`bg-white/80 backdrop-blur-sm rounded-3xl border border-amber-200/50 overflow-hidden shadow-xl transition-all duration-1000 ${
                  visibleElements.has("venue-form")
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-12"
                }`}
              >
                <div
                  className="p-8 cursor-pointer hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-500 border-b border-amber-100"
                  onClick={() => setVenueFormOpen(!venueFormOpen)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                        <ChefHat className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800">
                          Wedding Venues
                        </h3>
                        <p className="text-amber-600 font-medium text-sm">
                          Share Your Surplus
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-amber-600 transition-transform duration-500 ${
                        venueFormOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Transform your event surplus into community nourishment
                    through our trusted network of NGOs.
                  </p>
                </div>

                <div
                  className={`transition-all duration-700 overflow-hidden ${
                    venueFormOpen
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <form className="p-8 space-y-6 bg-gradient-to-b from-white to-amber-50/30">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Venue Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-white/80 border border-amber-200 rounded-xl px-4 py-3 text-slate-800 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                          placeholder="Grand Palace Events"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          className="w-full bg-white/80 border border-amber-200 rounded-xl px-4 py-3 text-slate-800 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Complete Address
                      </label>
                      <input
                        type="text"
                        className="w-full bg-white/80 border border-amber-200 rounded-xl px-4 py-3 text-slate-800 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                        placeholder="123 Main Street, City, State, Pincode"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        className="w-full bg-white/80 border border-amber-200 rounded-xl px-4 py-3 text-slate-800 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                        placeholder="contact@grandpalace.com"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Cuisine Type
                        </label>
                        <select className="w-full bg-white/80 border border-amber-200 rounded-xl px-4 py-3 text-slate-800 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all duration-300">
                          <option>Vegetarian Only</option>
                          <option>Non-Vegetarian Only</option>
                          <option>Mixed Cuisine</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Pickup Service
                        </label>
                        <select className="w-full bg-white/80 border border-amber-200 rounded-xl px-4 py-3 text-slate-800 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all duration-300">
                          <option>Pickup Required</option>
                          <option>We Can Deliver</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    >
                      Register as Venue Partner
                    </button>
                  </form>
                </div>
              </div>

              {/* NGO Registration */}
              <div
                data-animate="ngo-form"
                className={`bg-white/80 backdrop-blur-sm rounded-3xl border border-green-200/50 overflow-hidden shadow-xl transition-all duration-1000 ${
                  visibleElements.has("ngo-form")
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-12"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                <div
                  className="p-8 cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-500 border-b border-green-100"
                  onClick={() => setNgoFormOpen(!ngoFormOpen)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800">
                          NGO Registration
                        </h3>
                        <p className="text-green-600 font-medium text-sm">
                          Receive Donations
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-green-600 transition-transform duration-500 ${
                        ngoFormOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Join our network to receive regular food donations and make
                    a direct impact in your community.
                  </p>
                </div>

                <div
                  className={`transition-all duration-700 overflow-hidden ${
                    ngoFormOpen
                      ? "max-h-[1200px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <form className="p-8 space-y-6 bg-gradient-to-b from-white to-green-50/30">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Organization Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-white/80 border border-green-200 rounded-xl px-4 py-3 text-slate-800 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-300"
                          placeholder="Hope Foundation"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          className="w-full bg-white/80 border border-green-200 rounded-xl px-4 py-3 text-slate-800 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-300"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Complete Address
                      </label>
                      <input
                        type="text"
                        className="w-full bg-white/80 border border-green-200 rounded-xl px-4 py-3 text-slate-800 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-300"
                        placeholder="456 Service Road, City, State, Pincode"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Official Email
                      </label>
                      <input
                        type="email"
                        className="w-full bg-white/80 border border-green-200 rounded-xl px-4 py-3 text-slate-800 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-300"
                        placeholder="contact@hopefoundation.org"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Services & Community Focus
                      </label>
                      <textarea
                        rows={4}
                        className="w-full bg-white/80 border border-green-200 rounded-xl px-4 py-3 text-slate-800 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-300 resize-none"
                        placeholder="Describe your organization's mission, target communities, and how you distribute food..."
                      ></textarea>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Number of People Served
                        </label>
                        <input
                          type="number"
                          className="w-full bg-white/80 border border-green-200 rounded-xl px-4 py-3 text-slate-800 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-300"
                          placeholder="e.g., 150"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Preferred Cuisine Type
                        </label>
                        <select className="w-full bg-white/80 border border-green-200 rounded-xl px-4 py-3 text-slate-800 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-300">
                          <option>Vegetarian Only</option>
                          <option>Non-Vegetarian Only</option>
                          <option>Any</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    >
                      Register as NGO Partner
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- NEW: Articles Section --- */}
        <section id="articles" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div
              data-animate="articles-title"
              className={`text-center mb-20 transition-all duration-1000 ${
                visibleElements.has("articles-title")
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-12"
              }`}
            >
              <div className="inline-block mb-6">
                <div className="bg-blue-100 border border-blue-200 rounded-full px-6 py-2">
                  <p className="text-blue-700 font-medium text-sm tracking-wide">
                    Insights & Stories
                  </p>
                </div>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                From the Network
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
                Explore stories of impact, learn about sustainable practices,
                and get inspired by our community.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  title:
                    "The Journey of a Meal: From Wedding Hall to Warm Hands",
                  category: "Community",
                  image:
                    "https://placehold.co/600x400/a78bfa/ffffff?text=Impact+Story",
                  delay: "0s",
                },
                {
                  title:
                    "5 Ways Our Partners are Championing Zero-Waste Events",
                  category: "Sustainability",
                  image:
                    "https://placehold.co/600x400/34d399/ffffff?text=Eco-Tips",
                  delay: "0.2s",
                },
                {
                  title: "Tech for Good: How We Optimize Food Rescue Logistics",
                  category: "Innovation",
                  image:
                    "https://placehold.co/600x400/fb923c/ffffff?text=Tech+Insight",
                  delay: "0.4s",
                },
              ].map((article, index) => (
                <div
                  key={index}
                  data-animate={`article-${index}`}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden group transition-all duration-500 hover:-translate-y-2 ${
                    visibleElements.has(`article-${index}`)
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform translate-y-12"
                  }`}
                  style={{ animationDelay: article.delay }}
                >
                  <div className="overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-semibold text-blue-600 mb-2">
                      {article.category}
                    </p>
                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-slate-600 font-light mb-4">
                      A brief and engaging summary of the article goes here,
                      inviting the user to read more.
                    </p>
                    <a
                      href="#"
                      className="font-bold text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      Read More &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- NEW: Map Section --- */}
        <section
          id="map"
          className="py-24 bg-gradient-to-b from-amber-50 to-orange-100/50 relative overflow-hidden"
        >
          <ElegantOrb
            className="w-96 h-96 -top-20 -left-40"
            gradient="linear-gradient(135deg, #60a5fa, #3b82f6)"
            delay={0}
          />
          <ElegantOrb
            className="w-80 h-80 -bottom-40 -right-40"
            gradient="linear-gradient(135deg, #34d399, #059669)"
            delay={1}
          />
          <div className="container mx-auto px-6 relative z-10">
            <div
              data-animate="map-title"
              className={`text-center mb-20 transition-all duration-1000 ${
                visibleElements.has("map-title")
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-12"
              }`}
            >
              <div className="inline-block mb-6">
                <div className="bg-green-100 border border-green-200 rounded-full px-6 py-2">
                  <p className="text-green-700 font-medium text-sm tracking-wide">
                    Our Growing Reach
                  </p>
                </div>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                Connecting India, One Meal at a Time
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
                Our network is expanding daily. Find partners and see our
                collective impact across the nation.
              </p>
            </div>
            <div
              data-animate="map-content"
              className={`bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-amber-200/50 transition-all duration-1000 delay-200 ${
                visibleElements.has("map-content")
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90"
              }`}
            >
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2 relative h-96 lg:h-[500px] bg-slate-100 rounded-2xl p-4">
                  {/* Placeholder for an interactive map - using a static SVG for now */}
                  <svg
                    viewBox="0 0 512 512"
                    className="w-full h-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M339.2,347.1c-4.4-1.6-9.1-2.4-13.9-2.4c-14.6,0-28.2,7.2-36.4,19.2c-6.1,8.9-8.3,19.6-6.6,29.9c1.7,10.3,7.4,19.6,15.9,26.1c11.9,9.1,27.3,11.8,41.9,7.1c14.6-4.7,25.9-16.8,29.8-31.4c3.9-14.6,0.9-30.2-7.9-42.3C353.3,350.2,346.5,347.1,339.2,347.1z M214.6,268.3c-13.9-13.9-13.9-36.4,0-50.3s36.4-13.9,50.3,0c13.9,13.9,13.9,36.4,0,50.3S228.5,282.2,214.6,268.3z M463.3,160H290.5l-26.6-43.1c-4.2-6.8-11.7-10.9-19.9-10.9H104c-17.7,0-32,14.3-32,32v304c0,17.7,14.3,32,32,32h360c17.7,0,32-14.3,32-32V192C496,174.3,481.7,160,463.3,160z"
                      fill="#d1d5db"
                    />
                    <circle
                      cx="260"
                      cy="380"
                      r="10"
                      fill="#f59e0b"
                      className="animate-pulse"
                      style={{ animationDelay: "0s" }}
                    >
                      <title>Bhubaneswar, Odisha</title>
                    </circle>
                    <circle
                      cx="230"
                      cy="180"
                      r="8"
                      fill="#ef4444"
                      className="animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <title>Delhi</title>
                    </circle>
                    <circle
                      cx="180"
                      cy="260"
                      r="8"
                      fill="#10b981"
                      className="animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    >
                      <title>Mumbai, Maharashtra</title>
                    </circle>
                    <circle
                      cx="280"
                      cy="320"
                      r="8"
                      fill="#3b82f6"
                      className="animate-pulse"
                      style={{ animationDelay: "0.6s" }}
                    >
                      <title>Bengaluru, Karnataka</title>
                    </circle>
                  </svg>
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-md">
                    <p className="font-bold text-amber-700 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" /> Bhubaneswar, Odisha
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800">
                    Our Impact at a Glance
                  </h3>
                  {[
                    {
                      icon: <ChefHat className="w-8 h-8 text-amber-600" />,
                      value: "50+",
                      label: "Venue Partners",
                    },
                    {
                      icon: <Heart className="w-8 h-8 text-green-600" />,
                      value: "120+",
                      label: "NGO Affiliates",
                    },
                    {
                      icon: <Utensils className="w-8 h-8 text-red-600" />,
                      value: "25,000+",
                      label: "Meals Rescued",
                    },
                    {
                      icon: <Globe className="w-8 h-8 text-blue-600" />,
                      value: "15+",
                      label: "Cities Served",
                    },
                  ].map((stat, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="p-3 bg-slate-100 rounded-full">
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-slate-800">
                          {stat.value}
                        </p>
                        <p className="text-slate-600">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- NEW: Contact Section / Footer --- */}
      <footer id="contact" className="bg-slate-800 text-slate-300 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div
            data-animate="contact-title"
            className={`text-center mb-20 transition-all duration-1000 ${
              visibleElements.has("contact-title")
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-12"
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
              Have questions, suggestions, or want to collaborate? We'd love to
              hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div
              data-animate="contact-form"
              className={`transition-all duration-1000 ${
                visibleElements.has("contact-form")
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform -translate-x-12"
              }`}
            >
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-slate-400 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-400 mb-2"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-slate-400 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-400 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-amber-500/20 flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span> <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
            <div
              data-animate="contact-info"
              className={`space-y-8 transition-all duration-1000 delay-200 ${
                visibleElements.has("contact-info")
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform translate-x-12"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="p-4 bg-slate-700/50 rounded-xl">
                  <MapPin className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Our Headquarters
                  </h3>
                  <p className="text-slate-400">
                    Infocity, Patia, Bhubaneswar,
                    <br />
                    Odisha, 751024, India
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-4 bg-slate-700/50 rounded-xl">
                  <Phone className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Phone Support
                  </h3>
                  <p className="text-slate-400">+91 (123) 456-7890</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-4 bg-slate-700/50 rounded-xl">
                  <Mail className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Email Us</h3>
                  <p className="text-slate-400">connect@foodrescuenet.org</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {[Facebook, Twitter, Instagram, Linkedin].map(
                    (Icon, index) => (
                      <a
                        key={index}
                        href="#"
                        className="p-3 bg-slate-700/50 hover:bg-amber-500 rounded-full text-slate-300 hover:text-white transition-all duration-300"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 border-t border-slate-700 pt-8 text-center text-slate-400">
            <p>
              &copy; {new Date().getFullYear()} Food Rescue Network. All Rights
              Reserved. A not-for-profit initiative.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FoodRescueNetwork;
