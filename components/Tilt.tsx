import React from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

type TiltProps = {
  children: React.ReactNode;
  maxTilt?: number;
};

const Tilt: React.FC<TiltProps> = ({ children, maxTilt = 5 }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [{ rx, ry }, setTilt] = React.useState({ rx: 0, ry: 0 });

  if (prefersReducedMotion) return <div>{children}</div>;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({
      ry: (px - 0.5) * (maxTilt * 2),
      rx: -(py - 0.5) * (maxTilt * 2),
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      className="transition-transform duration-300 ease-out"
      style={{
        transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`,
      }}
    >
      {children}
    </div>
  );
};

export default Tilt;
