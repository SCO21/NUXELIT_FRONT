import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  reverse = false,
  className = '',
}) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);
  const innerRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);

  // Measure the inner content (half of duplicated children = one full set)
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const measure = () => {
      // scrollWidth of the inner div = both copies; half = one set
      setContentWidth(el.scrollWidth / 2);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (contentWidth === 0) return;

    const totalSize = contentWidth + gap;
    const from = reverse ? -totalSize : 0;
    const to   = reverse ? 0 : -totalSize;

    let controls;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration: currentDuration * Math.abs((translation.get() - to) / totalSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey(prev => prev + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
      });
    }

    return () => controls?.stop();
  }, [key, contentWidth, currentDuration, gap, reverse, isTransitioning]);

  const hoverProps = durationOnHover ? {
    onHoverStart: () => { setIsTransitioning(true); setCurrentDuration(durationOnHover); },
    onHoverEnd:   () => { setIsTransitioning(true); setCurrentDuration(duration); },
  } : {};

  return (
    <div style={{ overflow: 'hidden' }} className={className}>
      <motion.div
        ref={innerRef}
        style={{
          display: 'flex',
          width: 'max-content',
          gap: `${gap}px`,
          x: translation,
        }}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
