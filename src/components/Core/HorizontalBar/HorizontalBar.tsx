import React from 'react';

type HorizontalBarProps = {
  width: string;
  height: string;
  color: string;
};

function HorizontalBar({ width, color, height }: HorizontalBarProps) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: color,
        borderRadius: '2px',
        margin: '8px 0',
      }}
    ></div>
  );
}

export default HorizontalBar;
