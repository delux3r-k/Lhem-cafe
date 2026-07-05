import { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import {
  Coffee,
  Phone,
  MapPin,
  Clock,
  Star,
  UtensilsCrossed,
  Package,
  Bike,
  ChevronDown,
  Menu as MenuIcon,
  X,
  Instagram,
  Facebook,
  Send,
  AlertCircle,
  Sparkles,
  Mail,
  User,
  MessageSquare,
  CheckCircle,
} from 'lucide-react';

// Initialize EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const templateParams = {
        to_email: import.meta.env.VITE_EMAILJS_RECIPIENT_EMAIL,
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-20">
            <a
              href="#"
              className={`transition-colors ${
                isScrolled ? 'text-espresso-800' : 'text-cream-50'
              }`}
            >
              <span className="font-display text-2xl font-bold block">Lhem Café</span>
              <span className="text-xs font-medium opacity-80 block">ልሄም ካፌ</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {['Home', 'About', 'Services', 'Menu', 'Hours'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`font-medium transition-colors ${
                    isScrolled
                      ? 'text-espresso-700 hover:text-espresso-900'
                      : 'text-cream-100 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
              <a
                href="tel:+251930153315"
                className={`btn-primary text-sm ${
                  isScrolled ? '' : 'bg-cream-50 text-espresso-800 hover:bg-white'
                }`}
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-espresso-700' : 'text-cream-50'
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md shadow-xl">
            <div className="py-4 px-4 space-y-2">
              {['Home', 'About', 'Services', 'Menu', 'Hours'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-3 text-espresso-700 hover:bg-cream-100 rounded-lg font-medium"
                >
                  {item}
                </button>
              ))}
              <a
                href="tel:+251930153315"
                className="btn-primary w-full mt-4"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/2608049/pexels-photo-2608049.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Coffee shop interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 section-container text-center px-4">
          <div className="animate-fade-in">
            {/* 5-Star Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-gold-400/30">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-gold-400 fill-gold-400"
                  />
                ))}
              </div>
              <span className="text-cream-100 font-medium">
                Hawassa's Finest
              </span>
            </div>

            {/* Amharic Cafe Name */}
            <div className="mb-4">
              <span className="text-2xl sm:text-3xl font-display text-gold-400 tracking-wide" style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif" }}>
                ልሄም ካፌ እና ሬስቶራንት
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-cream-50 mb-4 leading-tight">
              Where Every Sip
              <br />
              <span className="text-gold-400">Tells a Story</span>
            </h1>

            {/* Amharic Tagline */}
            <p className="text-lg sm:text-xl text-gold-300/80 mb-4 font-medium" style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif" }}>
              የጥራትና የእንግዳ ተቀባይነት መገለጫ
            </p>

            <p className="text-xl sm:text-2xl text-cream-200 max-w-2xl mx-auto mb-8 font-light">
              From rich Ethiopian coffee to hearty traditional dishes, discover
              why locals have made us Hawassa's only 5-star café experience.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="tel:+251930153315"
                className="btn-accent text-lg px-8 py-4"
              >
                <Phone className="w-5 h-5" />
                Call to Order Delivery
              </a>
              <a
                href="https://maps.google.com/?q=Diko+Building+Hawassa+Ethiopia"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-lg px-8 py-4 border-cream-200 text-cream-50 hover:bg-cream-50 hover:text-espresso-800"
              >
                <MapPin className="w-5 h-5" />
                Get Directions
              </a>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-cream-200">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gold-400" />
                <span>Diko Building, 1st Floor</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-cream-400" />
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gold-400" />
                <span>+251 93 015 3315</span>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={() => scrollToSection('about')}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream-200 animate-bounce"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* About & Reputation Section */}
      <section id="about" className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pattern-bg" />
        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="reveal relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Fresh Ethiopian coffee preparation"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-gold-500 text-espresso-900 rounded-2xl p-6 shadow-xl animate-float">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-espresso-800 fill-espresso-800"
                    />
                  ))}
                </div>
                <p className="font-display font-bold text-lg">
                  Perfect Rating
                </p>
                <p className="text-sm opacity-80">From Happy Guests</p>
              </div>
            </div>

            {/* Content */}
            <div className="reveal animate-delay-200">
              <span className="inline-block text-gold-600 font-semibold tracking-wider uppercase text-sm mb-4">
                Our Story
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-espresso-800 mb-2">
                A Haven of Warmth
                <br />& Flavor in Hawassa
              </h2>
              <p className="text-gold-600 text-lg mb-6" style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif" }}>
                የቸርነትና የጣዕም ማዕከል
              </p>
              <p className="text-lg text-espresso-600 leading-relaxed mb-6">
                Lhem Café was born from a simple dream: to create a space where
                Hawassa's community could gather over exceptional coffee and
                delicious food. Perched on the 1st floor of the Diko Building,
                right above Tesfa Pharmacy, we've become the neighborhood's
                favorite retreat.
              </p>
              <p className="text-lg text-espresso-600 leading-relaxed mb-8">
                Our commitment to quality ingredients, warm Ethiopian
                hospitality, and a welcoming atmosphere has earned us
                something we treasure above all else—our guests' perfect 5-star
                reviews. Every cup of coffee we serve and every dish we prepare
                carries our passion for excellence.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Coffee className="w-6 h-6 text-sage-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-espresso-800">
                      Premium Coffee
                    </h4>
                    <p className="text-sm text-espresso-600">
                      Ethiopian single-origin
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-cafe-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <UtensilsCrossed className="w-6 h-6 text-cafe-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-espresso-800">
                      Fresh Kitchen
                    </h4>
                    <p className="text-sm text-espresso-600">
                      Made with local love
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sidama Macchiato Feature */}
      <section className="py-16 bg-gradient-to-r from-espresso-800 via-espresso-700 to-espresso-800 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(232, 165, 75, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(232, 165, 75, 0.3) 0%, transparent 50%)'
          }} />
        </div>
        <div className="section-container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="lg:w-1/3 reveal">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Ethiopian Macchiato"
                  className="w-full rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-gold-500 text-espresso-900 rounded-full p-3 shadow-lg animate-float">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>
            </div>
            <div className="lg:w-2/3 reveal animate-delay-200">
              <div className="inline-flex items-center gap-2 bg-gold-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-gold-400/30">
                <Coffee className="w-5 h-5 text-gold-400" />
                <span className="text-gold-300 font-medium text-sm">Locally Sourced</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                The Sidama Macchiato Experience
              </h2>
              <p className="text-gold-300 text-lg mb-4" style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif" }}>
                ከሲዳማ እስከ ኩባያዎ
              </p>
              <p className="text-cream-200 text-lg leading-relaxed mb-6">
                We source our premium coffee beans directly from the lush highlands
                of the Sidama region, where generations of farmers have perfected
                the art of growing Ethiopia's finest Arabica. Every macchiato we
                serve carries the rich heritage of local soil—the smooth,
                chocolatey notes and bright citrus finish that have made
                Hawassa's macchiato culture legendary.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-espresso-600/50 rounded-xl px-4 py-3 border border-espresso-500">
                  <p className="text-gold-400 font-bold text-xl">100%</p>
                  <p className="text-cream-300 text-sm">Sidama Sourced</p>
                </div>
                <div className="bg-espresso-600/50 rounded-xl px-4 py-3 border border-espresso-500">
                  <p className="text-gold-400 font-bold text-xl">Fresh</p>
                  <p className="text-cream-300 text-sm">Daily Roasted</p>
                </div>
                <div className="bg-espresso-600/50 rounded-xl px-4 py-3 border border-espresso-500">
                  <p className="text-gold-400 font-bold text-xl">ETB 35</p>
                  <p className="text-cream-300 text-sm">Per Cup</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-gradient-warm">
        <div className="section-container">
          <div className="text-center mb-16 reveal">
            <span className="inline-block text-gold-600 font-semibold tracking-wider uppercase text-sm mb-4">
              How to Enjoy Lhem
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-espresso-800 mb-2">
              Your Way, Any Day
            </h2>
            <p className="text-gold-600 text-lg mb-4" style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif" }}>
              እርስዎ ዘወትር ቀን
            </p>
            <p className="text-lg text-espresso-600 max-w-2xl mx-auto">
              Whether you're craving a quiet morning coffee, a quick lunch
              break, or a family dinner delivered to your door—we've got you
              covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Dine-In */}
            <div className="card-elevated p-8 reveal animate-delay-100">
              <div className="w-16 h-16 bg-espresso-700 rounded-2xl flex items-center justify-center mb-6">
                <UtensilsCrossed className="w-8 h-8 text-cream-100" />
              </div>
              <h3 className="font-display text-2xl font-bold text-espresso-800 mb-4">
                Dine-In
              </h3>
              <p className="text-espresso-600 leading-relaxed mb-6">
                Step into our warm, inviting space where the aroma of freshly
                brewed coffee greets you at the door. Perfect for morning
                rituals, business meetings, or relaxed family gatherings. Our
                attentive staff ensures every visit feels like coming home.
              </p>
              <ul className="space-y-3 text-espresso-600">
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                  Cozy, air-conditioned seating
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                  Free WiFi for work sessions
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                  Group-friendly tables
                </li>
              </ul>
            </div>

            {/* Takeout */}
            <div className="card-elevated p-8 reveal animate-delay-200">
              <div className="w-16 h-16 bg-cafe-500 rounded-2xl flex items-center justify-center mb-6">
                <Package className="w-8 h-8 text-espresso-900" />
              </div>
              <h3 className="font-display text-2xl font-bold text-espresso-800 mb-4">
                Takeout
              </h3>
              <p className="text-espresso-600 leading-relaxed mb-6">
                Short on time? Call ahead and we'll have your order ready for
                pickup. Ideal for busy professionals working in the Diko
                Building area or anyone who wants to enjoy our food on the go.
                Fresh, fast, and always delicious.
              </p>
              <ul className="space-y-3 text-espresso-600">
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                  Ready in 15-20 minutes
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                  Eco-friendly packaging
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                  Call-ahead ordering
                </li>
              </ul>
            </div>

            {/* Delivery */}
            <div className="card-elevated p-8 reveal animate-delay-300">
              <div className="w-16 h-16 bg-sage-600 rounded-2xl flex items-center justify-center mb-6">
                <Bike className="w-8 h-8 text-cream-100" />
              </div>
              <h3 className="font-display text-2xl font-bold text-espresso-800 mb-4">
                Delivery
              </h3>
              <p className="text-espresso-600 leading-relaxed mb-6">
                Can't make it to us? We'll bring Lhem Café to your doorstep.
                Perfect for office lunches, family dinners at home, or when you
                simply want to enjoy restaurant-quality food in your pajamas.
                One call does it all.
              </p>
              <ul className="space-y-3 text-espresso-600">
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                  Direct delivery via phone
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                  Hot food, guaranteed
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                  Hawassa city-wide
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Telegram Ordering Section */}
      <section className="py-12 bg-telegram-500 text-cream-50">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 reveal">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Send className="w-8 h-8 text-cream-50" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold">
                  Order via Telegram
                </h3>
                <p className="text-cream-200">
                  Send us a screenshot of your order for quick delivery
                </p>
                <p className="text-sage-200 text-sm mt-1" style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif" }}>
                  በቴሌግራም ትዕዛዝ ይላኩ
                </p>
              </div>
            </div>
            <a
              href="https://t.me/lhemcafe"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-sage-700 font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 hover:bg-cream-100 transition-colors shadow-lg hover:scale-105 transform transition-transform"
            >
              <Send className="w-5 h-5" />
              Message on Telegram
            </a>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="section-padding bg-espresso-800 text-cream-100">
        <div className="section-container">
          <div className="text-center mb-16 reveal">
            <span className="inline-block text-gold-400 font-semibold tracking-wider uppercase text-sm mb-4">
              Our Menu
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-2">
              Crafted with Care
            </h2>
            <p className="text-gold-400 text-lg mb-4" style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif" }}>
              በእንክብካቤ የተሠራ
            </p>
            <p className="text-lg text-cream-300 max-w-2xl mx-auto">
              From traditional Ethiopian coffee ceremonies to hearty meals,
              every item is prepared fresh daily using the finest local
              ingredients.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Morning Brews */}
            <div className="reveal animate-delay-100">
              <div className="bg-espresso-700/50 rounded-3xl p-8 border border-espresso-600 h-full backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Coffee className="w-8 h-8 text-gold-400" />
                  <div>
                    <h3 className="font-display text-2xl font-bold">
                      Morning Brews
                    </h3>
                    <p className="text-cream-400 text-sm" style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif" }}>የጠዋት ቡና</p>
                  </div>
                </div>
                <div className="space-y-0 divide-y divide-espresso-600">
                  <div className="menu-item border-espresso-600">
                    <div>
                      <h4 className="menu-item-name text-cream-100">
                        Ethiopian Macchiato
                      </h4>
                      <p className="menu-item-desc text-cream-400">
                        Double-shot with perfectly steamed milk
                      </p>
                    </div>
                    <span className="menu-item-price text-gold-400">
                      ETB 35
                    </span>
                  </div>
                  <div className="menu-item border-espresso-600">
                    <div>
                      <h4 className="menu-item-name text-cream-100">
                        Traditional Bunna
                      </h4>
                      <p className="menu-item-desc text-cream-400">
                        Authentic coffee ceremony, slow-brewed
                      </p>
                    </div>
                    <span className="menu-item-price text-gold-400">
                      ETB 25
                    </span>
                  </div>
                  <div className="menu-item border-espresso-600">
                    <div>
                      <h4 className="menu-item-name text-cream-100">
                        Spiced Tea (Chai)
                      </h4>
                      <p className="menu-item-desc text-cream-400">
                        Ethiopian spices with black tea
                      </p>
                    </div>
                    <span className="menu-item-price text-gold-400">
                      ETB 20
                    </span>
                  </div>
                  <div className="menu-item border-espresso-600">
                    <div>
                      <h4 className="menu-item-name text-cream-100">
                        Fresh Mango Juice
                      </h4>
                      <p className="menu-item-desc text-cream-400">
                        Ripe local mangoes, no added sugar
                      </p>
                    </div>
                    <span className="menu-item-price text-gold-400">
                      ETB 45
                    </span>
                  </div>
                  <div className="menu-item border-espresso-600">
                    <div>
                      <h4 className="menu-item-name text-cream-100">
                        Iced Americano
                      </h4>
                      <p className="menu-item-desc text-cream-400">
                        Cold coffee for warm afternoons
                      </p>
                    </div>
                    <span className="menu-item-price text-gold-400">
                      ETB 40
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Breakfast */}
            <div className="reveal animate-delay-200">
              <div className="bg-espresso-700/50 rounded-3xl p-8 border border-espresso-600 h-full backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <UtensilsCrossed className="w-8 h-8 text-gold-400" />
                  <div>
                    <h3 className="font-display text-2xl font-bold">
                      Breakfast
                    </h3>
                    <p className="text-cream-400 text-sm" style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif" }}>ቁርስ</p>
                  </div>
                </div>
                <div className="space-y-0 divide-y divide-espresso-600">
                  <div className="menu-item border-espresso-600">
                    <div>
                      <h4 className="menu-item-name text-cream-100">
                        Ful Medames
                      </h4>
                      <p className="menu-item-desc text-cream-400">
                        Slow-cooked fava beans with olive oil
                      </p>
                    </div>
                    <span className="menu-item-price text-gold-400">
                      ETB 65
                    </span>
                  </div>
                  <div className="menu-item border-espresso-600">
                    <div>
                      <h4 className="menu-item-name text-cream-100">
                        Chechebsa
                      </h4>
                      <p className="menu-item-desc text-cream-400">
                        Flatbread in spicy berbere sauce
                      </p>
                    </div>
                    <span className="menu-item-price text-gold-400">
                      ETB 75
                    </span>
                  </div>
                  <div className="menu-item border-espresso-600">
                    <div>
                      <h4 className="menu-item-name text-cream-100">
                        Eggs Firfir
                      </h4>
                      <p className="menu-item-desc text-cream-400">
                        Scrambled eggs with torn injera
                      </p>
                    </div>
                    <span className="menu-item-price text-gold-400">
                      ETB 55
                    </span>
                  </div>
                  <div className="menu-item border-espresso-600">
                    <div>
                      <h4 className="menu-item-name text-cream-100">
                        Breakfast Special
                      </h4>
                      <p className="menu-item-desc text-cream-400">
                        Two eggs, ful, bread, and juice
                      </p>
                    </div>
                    <span className="menu-item-price text-gold-400">
                      ETB 95
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lunch & Dinner */}
            <div className="reveal animate-delay-300">
              <div className="bg-espresso-700/50 rounded-3xl p-8 border border-espresso-600 h-full backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <UtensilsCrossed className="w-8 h-8 text-gold-400" />
                  <div>
                    <h3 className="font-display text-2xl font-bold">
                      Lunch & Dinner
                    </h3>
                    <p className="text-cream-400 text-sm" style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif" }}>ምሣ እና እራት</p>
                  </div>
                </div>
                <div className="space-y-0 divide-y divide-espresso-600">
                  <div className="menu-item border-espresso-600">
                    <div>
                      <h4 className="menu-item-name text-cream-100">
                        Doro Wot
                      </h4>
                      <p className="menu-item-desc text-cream-400">
                        Spicy chicken stew with injera
                      </p>
                    </div>
                    <span className="menu-item-price text-gold-400">
                      ETB 150
                    </span>
                  </div>
                  <div className="menu-item border-espresso-600">
                    <div>
                      <h4 className="menu-item-name text-cream-100">
                        Kitfo
                      </h4>
                      <p className="menu-item-desc text-cream-400">
                        Minced beef with spiced butter
                      </p>
                    </div>
                    <span className="menu-item-price text-gold-400">
                      ETB 180
                    </span>
                  </div>
                  <div className="menu-item border-espresso-600">
                    <div>
                      <h4 className="menu-item-name text-cream-100">
                        Veggie Combo
                      </h4>
                      <p className="menu-item-desc text-cream-400">
                        Five lentil dishes with injera
                      </p>
                    </div>
                    <span className="menu-item-price text-gold-400">
                      ETB 90
                    </span>
                  </div>
                  <div className="menu-item border-espresso-600">
                    <div>
                      <h4 className="menu-item-name text-cream-100">
                        Tibs
                      </h4>
                      <p className="menu-item-desc text-cream-400">
                        Sautéed beef with peppers
                      </p>
                    </div>
                    <span className="menu-item-price text-gold-400">
                      ETB 160
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Note */}
          <p className="text-center text-cream-400 mt-12 reveal">
            Prices may vary. Ask about our daily specials when you call.
          </p>
        </div>
      </section>

      {/* Hours & Contact Section */}
      <section id="hours" className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pattern-bg" />
        <div className="section-container relative z-10">
          <div className="text-center mb-12 reveal">
            <span className="inline-block text-gold-600 font-semibold tracking-wider uppercase text-sm mb-4">
              Find Us
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-espresso-800 mb-2">
              We're Here When You Need Us
            </h2>
            <p className="text-gold-600 text-lg mb-4" style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif" }}>
              ስንፈልግዎት ጊዜ እንደምናገኝዎ
            </p>
            <p className="text-lg text-espresso-600 max-w-2xl mx-auto">
              Located in the heart of Hawassa at Diko Building, 1st Floor — right above Tesfa Pharmacy
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Hours Card */}
            <div className="reveal animate-delay-100">
              <div className="card-glass p-6 sm:p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-espresso-700 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-cream-100" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-espresso-800">
                      Opening Hours
                    </h3>
                    <p className="text-espresso-500 text-sm" style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif" }}>የመክፈቻ ሰዓት</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Mon-Sat */}
                  <div className="flex justify-between items-center py-3 border-b border-cream-300/50">
                    <div>
                      <p className="font-semibold text-espresso-800">
                        Monday – Saturday
                      </p>
                      <p className="text-sm text-espresso-600">Morning to Evening</p>
                    </div>
                    <span className="text-lg font-bold text-espresso-800">
                      6:00 AM – 10:00 PM
                    </span>
                  </div>

                  {/* Sunday */}
                  <div className="flex justify-between items-center py-3 border-b border-cream-300/50">
                    <div>
                      <p className="font-semibold text-espresso-800">Sunday</p>
                      <p className="text-sm text-espresso-600">Weekend hours</p>
                    </div>
                    <span className="text-lg font-bold text-espresso-800">
                      6:30 AM – 10:00 PM
                    </span>
                  </div>

                  {/* Wednesday Special - Enhanced */}
                  <div className="bg-amber-50/80 rounded-xl border-2 border-amber-300 overflow-hidden backdrop-blur-sm">
                    <div className="bg-amber-100/80 px-4 py-2 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                      <span className="font-bold text-amber-800">Special Notice</span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-1">
                          <p className="font-bold text-espresso-800">
                            Wednesday Early Closing
                          </p>
                          <p className="text-lg font-bold text-amber-600">4:00 PM</p>
                        </div>
                      </div>
                      <div className="bg-white/80 rounded-lg p-3 border border-amber-200">
                        <p className="text-sm text-espresso-700">
                          <strong>Why we close early:</strong> Every Wednesday, our team
                          dedicates time to staff development and deep cleaning to ensure
                          we maintain our 5-star standards for you!
                        </p>
                      </div>
                      <p className="text-xs text-amber-700 mt-3 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Planning a visit? Call before 3:30 PM on Wednesdays
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="reveal animate-delay-200">
              <div className="card-glass p-6 sm:p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-cafe-500 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-espresso-900" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-espresso-800">
                      Contact & Location
                    </h3>
                    <p className="text-espresso-500 text-sm" style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif" }}>አድራሻና መገኛ</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Phone */}
                  <a
                    href="tel:+251930153315"
                    className="flex items-center gap-4 p-4 bg-sage-50/80 rounded-xl hover:bg-sage-100 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-sage-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-espresso-600">Call or WhatsApp</p>
                      <p className="text-lg font-bold text-espresso-800">
                        +251 93 015 3315
                      </p>
                    </div>
                  </a>

                  {/* Telegram */}
                  <a
                    href="https://t.me/lhemcafe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-sky-50/80 rounded-xl hover:bg-sky-100 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-espresso-600">Order on Telegram</p>
                      <p className="text-lg font-bold text-espresso-800">
                        @lhemcafe
                      </p>
                    </div>
                  </a>

                  {/* Location */}
                  <a
                    href="https://maps.google.com/?q=Diko+Building+Hawassa+Ethiopia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-cafe-50/80 rounded-xl hover:bg-cafe-100 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-cafe-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6 text-espresso-900" />
                    </div>
                    <div>
                      <p className="text-sm text-espresso-600">Address</p>
                      <p className="text-lg font-bold text-espresso-800">
                        Diko Building, 1st Floor
                      </p>
                      <p className="text-sm text-espresso-600">
                        Above Tesfa Pharmacy, Hawassa
                      </p>
                    </div>
                  </a>

                  {/* CTA */}
                  <a
                    href="tel:+251930153315"
                    className="btn-primary w-full text-lg py-4"
                  >
                    <Phone className="w-5 h-5" />
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="reveal animate-delay-300">
            <div className="card-glass overflow-hidden">
              <div className="p-4 bg-espresso-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gold-400" />
                  <span className="font-semibold text-cream-50">
                    Find Us on the Map
                  </span>
                </div>
                <a
                  href="https://maps.google.com/?q=Diko+Building+Hawassa+Ethiopia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gold-400 hover:text-gold-300 underline underline-offset-2 transition-colors"
                >
                  Open in Google Maps
                </a>
              </div>
              <div className="aspect-[16/9] sm:aspect-[21/9]">
                <iframe
                  title="Lhem Café - Diko Building, Hawassa"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.0!2d38.5!3d7.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDiko+Building%2C+Hawassa!5e0!3m2!1sen!2set!4v1!5m2!1sen!2set"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-4 bg-cream-50/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-espresso-900 fill-espresso-900" />
                  </div>
                  <div>
                    <p className="font-semibold text-espresso-800">
                      Landmark: Above Tesfa Pharmacy
                    </p>
                    <p className="text-sm text-espresso-600">
                      Look for the Diko Building, take the stairs to 1st floor
                    </p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Diko+Building+Hawassa+Ethiopia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="section-padding bg-gradient-warm">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10 reveal">
              <span className="inline-block text-gold-600 font-semibold tracking-wider uppercase text-sm mb-4">
                Get in Touch
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-espresso-800 mb-2">
                Reach Out to Us
              </h2>
              <p className="text-gold-600 text-lg mb-4" style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif" }}>
                አግኙን
              </p>
              <p className="text-lg text-espresso-600 max-w-xl mx-auto">
                Have questions, feedback, or want to book an event? We'd love to hear from you!
              </p>
            </div>

            <div className="card-elevated p-8 sm:p-10 reveal animate-delay-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="form-label flex items-center gap-2">
                    <User className="w-4 h-4 text-espresso-500" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    className="form-input"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="form-label flex items-center gap-2">
                    <Mail className="w-4 h-4 text-espresso-500" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                    className="form-input"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="form-label flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-espresso-500" />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="How can we help you? Share your questions, feedback, or event details..."
                    className="form-textarea"
                  />
                </div>

                {/* Submit Status Messages */}
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-3 p-4 bg-sage-100 text-sage-700 rounded-xl border border-sage-200">
                    <CheckCircle className="w-5 h-5 text-sage-600" />
                    <p className="font-medium">
                      Thank you! Your message has been sent successfully. We'll get back to you soon!
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <p className="font-medium">
                      Something went wrong. Please try again or call us directly at +251 93 015 3315.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">
                        <MessageSquare className="w-5 h-5" />
                      </span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-espresso-900 text-cream-200 py-12">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-display text-2xl font-bold text-cream-50 mb-1">
                Lhem Café – Restaurant
              </h3>
              <p className="text-gold-400 text-sm mb-1" style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif" }}>ልሄም ካፌ እና ሬስቶራንት</p>
              <p className="text-cream-400">
                Hawassa's 5-Star Dining Experience
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://t.me/lhemcafe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-espresso-800 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-espresso-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-espresso-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="tel:+251930153315"
                className="w-10 h-10 bg-espresso-800 rounded-full flex items-center justify-center hover:bg-sage-600 transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="border-t border-espresso-800 mt-8 pt-8 text-center text-cream-500 text-sm">
            <p>
              Diko Building, 1st Floor (Above Tesfa Pharmacy) | Hawassa,
              Ethiopia
            </p>
            <p className="mt-2">Open daily. Perfect since day one.</p>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-cream-200 shadow-lg z-50 md:hidden">
        <div className="flex items-center justify-center gap-2 p-3">
          <a
            href="tel:+251930153315"
            className="flex-1 flex items-center justify-center gap-2 bg-espresso-700 text-cream-50 font-semibold py-3 rounded-xl hover:bg-espresso-800 transition-colors"
          >
            <Phone className="w-5 h-5" />
            Call to Order
          </a>
          <a
            href="https://maps.google.com/?q=Diko+Building+Hawassa+Ethiopia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-cafe-500 text-espresso-900 font-semibold py-3 rounded-xl hover:bg-cafe-600 transition-colors"
          >
            <MapPin className="w-5 h-5" />
            Directions
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
