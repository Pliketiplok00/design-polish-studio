/**
 * Mirror Language Selection Screen (Web Version)
 */

import React from 'react';
import { skin } from '../skin';
import { Button } from '../primitives/Button';
import { H1, H2, Body, Meta } from '../primitives/Text';

export function MirrorLanguageSelectionScreen(): React.JSX.Element {
  const handleLanguageSelect = (language: 'hr' | 'en'): void => {
    console.info(`Selected language: ${language}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <H2 style={styles.headerTitle}>LanguageSelection Mirror</H2>
        <Meta style={styles.headerMeta}>ONBOARD_LANG_00</Meta>
      </div>

      <div style={styles.content}>
        <div style={styles.logoContainer}>
          <H1>MOJ VIS</H1>
        </div>

        <H2 style={styles.title}>Dobrodošli / Welcome</H2>
        <Body style={styles.subtitle}>Odaberite jezik / Select language</Body>

        <div style={styles.buttonContainer}>
          <Button variant="primary" onPress={() => handleLanguageSelect('hr')}>
            Hrvatski
          </Button>
          <Button variant="primary" onPress={() => handleLanguageSelect('en')}>
            English
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
    padding: skin.spacing.xxl,
  },
  logoContainer: {
    marginBottom: skin.spacing.xxxl,
  },
  title: {
    marginBottom: skin.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    color: skin.colors.textMuted,
    marginBottom: skin.spacing.xxxl,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
    display: 'flex',
    flexDirection: 'column',
    gap: skin.spacing.lg,
  },
};

export default MirrorLanguageSelectionScreen;
