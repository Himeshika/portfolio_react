/**
 * Central GSAP setup — import gsap, ScrollTrigger and Flip from here.
 * Plugins are registered once so there are no duplicate registration warnings.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

// Smooth-scroll via lenis: driven off gsap ticker
gsap.ticker.lagSmoothing(0);

export { gsap, ScrollTrigger, Flip };
