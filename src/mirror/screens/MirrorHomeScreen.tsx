/**
 * Mirror Home Screen (Web Version)
 * 
 * Lists all available mirror screens for visual auditing.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { skin } from '../skin';
import { Icon, type IconName } from '../primitives/Icon';
import { H1, H2, Label, Body, Meta } from '../primitives/Text';

interface MirrorLink {
  title: string;
  description: string;
  icon: IconName;
  route: string;
}

const MIRROR_LINKS: MirrorLink[] = [
  {
    title: 'Home Composite',
    description: 'Mirror of HomeScreen with banners, events, categories + fixture switcher',
    icon: 'home',
    route: '/mirror/home',
  },
  {
    title: 'Inbox List',
    description: 'Mirror of InboxListScreen with tabs + messages',
    icon: 'inbox',
    route: '/mirror/inbox',
  },
  {
    title: 'Feedback Confirmation',
    description: 'Mirror of FeedbackConfirmationScreen',
    icon: 'check',
    route: '/mirror/feedback-confirmation',
  },
  {
    title: 'Click & Fix Confirmation',
    description: 'Mirror of ClickFixConfirmationScreen',
    icon: 'check',
    route: '/mirror/clickfix-confirmation',
  },
  {
    title: 'Language Selection',
    description: 'Mirror of LanguageSelectionScreen with HR/EN toggle',
    icon: 'globe',
    route: '/mirror/language',
  },
  {
    title: 'Settings',
    description: 'Mirror of SettingsScreen with fixture state',
    icon: 'settings',
    route: '/mirror/settings',
  },
];

export function MirrorHomeScreen(): React.JSX.Element {
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerTitleContainer}>
          <H1 style={styles.headerTitle}>Design Mirror</H1>
          <Meta style={styles.headerSubtitle}>DEV ONLY - Visual Auditing</Meta>
        </div>
      </div>

      <div style={styles.content}>
        {/* Info Section */}
        <div style={styles.infoSection}>
          <Body style={styles.infoText}>
            Mirror screens use deterministic fixtures instead of API calls.
            Use these for visual inspection and UI polishing.
          </Body>
        </div>

        {/* Mirror Links */}
        <div style={styles.section}>
          <H2 style={styles.sectionTitle}>Available Mirrors</H2>
          {MIRROR_LINKS.map((link) => (
            <Link
              key={link.route}
              to={link.route}
              style={styles.linkRow}
            >
              <div style={styles.linkIconContainer}>
                <Icon name={link.icon} size="md" colorToken="textPrimary" />
              </div>
              <div style={styles.linkContent}>
                <Label style={styles.linkTitle}>{link.title}</Label>
                <Body style={styles.linkDescription}>{link.description}</Body>
              </div>
              <Icon name="chevron-right" size="md" colorToken="chevron" />
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <Meta style={styles.footerText}>
            This screen is only visible in __DEV__ builds
          </Meta>
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
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: skin.spacing.lg,
    backgroundColor: skin.colors.primary,
    borderBottom: `${skin.borders.widthHeavy}px solid ${skin.colors.border}`,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    color: skin.colors.primaryText,
  },
  headerSubtitle: {
    color: skin.colors.primaryTextMuted,
  },
  content: {
    flex: 1,
    overflowY: 'auto',
  },
  infoSection: {
    backgroundColor: skin.colors.backgroundTertiary,
    margin: skin.spacing.lg,
    padding: skin.spacing.lg,
    borderRadius: skin.borders.radiusCard,
    border: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
  },
  infoText: {
    color: skin.colors.textMuted,
    margin: 0,
  },
  section: {
    backgroundColor: skin.colors.backgroundTertiary,
    marginLeft: skin.spacing.lg,
    marginRight: skin.spacing.lg,
    marginBottom: skin.spacing.lg,
    borderRadius: skin.borders.radiusCard,
    border: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
    padding: skin.spacing.lg,
    boxShadow: skin.shadows.card,
  },
  sectionTitle: {
    marginBottom: skin.spacing.lg,
  },
  linkRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: skin.spacing.md,
    paddingBottom: skin.spacing.md,
    borderBottom: `${skin.borders.widthHairline}px solid ${skin.colors.borderLight}`,
    textDecoration: 'none',
    color: 'inherit',
  },
  linkIconContainer: {
    width: skin.icons.size.lg,
    marginRight: skin.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkContent: {
    flex: 1,
  },
  linkTitle: {
    marginBottom: skin.spacing.xs,
    display: 'block',
  },
  linkDescription: {
    color: skin.colors.textMuted,
    margin: 0,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: skin.spacing.xxl,
    paddingBottom: skin.spacing.xxl,
  },
  footerText: {
    color: skin.colors.textDisabled,
  },
};

export default MirrorHomeScreen;
