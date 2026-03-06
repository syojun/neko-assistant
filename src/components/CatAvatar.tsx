interface CatAvatarProps {
  mood: 'happy' | 'neutral' | 'thinking';
  size: 'md' | 'lg';
}

export default function CatAvatar({ mood, size }: CatAvatarProps) {
  const sizeClasses = size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const viewBox = '0 0 100 100';

  return (
    <svg
      viewBox={viewBox}
      className={`${sizeClasses} flex-shrink-0`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          @keyframes catBlink {
            0%, 90%, 100% { opacity: 1; }
            95% { opacity: 0; }
          }
          @keyframes catNod {
            0%, 100% { transform: rotateZ(0deg); }
            50% { transform: rotateZ(4deg); }
          }
          @keyframes catThink {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-2px); }
          }
          .cat-head {
            animation: ${mood === 'thinking' ? 'catThink 2s infinite' : 'catNod 3s infinite'};
            transform-origin: 50px 50px;
          }
          .cat-eye {
            animation: catBlink 3s infinite;
          }
        `}</style>
      </defs>

      <g className="cat-head">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="0" dy="1" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.2"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <circle cx="50" cy="50" r="28" fill="#FBB04D" filter="url(#shadow)" />

        <circle cx="50" cy="50" r="26" fill="#FBBF24" />

        <circle cx="33" cy="32" r="8" fill="#FBBF24" />
        <circle cx="67" cy="32" r="8" fill="#FBBF24" />

        <path d="M 30 30 L 28 18 L 38 28" fill="#F59E0B" />
        <path d="M 70 30 L 72 18 L 62 28" fill="#F59E0B" />

        <path d="M 33 32 L 30 20 L 38 32" fill="#FBBF24" />
        <path d="M 67 32 L 70 20 L 62 32" fill="#FBBF24" />

        <circle cx="38" cy="46" r="6" fill="#FEF08A" />
        <circle cx="62" cy="46" r="6" fill="#FEF08A" />

        <circle cx="38" cy="46" r="4" fill="#1F2937" className="cat-eye" />
        <circle cx="62" cy="46" r="4" fill="#1F2937" className="cat-eye" />

        <circle cx="39" cy="44" r="1.5" fill="#FFFFFF" />
        <circle cx="63" cy="44" r="1.5" fill="#FFFFFF" />

        <circle cx="50" cy="58" r="3" fill="#F59E0B" />

        {mood === 'happy' && (
          <>
            <path d="M 38 62 Q 35 65 32 63" stroke="#1F2937" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 62 62 Q 65 65 68 63" stroke="#1F2937" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 50 62 L 50 68" stroke="#1F2937" strokeWidth="1" />
          </>
        )}

        {mood === 'neutral' && (
          <>
            <path d="M 38 62 L 32 62" stroke="#1F2937" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 62 62 L 68 62" stroke="#1F2937" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 50 62 L 50 68" stroke="#1F2937" strokeWidth="1" />
          </>
        )}

        {mood === 'thinking' && (
          <>
            <path d="M 38 62 Q 35 65 32 63" stroke="#1F2937" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 62 62 Q 65 65 68 63" stroke="#1F2937" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 50 62 L 50 68" stroke="#1F2937" strokeWidth="1" />
          </>
        )}

        <path d="M 50 68 L 48 75 L 52 75" fill="#F59E0B" />
      </g>

      {mood === 'thinking' && (
        <>
          <circle cx="72" cy="32" r="2.5" fill="#FBBF24" opacity="0.8" className="animate-bounce" style={{ animationDelay: '0s' }} />
          <circle cx="80" cy="22" r="1.8" fill="#FBBF24" opacity="0.5" className="animate-bounce" style={{ animationDelay: '0.2s' }} />
        </>
      )}
    </svg>
  );
}
