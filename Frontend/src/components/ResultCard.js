import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

function ResultCard({ results }) {
  const cardRef = useRef(null);
  const verdictRef = useRef(null);
  const evidenceRef = useRef([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Animate card entrance
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.5)',
      }
    );

    // Animate verdict
    gsap.fromTo(
      verdictRef.current,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        delay: 0.3,
        ease: 'power2.out',
      }
    );

    // Stagger animate evidence items
    if (evidenceRef.current.length > 0) {
      gsap.fromTo(
        evidenceRef.current,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.5,
          ease: 'power2.out',
        }
      );
    }
  }, [results]);

  if (results.error) {
    return (
      <div className="backdrop-blur-xl bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-6 text-center">
        <div className="text-5xl mb-3">❌</div>
        <div className="text-red-400 font-semibold text-lg">
          {results.error}
        </div>
      </div>
    );
  }

  // Normalize different response shapes (backend v1 vs v2)
  const verdict = (
    results?.verdict ||
    results?.result?.verdict ||
    'unverified'
  )?.toString();
  const confidenceRaw =
    typeof results?.confidence === 'number'
      ? results.confidence
      : typeof results?.result?.confidence === 'number'
      ? results.result.confidence
      : undefined;
  const confidence =
    typeof confidenceRaw === 'number'
      ? Math.round(confidenceRaw <= 1 ? confidenceRaw * 100 : confidenceRaw)
      : undefined;
  const evidence = Array.isArray(results?.evidence)
    ? results.evidence
    : Array.isArray(results?.result?.evidence)
    ? results.result.evidence
    : [];
  const formatted =
    results?.formatted_response || results?.result?.raw_final || '';

  // Try to extract a short summary from formatted markdown if not provided
  const extractSummary = (md) => {
    if (!md) return undefined;
    // Strip code fences if present
    const stripped = md
      .replace(/^```(?:markdown)?\n/, '')
      .replace(/\n```$/, '');
    const lines = stripped.split(/\r?\n/);
    const startIdx = lines.findIndex((l) =>
      l.trim().toLowerCase().startsWith('### summary')
    );
    if (startIdx === -1) return undefined;
    let i = startIdx + 1;
    const acc = [];
    while (i < lines.length && !/^###\s/.test(lines[i])) {
      if (lines[i].trim().length) acc.push(lines[i]);
      i++;
    }
    return acc.join(' ').trim();
  };

  const summary = results?.summary || extractSummary(formatted);

  const isTrue = verdict?.toLowerCase().includes('true');
  const isFalse = verdict?.toLowerCase().includes('false');

  const getVerdictColor = () => {
    if (isTrue) return 'from-green-500 to-emerald-600';
    if (isFalse) return 'from-red-500 to-rose-600';
    return 'from-yellow-500 to-orange-600';
  };

  const getVerdictIcon = () => {
    if (isTrue) return '✅';
    if (isFalse) return '❌';
    return '⚠️';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div
      ref={cardRef}
      className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl"
    >
      {/* Verdict Section */}
      <div
        ref={verdictRef}
        className="flex items-center justify-between mb-6 pb-6 border-b border-white/20"
      >
        <div className="flex items-center space-x-4">
          <div className="text-6xl animate-bounce">{getVerdictIcon()}</div>
          <div>
            <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-1">
              Verdict
            </h3>
            <p
              className={`text-3xl font-extrabold bg-gradient-to-r ${getVerdictColor()} bg-clip-text text-transparent`}
            >
              {verdict}
            </p>
          </div>
        </div>

        {/* Confidence Score */}
        {confidence !== undefined && (
          <div className="text-right">
            <h4 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-1">
              Confidence
            </h4>
            <div className="flex items-center space-x-2">
              <div className="relative w-32 h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getVerdictColor()} rounded-full transition-all duration-1000`}
                  style={{ width: `${confidence}%` }}
                ></div>
              </div>
              <span
                className={`text-2xl font-bold ${getConfidenceColor(
                  confidence
                )}`}
              >
                {confidence}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Evidence Section */}
      {evidence && evidence.length > 0 && (
        <div>
          <h4 className="text-white font-semibold text-xl mb-4 flex items-center space-x-2">
            <svg
              className="w-6 h-6 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Evidence</span>
          </h4>
          <ul className="space-y-3">
            {evidence.map((item, i) => (
              <li
                key={i}
                ref={(el) => (evidenceRef.current[i] = el)}
                className="flex items-start space-x-3 backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <span className="text-blue-400 font-bold text-lg flex-shrink-0">
                  {i + 1}.
                </span>
                <span className="text-white/90 text-base leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Summary if available */}
      {summary && (
        <div className="mt-6 pt-6 border-t border-white/20">
          <h4 className="text-white font-semibold text-lg mb-3 flex items-center space-x-2">
            <span className="text-2xl">📝</span>
            <span>Summary</span>
          </h4>
          <p className="text-white/80 text-base leading-relaxed backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10">
            {summary}
          </p>
        </div>
      )}

      {/* Full Markdown Report */}
      {formatted && (
        <div className="mt-6 pt-6 border-t border-white/20">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-semibold text-lg flex items-center space-x-2">
              <span className="text-2xl">📄</span>
              <span>Full Report</span>
            </h4>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(
                    formatted
                      .replace(/^```(?:markdown)?\n/, '')
                      .replace(/\n```$/, '')
                  );
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1200);
                } catch (_) {}
              }}
              className="text-sm px-3 py-1 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10 overflow-auto max-h-96">
            <pre className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
              {formatted
                .replace(/^```(?:markdown)?\n/, '')
                .replace(/\n```$/, '')}
            </pre>
          </div>
        </div>
      )}

      {/* Timestamp */}
      <div className="mt-6 text-center text-white/40 text-sm">
        <span>Verified at {new Date().toLocaleString()}</span>
      </div>
    </div>
  );
}

export default ResultCard;
