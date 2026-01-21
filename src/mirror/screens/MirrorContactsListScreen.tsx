/**
 * Mirror Contacts List Screen (Web Version)
 * 
 * Recreates MirrorContactsListScreen with grouped contacts.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { skin } from '../skin';
import { Icon } from '../primitives/Icon';
import { Card } from '../primitives/Card';
import { H1, H2, Label, Body, Meta } from '../primitives/Text';
import {
  contactsListFixtures,
  contactsLabels,
  type Contact,
} from '../fixtures/contacts';

function ContactRow({ contact, onClick }: { contact: Contact; onClick: () => void }): React.JSX.Element {
  return (
    <Card onClick={onClick} style={{
      ...styles.contactRow,
      ...(contact.isEmergency ? styles.contactRowEmergency : {}),
    }}>
      <div style={{
        ...styles.contactIconContainer,
        ...(contact.isEmergency ? styles.contactIconContainerEmergency : {}),
      }}>
        <Icon
          name={contact.icon}
          size="md"
          color={contact.isEmergency ? 'white' : skin.colors.textPrimary}
        />
      </div>
      <div style={styles.contactContent}>
        <Label style={styles.contactName}>{contact.name}</Label>
        <div style={styles.contactMeta}>
          <span style={{
            ...styles.contactCategory,
            ...(contact.isEmergency ? styles.contactCategoryEmergency : {}),
          }}>
            {contact.categoryLabelHr}
          </span>
          {contact.phones.length > 0 && (
            <Meta style={styles.contactPhone}>{contact.phones[0]}</Meta>
          )}
        </div>
      </div>
      <Icon name="chevron-right" size="md" colorToken="chevron" />
    </Card>
  );
}

export function MirrorContactsListScreen(): React.JSX.Element {
  const [fixtureIndex, setFixtureIndex] = useState(0);
  const currentFixture = contactsListFixtures[fixtureIndex];

  const emergencyContacts = currentFixture.contacts.filter((c) => c.isEmergency);
  const otherContacts = currentFixture.contacts.filter((c) => !c.isEmergency);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.mirrorHeader}>
        <Link to="/mirror" style={styles.backLink}>
          <Icon name="chevron-left" size="sm" colorToken="textMuted" />
          <span>Back</span>
        </Link>
        <H2 style={styles.mirrorHeaderTitle}>Contacts List Mirror</H2>
        <Meta style={styles.mirrorHeaderMeta}>Fixture: {currentFixture.name}</Meta>
        
        {/* Fixture Switcher */}
        <div style={styles.fixtureSwitcher}>
          {contactsListFixtures.map((fixture, index) => (
            <button
              key={fixture.id}
              style={{
                ...styles.fixtureButton,
                ...(index === fixtureIndex ? styles.fixtureButtonActive : {}),
              }}
              onClick={() => setFixtureIndex(index)}
            >
              <Meta style={index === fixtureIndex ? { color: skin.colors.primaryText } : {}}>
                {fixture.name}
              </Meta>
            </button>
          ))}
        </div>
        <Meta style={styles.fixtureDescription}>{currentFixture.description}</Meta>
      </div>

      <div style={styles.content}>
        {/* Hero Section */}
        <div style={styles.heroSection}>
          <H1 style={styles.heroTitle}>{contactsLabels.titleHr}</H1>
          <Body style={styles.heroSubtitle}>{contactsLabels.subtitleHr}</Body>
        </div>

        {/* Empty State */}
        {currentFixture.contacts.length === 0 && (
          <div style={styles.emptyState}>
            <Icon name="phone" size="lg" colorToken="textDisabled" />
            <Body style={styles.emptyStateText}>{contactsLabels.emptyStateHr}</Body>
            <Meta style={styles.emptyStateTextEn}>{contactsLabels.emptyStateEn}</Meta>
          </div>
        )}

        {/* Emergency Contacts Section */}
        {emergencyContacts.length > 0 && (
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <Icon name="alert-triangle" size="md" colorToken="urgent" />
              <H2 style={styles.sectionTitleUrgent}>{contactsLabels.emergencySectionHr}</H2>
            </div>
            <div style={styles.contactsList}>
              {emergencyContacts.map((contact) => (
                <ContactRow key={contact.id} contact={contact} onClick={() => {}} />
              ))}
            </div>
          </div>
        )}

        {/* Other Contacts Section */}
        {otherContacts.length > 0 && (
          <div style={styles.section}>
            <H2 style={styles.sectionTitle}>{contactsLabels.allContactsHr}</H2>
            <div style={styles.contactsList}>
              {otherContacts.map((contact) => (
                <ContactRow key={contact.id} contact={contact} onClick={() => {}} />
              ))}
            </div>
          </div>
        )}
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
  mirrorHeader: {
    padding: skin.spacing.lg,
    borderBottom: `${skin.borders.widthHeavy}px solid ${skin.colors.border}`,
    backgroundColor: skin.colors.backgroundTertiary,
  },
  backLink: {
    display: 'flex',
    alignItems: 'center',
    gap: skin.spacing.xs,
    color: skin.colors.textMuted,
    textDecoration: 'none',
    marginBottom: skin.spacing.sm,
  },
  mirrorHeaderTitle: {
    marginBottom: skin.spacing.xs,
  },
  mirrorHeaderMeta: {
    color: skin.colors.textMuted,
  },
  fixtureSwitcher: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: skin.spacing.sm,
    marginTop: skin.spacing.md,
    marginBottom: skin.spacing.sm,
  },
  fixtureButton: {
    padding: `${skin.spacing.sm}px ${skin.spacing.md}px`,
    backgroundColor: skin.colors.backgroundSecondary,
    border: `${skin.borders.widthThin}px solid ${skin.colors.border}`,
    cursor: 'pointer',
  },
  fixtureButtonActive: {
    backgroundColor: skin.colors.primary,
    borderColor: skin.colors.primary,
  },
  fixtureDescription: {
    fontStyle: 'italic',
    color: skin.colors.textDisabled,
  },
  content: {
    flex: 1,
    overflowY: 'auto',
  },
  heroSection: {
    backgroundColor: skin.colors.urgent,
    padding: skin.spacing.xxl,
    margin: skin.spacing.lg,
    border: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
    boxShadow: skin.shadows.card,
  },
  heroTitle: {
    color: 'white',
    marginBottom: skin.spacing.sm,
  },
  heroSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  section: {
    padding: skin.spacing.lg,
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: skin.spacing.sm,
    marginBottom: skin.spacing.lg,
  },
  sectionTitle: {
    marginBottom: skin.spacing.lg,
  },
  sectionTitleUrgent: {
    color: skin.colors.urgent,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: skin.spacing.xxxl,
    margin: skin.spacing.lg,
    backgroundColor: skin.colors.backgroundSecondary,
    border: `2px dashed ${skin.colors.borderLight}`,
    gap: skin.spacing.md,
  },
  emptyStateText: {
    color: skin.colors.textDisabled,
    textAlign: 'center',
  },
  emptyStateTextEn: {
    color: skin.colors.textDisabled,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  contactsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: skin.spacing.md,
  },
  contactRow: {
    display: 'flex',
    alignItems: 'center',
    padding: skin.spacing.md,
  },
  contactRowEmergency: {
    borderColor: skin.colors.urgent,
    borderWidth: skin.borders.widthHeavy,
  },
  contactIconContainer: {
    width: 44,
    height: 44,
    backgroundColor: skin.colors.backgroundSecondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: skin.spacing.md,
  },
  contactIconContainerEmergency: {
    backgroundColor: skin.colors.urgent,
  },
  contactContent: {
    flex: 1,
  },
  contactName: {
    marginBottom: skin.spacing.xs,
    display: 'block',
  },
  contactMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: skin.spacing.sm,
  },
  contactCategory: {
    color: skin.colors.textMuted,
    backgroundColor: skin.colors.backgroundTertiary,
    padding: `${skin.spacing.xs}px ${skin.spacing.sm}px`,
    fontSize: skin.typography.fontSize.xs,
    fontFamily: skin.typography.fontFamily.body,
  },
  contactCategoryEmergency: {
    backgroundColor: skin.colors.urgent,
    color: 'white',
  },
  contactPhone: {
    color: skin.colors.primary,
  },
};

export default MirrorContactsListScreen;
