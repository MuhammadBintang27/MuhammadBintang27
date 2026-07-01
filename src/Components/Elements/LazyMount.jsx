import { Suspense, useEffect, useRef, useState } from 'react';

// Defers mounting (and therefore code-fetching) of heavy children until the
// wrapped section is about to enter the viewport, instead of on initial load.
const LazyMount = ({ children, fallback = null, rootMargin = '600px' }) => {
  const containerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return undefined;

    const node = containerRef.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldRender(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={containerRef}>
      {shouldRender ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
};

export default LazyMount;