/**
 * Mirror Settings Screen (Web Version)
 */

import React, { useState } from 'react';
import { skin } from '../skin';
import { Icon, type IconName } from '../primitives/Icon';
import { H2, Label, Body, Meta } from '../primitives/Text';

interface SettingItem {
  id: string;
  icon: IconName;
  label: string;
  description?: string;
  type: 'toggle' | 'navigation' | 'value';
  value?: string;
}

const settingsFixture: SettingItem[] = [
  { id: 'notifications', icon: 'inbox', label: 'Obavijesti', description: 'Prima push obavijesti', type: 'toggle' },
  { id: 'language', icon: 'globe', label: 'Jezik', type: 'value', value: 'Hrvatski' },
  { id: 'municipality', icon: 'home', label: 'Općina', type: 'value', value: 'Vis' },
  { id: 'mode', icon: 'user', label: 'Način korištenja', type: 'value', value: 'Stanovnik' },
  { id: 'about', icon: 'info', label: 'O aplikaciji', type: 'navigation' },
  { id: 'privacy', icon: 'file-text', label: 'Politika privatnosti', type: 'navigation' },
];

export function MirrorSettingsScreen(): React.JSX.Element {
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    notifications: true,
  });

  const handleToggle = (id: string): void => {
    setToggleStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNavigation = (): void => {};

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <H2 style={styles.headerTitle}>Settings Mirror</H2>
        <Meta style={styles.headerMeta}>settingsFixture</Meta>
      </div>

      <div style={styles.content}>
        <div style={styles.section}>
          {settingsFixture.map((item) => (
            <button
              key={item.id}
              style={styles.settingRow}
              onClick={() => {
                if (item.type === 'toggle') handleToggle(item.id);
                else handleNavigation();
              }}
            >
              <div style={styles.iconContainer}>
                <Icon name={item.icon} size="md" colorToken="textPrimary" />
              </div>
              <div style={styles.settingContent}>
                <Label style={styles.settingLabel}>{item.label}</Label>
                {item.description && (
                  <Body style={styles.settingDescription}>{item.description}</Body>
                )}
              </div>
              {item.type === 'toggle' && (
                <div
                  style={{
                    ...styles.toggle,
                    backgroundColor: toggleStates[item.id] ? skin.colors.primary : skin.colors.borderLight,
                  }}
                >
                  <div
                    style={{
                      ...styles.toggleThumb,
                      transform: toggleStates[item.id] ? 'translateX(16px)' : 'translateX(0)',
                    }}
                  />
                </div>
              )}
              {item.type === 'value' && (
                <div style={styles.valueContainer}>
                  <Meta>{item.value}</Meta>
                  <Icon name="chevron-right" size="sm" colorToken="chevron" />
                </div>
              )}
              {item.type === 'navigation' && (
                <Icon name="chevron-right" size="sm" colorToken="chevron" />
              )}
            </button>
          ))}
        </div>

        <div style={styles.versionInfo}>
          <Meta>MOJ VIS v1.0.0 (Build 123)</Meta>
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
    padding: skin.spacing.lg,
  },
  section: {
    backgroundColor: skin.colors.backgroundTertiary,
    borderRadius: skin.borders.radiusCard,
    border: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
    boxShadow: skin.shadows.card,
    overflow: 'hidden',
  },
  settingRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: skin.spacing.lg,
    borderBottom: `${skin.borders.widthHairline}px solid ${skin.colors.borderLight}`,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
  },
  iconContainer: {
    width: 40,
    marginRight: skin.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    display: 'block',
  },
  settingDescription: {
    color: skin.colors.textMuted,
    margin: 0,
    marginTop: skin.spacing.xs,
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
    transition: 'background-color 0.2s ease',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    transition: 'transform 0.2s ease',
    boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
  },
  valueContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: skin.spacing.sm,
  },
  versionInfo: {
    marginTop: skin.spacing.xxl,
    textAlign: 'center',
  },
};

export default MirrorSettingsScreen;
