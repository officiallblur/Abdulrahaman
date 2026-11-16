import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  children?: React.ReactNode;
  className?: string;
  as?: keyof typeof motion | any;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  ...rest
}) => {
  // Use motion.create if available, or motion[as]
  const MotionComponent = (motion as any).create
    ? (motion as any).create(as)
    : (motion as any)[as] || motion.div;

  return (
    <MotionComponent
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
};

export default FadeIn;

