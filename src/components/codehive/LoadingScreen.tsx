'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isVisible: boolean;
}

export function LoadingScreen({ isVisible }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    
    const duration = 2500;
    const steps = 60;
    const increment = 100 / steps;
    const stepDuration = duration / steps;

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
      }
      setProgress(Math.floor(currentProgress));
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isVisible && progress === 100) {
      setIsExiting(true);
      // Completely remove from DOM after animation
      setTimeout(() => {
        setShouldRender(false);
      }, 1000);
    }
  }, [isVisible, progress]);

  // Don't render at all once animation is complete
  if (!isMounted || !shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black transition-all ${
        isExiting ? 'duration-700 ease-in' : 'duration-0'
      }`}
      style={{
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.5)' : 'scale(1)',
        filter: isExiting ? 'blur(20px)' : 'blur(0px)',
      }}
    >
      {/* Animated Background Grid */}
      <div className={`absolute inset-0 transition-opacity ${isExiting ? 'duration-500 opacity-0' : 'opacity-20'}`}>
        <div className="absolute inset-0 animate-grid-move" style={{
          backgroundImage: `
            linear-gradient(rgba(201, 162, 39, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201, 162, 39, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Radial Burst Effect on Exit */}
      {isExiting && (
        <div className="absolute inset-0 animate-pulse">
          <div className="absolute inset-0 bg-gradient-radial from-[#C9A227]/30 via-[#C9A227]/10 to-transparent" 
               style={{ animation: 'burst 0.7s ease-out forwards' }} />
        </div>
      )}

      {/* Main Container - Visor Shape */}
      <div className={`relative w-[900px] h-[400px] max-w-[90vw] transition-all ${
        isExiting ? 'duration-700 ease-in scale-150 opacity-0' : 'duration-0 scale-100 opacity-100'
      }`}>
        {/* Outer Glow */}
        <div 
          className={`absolute inset-0 rounded-[200px] blur-3xl transition-all ${
            isExiting ? 'duration-500 scale-150' : 'duration-0'
          }`}
          style={{
            background: 'radial-gradient(ellipse, rgba(201, 162, 39, 0.4) 0%, rgba(229, 200, 74, 0.3) 50%, transparent 100%)',
            animation: isExiting ? 'pulse 0.7s ease-out' : 'pulse 2s ease-in-out infinite'
          }}
        />
        
        {/* Visor Border */}
        <div 
          className="absolute inset-0 rounded-[200px] border-2"
          style={{
            borderColor: 'rgba(201, 162, 39, 0.6)',
            boxShadow: '0 0 40px rgba(201, 162, 39, 0.5), inset 0 0 40px rgba(201, 162, 39, 0.1)',
            background: 'radial-gradient(ellipse at center, rgba(20, 15, 5, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)'
          }}
        >
          
          {/* Corner Decorations */}
          <div 
            className="absolute top-4 left-8 w-16 h-16 border-l-2 border-t-2 rounded-tl-lg"
            style={{ borderColor: 'rgba(201, 162, 39, 0.7)' }}
          />
          <div 
            className="absolute top-4 right-8 w-16 h-16 border-r-2 border-t-2 rounded-tr-lg"
            style={{ borderColor: 'rgba(201, 162, 39, 0.7)' }}
          />
          <div 
            className="absolute bottom-4 left-8 w-16 h-16 border-l-2 border-b-2 rounded-bl-lg"
            style={{ borderColor: 'rgba(201, 162, 39, 0.7)' }}
          />
          <div 
            className="absolute bottom-4 right-8 w-16 h-16 border-r-2 border-b-2 rounded-br-lg"
            style={{ borderColor: 'rgba(201, 162, 39, 0.7)' }}
          />

          {/* Side Tech Elements */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {[0, 0.3, 0.6].map((delay, i) => (
              <div key={i} className="flex items-center gap-2">
                <div 
                  className="w-8 h-0.5"
                  style={{
                    background: 'linear-gradient(to right, transparent, rgba(201, 162, 39, 0.7))'
                  }}
                />
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ 
                    backgroundColor: 'rgba(201, 162, 39, 0.8)',
                    animationDelay: `${delay}s`,
                    boxShadow: '0 0 8px rgba(201, 162, 39, 0.6)'
                  }}
                />
              </div>
            ))}
          </div>

          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {[0, 0.3, 0.6].map((delay, i) => (
              <div key={i} className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ 
                    backgroundColor: 'rgba(201, 162, 39, 0.8)',
                    animationDelay: `${delay}s`,
                    boxShadow: '0 0 8px rgba(201, 162, 39, 0.6)'
                  }}
                />
                <div 
                  className="w-8 h-0.5"
                  style={{
                    background: 'linear-gradient(to left, transparent, rgba(201, 162, 39, 0.7))'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Center Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[600px] max-w-[70%]">
              
              {/* Top Tech Bar */}
              <div className="flex items-center gap-2 mb-6 opacity-70">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ 
                    backgroundColor: '#C9A227',
                    boxShadow: '0 0 10px rgba(201, 162, 39, 0.8)'
                  }}
                />
                <div 
                  className="flex-1 h-px"
                  style={{
                    background: 'linear-gradient(to right, rgba(201, 162, 39, 0.7), rgba(229, 200, 74, 0.5), transparent)'
                  }}
                />
                <div 
                  className="text-xs font-mono tracking-wider"
                  style={{ color: '#C9A227' }}
                >
                  {progress === 100 ? 'COMPLETE' : 'INITIALIZING'}
                </div>
              </div>

              {/* Main Title */}
              <div className="relative mb-8">
                <div 
                  className="absolute inset-0 blur-2xl opacity-40"
                  style={{
                    background: 'linear-gradient(to right, #C9A227, #E5C84A, #C9A227)',
                    animation: isExiting ? 'none' : 'pulse 2s ease-in-out infinite'
                  }}
                />
                <h1 className="relative font-sora text-5xl font-bold tracking-wider text-center">
                  <span 
                    className="bg-clip-text text-transparent animate-gradient-x"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #E5C84A, #FFD700, #E5C84A)',
                      WebkitTextStroke: '1px rgba(201, 162, 39, 0.3)',
                      filter: 'drop-shadow(0 0 20px rgba(201, 162, 39, 0.5))'
                    }}
                  >
                    CODEHIVE
                  </span>
                </h1>
                <div 
                  className="text-center mt-2 text-sm tracking-[0.3em] font-mono"
                  style={{ color: '#9ca3af' }}
                >
                  BUILD · CONNECT · GROW
                </div>
              </div>

              {/* Progress Container */}
              <div className="relative">
                {/* Tech Frame */}
                <div 
                  className="absolute -inset-4 border rounded-lg"
                  style={{ borderColor: 'rgba(201, 162, 39, 0.3)' }}
                >
                  <div 
                    className="absolute top-0 left-4 w-12 h-px"
                    style={{
                      background: 'linear-gradient(to right, transparent, #C9A227, transparent)'
                    }}
                  />
                  <div 
                    className="absolute bottom-0 right-4 w-12 h-px"
                    style={{
                      background: 'linear-gradient(to right, transparent, #E5C84A, transparent)'
                    }}
                  />
                </div>

                {/* Progress Bar */}
                <div 
                  className="relative h-8 bg-black/60 rounded-lg overflow-hidden border"
                  style={{ 
                    borderColor: 'rgba(201, 162, 39, 0.3)',
                    boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <div
                    className="h-full relative transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  >
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to right, #C9A227, #E5C84A, #FFD700)',
                        boxShadow: '0 0 30px rgba(201, 162, 39, 0.8), inset 0 0 20px rgba(255, 215, 0, 0.3)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                  </div>
                  
                  {/* Scan Line */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/4 animate-scan"
                      style={{ filter: 'blur(2px)' }}
                    />
                  </div>
                </div>

                {/* Progress Text */}
                <div className="flex items-center justify-between mt-3">
                  <div 
                    className="text-sm font-mono tracking-wider font-bold"
                    style={{ 
                      color: '#C9A227',
                      textShadow: '0 0 10px rgba(201, 162, 39, 0.5)'
                    }}
                  >
                    {progress}%
                  </div>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <div
                        key={i}
                        className="w-1 h-3 rounded-full transition-all duration-300"
                        style={{
                          background: 'linear-gradient(to top, #C9A227, #E5C84A)',
                          opacity: i < (progress / 12.5) ? 1 : 0.2,
                          boxShadow: i < (progress / 12.5) ? '0 0 8px rgba(201, 162, 39, 0.6)' : 'none'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Tech Bar */}
              <div className="flex items-center gap-2 mt-6 opacity-70">
                <div 
                  className="text-xs font-mono tracking-wider"
                  style={{ color: '#C9A227' }}
                >
                  {progress === 100 ? 'READY' : 'LOADING'}
                </div>
                <div 
                  className="flex-1 h-px"
                  style={{
                    background: 'linear-gradient(to left, rgba(201, 162, 39, 0.7), rgba(229, 200, 74, 0.5), transparent)'
                  }}
                />
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ 
                    backgroundColor: '#C9A227',
                    boxShadow: '0 0 10px rgba(201, 162, 39, 0.8)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Center Logo */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div 
              className="text-4xl font-bold opacity-30 font-sora tracking-wider"
              style={{ 
                color: '#C9A227',
                textShadow: '0 0 20px rgba(201, 162, 39, 0.4)'
              }}
            >
              CH
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes burst {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
