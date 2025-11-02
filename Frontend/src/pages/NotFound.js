import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col items-center justify-center px-6">
      <div
        ref={containerRef}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 text-center max-w-2xl"
      >
        <div className="text-9xl mb-6 animate-bounce">🔍</div>
        <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-white/70 text-lg mb-8">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 px-8 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
