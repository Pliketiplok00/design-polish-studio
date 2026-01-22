/**
 * Mirror Settings Screen (Web Version)
 *
 * Mirrors SettingsScreen using fixture data.
 * For visual auditing only - no navigation, no API calls.
 *
 * Sections mirrored:
 * 1. Push Notifications toggle
 * 2. Profile info (language, userMode, municipality)
 * 3. Reset Onboarding button
 * 4. Developer Tools (fixture-controlled, NOT __DEV__)
 * 5. Version info
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { skin } from '../skin';
import { Icon } from '../primitives/Icon';
import { H2, Label, Body, Meta } from '../primitives/Text';
import { settingsFixture, settingsLabels } from '../fixtures/settings';

/**
 * Mirror Settings Screen
 * Uses settingsFixture for all state
 */
export function MirrorSettingsScreen(): React.JSX.Element {
  const navigate = useNavigate();
  
  // All data from fixture - no real hooks
  const {
    language,
    userMode,
    municipality,
    pushOptIn,
    pushRegistered,
    isDev,
  } = settingsFixture;

  // Display labels from fixture
  const languageLabel = settingsLabels.language[language];
  const userModeLabel = settingsLabels.userMode[userMode][language];
  const municipalityLabel = municipality
    ? settingsLabels.municipality[municipality]
    : (language === 'en' ? 'Not selected' : 'Nije odabrano');

  // NO-OP handlers - visual only
  const handlePushToggle = (): void => {
    // Intentionally empty - mirror screens don't change state
  };

  const handleResetOnboarding = (): void => {
    // Intentionally empty - mirror screens don't navigate
  };

  const handleDevToolsPress = (): void => {
    // Intentionally empty - mirror screens don't navigate
  };

  return (
    <div style={styles.container}>
      {/* Back button */}
      <button
        onClick={() => navigate('/mirror')}
        style={styles.backButton}
      >
        <Icon name="arrow-left" size="md" colorToken="textPrimary" />
      </button>

      {/* Mirror header */}
      <div style={styles.header}>
        <H2 style={styles.headerTitle}>Settings Mirror</H2>
        <Meta style={styles.headerMeta}>fixture: settingsFixture</Meta>
      </div>

      <div style={styles.content}>
        {/* Notifications Section */}
        <div style={styles.section}>
          <H2 style={styles.sectionTitle}>
            {language === 'en' ? 'Push Notifications' : 'Push obavijesti'}
          </H2>

          <div style={styles.settingRow}>
            <div style={styles.settingInfo}>
              <Label style={styles.settingLabel}>
                {language === 'en' ? 'Push Notifications' : 'Push obavijesti'}
              </Label>
              <Body style={styles.settingDescription}>
                {language === 'en'
                  ? 'Receive urgent notifications'
                  : 'Primajte hitne obavijesti'}
              </Body>
            </div>
            {/* Web Switch implementation */}
            <button
              onClick={handlePushToggle}
              disabled={!pushRegistered}
              style={{
                ...styles.switch,
                backgroundColor: pushOptIn ? skin.colors.successAccent : skin.colors.borderLight,
                opacity: pushRegistered ? 1 : 0.5,
                cursor: pushRegistered ? 'pointer' : 'not-allowed',
              }}
            >
              <div
                style={{
                  ...styles.switchThumb,
                  transform: pushOptIn ? 'translateX(16px)' : 'translateX(0)',
                }}
              />
            </button>
          </div>
        </div>

        {/* Profile Section */}
        <div style={styles.section}>
          <H2 style={styles.sectionTitle}>
            {language === 'en' ? 'Profile' : 'Profil'}
          </H2>

          <div style={styles.infoRow}>
            <Body style={styles.infoLabel}>
              {language === 'en' ? 'Language' : 'Jezik'}
            </Body>
            <Label>{languageLabel}</Label>
          </div>

          <div style={styles.separator} />

          <div style={styles.infoRow}>
            <Body style={styles.infoLabel}>
              {language === 'en' ? 'User type' : 'Vrsta korisnika'}
            </Body>
            <Label>{userModeLabel}</Label>
          </div>

          {userMode === 'local' && (
            <>
              <div style={styles.separator} />
              <div style={styles.infoRow}>
                <Body style={styles.infoLabel}>
                  {language === 'en' ? 'Municipality' : 'Općina'}
                </Body>
                <Label>{municipalityLabel}</Label>
              </div>
            </>
          )}
        </div>

        {/* Actions Section - RESET BUTTON */}
        <div style={styles.section}>
          <button
            onClick={handleResetOnboarding}
            style={styles.dangerButton}
          >
            {language === 'en' ? 'Reset app settings' : 'Resetiraj postavke'}
          </button>
        </div>

        {/* Dev Tools Section - FIXTURE CONTROLLED (not __DEV__) */}
        {isDev && (
          <div style={styles.section}>
            <H2 style={styles.sectionTitle}>Developer Tools</H2>
            <button
              style={styles.devRow}
              onClick={handleDevToolsPress}
              disabled={true}
            >
              <div style={styles.devRowContent}>
                <Label style={styles.devRowLabel}>UI Inventory (DEV)</Label>
                <Body style={styles.devRowDescription}>
                  View all UI components and tokens
                </Body>
              </div>
              <Icon name="chevron-right" size="sm" colorToken="chevron" />
            </button>
          </div>
        )}

        {/* Version Info */}
        <div style={styles.versionContainer}>
          <Meta style={styles.versionText}>MOJ VIS v1.0.0</Meta>
          <Meta style={styles.versionText}>Design Mirror - Settings</Meta>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    backgroundColor: skin.colors.backgroundSecondary,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  backButton: {
    position: 'absolute',
    top: skin.spacing.lg,
    left: skin.spacing.lg,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: skin.spacing.sm,
    zIndex: 10,
  },
  header: {
    padding: skin.spacing.lg,
    paddingTop: skin.spacing.xxl,
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
    overflowY: 'auto',
    paddingBottom: skin.spacing.xxl,
  },
  section: {
    backgroundColor: skin.colors.backgroundTertiary,
    marginLeft: skin.spacing.lg,
    marginRight: skin.spacing.lg,
    marginTop: skin.spacing.lg,
    borderRadius: skin.borders.radiusCard,
    border: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
    padding: skin.spacing.lg,
    boxShadow: skin.shadows.card,
  },
  sectionTitle: {
    marginBottom: skin.spacing.lg,
  },
  settingRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flex: 1,
    marginRight: skin.spacing.lg,
  },
  settingLabel: {
    marginBottom: skin.spacing.xs,
    display: 'block',
  },
  settingDescription: {
    color: skin.colors.textMuted,
    margin: 0,
  },
  switch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
    border: 'none',
    transition: 'background-color 0.2s ease',
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    transition: 'transform 0.2s ease',
    boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: skin.spacing.md,
    paddingBottom: skin.spacing.md,
  },
  infoLabel: {
    color: skin.colors.textMuted,
    margin: 0,
  },
  separator: {
    height: skin.borders.widthHairline,
    backgroundColor: skin.colors.borderLight,
  },
  dangerButton: {
    width: '100%',
    padding: `${skin.spacing.md}px ${skin.spacing.lg}px`,
    backgroundColor: skin.colors.errorText,
    color: 'white',
    border: `${skin.borders.widthCard}px solid ${skin.colors.textPrimary}`,
    borderRadius: skin.borders.radiusSmall,
    fontFamily: skin.typography.fontFamily.body,
    fontWeight: skin.typography.fontWeight.bold,
    fontSize: skin.typography.fontSize.md,
    cursor: 'pointer',
    boxShadow: skin.shadows.card,
  },
  versionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: skin.spacing.xxl,
    paddingBottom: skin.spacing.xxl,
  },
  versionText: {
    color: skin.colors.textDisabled,
  },
  devRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: skin.spacing.md,
    paddingBottom: skin.spacing.md,
    width: '100%',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  devRowContent: {
    flex: 1,
  },
  devRowLabel: {
    color: skin.colors.textPrimary,
    marginBottom: skin.spacing.xs,
    display: 'block',
  },
  devRowDescription: {
    color: skin.colors.textMuted,
    margin: 0,
  },
};

export default MirrorSettingsScreen;
