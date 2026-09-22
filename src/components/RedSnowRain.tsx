import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  swaySpeed: number;
  swayAngle: number;
  swayDistance: number;
  baseOpacity: number;
  pulsePhase: number;
  pulseSpeed: number;
  colorType: 'bright' | 'crimson' | 'deep';
}

export const RedSnowRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive particle count (fewer on mobile for 60fps performance)
    const particleCount = width < 768 ? 35 : 65;
    const particles: Particle[] = [];

    const colorVariants = {
      bright: '248, 113, 113', // red-400
      crimson: '239, 68, 68',  // red-500
      deep: '220, 38, 38',     // red-600
    };

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 1.2, // 1.2px to 3.4px
        speedY: Math.random() * 1.4 + 0.8,  // 0.8 to 2.2 px/frame
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayAngle: Math.random() * Math.PI * 2,
        swayDistance: Math.random() * 1.2 + 0.5,
        baseOpacity: Math.random() * 0.45 + 0.35, // 0.35 to 0.8
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        colorType: i % 4 === 0 ? 'bright' : i % 3 === 0 ? 'deep' : 'crimson',
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move vertically (falling down like snow rain)
        p.y += p.speedY;

        // Subtle horizontal sway like drifting snowflakes
        p.swayAngle += p.swaySpeed;
        p.x += Math.sin(p.swayAngle) * p.swayDistance;

        // Subtle breathing glow pulse
        p.pulsePhase += p.pulseSpeed;
        const currentOpacity = Math.max(
          0.15,
          Math.min(0.9, p.baseOpacity + Math.sin(p.pulsePhase) * 0.15)
        );

        // Respawn if past bottom or off screen
        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        // Draw glowing red snow flake / rain droplet
        const rgb = colorVariants[p.colorType];
        ctx.save();
        ctx.shadowBlur = p.radius * 2.5;
        ctx.shadowColor = `rgba(${rgb}, ${currentOpacity * 0.8})`;

        ctx.beginPath();
        // Slight elongation in Y direction for rain-snow effect
        ctx.ellipse(p.x, p.y, p.radius * 0.85, p.radius * 1.2, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${currentOpacity})`;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause when tab is not active
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (!isRunning) {
          isRunning = true;
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Start loop
    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="red-snow-rain-canvas"
      className="fixed inset-0 pointer-events-none z-[2] overflow-hidden"
      aria-hidden="true"
    />
  );
};
