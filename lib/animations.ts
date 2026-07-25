export function initFloat(ref: any, options?: { y?: number; duration?: number }) {
  if (typeof window === 'undefined' || !ref || !ref.current) return;
  const y = options?.y ?? -8;
  const duration = options?.duration ?? 6;
  // lazy import GSAP if available
  import('gsap').then((gsapModule) => {
    const gsap = (gsapModule as any).gsap || gsapModule;
    try {
      gsap.to(ref.current, { y, repeat: -1, yoyo: true, duration, ease: 'power1.inOut' });
    } catch (e) {
      // fail silently if GSAP not installed
    }
  }).catch(() => {
    // ignore
  });
}
