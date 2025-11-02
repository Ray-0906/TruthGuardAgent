import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import api from '../api/api';
import ResultCard from './ResultCard';

function Console() {
  const [text, setText] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const textareaRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Animate on mount
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setResults(null);

    // Button loading animation
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    try {
      const res = await api.post('/verify_for_frontend_extension_app', {
        text,
      });
      setResults(res.data);
    } catch (err) {
      setResults({ error: 'Verification failed, try again.' });
    }
    setLoading(false);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    // Subtle animation on typing
    gsap.to(textareaRef.current, {
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
      duration: 0.3,
    });
  };

  const handleTextBlur = () => {
    gsap.to(textareaRef.current, {
      boxShadow: '0 0 0 rgba(59, 130, 246, 0)',
      duration: 0.3,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-24 pb-12 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div ref={containerRef} className="max-w-4xl mx-auto relative z-10">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-8">
          <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Verification Console
          </h2>
          <p className="text-white/70 text-lg">
            Paste any text, news, or claim to verify its authenticity
          </p>
          <div className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>

        {/* Console Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl mb-8"
        >
          <div className="relative">
            <textarea
              ref={textareaRef}
              className="w-full h-48 p-6 rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition-all duration-300 resize-none font-mono text-base"
              placeholder="🔍 Paste news, tweets, or any text to verify...
              
Example: 'Scientists have discovered a new planet in our solar system.'"
              value={text}
              onChange={handleTextChange}
              onBlur={handleTextBlur}
            />
            {/* Character counter */}
            <div className="absolute bottom-4 right-4 text-white/40 text-sm">
              {text.length} characters
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              onClick={() => {
                setText('');
                gsap.fromTo(
                  textareaRef.current,
                  { scale: 1 },
                  { scale: 0.98, duration: 0.1, yoyo: true, repeat: 1 }
                );
              }}
              className="text-white/60 hover:text-white/90 transition-colors duration-200 flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span>Clear</span>
            </button>

            <button
              ref={buttonRef}
              type="submit"
              className="relative group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 px-8 rounded-full font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 overflow-hidden"
              disabled={loading || !text.trim()}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Check Facts</span>
                </>
              )}
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
          </div>
        </form>

        {/* Results */}
        {results && (
          <div className="animate-fadeIn">
            <ResultCard results={results} />
          </div>
        )}

        {/* Tips Section */}
        {!results && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              {
                icon: '💡',
                title: 'Quick Tips',
                text: 'Paste complete sentences for better accuracy',
              },
              {
                icon: '🎯',
                title: 'Best Results',
                text: 'Include context and specific claims',
              },
              {
                icon: '⚡',
                title: 'Fast Check',
                text: 'Get results in seconds with AI analysis',
              },
            ].map((tip, index) => (
              <div
                key={tip.title}
                className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{tip.icon}</div>
                <h4 className="text-white font-semibold mb-1">{tip.title}</h4>
                <p className="text-white/60 text-sm">{tip.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Console;
