import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none">{char === ' ' ? '\u00A0' : char}</span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const totalChars = text.length;
  const words = text.split(' ');

  let charIndexCounter = 0;

  return (
    <p ref={containerRef} className={className} style={style}>
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        const startIndex = charIndexCounter;
        charIndexCounter += word.length + 1; // +1 for the space

        return (
          <React.Fragment key={wordIndex}>
            <span className="inline-block whitespace-nowrap">
              {wordChars.map((char, charIdx) => {
                const globalIdx = startIndex + charIdx;
                const start = globalIdx / totalChars;
                const end = Math.min(1, (globalIdx + 1) / totalChars);
                return (
                  <Character
                    key={charIdx}
                    char={char}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </span>
            {wordIndex < words.length - 1 && (
              <Character
                char=" "
                progress={scrollYProgress}
                range={[
                  (startIndex + word.length) / totalChars,
                  Math.min(1, (startIndex + word.length + 1) / totalChars),
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </p>
  );
};

export default AnimatedText;
