/**
 * Button Primitive (Web Version)
 * 
 * Neobrutalist button with variants.
 */

import React from 'react';
import { skin } from '../skin';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export function Button({
  children,
  onPress,
  variant = 'primary',
  disabled,
  style,
  className,
}: ButtonProps): React.JSX.Element {
  const getVariantStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: skin.colors.background,
          color: skin.colors.textPrimary,
          border: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
        };
      case 'danger':
        return {
          backgroundColor: skin.colors.errorBackground,
          color: skin.colors.errorText,
          border: `${skin.borders.widthThin}px solid ${skin.colors.urgent}`,
        };
      case 'primary':
      default:
        return {
          backgroundColor: skin.colors.primary,
          color: skin.colors.primaryText,
          border: `${skin.borders.widthThin}px solid ${skin.colors.border}`,
        };
    }
  };

  return (
    <button
      onClick={disabled ? undefined : onPress}
      disabled={disabled}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: `${skin.spacing.lg}px ${skin.spacing.xl}px`,
        borderRadius: skin.borders.radiusMedium,
        fontFamily: skin.typography.fontFamily.body,
        fontSize: skin.typography.fontSize.lg,
        fontWeight: skin.typography.fontWeight.semiBold,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        boxShadow: skin.shadows.card,
        transition: 'transform 0.1s ease',
        ...getVariantStyle(),
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export default Button;
