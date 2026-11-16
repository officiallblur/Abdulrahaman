import React, { useEffect, useRef, useState } from 'react';

const PLATE_URL =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/a194141a-44ba-44bb-8372-e6720af994ca.jpg';
const HEAD_CLIP_URL =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e1b48476-24ab-456a-bb12-13e63bc60973.mp4';
const HELMET_URL =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e8c78660-4497-41b9-82ae-a4738a5edd11.jpg';

export const HeroSection: React.FC = () => {
  const stageRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const captionLeftRef = useRef<HTMLDivElement>(null);
  const captionRightRef = useRef<HTMLDivElement>(null);
  const pushBtnRef = useRef<HTMLButtonElement>(null);
  const helmetRef = useRef<HTMLImageElement>(null);
  const headVideoRef = useRef<HTMLVideoElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  const [helmetOn, setHelmetOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [clipVisible, setClipVisible] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);

  const helmetAnimRef = useRef<Animation | null>(null);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills & Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  // Coordinated ~1.8s Web Animations Entrance Timeline
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const easeOut = 'cubic-bezier(0.22, 1, 0.36, 1)';

    // 1. Logo and menu drop in
    logoRef.current?.animate(
      [
        { opacity: 0, transform: 'translateY(-28px)' },
        { opacity: 1, transform: 'translateY(0px)' },
      ],
      { duration: 520, easing: easeOut, fill: 'both' }
    );

    menuBtnRef.current?.animate(
      [
        { opacity: 0, transform: 'translateY(-28px)' },
        { opacity: 1, transform: 'translateY(0px)' },
      ],
      { duration: 520, delay: 60, easing: easeOut, fill: 'both' }
    );

    // 2. Eyebrow's tracking tightens from .9em to .46em
    eyebrowRef.current?.animate(
      [
        { opacity: 0, letterSpacing: '0.9em', transform: 'translateY(12px)' },
        { opacity: 1, letterSpacing: '0.46em', transform: 'translateY(0px)' },
      ],
      { duration: 640, delay: 220, easing: easeOut, fill: 'both' }
    );

    // 3. Headline rises out of a 14px blur
    headlineRef.current?.animate(
      [
        { opacity: 0, filter: 'blur(14px)', transform: 'translateY(28px)' },
        { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0px)' },
      ],
      { duration: 760, delay: 420, easing: easeOut, fill: 'both' }
    );

    // 4. Subtitle and captions follow
    subtitleRef.current?.animate(
      [
        { opacity: 0, transform: 'translateY(16px)' },
        { opacity: 1, transform: 'translateY(0px)' },
      ],
      { duration: 600, delay: 780, easing: easeOut, fill: 'both' }
    );

    captionLeftRef.current?.animate(
      [
        { opacity: 0, transform: 'translateY(12px)' },
        { opacity: 1, transform: 'translateY(0px)' },
      ],
      { duration: 550, delay: 920, easing: easeOut, fill: 'both' }
    );

    captionRightRef.current?.animate(
      [
        { opacity: 0, transform: 'translateY(12px)' },
        { opacity: 1, transform: 'translateY(0px)' },
      ],
      { duration: 550, delay: 980, easing: easeOut, fill: 'both' }
    );

    // 5. PUSH ME button pops in last
    pushBtnRef.current?.animate(
      [
        { opacity: 0, transform: 'scale(0.4)' },
        { opacity: 1, transform: 'scale(1.08)', offset: 0.72 },
        { opacity: 1, transform: 'scale(1)' },
      ],
      { duration: 580, delay: 1220, easing: easeOut, fill: 'both' }
    );
  }, []);

  // Fetch head-turn MP4 clip as a blob + Cursor Scrubbing + 3.5s Idle Sine Drift + Ring Cursor
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    setHasFinePointer(finePointer);

    if (reducedMotion) return;

    const video = headVideoRef.current;
    if (!video) return;

    let objectUrl: string | null = null;
    let isCancelled = false;

    // Fetch whole clip as a blob and use object URL so every seek is instant
    fetch(HEAD_CLIP_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.blob();
      })
      .then((blob) => {
        if (isCancelled) return;
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
        video.load();
      })
      .catch(() => {
        if (isCancelled) return;
        video.src = HEAD_CLIP_URL;
        video.load();
      });

    let duration = 5.04;
    let targetTime = duration * 0.5;
    let shownTime = duration * 0.5;
    let hasRevealedClip = false;
    let lastMoveTime = performance.now();

    const onLoadedMetadata = () => {
      if (video.duration && Number.isFinite(video.duration)) {
        duration = video.duration;
        targetTime = duration * 0.5;
        shownTime = duration * 0.5;
        video.currentTime = shownTime;
      }
    };

    const onSeeked = () => {
      if (!hasRevealedClip) {
        hasRevealedClip = true;
        setClipVisible(true);
      }
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('seeked', onSeeked);

    // Custom cursor coordinates
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;

    const onPointerMove = (e: MouseEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      lastMoveTime = performance.now();

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      }

      // Map pointer's x across the 1440x810 frame (14% to 86%) to clip time 0 -> end
      const frameRect = frameRef.current?.getBoundingClientRect();
      const relX = frameRect
        ? (pointerX - frameRect.left) / frameRect.width
        : pointerX / window.innerWidth;
      const normalized = Math.max(0, Math.min(1, (relX - 0.14) / (0.86 - 0.14)));
      targetTime = normalized * duration;
    };

    let rafId: number;
    const tick = (now: number) => {
      // 44px ring eases after pointer (×0.55 per frame)
      if (finePointer && cursorRingRef.current) {
        ringX += (pointerX - ringX) * 0.55;
        ringY += (pointerY - ringY) * 0.55;
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      // After 3.5s without movement, gaze drifts slowly side to side (sine around middle, ±32% of clip)
      const idleTime = now - lastMoveTime;
      let activeTarget = targetTime;
      if (idleTime > 3500) {
        const phase = (idleTime - 3500) * 0.0014;
        activeTarget = duration * (0.5 + Math.sin(phase) * 0.32);
      }

      // Ease shown time toward target (×0.14) and set currentTime whenever not seeking
      shownTime += (activeTarget - shownTime) * 0.14;
      if (video.readyState >= 1 && !video.seeking) {
        if (Math.abs(video.currentTime - shownTime) > 0.004 || !hasRevealedClip) {
          try {
            video.currentTime = Math.max(0, Math.min(duration, shownTime));
          } catch {
            // Ignore transient DOMException if media not yet seekable
          }
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    rafId = window.requestAnimationFrame(tick);

    return () => {
      isCancelled = true;
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('mousemove', onPointerMove);
      window.cancelAnimationFrame(rafId);
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, []);

  // Clicking PUSH ME presses it (scale .88 and back, 320ms) and toggles the glass helmet dome
  const handlePushMe = () => {
    pushBtnRef.current?.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(0.88)', offset: 0.45 },
        { transform: 'scale(1)' },
      ],
      { duration: 320, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
    );

    const nextState = !helmetOn;
    setHelmetOn(nextState);

    const helmetEl = helmetRef.current;
    if (!helmetEl) return;

    helmetAnimRef.current?.cancel();

    // Dome drops from -70u above with slight overshoot and fades in over 720ms; reverses to remove it
    const keyframes: Keyframe[] = [
      {
        opacity: 0,
        transform: 'translateY(calc(-70 * var(--u)))',
      },
      {
        opacity: 1,
        transform: 'translateY(calc(8 * var(--u)))',
        offset: 0.76,
      },
      {
        opacity: 1,
        transform: 'translateY(0px)',
      },
    ];

    helmetAnimRef.current = helmetEl.animate(
      nextState ? keyframes : [...keyframes].reverse(),
      {
        duration: 720,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards',
      }
    );
  };

  return (
    <section
      ref={stageRef}
      id="hero"
      className={`lumora-stage ${hasFinePointer ? 'cursor-none' : ''}`}
    >
      {/* Custom Ring + Dot Cursor (Fine Pointers Only) */}
      {hasFinePointer && (
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
          {/* 7px white dot sitting exactly on pointer */}
          <div
            ref={cursorDotRef}
            className="fixed top-0 left-0 w-[7px] h-[7px] -ml-[3.5px] -mt-[3.5px] rounded-full bg-white will-change-transform"
          />
          {/* 44px ring (1.5px white border) easing after it (×0.55 per frame) */}
          <div
            ref={cursorRingRef}
            className="fixed top-0 left-0 w-[44px] h-[44px] -ml-[22px] -mt-[22px] rounded-full border-[1.5px] border-white will-change-transform"
          />
        </div>
      )}

      {/* 1440×810 (16:9) Frame */}
      <div ref={frameRef} className="lumora-frame">
        {/* 1. Plate (1920×1080) filling the frame */}
        <img
          src={PLATE_URL}
          alt="Cadet Skyranger in chunky white, orange and teal space suit before glowing orange planet horizon"
          className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none"
          draggable={false}
        />

        {/* 2. Head-turn clip at (510, 255), 435×450, object-fit: fill, soft radial mask */}
        <video
          ref={headVideoRef}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="pointer-events-none absolute select-none"
          style={{
            left: 'calc(510 * var(--u))',
            top: 'calc(255 * var(--u))',
            width: 'calc(435 * var(--u))',
            height: 'calc(450 * var(--u))',
            objectFit: 'fill',
            opacity: clipVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
            maskImage:
              'radial-gradient(ellipse 50% 50% at 50% 46%, #000 72%, transparent 99%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 50% 50% at 50% 46%, #000 72%, transparent 99%)',
          }}
        />

        {/* 3. Glass bubble helmet at (533, 288), 360×360, mix-blend-mode: screen, bottom collar mask */}
        <img
          ref={helmetRef}
          src={HELMET_URL}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute select-none"
          style={{
            left: 'calc(533 * var(--u))',
            top: 'calc(288 * var(--u))',
            width: 'calc(360 * var(--u))',
            height: 'calc(360 * var(--u))',
            opacity: 0,
            mixBlendMode: 'screen',
            maskImage: 'linear-gradient(to bottom, #000 0%, #000 76%, transparent 92%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, #000 0%, #000 76%, transparent 92%)',
          }}
        />

        {/* 4. PUSH ME button: real <button> at (675, 720), 75u circle */}
        <button
          ref={pushBtnRef}
          type="button"
          aria-pressed={helmetOn}
          aria-label="PUSH ME"
          onClick={handlePushMe}
          className="absolute z-20 rounded-full flex flex-col items-center justify-center text-white uppercase cursor-pointer select-none transition-shadow duration-300"
          style={{
            left: 'calc(675 * var(--u))',
            top: 'calc(720 * var(--u))',
            width: 'calc(75 * var(--u))',
            height: 'calc(75 * var(--u))',
            fontFamily: "'Urbanist', sans-serif",
            fontWeight: 700,
            fontSize: 'calc(16.5 * var(--u))',
            lineHeight: 1.02,
            background:
              'radial-gradient(circle at 38% 30%, #ff5a67 0%, #e11d2e 52%, #990f1c 100%)',
            border: 'calc(4 * var(--u)) solid #17232c',
            boxShadow: helmetOn
              ? '0 0 0 1.5px rgba(255,255,255,0.45), 0 0 calc(28 * var(--u)) rgba(255, 50, 68, 0.95), 0 0 calc(55 * var(--u)) rgba(225, 29, 46, 0.75), inset 0 2px 5px rgba(255,255,255,0.45)'
              : '0 0 0 1px rgba(255,255,255,0.28), 0 4px 12px rgba(0,0,0,0.55), inset 0 2px 4px rgba(255,255,255,0.35)',
          }}
        >
          <span>PUSH</span>
          <span>ME</span>
        </button>
      </div>

      {/* Viewport-Pinned UI Overlay (Never clips at top or bottom of window) */}
      {/* Top-Left Logo Disc */}
      <a
        ref={logoRef}
        href="#hero"
        aria-label="Home"
        className="absolute z-30 flex items-center no-underline"
        style={{
          left: 'clamp(22px, 3.8vw, 55px)',
          top: 'clamp(22px, 3.8vh, 48px)',
        }}
      >
        <span
          className="rounded-full shrink-0"
          style={{
            width: 'clamp(28px, 2.5vw, 36px)',
            height: 'clamp(28px, 2.5vw, 36px)',
            background:
              'conic-gradient(from 180deg at 50% 50%, #22d3ee 0deg, #3b82f6 110deg, #8b5cf6 220deg, #ec4899 310deg, #22d3ee 360deg)',
          }}
        />
      </a>

      {/* Top-Right Menu Button: Three White Bars */}
      <button
        ref={menuBtnRef}
        type="button"
        aria-label="Toggle Menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
        className="absolute z-30 flex flex-col justify-between bg-transparent border-0 p-0 cursor-pointer"
        style={{
          right: 'clamp(22px, 3.8vw, 55px)',
          top: 'clamp(26px, 4.2vh, 52px)',
          width: '25px',
          height: '18px',
        }}
      >
        <span className="w-full h-[2px] bg-white rounded-full block" />
        <span className="w-full h-[2px] bg-white rounded-full block" />
        <span className="w-full h-[2px] bg-white rounded-full block" />
      </button>

      {/* Navigation drawer when clicking the menu button */}
      {menuOpen && (
        <nav
          aria-label="Portfolio Sections"
          className="fixed top-16 right-6 sm:right-12 z-50 w-56 rounded-2xl bg-[#02040D]/90 border border-white/15 backdrop-blur-xl p-4 shadow-2xl flex flex-col gap-2.5"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-[#CDD2E6] hover:text-white py-1 transition-colors no-underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}

      {/* Centered Top Copy Block */}
      <div
        className="pointer-events-none absolute left-0 right-0 z-20 flex flex-col items-center text-center px-4"
        style={{
          top: 'clamp(24px, 5vh, 78px)',
        }}
      >
        <p
          ref={eyebrowRef}
          className="uppercase"
          style={{
            fontFamily: "'Urbanist', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(12px, 1.25vw, 18px)',
            letterSpacing: '0.46em',
            color: '#CDD2E6',
            marginBottom: '6px',
          }}
        >
          SOFTWARE DEVELOPER
        </p>

        <h1 ref={headlineRef} className="skyranger-headline">
          ABDULRAHMAN
        </h1>

        <p
          ref={subtitleRef}
          style={{
            fontFamily: "'Urbanist', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(14px, 1.55vw, 22px)',
            color: '#CDD2E6',
            marginTop: '8px',
          }}
        >
          Building Web &amp; Mobile Experiences
        </p>
      </div>

      {/* Bottom Captions */}
      <div
        ref={captionLeftRef}
        className="pointer-events-none absolute z-20"
        style={{
          left: 'clamp(22px, 3.8vw, 55px)',
          bottom: 'clamp(18px, 3vh, 36px)',
          fontFamily: "'Urbanist', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(11px, 0.9vw, 13px)',
          color: '#CDD2E6',
        }}
      >

      </div>

      <div
        ref={captionRightRef}
        className="pointer-events-none absolute z-20"
        style={{
          right: 'clamp(22px, 3.8vw, 55px)',
          bottom: 'clamp(18px, 3vh, 36px)',
          fontFamily: "'Urbanist', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(11px, 0.9vw, 13px)',
          color: '#CDD2E6',
        }}
      >
        @abdulrahman.dev
      </div>
    </section>
  );
};

export default HeroSection;
