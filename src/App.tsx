/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Wrench, Car, MapPin, Phone, Mail, Clock, 
  Settings, Zap, ShieldCheck, ThumbsUp, Star, CheckCircle, Droplet, Battery, ChevronDown,
  Facebook, Twitter, Instagram
} from 'lucide-react';
import { useState, useRef } from 'react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', carModel: '', serviceType: 'General Service' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\+?[0-9\s\-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid phone number';
    }

    if (!formData.carModel.trim()) newErrors.carModel = 'Car model is required';

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
    } else {
      setFormErrors({});
      setFormStatus('success');
      setFormData({ name: '', phone: '', carModel: '', serviceType: 'General Service' });
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yBgImg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Wrench size={24} />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">Amity Car Service</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
              <a href="#about" className="hover:text-blue-600 transition-colors">About Us</a>
              <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
              <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#brands" className="hover:text-blue-600 transition-colors">Brands</a>
              <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
              <a href="#contact" className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all font-semibold">
                Book Service
              </a>
            </div>

            <button 
              className="lg:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100">
            <div className="px-4 pt-2 pb-6 space-y-1 shadow-lg">
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50 hover:text-blue-600">About Us</a>
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50 hover:text-blue-600">Services</a>
              <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50 hover:text-blue-600">Pricing</a>
              <a href="#brands" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50 hover:text-blue-600">Brands</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50 hover:text-blue-600">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden bg-slate-900 text-white">
        {/* Parallax Background Image */}
        <motion.div style={{ y: yBgImg }} className="absolute inset-0 pointer-events-none opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2070&auto=format&fit=crop" 
            alt="Car Workshop Background" 
            className="w-full h-[130%] object-cover object-center mix-blend-luminosity grayscale" 
          />
        </motion.div>

        {/* Abstract metallic structure background */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[120%] h-[150%] bg-gradient-to-b from-blue-500/20 to-transparent skew-x-[-20deg] border-l border-white/10"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/30 to-transparent mix-blend-overlay"></div>
        </motion.div>

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-blue-300">
              <Star className="w-4 h-4 fill-current" />
              <span>Free Pickup & Drop within 5km</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              Trusted Car Care, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Anytime Anywhere.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-xl leading-relaxed">
              Professional repair and maintenance in Chandigarh. We use genuine parts, modern tools, and certified mechanics to keep your car in top condition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="inline-flex justify-center items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
              >
                Book Service Now
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+919876511122" 
                className="inline-flex justify-center items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 border border-white/10 transition-all"
              >
                <Phone className="w-5 h-5" />
                +91 98765 11122
              </motion.a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center perspective-[1000px]"
          >
            {/* Visual element representing a polished car or garage */}
            <motion.div 
              whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-full max-w-md aspect-square bg-gradient-to-tr from-slate-800 to-slate-700 rounded-3xl p-8 shadow-2xl border border-white/10 relative overflow-hidden"
            >
               <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl"></div>
               <div className="absolute bottom-10 left-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>
               <div className="h-full w-full border border-white/5 rounded-2xl flex flex-col justify-between p-6 bg-white/5 backdrop-blur-sm z-10 relative">
                  <div>
                    <div className="flex items-center gap-3 text-white/50 mb-2">
                       <ShieldCheck className="w-5 h-5" />
                       <span className="text-sm uppercase tracking-wider font-semibold">Diagnostic Run</span>
                    </div>
                    <div className="font-display text-4xl text-white font-bold">100%</div>
                    <div className="text-emerald-400 font-medium tracking-wide mt-1">Systems Optimal</div>
                  </div>
                  <div className="space-y-3">
                     <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[100%] rounded-full"></div>
                     </div>
                     <div className="flex justify-between text-xs text-white/60 uppercase tracking-widest font-mono">
                        <span>Engine</span>
                        <span>Clear</span>
                     </div>
                  </div>
               </div>
            </motion.div>
            
            {/* Floating badge */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute bottom-10 left-0 bg-white text-slate-900 p-4 rounded-2xl shadow-xl shadow-black/20 flex items-center gap-4"
            >
              <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                <ThumbsUp className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">100% Satisfaction</p>
                <p className="text-sm text-slate-500">Guaranteed Service</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats/Features Banner */}
      <div className="bg-blue-600 text-white border-b border-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-blue-500/50">
             <div className="flex flex-col items-center justify-center text-center px-4">
               <span className="font-display text-3xl font-bold mb-1">2020</span>
               <span className="text-blue-200 text-sm uppercase tracking-wider">Established</span>
             </div>
             <div className="flex flex-col items-center justify-center text-center px-4">
               <span className="font-display text-3xl font-bold mb-1">5km</span>
               <span className="text-blue-200 text-sm uppercase tracking-wider">Free Pickup</span>
             </div>
             <div className="flex flex-col items-center justify-center text-center px-4 whitespace-nowrap">
               <span className="font-display text-3xl font-bold mb-1 inline-flex items-center gap-1"><Zap className="w-6 h-6 fill-current"/> 24/7</span>
               <span className="text-blue-200 text-sm uppercase tracking-wider">Emergency SOS</span>
             </div>
             <div className="flex flex-col items-center justify-center text-center px-4">
               <span className="font-display text-3xl font-bold mb-1">100%</span>
               <span className="text-blue-200 text-sm uppercase tracking-wider">Genuine Parts</span>
             </div>
          </div>
        </div>
      </div>

      {/* About Us */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
               <div className="aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden relative border border-slate-200 flex items-center justify-center shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1613214148433-5d61486796ad?q=80&w=2070&auto=format&fit=crop" 
                    alt="Mechanic working on a car engine" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/30 to-transparent"></div>
               </div>
               <div className="absolute -bottom-6 -right-6 lg:-bottom-6 lg:-right-6 lg:left-8 bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 max-w-[280px]">
                 <div className="text-slate-900 font-bold mb-1">Amit Verma</div>
                 <div className="text-sm text-slate-500 mb-3">Owner & Lead Mechanic</div>
                 <p className="text-xs text-slate-600 italic">"We treat every car like it's our own. Quality and transparency are our core."</p>
               </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 text-blue-600 font-semibold tracking-wide uppercase text-sm">
                <span className="w-8 h-0.5 bg-blue-600"></span>
                About Us
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-900">
                Premium Car Service You Can Trust
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Amity Car Service is a reliable and affordable car servicing center providing high-quality repair and maintenance services. Located in Chandigarh, we specialize in servicing all major car brands.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our goal is to ensure your car stays in top condition with transparent pricing, trained technicians, modern tools, and genuine spare parts.
              </p>
              
              <ul className="space-y-4 pt-4">
                {['Certified Mechanics', 'Genuine Spare Parts', 'Affordable Pricing', 'Online Booking Available'].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                     <CheckCircle className="w-6 h-6 text-blue-500 shrink-0" />
                     {item}
                   </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
             <div className="inline-flex items-center gap-2 text-blue-600 font-semibold tracking-wide uppercase text-sm mb-4">
                <span className="w-8 h-0.5 bg-blue-600"></span>
                Our Expertise
                <span className="w-8 h-0.5 bg-blue-600"></span>
             </div>
             <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">Comprehensive Car Services</h2>
             <p className="text-slate-600 text-lg">From basic maintenance to complex engine repairs, our experts have you covered.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Cards */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group">
               <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Settings className="w-7 h-7" />
               </div>
               <h3 className="font-bold text-xl mb-3 text-slate-900">General Car Service</h3>
               <ul className="space-y-2 text-slate-600 text-sm">
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Periodic maintenance</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Oil & filter change</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Fluid top-up</li>
               </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group">
               <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Wrench className="w-7 h-7" />
               </div>
               <h3 className="font-bold text-xl mb-3 text-slate-900">Engine Repair</h3>
               <ul className="space-y-2 text-slate-600 text-sm">
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Engine diagnostics</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Engine overhaul</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Performance tuning</li>
               </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group">
               <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Car className="w-7 h-7" />
               </div>
               <h3 className="font-bold text-xl mb-3 text-slate-900">Wheel & Tyre</h3>
               <ul className="space-y-2 text-slate-600 text-sm">
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Wheel alignment</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Wheel balancing</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Tyre replacement</li>
               </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group">
               <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Battery className="w-7 h-7" />
               </div>
               <h3 className="font-bold text-xl mb-3 text-slate-900">Battery Service</h3>
               <ul className="space-y-2 text-slate-600 text-sm">
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Check & replacement</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Charging system inspect</li>
               </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group">
               <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <span className="font-bold text-xl">AC</span>
               </div>
               <h3 className="font-bold text-xl mb-3 text-slate-900">AC Service</h3>
               <ul className="space-y-2 text-slate-600 text-sm">
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> AC gas refill</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Cooling system repair</li>
               </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group">
               <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Droplet className="w-7 h-7" />
               </div>
               <h3 className="font-bold text-xl mb-3 text-slate-900">Car Wash & Detailing</h3>
               <ul className="space-y-2 text-slate-600 text-sm">
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Foam wash</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Interior cleaning</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Polishing</li>
               </ul>
            </div>
          </div>

          {/* Detailed Service Information */}
          <div className="mt-20 max-w-4xl mx-auto">
             <div className="text-center mb-10">
                <h3 className="font-display text-3xl font-bold text-slate-900 mb-4">In-Depth Service Details</h3>
                <p className="text-slate-600">Explore service timelines, replaced parts, and our warranty guarantees.</p>
             </div>
             
             <div className="space-y-4">
                {[
                  {
                    id: 1,
                    title: "General Car Service",
                    time: "3 - 4 Hours",
                    parts: "Engine oil, oil filter, air filter, cabin AC filter",
                    warranty: "6 months or 5,000 km warranty on all replaced parts"
                  },
                  {
                    id: 2,
                    title: "Engine Repair & Diagnostics",
                    time: "1 - 3 Days",
                    parts: "Spark plugs, timing belt, gaskets, valves (as needed)",
                    warranty: "12 months or 10,000 km warranty on engine overhaul"
                  },
                  {
                    id: 3,
                    title: "Wheel & Tyre Service",
                    time: "1 - 2 Hours",
                    parts: "Tyres, valves, wheel weights",
                    warranty: "Manufacturer warranty on new tyres, 1 month on alignment"
                  },
                  {
                    id: 4,
                    title: "Battery Service",
                    time: "30 - 45 Minutes",
                    parts: "Battery unit, terminal connectors (if corroded)",
                    warranty: "18 to 36 months manufacturer warranty on new batteries"
                  },
                  {
                    id: 5,
                    title: "AC System Service",
                    time: "2 - 3 Hours",
                    parts: "AC refrigerant (gas), AC filter, O-rings, compressor oil",
                    warranty: "6 months warranty on gas refill and cooling performance"
                  },
                  {
                    id: 6,
                    title: "Car Wash & Detailing",
                    time: "1.5 - 3 Hours",
                    parts: "Premium wax, polish, upholstery cleaner (consumables)",
                    warranty: "100% satisfaction guarantee before drive-off"
                  }
                ].map((detail) => (
                  <div key={detail.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-200 transition-colors">
                     <button 
                       className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                       onClick={() => setExpandedService(expandedService === detail.id ? null : detail.id)}
                     >
                        <span className="font-bold text-lg text-slate-900">{detail.title}</span>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedService === detail.id ? 'rotate-180' : ''}`} />
                     </button>
                     <motion.div 
                       initial={false}
                       animate={{ height: expandedService === detail.id ? 'auto' : 0, opacity: expandedService === detail.id ? 1 : 0 }}
                       className="overflow-hidden"
                     >
                       <div className="p-6 pt-0 border-t border-slate-100 bg-slate-50/50">
                         <div className="grid sm:grid-cols-3 gap-6 mt-6">
                           <div className="flex gap-3">
                              <Clock className="w-5 h-5 text-blue-500 shrink-0" />
                              <div>
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Est. Time</div>
                                <div className="text-sm font-medium text-slate-900 pr-2">{detail.time}</div>
                              </div>
                           </div>
                           <div className="flex gap-3">
                              <Settings className="w-5 h-5 text-blue-500 shrink-0" />
                              <div>
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Parts Replaced</div>
                                <div className="text-sm font-medium text-slate-900 pr-2">{detail.parts}</div>
                              </div>
                           </div>
                           <div className="flex gap-3">
                              <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
                              <div>
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Warranty</div>
                                <div className="text-sm font-medium text-slate-900">{detail.warranty}</div>
                              </div>
                           </div>
                         </div>
                       </div>
                     </motion.div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">Transparent Pricing</h2>
             <p className="text-slate-600 text-lg">No hidden charges. Clear, upfront prices for all standard services.</p>
           </div>
           
           <div className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden">
             {/* Data Row Headers */}
             <div className="hidden sm:grid grid-cols-2 gap-4 p-6 border-b border-slate-200 bg-white">
               <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">Service Category</div>
               <div className="text-sm font-semibold uppercase tracking-wider text-slate-500 text-right">Starting Price (₹)</div>
             </div>
             
             {/* Rows */}
             <div className="divide-y divide-slate-200">
               {[
                 { name: 'Basic Service', price: 1499 },
                 { name: 'Standard Service', price: 2499 },
                 { name: 'Complete Service', price: 3999 },
                 { name: 'AC Service', price: 1999 },
                 { name: 'Car Wash', price: 499 },
               ].map((item, idx) => (
                 <div key={idx} className="flex flex-col sm:grid sm:grid-cols-2 gap-4 p-6 hover:bg-blue-50/50 transition-colors">
                   <div className="font-semibold text-slate-900 flex items-center gap-3">
                     <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                     {item.name}
                   </div>
                   <div className="font-mono text-xl text-slate-900 sm:text-right font-bold tracking-tight">₹{item.price}</div>
                 </div>
               ))}
             </div>
           </div>
           <p className="text-center text-sm text-slate-500 mt-6">*Prices may vary based on car make and model.</p>
        </div>
      </section>

      {/* Brands */}
      <section id="brands" className="py-20 border-y border-slate-200 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="text-center">
             <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Brands We Service</h2>
          </div>
        </div>
        
        {/* Simple Marquee equivalent using Flex */}
        <div className="flex justify-center flex-wrap gap-12 lg:gap-24 opacity-60 font-display font-bold text-2xl text-slate-400 px-4">
           {['Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Honda', 'Toyota'].map((brand) => (
             <span key={brand} className="uppercase tracking-wider">{brand}</span>
           ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="font-display text-4xl font-bold mb-16">What Our Customers Say</h2>
           
           <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm text-left">
               <div className="flex gap-1 text-amber-400 mb-6">
                 {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
               </div>
               <p className="text-lg text-slate-300 italic mb-6 leading-relaxed">
                 "Excellent service and very professional staff."
               </p>
               <div className="font-bold text-white">— Rohit Sharma</div>
             </div>

             <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm text-left">
               <div className="flex gap-1 text-amber-400 mb-6">
                 {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
               </div>
               <p className="text-lg text-slate-300 italic mb-6 leading-relaxed">
                 "Affordable and quick service. Highly recommended."
               </p>
               <div className="font-bold text-white">— Ankit Gupta</div>
             </div>
           </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <section id="contact" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200">
               <h2 className="font-display text-3xl font-bold mb-8">Book a Service</h2>
               <form className="space-y-6" onSubmit={handleBookingSubmit}>
                 {formStatus === 'success' && (
                   <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl border border-emerald-200 flex items-center gap-3">
                     <CheckCircle className="w-5 h-5" />
                     <p className="text-sm font-medium">Booking request sent successfully!</p>
                   </div>
                 )}
                 <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Name</label>
                   <input 
                     type="text" 
                     placeholder="John Doe" 
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                     className={`w-full px-4 py-3 rounded-xl border ${formErrors.name ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 focus:border-transparent bg-white transition-colors`} 
                   />
                   {formErrors.name && <p className="text-red-500 text-xs mt-2 font-medium">{formErrors.name}</p>}
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Phone</label>
                     <input 
                       type="tel" 
                       placeholder="+91" 
                       value={formData.phone}
                       onChange={(e) => setFormData({...formData, phone: e.target.value})}
                       className={`w-full px-4 py-3 rounded-xl border ${formErrors.phone ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 focus:border-transparent bg-white transition-colors`} 
                     />
                     {formErrors.phone && <p className="text-red-500 text-xs mt-2 font-medium">{formErrors.phone}</p>}
                   </div>
                   <div>
                     <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Car Model</label>
                     <input 
                       type="text" 
                       placeholder="Tata Nexon" 
                       value={formData.carModel}
                       onChange={(e) => setFormData({...formData, carModel: e.target.value})}
                       className={`w-full px-4 py-3 rounded-xl border ${formErrors.carModel ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 focus:border-transparent bg-white transition-colors`} 
                     />
                     {formErrors.carModel && <p className="text-red-500 text-xs mt-2 font-medium">{formErrors.carModel}</p>}
                   </div>
                 </div>
                 <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Service Type</label>
                   <select 
                     value={formData.serviceType}
                     onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                     className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none"
                   >
                     <option>General Service</option>
                     <option>Engine Repair</option>
                     <option>AC Service</option>
                     <option>Car Wash</option>
                     <option>Other</option>
                   </select>
                 </div>
                 <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors mt-6 shadow-lg shadow-blue-500/20 active:scale-[0.98]">
                   Confirm Booking Request
                 </button>
               </form>
            </div>

            <div className="space-y-12">
               <div>
                  <h2 className="font-display text-4xl font-bold mb-6">Contact Us</h2>
                  <p className="text-lg text-slate-600 mb-8">Ready to get your car serviced? Reach out to us or drop by our workshop.</p>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="bg-slate-100 p-3 rounded-full text-slate-700 shrink-0">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">Location</h4>
                        <p className="text-slate-600 leading-relaxed">Plot No. 21, Near Bus Stand 42,<br/>Chandigarh, Punjab – 140042, India</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="bg-slate-100 p-3 rounded-full text-slate-700 shrink-0">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">Phone</h4>
                        <a href="tel:+919876511122" className="text-blue-600 font-medium hover:underline">+91 98765 11122</a>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="bg-slate-100 p-3 rounded-full text-slate-700 shrink-0">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">Email</h4>
                        <a href="mailto:support@amitycarservice.in" className="text-blue-600 font-medium hover:underline">support@amitycarservice.in</a>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="bg-slate-100 p-3 rounded-full text-slate-700 shrink-0">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">Working Hours</h4>
                        <p className="text-slate-600">Mon – Sat: 9:00 AM – 8:00 PM<br/>Sun: 10:00 AM – 4:00 PM</p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Actual Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                  <Wrench size={20} />
                </div>
                <span className="font-display font-bold text-lg tracking-tight">Amity Car Service</span>
              </div>
              <p className="text-sm leading-relaxed">Trusted Car Care, Anytime Anywhere. Providing quality repair and maintenance in Chandigarh since 2020.</p>
              <div className="flex gap-4 pt-4">
                <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-colors" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-colors" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-blue-400 transition-colors">Our Services</a></li>
                <li><a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing Options</a></li>
                <li><a href="#brands" className="hover:text-blue-400 transition-colors">Brands We Service</a></li>
                <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact & Booking</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#services" className="hover:text-blue-400 transition-colors">General Car Service</a></li>
                <li><a href="#services" className="hover:text-blue-400 transition-colors">Engine Diagnostics</a></li>
                <li><a href="#services" className="hover:text-blue-400 transition-colors">Wheel Alignment</a></li>
                <li><a href="#services" className="hover:text-blue-400 transition-colors">AC Gas Refill</a></li>
                <li><a href="#services" className="hover:text-blue-400 transition-colors">Premium Car Wash</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-slate-500" />
                  <span>Plot No. 21, Near Bus Stand 42,<br/>Chandigarh, Punjab 140042</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-5 h-5 shrink-0 text-slate-500" />
                  <a href="tel:+919876511122" className="hover:text-blue-400 transition-colors">+91 98765 11122</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-5 h-5 shrink-0 text-slate-500" />
                  <a href="mailto:support@amitycarservice.in" className="hover:text-blue-400 transition-colors">support@amitycarservice.in</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center text-sm pt-8 border-t border-white/10">
            <p>© 2020 - {new Date().getFullYear()} Amity Car Service. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
