import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

function Playground() {
  const titleRef = useRef(null);
  const instructionsRef = useRef(null);
  const examplesRef = useRef([]);
  const [selectedExample, setSelectedExample] = useState('');

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );

    gsap.fromTo(
      instructionsRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, delay: 0.1, ease: 'power2.out' }
    );

    gsap.fromTo(
      examplesRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        delay: 0.2,
        ease: 'power2.out',
      }
    );
  }, []);

  const examples = [
    {
      title: 'Breaking News',
      icon: '📰',
      text: 'Scientists have discovered a new planet in our solar system that is twice the size of Earth.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Health Claim',
      icon: '🏥',
      text: 'Drinking warm lemon water every morning can cure diabetes completely.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Tech Rumor',
      icon: '💻',
      text: 'Apple is releasing a foldable iPhone next month with holographic display technology.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Social Media',
      icon: '📱',
      text: "The government is using 5G towers to control people's minds and track their every movement.",
      color: 'from-red-500 to-orange-500',
    },
  ];

  const handleExampleClick = (text) => {
    setSelectedExample(text);
    gsap.fromTo(
      '.example-text',
      { scale: 0.95 },
      { scale: 1, duration: 0.3, ease: 'back.out(2)' }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-28 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-10">
          <h1 className="text-5xl font-extrabold pb-4 mb-3 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-lg">
            Playground
          </h1>
          <p className="text-white text-lg">
            Try TruthGuard with real examples
          </p>
          <div className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
        </div>

        {/* Instructions */}
        <div
          ref={instructionsRef}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 mb-10"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <span className="text-3xl">🎮</span>
            <span>How to Use</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                text: 'Choose an example or enter your own text',
                icon: '👆',
              },
              {
                step: '2',
                text: 'Click the example to load it into the console',
                icon: '✨',
              },
              {
                step: '3',
                text: 'See instant verification results with evidence',
                icon: '🎯',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-blue-400 font-bold text-2xl mb-2">
                  Step {item.step}
                </div>
                <p className="text-white/80">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Examples Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            🎯 Try These Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {examples.map((example, index) => (
              <div
                key={index}
                ref={(el) => (examplesRef.current[index] = el)}
                onClick={() => handleExampleClick(example.text)}
                className="group cursor-pointer backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-5xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                    {example.icon}
                  </div>
                  <h3
                    className={`text-2xl font-bold bg-gradient-to-r ${example.color} bg-clip-text text-transparent`}
                  >
                    {example.title}
                  </h3>
                </div>
                <p className="text-white/80 leading-relaxed mb-4">
                  {example.text}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-400 text-sm font-semibold">
                    Click to try →
                  </span>
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${example.color} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Example Display */}
        {selectedExample && (
          <div className="backdrop-blur-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/20 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-3">
              <span className="text-3xl">📋</span>
              <span>Selected Example</span>
            </h3>
            <div className="example-text backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-6 mb-6">
              <p className="text-white/90 text-lg leading-relaxed">
                {selectedExample}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/console"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 px-8 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105"
              >
                Verify in Console →
              </a>
              <button
                onClick={() => setSelectedExample('')}
                className="backdrop-blur-lg bg-white/10 border-2 border-white/30 hover:bg-white/20 text-white py-3 px-8 rounded-full font-semibold transition-all duration-300"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* Bottom Info */}
        <div className="mt-12 text-center">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-white/70 text-lg">
              💡 <strong>Tip:</strong> You can also paste any text directly in
              the{' '}
              <a href="/console" className="text-blue-400 hover:underline">
                Console
              </a>{' '}
              for instant verification
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playground;
