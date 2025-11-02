import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Header() {
  const { pathname } = useLocation();
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    // Animate logo on mount
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Stagger animate nav links
    gsap.fromTo(
      linksRef.current,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.3,
      }
    );

    // Scroll effect for navbar
    const showNav = gsap.fromTo(
      navRef.current,
      { y: 0 },
      {
        y: 0,
        paused: true,
        duration: 0.2,
      }
    );

    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      onUpdate: (self) => {
        self.direction === -1 ? showNav.play() : showNav.reverse();
      },
    });
  }, []);

  const linkClass = (path) => {
    const isActive = pathname === path;
    return `relative px-3 py-2 transition-all duration-300 ${
      isActive
        ? 'text-blue-400 font-semibold'
        : 'text-white/90 hover:text-white'
    } group`;
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl bg-gradient-to-r from-slate-900/80 via-blue-900/80 to-slate-900/80 border-b border-white/10 shadow-2xl"
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div ref={logoRef} className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
            <svg
              className="relative w-10 h-10"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z"
                fill="url(#shield-gradient)"
                stroke="white"
                strokeWidth="1"
              />
              <path
                d="M9 12L11 14L15 10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="shield-gradient"
                  x1="3"
                  y1="2"
                  x2="21"
                  y2="23"
                >
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="font-bold text-2xl tracking-wider bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
            TruthGuard
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-1 text-base">
          {[
            { path: '/', label: 'Home' },
            { path: '/services', label: 'Services' },
            { path: '/playground', label: 'Playground' },
            { path: '/about', label: 'About' },
            { path: '/console', label: 'Console' },
            { path: '/dashboard', label: 'Dashboard' },
            { path: '/history', label: 'History' },
            { path: '/login', label: 'Login' },
          ].map((link, index) => (
            <Link
              key={link.path}
              ref={(el) => (linksRef.current[index] = el)}
              className={linkClass(link.path)}
              to={link.path}
            >
              <span className="relative z-10">{link.label}</span>
              {/* Hover effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              {/* Active indicator */}
              {pathname === link.path && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Header;
