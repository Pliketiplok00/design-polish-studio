/**
 * Mirror Feedback Confirmation Screen (Web Version)
 */

import React from 'react';
import { skin } from '../skin';
import { Icon } from '../primitives/Icon';
import { Button } from '../primitives/Button';
import { H1, H2, Body, Meta } from '../primitives/Text';

const fixture = {
  feedbackId: 'fb-12345',
  title: 'Hvala na povratnoj informaciji!',
  message: 'Vaš prijedlog je uspješno poslan. Očekujte odgovor u roku od 5 radnih dana.',
  primaryButtonLabel: 'Pogledaj prijedlog',
  secondaryButtonLabel: 'Natrag na početnu',
};

export function MirrorFeedbackConfirmationScreen(): React.JSX.Element {
  const handleViewFeedback = (): void => {};
  const handleGoHome = (): void => {};

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <H2 style={styles.headerTitle}>FeedbackConfirmation Mirror</H2>
        <Meta style={styles.headerMeta}>feedbackId: {fixture.feedbackId}</Meta>
      </div>

      <div style={styles.content}>
        <div style={styles.iconContainer}>
          <Icon name="check" size="xl" color={skin.colors.background} />
        </div>

        <H1 style={styles.title}>{fixture.title}</H1>
        <Body style={styles.message}>{fixture.message}</Body>

        <div style={styles.actions}>
          <Button variant="primary" onPress={handleViewFeedback}>
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

export default MirrorFeedbackConfirmationScreen;
