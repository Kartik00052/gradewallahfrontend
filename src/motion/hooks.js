import { useState, useEffect, useRef, useCallback } from 'react';

export function useAnimatedInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px'
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) observer.unobserve(el);
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, triggerOnce, rootMargin]);

  return [ref, inView];
}

export function useStagger(index, baseDelay = 0, staggerBy = 0.05) {
  return { delay: baseDelay + index * staggerBy };
}

export function useCountUp(end, { duration = 1500, enabled = true, start = 0 } = {}) {
  const [count, setCount] = useState(start);
  const rafRef = useRef(null);
  const startTime = useRef(null);

  useEffect(() => {
    if (!enabled) {
      setCount(start);
      return;
    }

    startTime.current = null;

    const animate = (timestamp) => {
      if (startTime.current === null) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(start + (end - start) * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration, enabled, start]);

  return count;
}

export function useProgressiveReveal(itemCount, { batchSize = 3, baseDelay = 100 } = {}) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (itemCount === 0) return;

    const interval = setInterval(() => {
      setVisible((prev) => {
        if (prev >= itemCount) {
          clearInterval(interval);
          return prev;
        }
        return Math.min(prev + batchSize, itemCount);
      });
    }, baseDelay);

    return () => clearInterval(interval);
  }, [itemCount, batchSize, baseDelay]);

  return (index) => index < visible;
}

export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

export function useSpringValue(initial = 0) {
  const [value, setValue] = useState(initial);

  const target = useRef(initial);
  const current = useRef(initial);
  const velocity = useRef(0);
  const rafRef = useRef(null);

  const stiffness = 180;
  const damping = 14;

  useEffect(() => {
    let running = true;

    const tick = () => {
      if (!running) return;
      const dx = target.current - current.current;
      const force = dx * stiffness;
      const dampingForce = -velocity.current * damping;
      const acceleration = force + dampingForce;
      velocity.current += acceleration * 0.016;
      current.current += velocity.current * 0.016;

      if (Math.abs(dx) < 0.001 && Math.abs(velocity.current) < 0.001) {
        current.current = target.current;
        velocity.current = 0;
        setValue(target.current);
        return;
      }

      setValue(current.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const setTarget = useCallback((v) => { target.current = v; }, []);

  return [value, setTarget];
}

export function usePageTransition() {
  const [page, setPage] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const navigate = useCallback((nextPage) => {
    setIsAnimating(true);
    setTimeout(() => {
      setPage(nextPage);
      setIsAnimating(false);
    }, 200);
  }, []);

  return { page, isAnimating, navigate };
}
