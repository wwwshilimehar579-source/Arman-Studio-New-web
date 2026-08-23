import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { PhotoItem } from '../types';
import { soundFx } from '../utils/audio';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  RotateCcw,
  Sliders,
  Sparkles,
  Info,
  Compass,
  MousePointer,
  Smartphone,
  ZoomIn,
  ZoomOut,
  Eye
} from 'lucide-react';

interface Carousel3DProps {
  photos: PhotoItem[];
  onSelectPhoto: (photo: PhotoItem) => void;
  selectedCategoryName: string;
}

export const Carousel3D: React.FC<Carousel3DProps> = ({
  photos,
  onSelectPhoto,
  selectedCategoryName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3D Perspective & Motion States
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.32); // deg per frame (~19 deg/sec)
  const [tiltAngle, setTiltAngle] = useState<number>(-4); // vertical camera pitch
  const [targetTiltAngle, setTargetTiltAngle] = useState<number>(-4);
  const [depthScale, setDepthScale] = useState<number>(1.0); // radius depth multiplier
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [interactionMode, setInteractionMode] = useState<'idle' | 'scroll-spin' | 'mouse-tilt' | 'touch-drag' | 'pinch-zoom'>('idle');
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 800
  );

  // Physics & Touch tracking refs
  const dragStartXRef = useRef<number>(0);
  const dragStartYRef = useRef<number>(0);
  const dragStartAngleRef = useRef<number>(0);
  const dragStartTiltRef = useRef<number>(-4);
  const lastXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const interactionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Pinch to zoom multi-touch tracking ref
  const pinchStartDistRef = useRef<number>(0);
  const pinchStartDepthRef = useRef<number>(1.0);

  // Window resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const count = photos.length;
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // Responsive card dimensions
  const cardWidth = useMemo(() => {
    if (isMobile) return 185;
    if (isTablet) return 225;
    return 260;
  }, [isMobile, isTablet]);

  const cardHeight = useMemo(() => {
    if (isMobile) return 260;
    if (isTablet) return 315;
    return 360;
  }, [isMobile, isTablet]);

  // Cylinder radius calculation with depth multiplier
  const calculatedRadius = useMemo(() => {
    if (count < 3) return 260;
    const angleStepRad = (Math.PI * 2) / count;
    const baseRadius = (cardWidth / 2) / Math.tan(angleStepRad / 2);
    const minR = isMobile ? 210 : 310;
    const maxR = isMobile ? 380 : 540;
    const clamped = Math.max(minR, Math.min(maxR, baseRadius * 1.05));
    return clamped * depthScale;
  }, [count, cardWidth, isMobile, depthScale]);

  // Active front-facing card index
  const activeIndex = useMemo(() => {
    if (count === 0) return 0;
    const norm = ((-rotationAngle % 360) + 360) % 360;
    const step = 360 / count;
    const index = Math.round(norm / step) % count;
    return index;
  }, [rotationAngle, count]);

  // Helper to trigger brief interaction status badge
  const triggerInteraction = (mode: 'scroll-spin' | 'mouse-tilt' | 'touch-drag' | 'pinch-zoom') => {
    setInteractionMode(mode);
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    interactionTimerRef.current = setTimeout(() => {
      setInteractionMode('idle');
    }, 1500);
  };

  // Main 60fps Physics & Auto-Orbit Animation Loop
  useEffect(() => {
    let lastTimestamp = performance.now();

    const loop = (timestamp: number) => {
      const dt = Math.min((timestamp - lastTimestamp) / 16.667, 2.5);
      lastTimestamp = timestamp;

      // Smooth lerp camera pitch tilt towards target tilt
      setTiltAngle((prev) => {
        const diff = targetTiltAngle - prev;
        if (Math.abs(diff) < 0.05) return targetTiltAngle;
        return prev + diff * 0.12 * dt;
      });

      if (isDragging) {
        // Controlled directly by drag/pointer handlers
      } else if (Math.abs(velocityRef.current) > 0.02) {
        // Inertial spinning deceleration
        setRotationAngle((prev) => prev + velocityRef.current * dt);
        velocityRef.current *= 0.94; // friction
      } else if (isAutoRotating) {
        // Continuous auto-spin
        setRotationAngle((prev) => prev + rotationSpeed * dt);
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isDragging, isAutoRotating, rotationSpeed, targetTiltAngle]);

  // 1. MOUSE WHEEL HANDLER: Automatic scroll-to-spin, shift-to-tilt & ctrl-to-zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Prevent document scrolling while interacting with 3D stage
    e.preventDefault();

    if (e.ctrlKey || e.altKey || e.metaKey) {
      // Option 3: Automatic 3D Ring Cylinder Radius Zoom
      triggerInteraction('pinch-zoom');
      const zoomDelta = e.deltaY * -0.0015;
      setDepthScale((prev) => Math.max(0.70, Math.min(1.40, prev + zoomDelta)));
    } else if (e.shiftKey) {
      // Option 1: Vertical Camera Pitch / Tilt via Shift+Wheel
      triggerInteraction('mouse-tilt');
      const tiltDelta = e.deltaY * 0.08;
      setTargetTiltAngle((prev) => Math.max(-25, Math.min(25, prev - tiltDelta)));
    } else {
      // Option 2: Automatic Mouse Scroll to Spin Cylinder
      triggerInteraction('scroll-spin');
      soundFx.playSpinTick();
      const rawDelta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const spinDelta = rawDelta * (isMobile ? 0.25 : 0.18);
      
      // Direct rotation impulse + inertia velocity
      setRotationAngle((prev) => prev - spinDelta);
      velocityRef.current = -spinDelta * 0.45;

      // Auto-resume auto-spin after 2.5s of idle
      if (isAutoRotating) {
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => {
          velocityRef.current = 0;
        }, 2500);
      }
    }
  };

  // 2. MOUSE MOVEMENT / PARALLAX: Automatic vertical cursor tilt tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Calculate vertical cursor offset from center (-1 top, +1 bottom)
    const mouseY = e.clientY - rect.top;
    const normY = (mouseY / rect.height) * 2 - 1; // range -1 to +1
    
    // Automatic Camera Pitch: Cursor near top tilts up to +14°, cursor near bottom tilts down to -20°
    const autoTilt = -4 - normY * 16;
    setTargetTiltAngle(Math.max(-25, Math.min(22, autoTilt)));
  };

  // 3. MOUSE LEAVE: Reset tilt smoothly back to default -4°
  const handleMouseLeave = () => {
    if (!isDragging) {
      setTargetTiltAngle(-4);
      setInteractionMode('idle');
    }
  };

  // 4. POINTER / TOUCH DRAG START (Universal Mouse Drag & 1-Finger Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button, input, select, a')) return;
    
    setIsDragging(true);
    triggerInteraction(e.pointerType === 'touch' ? 'touch-drag' : 'scroll-spin');
    
    dragStartXRef.current = e.clientX;
    dragStartYRef.current = e.clientY;
    dragStartAngleRef.current = rotationAngle;
    dragStartTiltRef.current = targetTiltAngle;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;

    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  // 5. POINTER MOVE: Multi-axis 3D control (X = Rotation Spin, Y = Camera Pitch Tilt)
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const currentX = e.clientX;
    const currentY = e.clientY;
    const now = performance.now();
    const deltaX = currentX - dragStartXRef.current;
    const deltaY = currentY - dragStartYRef.current;
    
    // Sensitivity
    const xSensitivity = isMobile ? 0.38 : 0.28;
    const newAngle = dragStartAngleRef.current + deltaX * xSensitivity;
    setRotationAngle(newAngle);

    // Option 1 on Touch / Drag: Vertical movement controls Camera Tilt
    if (e.pointerType === 'touch' || e.buttons === 1) {
      const ySensitivity = 0.16;
      const newTilt = Math.max(-25, Math.min(25, dragStartTiltRef.current - deltaY * ySensitivity));
      setTargetTiltAngle(newTilt);
    }

    // Inertial velocity tracking
    const dt = now - lastTimeRef.current;
    if (dt > 8) {
      const instantDx = currentX - lastXRef.current;
      velocityRef.current = (instantDx / dt) * 14 * xSensitivity;
      lastXRef.current = currentX;
      lastTimeRef.current = now;
    }
  };

  // 6. POINTER UP: Release and resume physics
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }

    if (isAutoRotating) {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        velocityRef.current = 0;
      }, 2500);
    }
  };

  // 7. TOUCHSCREEN MULTI-TOUCH PINCH TO ZOOM RADIUS (Mobile Specific)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      triggerInteraction('pinch-zoom');
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      pinchStartDistRef.current = dist;
      pinchStartDepthRef.current = depthScale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && pinchStartDistRef.current > 0) {
      triggerInteraction('pinch-zoom');
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const ratio = dist / pinchStartDistRef.current;
      const newDepth = Math.max(0.70, Math.min(1.40, pinchStartDepthRef.current * ratio));
      setDepthScale(newDepth);
    }
  };

  // Snap to specific photo
  const snapToCard = useCallback((index: number) => {
    if (count === 0) return;
    soundFx.playSpinTick();
    const step = 360 / count;
    const targetAngle = -(index * step);
    
    const currentNorm = rotationAngle;
    const diff = ((targetAngle - currentNorm + 180) % 360) - 180;
    const snapped = currentNorm + diff;

    velocityRef.current = 0;
    setRotationAngle(snapped);
  }, [count, rotationAngle]);

  const handlePrev = () => {
    soundFx.playSpinTick();
    const step = 360 / count;
    setRotationAngle((prev) => prev + step);
  };

  const handleNext = () => {
    soundFx.playSpinTick();
    const step = 360 / count;
    setRotationAngle((prev) => prev - step);
  };

  const handleResetAngle = () => {
    setRotationAngle(0);
    setTargetTiltAngle(-4);
    setTiltAngle(-4);
    setDepthScale(1.0);
    velocityRef.current = 0;
  };

  const activePhoto = photos[activeIndex] || photos[0];

  return (
    <section 
      id="3d-gallery-stage" 
      className="relative w-full overflow-hidden select-none pt-6 pb-16 sm:pb-20 bg-[#050505]"
    >
      {/* Background Ambient Glow & Radial Vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[700px] h-[340px] sm:h-[700px] bg-[#c5a059]/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #222 0%, transparent 70%)' }} />
      </div>

      {/* Stage Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 mb-4 sm:mb-6 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#c5a059] text-[11px] font-medium tracking-[0.3em] uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Interactive 3D Stage • {selectedCategoryName}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif-classic italic font-normal tracking-tight text-white drop-shadow-sm">
          The 3D Cylinder Showcase
        </h2>
        <p className="text-white/50 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-light tracking-wide">
          Fully automated 3D ring: scroll mouse wheel to spin, move cursor to tilt pitch, and pinch or ctrl+scroll to zoom radius depth.
        </p>
      </div>

      {/* Real-time Dynamic 3D Telemetry HUD Bar (Live Automatic Feedback) */}
      <div className="relative max-w-2xl mx-auto px-4 mb-3 z-10">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md text-[10px] sm:text-[11px] text-white/70">
          
          {/* Automatic Gesture Guide */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
            <span className="text-[#c5a059] font-medium uppercase tracking-wider hidden sm:inline">
              Auto Gestures Active:
            </span>
            <span className="text-white/80 font-light hidden md:inline">
              Scroll = Spin • Move = Tilt • Ctrl+Scroll = Zoom
            </span>
            <span className="text-white/80 font-light md:hidden">
              Swipe = Spin • Vertical = Tilt • Pinch = Zoom
            </span>
          </div>

          {/* Live Telemetry Values */}
          <div className="flex items-center gap-3 font-mono text-[10px] sm:text-xs">
            <div className="flex items-center gap-1">
              <span className="text-white/40">Pitch:</span>
              <span className="text-[#c5a059] font-semibold">{tiltAngle.toFixed(0)}°</span>
            </div>
            <div className="w-[1px] h-3 bg-white/20" />
            <div className="flex items-center gap-1">
              <span className="text-white/40">Spin:</span>
              <span className="text-[#c5a059] font-semibold">{(rotationSpeed * 60).toFixed(0)}°/s</span>
            </div>
            <div className="w-[1px] h-3 bg-white/20" />
            <div className="flex items-center gap-1">
              <span className="text-white/40">Radius:</span>
              <span className="text-[#c5a059] font-semibold">{calculatedRadius.toFixed(0)}px</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Viewport / Stage Container */}
      <div 
        ref={containerRef}
        id="carousel-3d-viewport"
        className="relative w-full h-[390px] sm:h-[460px] md:h-[510px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none perspective-container"
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={{
          perspective: `${isMobile ? 900 : 1200}px`,
        }}
      >
        {/* The 3D Rotating Ring Cylinder */}
        <div
          id="carousel-3d-cylinder"
          className="relative preserve-3d transition-transform ease-out will-change-transform"
          style={{
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
            transform: `rotateX(${tiltAngle}deg) rotateY(${rotationAngle}deg)`,
            transformStyle: 'preserve-3d',
            transitionDuration: isDragging ? '0ms' : '60ms',
          }}
        >
          {photos.map((photo, index) => {
            const angleStep = 360 / count;
            const cardAngle = index * angleStep;
            const isCurrent = index === activeIndex;

            return (
              <div
                key={photo.id}
                id={`carousel-card-${photo.id}`}
                className="absolute inset-0 select-none group"
                style={{
                  transform: `rotateY(${cardAngle}deg) translateZ(${calculatedRadius}px)`,
                  backfaceVisibility: 'visible',
                  WebkitBackfaceVisibility: 'visible',
                }}
              >
                {/* Outer Framing Card */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFx.playShutterSound();
                    onSelectPhoto(photo);
                  }}
                  className={`w-full h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform-gpu p-[3px] ${
                    isCurrent
                      ? 'bg-gradient-to-b from-[#f3e3b6] via-[#c5a059] to-[#8c6d32] shadow-[0_0_35px_rgba(197,160,89,0.45)] scale-105 ring-2 ring-[#c5a059]'
                      : 'bg-white/10 hover:bg-white/30 hover:scale-102 opacity-75 hover:opacity-100'
                  }`}
                >
                  {/* Card Content Interior */}
                  <div className={`relative w-full h-full overflow-hidden flex flex-col justify-between ${isCurrent ? 'bg-white' : 'bg-[#111]'}`}>
                    
                    {/* Upper Image Section */}
                    <div className="relative flex-1 w-full overflow-hidden bg-[#1a1a1a]">
                      <img
                        src={photo.thumbnailUrl}
                        srcSet={`${photo.thumbnailUrl} 400w, ${photo.imageUrl} 1200w`}
                        sizes="(max-width: 640px) 200px, 300px"
                        alt={`${photo.title} - ${photo.subtitle}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                        <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase bg-black/70 backdrop-blur-md text-[#c5a059] border border-white/20">
                          {photo.category}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/90 group-hover:bg-[#c5a059] group-hover:text-black transition-colors">
                          <Maximize2 className="w-3 h-3" />
                        </div>
                      </div>

                      {/* Dark Vignette Overlay on non-current cards */}
                      {!isCurrent && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      )}
                    </div>

                    {/* Lower Description Area */}
                    <div className={`p-3.5 transition-colors ${isCurrent ? 'bg-white text-black' : 'bg-[#111] text-white'}`}>
                      <p className={`text-[9px] uppercase tracking-[0.2em] font-semibold line-clamp-1 ${isCurrent ? 'text-[#8c6d32]' : 'text-[#c5a059]'}`}>
                        {photo.clientOrProject}
                      </p>
                      <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-wider line-clamp-1 font-serif-cinzel ${isCurrent ? 'text-black' : 'text-white'}`}>
                        {photo.title}
                      </h3>
                      <p className={`text-[10px] uppercase font-light mt-0.5 line-clamp-1 ${isCurrent ? 'text-black/60' : 'text-white/50'}`}>
                        {photo.location} • {photo.dateOrYear}
                      </p>
                    </div>

                    {/* Active highlight top hairline */}
                    {isCurrent && (
                      <div className="absolute top-0 inset-x-0 h-1 bg-[#c5a059]" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Ground Reflection Disc */}
        <div 
          className="absolute pointer-events-none rounded-full blur-xl border border-[#c5a059]/15"
          style={{
            width: `${calculatedRadius * 1.8}px`,
            height: `${calculatedRadius * 0.7}px`,
            background: 'radial-gradient(ellipse at center, rgba(197,160,89,0.12) 0%, rgba(0,0,0,0) 70%)',
            transform: 'translateY(170px) rotateX(90deg)',
          }}
        />

        {/* Floating Live Interaction Mode Toast */}
        {interactionMode !== 'idle' && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/80 border border-[#c5a059]/40 backdrop-blur-md text-[#c5a059] text-[11px] font-mono tracking-wider animate-in fade-in zoom-in-95 pointer-events-none z-20 shadow-xl flex items-center gap-2">
            {interactionMode === 'scroll-spin' && <MousePointer className="w-3.5 h-3.5" />}
            {interactionMode === 'mouse-tilt' && <Compass className="w-3.5 h-3.5" />}
            {interactionMode === 'pinch-zoom' && <ZoomIn className="w-3.5 h-3.5" />}
            {interactionMode === 'touch-drag' && <Smartphone className="w-3.5 h-3.5" />}
            <span className="capitalize">{interactionMode.replace('-', ' ')} Live</span>
          </div>
        )}
      </div>

      {/* Dot Indicators */}
      <div className="relative mt-6 sm:mt-8 flex items-center justify-center gap-4 z-10">
        <div className="w-12 h-[1px] bg-white/20" />
        <div className="flex gap-2 items-center">
          {photos.slice(0, Math.min(count, 7)).map((_, i) => (
            <span
              key={i}
              onClick={() => snapToCard(i)}
              className={`cursor-pointer transition-all duration-300 ${
                i === activeIndex % Math.min(count, 7)
                  ? 'w-8 h-2 rounded-full bg-[#c5a059]'
                  : 'w-2 h-2 rounded-full bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
        <div className="w-12 h-[1px] bg-white/20" />
      </div>

      {/* Active Photo Spotlight Bar */}
      {activePhoto && (
        <div className="relative max-w-xl mx-auto px-4 mt-5 text-center z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-xl text-white">
            <div className="text-left">
              <span className="text-[9px] uppercase text-[#c5a059] tracking-[0.25em] font-semibold">
                Featured Pakistani Masterpiece [{activeIndex + 1}/{count}]
              </span>
              <p className="text-xs sm:text-sm font-medium text-white line-clamp-1">
                {activePhoto.title} • <span className="text-white/50 font-light">{activePhoto.subtitle}</span>
              </p>
            </div>
            <button
              id="inspect-active-frame-btn"
              onClick={() => {
                soundFx.playShutterSound();
                onSelectPhoto(activePhoto);
              }}
              className="ml-auto px-3.5 py-1.5 rounded-full bg-[#c5a059] hover:bg-[#d8b56f] active:scale-95 text-black font-semibold text-[11px] uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Inspect Photo</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating 3D Navigation & Quick Perspective Action Bar */}
      <div className="relative max-w-2xl mx-auto px-4 flex flex-wrap items-center justify-center gap-3 mt-4 z-10">
        {/* Navigation Step Buttons */}
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-md">
          <button
            id="prev-carousel-btn"
            onClick={handlePrev}
            aria-label="Previous image"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-all active:scale-90"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            id="toggle-autorotate-btn"
            onClick={() => {
              soundFx.playSpinTick();
              setIsAutoRotating(!isAutoRotating);
            }}
            aria-label={isAutoRotating ? 'Pause rotation' : 'Start rotation'}
            className={`px-4 h-9 sm:h-10 rounded-full flex items-center gap-2 text-xs font-medium uppercase tracking-wider transition-all ${
              isAutoRotating
                ? 'bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {isAutoRotating ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#c5a059]" />
                <span className="hidden sm:inline">Auto-Spinning</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-white/70" />
                <span className="hidden sm:inline">Paused</span>
              </>
            )}
          </button>

          <button
            id="next-carousel-btn"
            onClick={handleNext}
            aria-label="Next image"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-all active:scale-90"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tilt Presets */}
        <div className="hidden sm:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-md">
          <button
            onClick={() => {
              soundFx.playSpinTick();
              setTargetTiltAngle(12);
            }}
            className={`px-2.5 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-wider transition-colors ${
              targetTiltAngle > 5 ? 'bg-[#c5a059] text-black font-bold' : 'text-white/60 hover:text-white'
            }`}
            title="High Angle Perspective"
          >
            Top Tilt
          </button>
          <button
            onClick={() => {
              soundFx.playSpinTick();
              setTargetTiltAngle(-4);
            }}
            className={`px-2.5 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-wider transition-colors ${
              Math.abs(targetTiltAngle - (-4)) <= 2 ? 'bg-[#c5a059] text-black font-bold' : 'text-white/60 hover:text-white'
            }`}
            title="Eye Level Perspective"
          >
            Level
          </button>
          <button
            onClick={() => {
              soundFx.playSpinTick();
              setTargetTiltAngle(-16);
            }}
            className={`px-2.5 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-wider transition-colors ${
              targetTiltAngle < -10 ? 'bg-[#c5a059] text-black font-bold' : 'text-white/60 hover:text-white'
            }`}
            title="Low Angle Dramatic Perspective"
          >
            Low Tilt
          </button>
        </div>

        {/* Reset Viewport */}
        <button
          id="reset-angle-btn"
          onClick={() => {
            soundFx.playSpinTick();
            handleResetAngle();
          }}
          className="h-9 sm:h-10 px-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-[11px] uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md transition-all active:scale-95"
          title="Reset 3D Orientation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>

        {/* Calibration Sliders Drawer */}
        <button
          id="toggle-3d-settings-btn"
          onClick={() => setShowSettings(!showSettings)}
          className={`h-9 sm:h-10 px-4 rounded-full border text-[11px] uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md transition-all active:scale-95 ${
            showSettings
              ? 'bg-[#c5a059] text-black border-[#c5a059] font-semibold'
              : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/70 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Calibration</span>
        </button>
      </div>

      {/* Manual Fine-Tuning Calibration Panel */}
      {showSettings && (
        <div className="relative max-w-lg mx-auto mt-4 px-4 z-10">
          <div className="bg-[#0f0f0f]/95 border border-white/10 p-5 rounded-2xl backdrop-blur-xl shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between text-xs text-white pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#c5a059]" />
                <span className="font-semibold text-[#c5a059] uppercase tracking-wider">3D Perspective Calibration</span>
              </div>
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Arman 3D Stage</span>
            </div>

            {/* Vertical Tilt */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-white/70">
                <span>Option 1: Vertical Camera Pitch / Tilt (Auto via Mouse Y & Touch Swipe)</span>
                <span className="text-[#c5a059] font-mono">{tiltAngle.toFixed(0)}°</span>
              </div>
              <input
                type="range"
                min="-25"
                max="25"
                step="1"
                value={tiltAngle}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setTiltAngle(val);
                  setTargetTiltAngle(val);
                }}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
              />
              <div className="flex justify-between text-[10px] text-white/40">
                <span>High (+25°)</span>
                <span>Level (0°)</span>
                <span>Low (-25°)</span>
              </div>
            </div>

            {/* Spin Speed */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-white/70">
                <span>Option 2: Continuous Spin Speed (Auto via Mouse Scroll & Touch Swipe)</span>
                <span className="text-[#c5a059] font-mono">{(rotationSpeed * 60).toFixed(0)}°/s</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.2"
                step="0.05"
                value={rotationSpeed}
                onChange={(e) => setRotationSpeed(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
              />
            </div>

            {/* Ring Diameter Depth */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-white/70">
                <span>Option 3: 3D Ring Cylinder Radius (Auto via Ctrl+Scroll & 2-Finger Pinch)</span>
                <span className="text-[#c5a059] font-mono">{calculatedRadius.toFixed(0)}px</span>
              </div>
              <input
                type="range"
                min="0.70"
                max="1.40"
                step="0.05"
                value={depthScale}
                onChange={(e) => setDepthScale(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
