import { Suspense, useEffect, useRef, useState } from 'react';

// Defers mounting (and therefore code-fetching) of heavy children until the
// wrapped section is about to enter the viewport, instead of on initial load.
//
// With `mountOnIdle`, the children are additionally mounted once the browser
// goes idle after page load — whichever happens first. This lets expensive
// setup work (e.g. WebGL context + shader compilation for the 3D tech stack)
// run while the user is still reading the top of the page, instead of causing
// a jank spike mid-scroll when the section approaches the viewport.
const LazyMount = ({ children, fallback = null, rootMargin = '600px', mountOnIdle = false }) => {
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

    let idleId;
    let timeoutId;
    let mountWhenIdle;
    if (mountOnIdle) {
      mountWhenIdle = () => {
        if (typeof window.requestIdleCallback === 'function') {
          idleId = window.requestIdleCallback(() => setShouldRender(true), { timeout: 6000 });
        } else {
          timeoutId = window.setTimeout(() => setShouldRender(true), 2500);
        }
      };

      if (document.readyState === 'complete') {
        mountWhenIdle();
      } else {
        window.addEventListener('load', mountWhenIdle, { once: true });
        timeoutId = window.setTimeout(mountWhenIdle, 4000);
      }
    }

    return () => {
      observer.disconnect();
      if (mountWhenIdle) window.removeEventListener('load', mountWhenIdle);
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      window.clearTimeout(timeoutId);
    };
  }, [shouldRender, rootMargin, mountOnIdle]);

  return (
    <div ref={containerRef}>
      {shouldRender ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
};

export default LazyMount;