import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';
import { useLoader } from '../../context/LoaderContext';
import './Loader.css';

const CIRCUMFERENCE = 2 * Math.PI * 38; // r=38 on a 88×88 circle

export function Loader() {
  const { done, markDone } = useLoader();
  const [pct, setPct] = useState(0);
  const [visible, setVisible] = useState(!done);

  const containerRef = useRef(null);
  const topRef       = useRef(null);
  const bottomRef    = useRef(null);
  const ringRef      = useRef(null);
  const nameRef      = useRef(null);
  const hnHRef       = useRef(null);
  const hnNRef       = useRef(null);
  const svgRef       = useRef(null);

  useEffect(() => {
    if (done) return; // return visit: skip entirely

    // Stop lenis while loading
    document.dispatchEvent(new CustomEvent('lenis:stop'));

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const minTime = new Promise((r) => setTimeout(r, 1400));
    const fontReady = document.fonts.ready.catch(() => {});
    const withTimeout = (p, ms) =>
      Promise.race([p, new Promise((r) => setTimeout(r, ms))]);

    const assetsReady = withTimeout(
      Promise.all([fontReady]),
      2400
    );

    if (reduceMotion) {
      // Simple fade
      Promise.all([minTime, assetsReady]).then(() => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            setVisible(false);
            markDone();
            document.dispatchEvent(new CustomEvent('lenis:start'));
          },
        });
      });
      return;
    }

    // Set up stroke-dash for ring
    const ringEl = ringRef.current;
    if (ringEl) {
      ringEl.style.strokeDasharray = CIRCUMFERENCE;
      ringEl.style.strokeDashoffset = CIRCUMFERENCE;
    }

    // Set up stroke-dash for HN strokes
    gsap.set([hnHRef.current, hnNRef.current], {
      strokeDasharray: 1,
      strokeDashoffset: 1,
    });

    // Draw HN + name fade
    const drawTl = gsap.timeline({ delay: 0.1 });
    drawTl
      .to(hnHRef.current, {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      })
      .to(hnNRef.current, {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      }, '-=0.3')
      .from(nameRef.current, {
        opacity: 0,
        y: 8,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.4');

    // Counter + ring
    const counter = { v: 0 };
    gsap.to(counter, {
      v: 100,
      duration: 1.4,
      ease: 'power1.inOut',
      onUpdate() {
        const val = Math.round(counter.v);
        setPct(val);
        if (ringEl) {
          ringEl.style.strokeDashoffset =
            CIRCUMFERENCE - (val / 100) * CIRCUMFERENCE;
        }
      },
    });

    // Exit when both min-time and assets are done
    Promise.all([minTime, assetsReady]).then(() => {
      const exitTl = gsap.timeline({
        onComplete: () => {
          setVisible(false);
          markDone();
          document.dispatchEvent(new CustomEvent('lenis:start'));
        },
      });

      exitTl
        .to(svgRef.current, {
          scale: 0.85,
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
        })
        .to(topRef.current, {
          yPercent: -100,
          duration: 0.6,
          ease: 'power4.inOut',
        }, '-=0.05')
        .to(bottomRef.current, {
          yPercent: 100,
          duration: 0.6,
          ease: 'power4.inOut',
        }, '<');
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div ref={containerRef} className="loader" aria-hidden="true" aria-label="Loading">
      {/* Split halves for exit */}
      <div ref={topRef}    className="loader__half loader__half--top" />
      <div ref={bottomRef} className="loader__half loader__half--bottom" />

      {/* Center content */}
      <div className="loader__content">
        {/* HN monogram */}
        <svg
          ref={svgRef}
          viewBox="0 0 140 100"
          className="loader__hn"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="hnGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0"   stopColor="#F43F7A" />
              <stop offset=".5"  stopColor="#8B5CF6" />
              <stop offset="1"   stopColor="#7DD3FC" />
            </linearGradient>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0"   stopColor="#F43F7A" />
              <stop offset="1"   stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <g
            fill="none"
            stroke="url(#hnGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              ref={hnHRef}
              pathLength="1"
              d="M20 15V85M20 50H60M60 15V85"
            />
            <path
              ref={hnNRef}
              pathLength="1"
              d="M80 85V15L120 85V15"
            />
          </g>
        </svg>

        {/* Ring + counter */}
        <div className="loader__ring-wrap">
          <svg className="loader__ring-svg" viewBox="0 0 88 88" aria-hidden="true">
            <defs>
              <linearGradient id="ringGrad2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0"  stopColor="#F43F7A" />
                <stop offset="1"  stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <circle className="loader__ring-track" cx="44" cy="44" r="38" />
            <circle ref={ringRef} className="loader__ring-fill" cx="44" cy="44" r="38" stroke="url(#ringGrad2)" />
          </svg>
          <span className="loader__counter">{pct}%</span>
        </div>

        {/* Name */}
        <p ref={nameRef} className="loader__name">Himeshika Nethmini</p>
      </div>
    </div>
  );
}
