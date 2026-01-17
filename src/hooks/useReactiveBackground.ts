import { useState, useRef, useCallback } from 'react';

interface UseReactiveBackgroundOptions {
  initialX?: number;
  initialY?: number;
  multiplier?: number;
}

interface UseReactiveBackgroundReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  backgroundPosition: { x: number; y: number };
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const useReactiveBackground = (
  options: UseReactiveBackgroundOptions = {}
): UseReactiveBackgroundReturn => {
  const {
    initialX = -19,
    initialY = -19,
    multiplier = 0.03,
  } = options;

  const [backgroundPosition, setBackgroundPosition] = useState({ 
    x: initialX, 
    y: initialY 
  });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate background offset based on cursor position
    const offsetX = initialX + (x * multiplier);
    const offsetY = initialY + (y * multiplier);
    
    setBackgroundPosition({ x: offsetX, y: offsetY });
  }, [initialX, initialY, multiplier]);

  return {
    ref: elementRef,
    backgroundPosition,
    handleMouseMove,
  };
};

