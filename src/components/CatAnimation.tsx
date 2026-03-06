interface CatAnimationProps {
  mood: 'greeting' | 'happy' | 'thinking';
  size: 'xl';
}

export default function CatAnimation({ mood }: CatAnimationProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-32 h-32 mx-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          @keyframes greetingWave {
            0%, 100% { transform: rotateZ(0deg); }
            25% { transform: rotateZ(30deg); }
            50% { transform: rotateZ(0deg); }
            75% { transform: rotateZ(15deg); }
          }
          @keyframes jumpHappy {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          @keyframes tailWag {
            0%, 100% { transform: rotateZ(-20deg); }
            50% { transform: rotateZ(20deg); }
          }
          .cat-body {
            animation: ${mood === 'greeting' ? 'greetingWave 1.2s ease-in-out infinite' : 'jumpHappy 1.5s ease-in-out infinite'};
            transform-origin: 100px 100px;
          }
          .cat-tail {
            animation: tailWag 0.6s ease-in-out infinite;
            transform-origin: 100px 140px;
          }
          .cat-eye {
            animation: catBlink 3s infinite;
          }
          @keyframes catBlink {
            0%, 90%, 100% { opacity: 1; }
            95% { opacity: 0; }
          }
        `}</style>
      </defs>

      <circle cx="100" cy="175" r="20" fill="#F3E8FF" opacity="0.3" />

      <g className="cat-body">
        <circle cx="100" cy="80" r="32" fill="#FBBF24" />

        <circle cx="75" cy="55" r="11" fill="#FBBF24" />
        <circle cx="125" cy="55" r="11" fill="#FBBF24" />

        <path d="M 72 52 L 68 35 L 80 50" fill="#F59E0B" />
        <path d="M 128 52 L 132 35 L 120 50" fill="#F59E0B" />

        <path d="M 75 55 L 70 40 L 82 55" fill="#FBBF24" />
        <path d="M 125 55 L 130 40 L 118 55" fill="#FBBF24" />

        <circle cx="85" cy="75" r="7" fill="#FEF08A" />
        <circle cx="115" cy="75" r="7" fill="#FEF08A" />

        <circle cx="85" cy="75" r="5" fill="#1F2937" className="cat-eye" />
        <circle cx="115" cy="75" r="5" fill="#1F2937" className="cat-eye" />

        <circle cx="86" cy="73" r="2" fill="#FFFFFF" />
        <circle cx="116" cy="73" r="2" fill="#FFFFFF" />

        <circle cx="100" cy="88" r="3.5" fill="#F59E0B" />

        {mood === 'greeting' && (
          <>
            <path d="M 85 95 Q 80 100 75 97" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 115 95 Q 120 100 125 97" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </>
        )}

        {mood !== 'greeting' && (
          <>
            <path d="M 85 95 Q 82 100 78 98" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 115 95 Q 118 100 122 98" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </>
        )}

        <path d="M 100 88 L 100 105" stroke="#1F2937" strokeWidth="1.5" />

        <path d="M 85 125 Q 75 135 70 128" stroke="#F59E0B" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 115 125 Q 125 135 130 128" stroke="#F59E0B" strokeWidth="4" fill="none" strokeLinecap="round" />

        <path d="M 100 88 L 100 100" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
      </g>

      <path
        className="cat-tail"
        d="M 100 140 Q 110 150 105 165"
        stroke="#F59E0B"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />

      {mood === 'greeting' && (
        <ellipse cx="145" cy="90" rx="22" ry="28" fill="#FBBF24" opacity="0.9" style={{
          animation: 'greetingWave 1.2s ease-in-out infinite',
          transformOrigin: '160px 85px'
        }} />
      )}

      {mood === 'happy' && (
        <>
          <circle cx="55" cy="45" r="5" fill="#FBD34D" opacity="0.8" className="animate-pulse" />
          <circle cx="145" cy="45" r="5" fill="#FBD34D" opacity="0.8" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
          <circle cx="100" cy="25" r="5" fill="#FBD34D" opacity="0.8" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
        </>
      )}

      {mood === 'thinking' && (
        <>
          <circle cx="150" cy="50" r="4" fill="#FBBF24" opacity="0.7" className="animate-bounce" style={{ animationDelay: '0s' }} />
          <circle cx="165" cy="65" r="3" fill="#FBBF24" opacity="0.5" className="animate-bounce" style={{ animationDelay: '0.2s' }} />
        </>
      )}
    </svg>
  );
}
