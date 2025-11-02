import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ServiceImageDisplay from '../components/ServiceImageDisplay';
import extensionPopup from '../assets/services/extension-1.png';
import extensionResult from '../assets/services/extension-2.png';
import whatsappImage from '../assets/services/whatsapp.jpeg';
import telegramImage from '../assets/services/telegram.jpeg';

function Services() {
  const titleRef = useRef(null);
  const sectionsRef = useRef([]);

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

    // Animate sections on mount
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2 + index * 0.2,
            ease: 'power2.out',
          }
        );
      }
    });
  }, []);

  const services = [
    {
      icon: '🔌',
      title: 'Browser Extension',
      description:
        'Highlight and fact-check information on any website instantly. Works on Chrome, Firefox, and Edge.',
      color: 'from-purple-500 to-pink-600',
      features: [
        'Quick select',
        'Auto-scan',
        'Save reports',
        'Download markdown reports',
      ],
      images: [
        {
          src: extensionPopup,
          alt: 'Browser extension popup',
        },
        {
          src: extensionResult,
          alt: 'Browser extension verification result',
        },
      ],
    },
    {
      icon: '💬',
      title: 'WhatsApp Verification',
      description:
        'Use our WhatsApp bot for easy fact-checking within chats. Just send a message and get instant verification.',
      color: 'from-green-500 to-emerald-600',
      features: [
        'Instant responses',
        'Group support',
        'Private chats',
        'Markdown formatted reports',
      ],
      images: [
        {
          src: whatsappImage,
          alt: 'WhatsApp verification bot in action',
        },
      ],
    },
    {
      icon: '✈️',
      title: 'Telegram Bot',
      description:
        'Verify claims right inside Telegram groups or private messages. Fast, reliable, and always online.',
      color: 'from-blue-500 to-cyan-600',
      features: [
        'Bot commands',
        'Inline mode',
        'Channel support',
        'Clickable source links',
      ],
      images: [
        {
          src: telegramImage,
          alt: 'Telegram bot verification',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-24 pb-12 px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
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

        {/* Services Sections - Horizontal Layout (Text Left, Images Right) */}
        <div className="space-y-12 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (sectionsRef.current[index] = el)}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-700 hover:shadow-2xl hover:border-white/30"
              style={{ opacity: 0 }}
            >
              {/* Horizontal Layout: Conditional order based on service */}
              <div
                className={`flex flex-col lg:flex-row gap-8 items-start ${
                  service.title === 'WhatsApp Verification'
                    ? 'lg:flex-row-reverse'
                    : ''
                }`}
              >
                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  {/* Service Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-7xl">{service.icon}</div>
                    <h2
                      className={`text-5xl font-bold pb-4 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
                    >
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-white/80 text-xl mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-3">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2 backdrop-blur-sm bg-white/5 px-4 py-2.5 rounded-full border border-white/10"
                      >
                        <svg
                          className="w-5 h-5 text-green-400 flex-shrink-0"
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
                        <span className="text-white/70 text-base">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Images */}
                <ServiceImageDisplay
                  images={service.images}
                  serviceTitle={service.title}
                />
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
