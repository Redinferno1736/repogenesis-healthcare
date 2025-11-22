'use client';

import React, { useEffect, useRef, useState } from 'react';

const TextPressure = ({
  text = "MedSphere",
  flex = true,
  alpha = false,
  stroke = false,
  width = true,
  weight = true,
  italic = true,
  textColor = "#1B1B3A",
  strokeColor = "#429795",
  minFontSize = 20,
  maxFontSize = 48
}) => {
  const containerRef = useRef(null);
  const [pressure, setPressure] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // Calculate pressure based on distance (closer = more pressure)
      const maxDistance = 200;
      const pressureValue = Math.max(0, 1 - distance / maxDistance);
      setPressure(pressureValue);
    };

    const handleMouseLeave = () => {
      setPressure(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Calculate dynamic styles based on pressure
  const fontSize = width ? minFontSize + (maxFontSize - minFontSize) * pressure : minFontSize;
  const fontWeight = weight ? 400 + Math.round(500 * pressure) : 700;
  const opacity = alpha ? 0.5 + 0.5 * pressure : 1;
  const fontStyle = italic && pressure > 0.3 ? 'italic' : 'normal';
  const textStroke = stroke ? `${pressure * 2}px ${strokeColor}` : 'none';

  return (
    <span
      ref={containerRef}
      style={{
        fontSize: `${fontSize}px`,
        fontWeight: fontWeight,
        opacity: opacity,
        fontStyle: fontStyle,
        color: textColor,
        WebkitTextStroke: textStroke,
        textStroke: textStroke,
        transition: 'all 0.1s ease-out',
        display: flex ? 'inline-flex' : 'inline-block',
        alignItems: 'center',
        userSelect: 'none',
        cursor: 'default'
      }}
    >
      {text}
    </span>
  );
};

export default TextPressure;