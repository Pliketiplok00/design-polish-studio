/**
 * Badge Primitive (Web Version)
 * 
 * Small tag-like badges for status, categories, etc.
 */

import React from 'react';
import { skin } from '../skin';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'type' | 'status';
  backgroundColor?: string;
  textColor?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  backgroundColor,
  textColor,
  style,
  className,
}: BadgeProps): React.JSX.Element {
  const getVariantStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'type':
        return {
          backgroundColor: skin.colors.typeBadge,
          color: skin.colors.primaryText,
        };
      case 'status':
        return {
          backgroundColor: skin.colors.backgroundSecondary,
          color: skin.colors.textPrimary,
        };
      case 'default':
      default:
        return {
          backgroundColor: skin.colors.backgroundSecondary,
          color: skin.colors.textPrimary,
        };
    }
  };

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: `2px ${skin.spacing.sm}px`,
        borderRadius: skin.borders.radiusSharp,
        border: `${skin.borders.widthThin}px solid ${skin.colors.border}`,
        fontFamily: skin.typography.fontFamily.body,
        fontSize: skin.typography.fontSize.xs,
        fontWeight: skin.typography.fontWeight.bold,
        textTransform: 'uppercase',
        ...getVariantStyle(),
        ...(backgroundColor && { backgroundColor }),
        ...(textColor && { color: textColor }),
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export default Badge;
