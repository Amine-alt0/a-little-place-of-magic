import React from 'react';

interface AtmosphereProps {
  paused?: boolean;
}

// 16 floating spell lights particle data from Figma coordinates and durations
const SPELL_LIGHTS = [
  { id: 1, left: '4%', top: '153px', size: 3, animClass: 'anim-spell-1' },
  { id: 2, left: '15%', top: '266px', size: 2, animClass: 'anim-spell-2' },
  { id: 3, left: '26%', top: '379px', size: 2, animClass: 'anim-spell-3' },
  { id: 4, left: '37%', top: '492px', size: 2, animClass: 'anim-spell-1' },
  { id: 5, left: '48%', top: '605px', size: 3, animClass: 'anim-spell-2' },
  { id: 6, left: '59%', top: '718px', size: 2, animClass: 'anim-spell-3' },
  { id: 7, left: '70%', top: '831px', size: 2, animClass: 'anim-spell-1' },
  { id: 8, left: '81%', top: '144px', size: 2, animClass: 'anim-spell-2' },
  { id: 9, left: '92%', top: '257px', size: 3, animClass: 'anim-spell-3' },
  { id: 10, left: '5%', top: '370px', size: 2, animClass: 'anim-spell-1' },
  { id: 11, left: '16%', top: '483px', size: 2, animClass: 'anim-spell-2' },
  { id: 12, left: '27%', top: '596px', size: 2, animClass: 'anim-spell-3' },
  { id: 13, left: '38%', top: '709px', size: 3, animClass: 'anim-spell-1' },
  { id: 14, left: '49%', top: '822px', size: 2, animClass: 'anim-spell-2' },
  { id: 15, left: '60%', top: '135px', size: 2, animClass: 'anim-spell-3' },
  { id: 16, left: '71%', top: '248px', size: 2, animClass: 'anim-spell-1' },
];

export const Atmosphere: React.FC<AtmosphereProps> = ({ paused = false }) => {
  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden z-0 ${paused ? 'motion-paused' : ''}`}>
      {/* Warm candlelight wash radial gradient / SVG */}
      <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-[1000px] max-w-[150vw] h-[560px] opacity-75">
        <img
          src="/assets/candlelight-wash.svg"
          alt=""
          className="w-full h-full object-cover filter blur-[2px]"
        />
      </div>

      {/* Floating golden particles */}
      <div className="absolute inset-0">
        {SPELL_LIGHTS.map((light) => (
          <div
            key={light.id}
            className={`absolute rounded-full bg-[#f1e6d0] shadow-[0_0_8px_2px_rgba(197,166,106,0.6)] ${light.animClass}`}
            style={{
              left: light.left,
              top: light.top,
              width: `${light.size}px`,
              height: `${light.size}px`,
            }}
          />
        ))}
      </div>

      {/* Left Candlelight (Visible on desktop/tablet) */}
      <div className="hidden lg:block absolute left-[50px] xl:left-[78px] top-[238px] w-[46px] h-[86px]">
        {/* Soft flame halo */}
        <div className="absolute -inset-[12px] anim-halo">
          <img src="/assets/flame-halo.svg" alt="" className="w-full h-full object-contain" />
        </div>
        {/* Ivory candle body */}
        <div className="absolute left-[19px] top-[31px] w-[8px] h-[36px] bg-[#b5a786] rounded-[2px] shadow-sm" />
        {/* Candle base */}
        <div className="absolute left-[14px] top-[69px] w-[18px] h-[3px] bg-[#806b55] rounded-[2px]" />
        {/* Flickering flame */}
        <div className="absolute left-[20px] top-[15px] w-[6px] h-[14px] anim-flame">
          <img src="/assets/candle-flame.svg" alt="" className="w-full h-full" />
        </div>
      </div>

      {/* Right Candlelight (Visible on desktop/tablet) */}
      <div className="hidden lg:block absolute right-[50px] xl:right-[78px] top-[238px] w-[46px] h-[86px]">
        {/* Soft flame halo */}
        <div className="absolute -inset-[12px] anim-halo">
          <img src="/assets/flame-halo.svg" alt="" className="w-full h-full object-contain" />
        </div>
        {/* Ivory candle body */}
        <div className="absolute left-[19px] top-[31px] w-[8px] h-[36px] bg-[#b5a786] rounded-[2px] shadow-sm" />
        {/* Candle base */}
        <div className="absolute left-[14px] top-[69px] w-[18px] h-[3px] bg-[#806b55] rounded-[2px]" />
        {/* Flickering flame */}
        <div className="absolute left-[20px] top-[15px] w-[6px] h-[14px] anim-flame">
          <img src="/assets/candle-flame.svg" alt="" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};
