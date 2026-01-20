/**
 * Mirror Click & Fix Confirmation Screen (Web Version)
 */

import React from 'react';
import { skin } from '../skin';
import { Icon } from '../primitives/Icon';
import { Button } from '../primitives/Button';
import { H1, H2, Body, Meta } from '../primitives/Text';

const fixture = {
  clickFixId: 'cf-67890',
  title: 'Prijava uspješno poslana!',
  message: 'Hvala vam što ste prijavili problem. Nadležne službe će pregledati vašu prijavu u najkraćem mogućem roku.',
  primaryButtonLabel: 'Pogledaj prijavu',
  secondaryButtonLabel: 'Natrag na početnu',
};

export function MirrorClickFixConfirmationScreen(): React.JSX.Element {
  const handleViewClickFix = (): void => {};
  const handleGoHome = (): void => {};

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <H2 style={styles.headerTitle}>ClickFixConfirmation Mirror</H2>
        <Meta style={styles.headerMeta}>clickFixId: {fixture.clickFixId}</Meta>
      </div>

      <div style={styles.content}>
        <div style={styles.iconContainer}>
          <Icon name="check" size="xl" color={skin.colors.background} />
        </div>

        <H1 style={styles.title}>{fixture.title}</H1>
        <Body style={styles.message}>{fixture.message}</Body>

        <div style={styles.actions}>
          <Button variant="primary" onPress={handleViewClickFix}>
            {fixture.primaryButtonLabel}
          </Button>
          <Button variant="secondary" onPress={handleGoHome}>
            {fixture.secondaryButtonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    backgroundColor: skin.colors.background,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: skin.spacing.lg,
    borderBottom: `${skin.borders.widthHeavy}px solid ${skin.colors.border}`,
    backgroundColor: skin.colors.backgroundTertiary,
  },
  headerTitle: {
    marginBottom: skin.spacing.xs,
  },
  headerMeta: {
    color: skin.colors.textMuted,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: skin.spacing.xxxl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: skin.colors.textPrimary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: skin.spacing.xxl,
  },
  title: {
    marginBottom: skin.spacing.md,
    textAlign: 'center',
  },
  message: {
    color: skin.colors.textMuted,
    textAlign: 'center',
    lineHeight: 1.6,
    marginBottom: skin.spacing.xxxl,
    maxWidth: 400,
  },
  actions: {
    width: '100%',
    maxWidth: 320,
    display: 'flex',
    flexDirection: 'column',
    gap: skin.spacing.md,
  },
};

export default MirrorClickFixConfirmationScreen;
