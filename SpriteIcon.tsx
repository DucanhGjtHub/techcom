import React from 'react';

export interface SpriteIconProps {
  spriteUrl: string;
  x: number;
  y: number;
  size?: number;
  iconsInSprite: number; // Number of icons horizontally in the sprite sheet
  originalIconSize?: number; // The width/height of one icon in the original sprite file
}

const SpriteIcon: React.FC<SpriteIconProps> = ({
  spriteUrl,
  x,
  y,
  size = 36,
  originalIconSize = 100,
}) => {
  const backgroundHeight = size; // Assuming a horizontal sprite strip

  const positionX = (x / originalIconSize) * size;
  const positionY = (y / originalIconSize) * size;

  const style: React.CSSProperties = {
    backgroundImage: `url(${spriteUrl})`,
    backgroundPosition: `-${positionX}px -${positionY}px`,
    width: `${size}px`,
    height: `${size}px`,
    // By setting height and letting width be auto, we ensure correct scaling for horizontal sprites.
    backgroundSize: `auto ${backgroundHeight}px`,
    display: 'inline-block',
    flexShrink: 0,
  };
  return <span style={style} />;
};

export default SpriteIcon;
