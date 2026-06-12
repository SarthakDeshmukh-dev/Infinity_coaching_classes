import { useRef, useEffect } from 'react';

interface ParticleGalaxyProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface ParticleData {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  reset: () => void;
  update: (
    width: number,
    height: number,
    mouseX: number,
    mouseY: number,
    warpMode: boolean
  ) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export default function ParticleGalaxy({ containerRef }: ParticleGalaxyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const warpModeRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    const particles: ParticleData[] = [];
    let animationFrameId: number;
    let isActive = true;
    let mouseX = width / 2;
    let mouseY = height / 2;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const maxParticles = isMobile ? 400 : 800;
    const spawnRate = isMobile ? 3 : 5;

    function resize() {
      if (!containerRef.current) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles.length = 0;
      mouseX = width / 2;
      mouseY = height / 2;
    }

    window.addEventListener('resize', resize);
    resize();

    function handleMouseMove(e: MouseEvent) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }

    function handleTouchMove(e: TouchEvent) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
    }

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('touchmove', handleTouchMove);
    }

    class Particle implements ParticleData {
      x = 0;
      y = 0;
      vx = 0;
      vy = 0;
      radius = 0;
      alpha = 0;

      constructor() {
        this.reset();
      }

      reset() {
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) {
          this.x = Math.random() * width;
          this.y = -10;
        } else if (edge === 1) {
          this.x = width + 10;
          this.y = Math.random() * height;
        } else if (edge === 2) {
          this.x = Math.random() * width;
          this.y = height + 10;
        } else {
          this.x = -10;
          this.y = Math.random() * height;
        }
        this.vx = 0;
        this.vy = 0;
        this.radius = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update(
        w: number,
        h: number,
        mx: number,
        my: number,
        warp: boolean
      ) {
        const centerX = w * 0.5;
        const centerY = h * 0.5;
        const dx = centerX - this.x;
        const dy = centerY - this.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        const gravity = warp ? 0.15 : 0.03;
        const mouseStrength = warp ? 0.2 : 0.05;

        this.vx += (dx / (dist || 1)) * gravity;
        this.vy += (dy / (dist || 1)) * gravity;

        const mdx = mx - this.x;
        const mdy = my - this.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 300 && mdist > 0) {
          this.vx += (mdx / mdist) * mouseStrength;
          this.vy += (mdy / mdist) * mouseStrength;
        }

        this.vx *= 0.96;
        this.vy *= 0.96;
        this.x += this.vx;
        this.y += this.vy;

        if (dist < 5) {
          this.reset();
        }
      }

      draw(drawingCtx: CanvasRenderingContext2D) {
        const warp = warpModeRef.current;
        if (warp) {
          drawingCtx.fillStyle = `rgba(255, 195, 0, ${this.alpha})`;
        } else {
          drawingCtx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        }
        drawingCtx.beginPath();
        drawingCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        drawingCtx.fill();
      }
    }

    function animate() {
      if (!isActive) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx!.fillStyle = 'rgba(0, 8, 20, 0.15)';
      ctx!.fillRect(0, 0, width, height);

      let spawned = 0;
      while (particles.length < maxParticles && spawned < spawnRate) {
        particles.push(new Particle());
        spawned++;
      }

      const time = Date.now() * 0.001;
      const cx = width * 0.5;
      const cy = height * 0.5;
      const pulse = Math.sin(time) * 15;

      const warp = warpModeRef.current;
      const r1 = warp ? 80 + pulse : 60 + pulse;
      const r2 = warp ? 140 + pulse : 120 + pulse;
      const innerAlpha = warp ? 1.0 : 0.8;

      const gradient = ctx!.createRadialGradient(cx, cy, 0, cx, cy, r1);
      gradient.addColorStop(0, `rgba(255, 195, 0, ${innerAlpha})`);
      gradient.addColorStop(0.5, 'rgba(58, 134, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(58, 134, 255, 0)');
      ctx!.fillStyle = gradient;
      ctx!.fillRect(0, 0, width, height);

      const gradient2 = ctx!.createRadialGradient(cx, cy, 0, cx, cy, r2);
      gradient2.addColorStop(0, 'rgba(58, 134, 255, 0.3)');
      gradient2.addColorStop(1, 'rgba(0, 29, 61, 0)');
      ctx!.fillStyle = gradient2;
      ctx!.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(width, height, mouseX, mouseY, warp);
        particles[i].draw(ctx!);
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      isActive = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        background: '#000814',
      }}
    />
  );
}

export { ParticleGalaxy };
export type { ParticleGalaxyProps };
