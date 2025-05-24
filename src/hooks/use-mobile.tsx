import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Initialize to undefined to clearly indicate the value is not yet determined,
  // especially for SSR and initial client render.
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Ensure window is defined (runs only on client)
    if (typeof window === 'undefined') {
      return;
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    const updateMobileState = () => {
      setIsMobile(mql.matches);
    };

    updateMobileState(); // Set initial state on client mount
    mql.addEventListener("change", updateMobileState);
    
    return () => mql.removeEventListener("change", updateMobileState);
  }, []); // Empty dependency array ensures this runs once on mount (client-side)

  return isMobile; // Will be undefined on server, then true/false on client after effect runs
}
