import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function Services() {
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Smooth title animation with gentle fade
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      }
    );

    // Smooth, gentle card animations with staggered effect - no scroll trigger
    cardsRef.current.forEach((card, index) => {
      if (card) {
        // Alternating subtle slide from left/right
        const fromX = index % 2 === 0 ? -100 : 100;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: fromX,
            y: 30,
            scale: 1,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            delay: 0.3,
          }
        );

        // Add gentle floating hover effect
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -8,
            duration: 0.4,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          });
        });
      }
    });

    // Cleanup event listeners
    return () => {
      cardsRef.current.forEach((card) => {
        if (card) {
          card.removeEventListener('mouseenter', () => {});
          card.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, []);

  const services = [
    {
      icon: '💬',
      title: 'WhatsApp Verification',
      description:
        'Use our WhatsApp bot for easy fact-checking within chats. Just send a message and get instant verification.',
      color: 'from-green-500 to-emerald-600',
      features: ['Instant responses', 'Group support', 'Private chats'],
    },
    {
      icon: '✈️',
      title: 'Telegram Bot',
      description:
        'Verify claims right inside Telegram groups or private messages. Fast, reliable, and always online.',
      color: 'from-blue-500 to-cyan-600',
      features: ['Bot commands', 'Inline mode', 'Channel support'],
    },
    {
      icon: '🔌',
      title: 'Browser Extension',
      description:
        'Highlight and fact-check information on any website instantly. Works on Chrome, Firefox, and Edge.',
      color: 'from-purple-500 to-pink-600',
      features: ['Quick select', 'Auto-scan', 'Save reports'],
    },
    {
      icon: '💻',
      title: 'Desktop App',
      description:
        'Standalone desktop solution for batch or deep verification. Perfect for researchers and journalists.',
      color: 'from-orange-500 to-red-600',
      features: ['Batch processing', 'Export data', 'Offline mode'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-24 pb-12 px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10 blur-3xl animate-pulse"
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{ opacity: 0 }}
        >
          <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Multi-platform fact verification solutions tailored to your needs
          </p>
          <div className="mt-6 h-1 w-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-700 hover:shadow-2xl hover:border-white/30"
              style={{ perspective: '1000px', opacity: 0 }}
            >
              {/* Gradient glow on hover */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-15 blur-xl transition-opacity duration-700`}
              ></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-6xl mb-6 px-4 pt-4 transform group-hover:scale-110 transition-transform duration-700 ease-out">
                  {service.icon}
                </div>

                {/* Title */}
                <h2
                  className={`text-3xl font-bold mb-4 bg-gradient-to-r ${service.color} bg-clip-text text-transparent pb-4`}
                >
                  {service.title}
                </h2>

                {/* Description */}
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 text-white/70"
                    >
                      <svg
                        className="w-5 h-5 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className={`mt-6 w-full bg-gradient-to-r ${service.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-500 hover:scale-[1.02]`}
                >
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 text-center">
          <h3 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Choose any platform and start verifying information today. All
            services are integrated with our powerful AI engine.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/console"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 px-8 rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-105"
            >
              Try Console Now
            </a>
            <a
              href="/playground"
              className="backdrop-blur-lg bg-white/10 border-2 border-white/30 hover:bg-white/20 text-white py-4 px-8 rounded-full font-bold transition-all duration-300 hover:scale-105"
            >
              Explore Playground
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
