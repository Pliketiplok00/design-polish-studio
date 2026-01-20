/**
 * Text Primitives (Web Version)
 * 
 * Typography wrappers: H1, H2, Label, Body, Meta, ButtonText
 */

import React from 'react';
import { skin } from '../skin';

interface TextProps {
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
  numberOfLines?: number;
}

const baseStyle: React.CSSProperties = {
  margin: 0,
  padding: 0,
};

const truncateStyle = (lines?: number): React.CSSProperties => {
  if (!lines) return {};
  return {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
  };
};

/** Hero title - 28px bold */
export function H1({ children, color, style, className, numberOfLines }: TextProps): React.JSX.Element {
  return (
    <h1
      className={className}
      style={{
        ...baseStyle,
        fontFamily: skin.typography.fontFamily.display,
        fontSize: skin.typography.fontSize.xxxl,
        fontWeight: skin.typography.fontWeight.bold,
        color: color ?? skin.colors.textPrimary,
        ...truncateStyle(numberOfLines),
        ...style,
      }}
    >
      {children}
    </h1>
  );
}

/** Section title - 18px semibold */
export function H2({ children, color, style, className, numberOfLines }: TextProps): React.JSX.Element {
  return (
    <h2
      className={className}
      style={{
        ...baseStyle,
        fontFamily: skin.typography.fontFamily.display,
        fontSize: skin.typography.fontSize.xl,
        fontWeight: skin.typography.fontWeight.semiBold,
        color: color ?? skin.colors.textPrimary,
        ...truncateStyle(numberOfLines),
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

/** Label text - 14px medium */
export function Label({ children, color, style, className, numberOfLines }: TextProps): React.JSX.Element {
  return (
    <span
      className={className}
      style={{
        ...baseStyle,
        fontFamily: skin.typography.fontFamily.body,
        fontSize: skin.typography.fontSize.md,
        fontWeight: skin.typography.fontWeight.medium,
        color: color ?? skin.colors.textSecondary,
        ...truncateStyle(numberOfLines),
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/** Body text - 16px regular */
export function Body({ children, color, style, className, numberOfLines }: TextProps): React.JSX.Element {
  return (
    <p
      className={className}
      style={{
        ...baseStyle,
        fontFamily: skin.typography.fontFamily.body,
        fontSize: skin.typography.fontSize.lg,
        fontWeight: skin.typography.fontWeight.regular,
        color: color ?? skin.colors.textSecondary,
        lineHeight: 1.4,
        ...truncateStyle(numberOfLines),
        ...style,
      }}
    >
      {children}
    </p>
  );
}

/** Meta text - 12px muted */
export function Meta({ children, color, style, className, numberOfLines }: TextProps): React.JSX.Element {
  return (
    <span
      className={className}
      style={{
        ...baseStyle,
        fontFamily: skin.typography.fontFamily.body,
        fontSize: skin.typography.fontSize.sm,
        fontWeight: skin.typography.fontWeight.regular,
        color: color ?? skin.colors.textDisabled,
        ...truncateStyle(numberOfLines),
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/** Button text - 16px semibold */
export function ButtonText({ children, color, style, className, numberOfLines }: TextProps): React.JSX.Element {
  return (
    <span
      className={className}
      style={{
        ...baseStyle,
        fontFamily: skin.typography.fontFamily.body,
        fontSize: skin.typography.fontSize.lg,
        fontWeight: skin.typography.fontWeight.bold,
        color: color ?? skin.colors.textPrimary,
        ...truncateStyle(numberOfLines),
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export default { H1, H2, Label, Body, Meta, ButtonText };
