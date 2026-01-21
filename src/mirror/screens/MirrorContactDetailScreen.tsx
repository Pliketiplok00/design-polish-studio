/**
 * Mirror Contact Detail Screen (Web Version)
 * 
 * Recreates MirrorContactDetailScreen with contact info sections.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { skin } from '../skin';
import { Icon, type IconName } from '../primitives/Icon';
import { Card } from '../primitives/Card';
import { H1, H2, Label, Body, Meta, ButtonText } from '../primitives/Text';
import {
  contactDetailFixtures,
  contactsLabels,
} from '../fixtures/contacts';

interface ActionRowProps {
  icon: IconName;
  label: string;
  isEmergency?: boolean;
  onClick: () => void;
}

function ActionRow({ icon, label, isEmergency = false, onClick }: ActionRowProps): React.JSX.Element {
  return (
    <button
      style={{
        ...styles.actionRow,
        ...(isEmergency ? styles.actionRowEmergency : {}),
      }}
      onClick={onClick}
    >
      <div style={{
        ...styles.actionIconContainer,
        ...(isEmergency ? styles.actionIconContainerEmergency : {}),
      }}>
        <Icon name={icon} size="md" color={isEmergency ? skin.colors.urgent : skin.colors.primary} />
      </div>
      <ButtonText style={{
        ...styles.actionLabel,
        ...(isEmergency ? styles.actionLabelEmergency : {}),
      }}>
        {label}
      </ButtonText>
      <Icon name="chevron-right" size="sm" color={isEmergency ? 'white' : skin.colors.primary} />
    </button>
  );
}

export function MirrorContactDetailScreen(): React.JSX.Element {
  const [fixtureIndex, setFixtureIndex] = useState(0);
  const currentFixture = contactDetailFixtures[fixtureIndex];
  const contact = currentFixture.contact;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.mirrorHeader}>
        <Link to="/mirror" style={styles.backLink}>
          <Icon name="chevron-left" size="sm" colorToken="textMuted" />
          <span>Back</span>
        </Link>
        <H2 style={styles.mirrorHeaderTitle}>Contact Detail Mirror</H2>
        <Meta style={styles.mirrorHeaderMeta}>Fixture: {currentFixture.name}</Meta>
        
        {/* Fixture Switcher */}
        <div style={styles.fixtureSwitcher}>
          {contactDetailFixtures.map((fixture, index) => (
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
        {/* Contact Header Card */}
        <div style={{
          ...styles.contactHeader,
          ...(contact.isEmergency ? styles.contactHeaderEmergency : {}),
        }}>
          <div style={{
            ...styles.contactIconLarge,
            ...(contact.isEmergency ? styles.contactIconLargeEmergency : {}),
          }}>
            <Icon
              name={contact.icon}
              size="lg"
              color={contact.isEmergency ? skin.colors.urgent : skin.colors.primary}
            />
          </div>
          <H1 style={{
            ...styles.contactName,
            ...(contact.isEmergency ? styles.contactNameEmergency : {}),
          }}>
            {contact.name}
          </H1>
          <div style={{
            ...styles.categoryBadge,
            ...(contact.isEmergency ? styles.categoryBadgeEmergency : {}),
          }}>
            <Meta style={{
              ...styles.categoryBadgeText,
              ...(contact.isEmergency ? styles.categoryBadgeTextEmergency : {}),
            }}>
              {contact.categoryLabelHr}
            </Meta>
          </div>
        </div>

        {/* Contact Info Section */}
        <div style={styles.section}>
          {/* Phone Numbers */}
          {contact.phones.length > 0 && (
            <div style={styles.infoGroup}>
              <Label style={styles.infoLabel}>{contactsLabels.phoneHr}</Label>
              {contact.phones.map((phone, index) => (
                <ActionRow
                  key={`phone-${index}`}
                  icon="phone"
                  label={phone}
                  isEmergency={contact.isEmergency}
                  onClick={() => {}}
                />
              ))}
            </div>
          )}

          {/* Email */}
          {contact.email && (
            <div style={styles.infoGroup}>
              <Label style={styles.infoLabel}>{contactsLabels.emailHr}</Label>
              <ActionRow icon="mail" label={contact.email} onClick={() => {}} />
            </div>
          )}

          {/* Website */}
          {contact.website && (
            <div style={styles.infoGroup}>
              <Label style={styles.infoLabel}>{contactsLabels.websiteHr}</Label>
              <ActionRow icon="globe" label={contact.website} onClick={() => {}} />
            </div>
          )}

          {/* Address */}
          {contact.address && (
            <div style={styles.infoGroup}>
              <Label style={styles.infoLabel}>{contactsLabels.addressHr}</Label>
              <Card style={styles.infoCard}>
                <div style={styles.infoCardIconContainer}>
                  <Icon name="map-pin" size="md" colorToken="textPrimary" />
                </div>
                <Body style={styles.infoCardText}>{contact.address}</Body>
              </Card>
            </div>
          )}

          {/* Working Hours */}
          {contact.workingHours && (
            <div style={styles.infoGroup}>
              <Label style={styles.infoLabel}>{contactsLabels.workingHoursHr}</Label>
              <Card style={styles.infoCard}>
                <div style={styles.infoCardIconContainer}>
                  <Icon name="clock" size="md" colorToken="textPrimary" />
                </div>
                <Body style={styles.infoCardText}>{contact.workingHours}</Body>
              </Card>
            </div>
          )}
        </div>

        {/* Notes Section */}
        {(contact.noteHr || contact.noteEn) && (
          <div style={styles.section}>
            <Label style={styles.infoLabel}>{contactsLabels.noteHr}</Label>
            <Card style={styles.noteCard}>
              {contact.noteHr && <Body style={styles.noteText}>{contact.noteHr}</Body>}
              {contact.noteEn && <Meta style={styles.noteTextEn}>{contact.noteEn}</Meta>}
            </Card>
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
  contactHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: skin.spacing.xxl,
    margin: skin.spacing.lg,
    backgroundColor: skin.colors.primary,
    border: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
    boxShadow: skin.shadows.card,
  },
  contactHeaderEmergency: {
    backgroundColor: skin.colors.urgent,
  },
  contactIconLarge: {
    width: 64,
    height: 64,
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: skin.spacing.lg,
  },
  contactIconLargeEmergency: {},
  contactName: {
    color: 'white',
    textAlign: 'center',
    marginBottom: skin.spacing.md,
  },
  contactNameEmergency: {},
  categoryBadge: {
    backgroundColor: 'white',
    padding: `${skin.spacing.xs}px ${skin.spacing.md}px`,
  },
  categoryBadgeEmergency: {},
  categoryBadgeText: {
    color: skin.colors.primary,
  },
  categoryBadgeTextEmergency: {
    color: skin.colors.urgent,
  },
  section: {
    padding: skin.spacing.lg,
  },
  infoGroup: {
    marginBottom: skin.spacing.lg,
  },
  infoLabel: {
    color: skin.colors.textMuted,
    marginBottom: skin.spacing.sm,
    display: 'block',
  },
  infoCard: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: skin.spacing.md,
  },
  infoCardIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: skin.colors.backgroundSecondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: skin.spacing.md,
  },
  infoCardText: {
    flex: 1,
  },
  actionRow: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: skin.spacing.md,
    backgroundColor: skin.colors.primary,
    border: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
    marginBottom: skin.spacing.sm,
    boxShadow: skin.shadows.card,
    cursor: 'pointer',
  },
  actionRowEmergency: {
    backgroundColor: skin.colors.urgent,
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: skin.spacing.md,
  },
  actionIconContainerEmergency: {},
  actionLabel: {
    flex: 1,
    color: 'white',
    textAlign: 'left',
  },
  actionLabelEmergency: {},
  noteCard: {
    padding: skin.spacing.lg,
  },
  noteText: {
    marginBottom: skin.spacing.md,
  },
  noteTextEn: {
    fontStyle: 'italic',
    color: skin.colors.textMuted,
  },
};

export default MirrorContactDetailScreen;
