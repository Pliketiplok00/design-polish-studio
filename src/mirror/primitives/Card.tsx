/**
 * Card Primitive (Web Version)
 * 
 * Base card surface with neobrutalist styling.
 */

import React from 'react';
import { skin } from '../skin';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'outlined' | 'filled' | 'selection';
  backgroundColor?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function Card({
  children,
  onPress,
  disabled,
  variant = 'outlined',
  backgroundColor,
  style,
  className,
}: CardProps): React.JSX.Element {
  const getVariantStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'filled':
        return {
          backgroundColor: skin.colors.backgroundSecondary,
          border: 'none',
        };
      case 'selection':
        return {
          backgroundColor: skin.colors.backgroundSecondary,
          border: `${skin.borders.widthThin}px solid ${skin.colors.borderLight}`,
          borderRadius: skin.borders.radiusCard,
        };
      case 'outlined':
      default:
        return {
          backgroundColor: skin.colors.backgroundTertiary,
          border: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
        };
    }
  };

  const baseStyle: React.CSSProperties = {
    borderRadius: skin.borders.radiusCard,
    padding: skin.spacing.xl,
    boxShadow: variant === 'outlined' ? skin.shadows.card : undefined,
    cursor: onPress && !disabled ? 'pointer' : 'default',
    opacity: disabled ? 0.5 : 1,
    transition: 'transform 0.1s ease',
    ...getVariantStyle(),
    ...(backgroundColor && { backgroundColor }),
    ...style,
  };

  if (onPress) {
    return (
      <button
        onClick={disabled ? undefined : onPress}
        disabled={disabled}
        className={className}
        style={{
          ...baseStyle,
          textAlign: 'left',
          width: '100%',
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={className} style={baseStyle}>
      {children}
    </div>
  );
}

export default Card;
