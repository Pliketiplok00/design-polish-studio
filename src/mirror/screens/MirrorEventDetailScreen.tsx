/**
 * Mirror Event Detail Screen (Web Version)
 * 
 * Recreates MirrorEventDetailScreen with event info and actions.
 */

import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { skin } from '../skin';
import { Icon } from '../primitives/Icon';
import { Button } from '../primitives/Button';
import { H1, H2, Label, Body, Meta, ButtonText } from '../primitives/Text';
import {
  eventListFixture,
  eventDetailMinimalFixture,
  eventsLabels,
  type Event,
} from '../fixtures/events';

function formatDateLocaleFull(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('hr-HR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatTimeHrHR(dateStr: string): string {
  const date = new Date(dateStr);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function MirrorEventDetailScreen(): React.JSX.Element {
  const { eventId } = useParams<{ eventId: string }>();
  const [useMinimal, setUseMinimal] = useState(false);
  
  // Find event by ID or fall back to first fixture
  const foundEvent: Event | undefined = eventListFixture.find((e) => e.id === eventId);
  const event = useMinimal ? eventDetailMinimalFixture : (foundEvent || eventListFixture[0]);
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <Link to="/mirror/events" style={styles.backLink}>
          <Icon name="chevron-left" size="sm" colorToken="textMuted" />
          <span>Back</span>
        </Link>
        <H2 style={styles.headerTitle}>EventDetail Mirror</H2>
        <Meta style={styles.headerMeta}>
          fixture: {useMinimal ? 'eventDetailMinimalFixture' : 'eventDetailFixture'}
        </Meta>
        <button
          style={styles.toggleButton}
          onClick={() => setUseMinimal(!useMinimal)}
        >
          {useMinimal ? 'Show Full' : 'Show Minimal'}
        </button>
      </div>

      <div style={styles.scrollView}>
        {/* Hero Image */}
        {event.image_url && (
          <img
            src={event.image_url}
            alt={event.title}
            style={styles.heroImage}
          />
        )}

        {/* Title Header - Yellow Slab */}
        <div style={styles.titleHeader}>
          <H1>{event.title}</H1>
        </div>

        {/* Info Tiles */}
        <div style={styles.infoTilesContainer}>
          {/* Date & Time */}
          <div style={styles.infoTile}>
            <div style={styles.infoTileIconBox}>
              <Icon name="clock" size="md" colorToken="textPrimary" />
            </div>
            <div style={styles.infoTileContent}>
              <Body>{formatDateLocaleFull(event.start_datetime)}</Body>
              {event.is_all_day ? (
                <Label style={styles.infoTileSecondary}>{eventsLabels.detail.allDay}</Label>
              ) : (
                <Label style={styles.infoTileSecondary}>
                  {formatTimeHrHR(event.start_datetime)}
                  {event.end_datetime && ` - ${formatTimeHrHR(event.end_datetime)}`}
                </Label>
              )}
            </div>
          </div>

          {/* Location */}
          {event.location && (
            <div style={styles.infoTile}>
              <div style={styles.infoTileIconBox}>
                <Icon name="map-pin" size="md" colorToken="textPrimary" />
              </div>
              <div style={styles.infoTileContent}>
                <Body>{event.location}</Body>
              </div>
            </div>
          )}

          {/* Organizer */}
          <div style={styles.infoTile}>
            <div style={styles.infoTileIconBox}>
              <Icon name="user" size="md" colorToken="textPrimary" />
            </div>
            <div style={styles.infoTileContent}>
              <Body>{event.organizer}</Body>
            </div>
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <div style={styles.descriptionSection}>
            <Meta style={styles.descriptionLabel}>{eventsLabels.detail.description.toUpperCase()}</Meta>
            <Body style={styles.description}>{event.description}</Body>
          </div>
        )}

        {/* Reminder Toggle */}
        <div style={styles.reminderWrapper}>
          <div style={styles.ctaShadowLayer} />
          <div style={styles.reminderSection}>
            <div style={styles.reminderInfo}>
              <ButtonText>{eventsLabels.detail.reminder}</ButtonText>
              <Meta style={styles.reminderHint}>
                {subscribed ? 'Podsjetnik je aktivan' : 'Primite obavijest prije događaja'}
              </Meta>
            </div>
            <label style={styles.switchLabel}>
              <input
                type="checkbox"
                checked={subscribed}
                onChange={(e) => setSubscribed(e.target.checked)}
                style={styles.switchInput}
              />
              <span style={{
                ...styles.switchTrack,
                backgroundColor: subscribed ? skin.colors.primary : skin.colors.borderLight,
              }}>
                <span style={{
                  ...styles.switchThumb,
                  transform: subscribed ? 'translateX(20px)' : 'translateX(0)',
                }} />
              </span>
            </label>
          </div>
        </div>

        {/* Share Button */}
        <div style={styles.shareWrapper}>
          <div style={styles.ctaShadowLayerButton} />
          <Button variant="secondary" onPress={() => {}} style={styles.shareButton}>
            {eventsLabels.detail.share}
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
  backLink: {
    display: 'flex',
    alignItems: 'center',
    gap: skin.spacing.xs,
    color: skin.colors.textMuted,
    textDecoration: 'none',
    marginBottom: skin.spacing.sm,
  },
  headerTitle: {
    marginBottom: skin.spacing.xs,
  },
  headerMeta: {
    color: skin.colors.textMuted,
    marginBottom: skin.spacing.sm,
  },
  toggleButton: {
    marginTop: skin.spacing.sm,
    padding: `${skin.spacing.sm}px ${skin.spacing.md}px`,
    backgroundColor: skin.colors.backgroundSecondary,
    border: `${skin.borders.widthThin}px solid ${skin.colors.border}`,
    cursor: 'pointer',
    fontFamily: skin.typography.fontFamily.body,
  },
  scrollView: {
    flex: 1,
    overflowY: 'auto',
  },
  heroImage: {
    width: '100%',
    aspectRatio: '16/9',
    objectFit: 'cover',
    borderBottom: `${skin.borders.widthHeavy}px solid ${skin.colors.border}`,
  },
  titleHeader: {
    padding: skin.spacing.lg,
    borderBottom: `${skin.borders.widthHeavy}px solid ${skin.colors.border}`,
    backgroundColor: skin.colors.accent,
  },
  infoTilesContainer: {
    borderBottom: `${skin.borders.widthHeavy}px solid ${skin.colors.border}`,
  },
  infoTile: {
    display: 'flex',
    alignItems: 'center',
    padding: skin.spacing.lg,
    borderBottom: `${skin.borders.widthHairline}px solid ${skin.colors.borderLight}`,
    gap: skin.spacing.md,
  },
  infoTileIconBox: {
    width: 44,
    height: 44,
    backgroundColor: skin.colors.backgroundSecondary,
    border: `${skin.borders.widthThin}px solid ${skin.colors.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTileContent: {
    flex: 1,
  },
  infoTileSecondary: {
    marginTop: skin.spacing.xs,
    color: skin.colors.textSecondary,
  },
  descriptionSection: {
    padding: skin.spacing.lg,
    borderBottom: `${skin.borders.widthHeavy}px solid ${skin.colors.border}`,
  },
  descriptionLabel: {
    textTransform: 'uppercase',
    marginBottom: skin.spacing.md,
    display: 'block',
  },
  description: {
    lineHeight: 1.6,
  },
  reminderWrapper: {
    margin: skin.spacing.lg,
    position: 'relative',
  },
  ctaShadowLayer: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: skin.colors.border,
  },
  reminderSection: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: skin.spacing.lg,
    backgroundColor: skin.colors.background,
    border: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderHint: {
    marginTop: skin.spacing.xs,
  },
  switchLabel: {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
  },
  switchInput: {
    position: 'absolute',
    opacity: 0,
    width: 0,
    height: 0,
  },
  switchTrack: {
    display: 'block',
    width: 44,
    height: 24,
    borderRadius: 12,
    transition: 'background-color 0.2s',
  },
  switchThumb: {
    display: 'block',
    position: 'absolute',
    top: 2,
    left: 2,
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: '50%',
    transition: 'transform 0.2s',
  },
  shareWrapper: {
    marginLeft: skin.spacing.lg,
    marginRight: skin.spacing.lg,
    marginBottom: skin.spacing.lg,
    position: 'relative',
  },
  ctaShadowLayerButton: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: skin.colors.border,
  },
  shareButton: {
    position: 'relative',
  },
};

export default MirrorEventDetailScreen;
