/**
 * Mirror Home Composite Screen (Web Version)
 * 
 * Recreates MirrorHomeCompositeScreen for web rendering.
 */

import React, { useState } from 'react';
import { skin } from '../skin';
import { Icon, type IconName } from '../primitives/Icon';
import { Card } from '../primitives/Card';
import { H1, H2, Body, Label, Meta, ButtonText } from '../primitives/Text';
import {
  homeFixtures,
  homeCategories,
  homeLabels,
  formatEventDate,
  type HomeFixture,
  type HomeBanner,
  type HomeEvent,
  type HomeCategory,
} from '../fixtures/home';

export function MirrorHomeCompositeScreen(): React.JSX.Element {
  const [fixtureIndex, setFixtureIndex] = useState(0);
  const currentFixture = homeFixtures[fixtureIndex];

  // NO-OP handlers - mirror screens don't navigate
  const handleBannerPress = (_banner: HomeBanner): void => {};
  const handleCategoryPress = (_category: HomeCategory): void => {};
  const handleEventPress = (_event: HomeEvent): void => {};
  const handleViewAllEvents = (): void => {};
  const handleFeedbackPress = (): void => {};

  return (
    <div style={styles.container}>
      {/* Mirror header with fixture switcher */}
      <div style={styles.mirrorHeader}>
        <H2 style={styles.mirrorHeaderTitle}>Home Composite Mirror</H2>
        <Meta style={styles.mirrorHeaderMeta}>
          Fixture: {currentFixture.name}
        </Meta>
        <div style={styles.fixtureSwitcher}>
          {homeFixtures.map((fixture, index) => (
            <button
              key={fixture.id}
              style={{
                ...styles.fixtureButton,
                ...(index === fixtureIndex ? styles.fixtureButtonActive : {}),
              }}
              onClick={() => setFixtureIndex(index)}
            >
              <Meta
                style={{
                  ...(index === fixtureIndex ? { color: skin.colors.primaryText } : { color: skin.colors.textMuted }),
                }}
              >
                {fixture.name}
              </Meta>
            </button>
          ))}
        </div>
        <Meta style={styles.fixtureDescription}>
          {currentFixture.description}
        </Meta>
      </div>

      <div style={styles.content}>
        {/* Banner Section */}
        {currentFixture.banners.length > 0 && (
          <div style={styles.bannerSection}>
            {currentFixture.banners.map((banner) => (
              <BannerItem
                key={banner.id}
                banner={banner}
                onPress={() => handleBannerPress(banner)}
              />
            ))}
          </div>
        )}

        {/* Hero Section */}
        <div style={styles.heroSection}>
          <H1 style={styles.heroTitle}>{currentFixture.heroTitleHr}</H1>
          <Body style={styles.heroSubtitle}>
            {currentFixture.heroSubtitleHr}
          </Body>
        </div>

        {/* Quick Access Grid */}
        <div style={styles.section}>
          <H2 style={styles.sectionTitle}>{homeLabels.sections.categoriesHr}</H2>
          <div style={styles.categoryGrid}>
            {homeCategories.map((category) => (
              <CategoryTile
                key={category.key}
                category={category}
                onPress={() => handleCategoryPress(category)}
              />
            ))}
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <H2 style={{ marginBottom: 0 }}>{homeLabels.sections.eventsHr}</H2>
            {currentFixture.events.length > 0 && (
              <button onClick={handleViewAllEvents} style={styles.viewAllButton}>
                <Label style={styles.viewAllLink}>
                  {homeLabels.events.viewAllHr}
                </Label>
              </button>
            )}
          </div>

          {currentFixture.events.length > 0 ? (
            <div style={styles.eventsContainer}>
              {currentFixture.events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onPress={() => handleEventPress(event)}
                />
              ))}
            </div>
          ) : (
            <div style={styles.emptyEventsPlaceholder}>
              <Icon name="calendar" size="lg" colorToken="textDisabled" />
              <Body style={styles.emptyEventsText}>
                {homeLabels.events.placeholderHr}
              </Body>
            </div>
          )}
        </div>

        {/* Feedback CTA Panel */}
        <div style={styles.feedbackSection}>
          <button
            style={styles.feedbackCard}
            onClick={handleFeedbackPress}
          >
            <div style={styles.feedbackIconContainer}>
              <Icon name="message-circle" size="lg" color="white" />
            </div>
            <div style={styles.feedbackContent}>
              <ButtonText style={styles.feedbackTitle}>
                {homeLabels.feedback.titleHr}
              </ButtonText>
              <Body style={styles.feedbackSubtitle}>
                {homeLabels.feedback.subtitleHr}
              </Body>
            </div>
            <Icon name="chevron-right" size="md" color="white" />
          </button>
        </div>

        {/* Footer spacing */}
        <div style={styles.footer} />
      </div>
    </div>
  );
}

// Sub-components
interface BannerItemProps {
  banner: HomeBanner;
  onPress: () => void;
}

function BannerItem({ banner, onPress }: BannerItemProps): React.JSX.Element {
  const isUrgent = banner.is_urgent;

  return (
    <button
      style={{
        ...styles.banner,
        ...(isUrgent ? styles.bannerUrgent : {}),
      }}
      onClick={onPress}
    >
      <div style={styles.bannerIconContainer}>
        <Icon
          name={isUrgent ? 'alert-triangle' : 'info'}
          size="sm"
          color={isUrgent ? skin.colors.urgentText : skin.colors.textPrimary}
        />
      </div>
      <Body
        style={{
          ...styles.bannerText,
          ...(isUrgent ? styles.bannerTextUrgent : {}),
        }}
        numberOfLines={2}
      >
        {banner.title}
      </Body>
      <Icon
        name="chevron-right"
        size="sm"
        color={isUrgent ? skin.colors.urgentText : skin.colors.textMuted}
      />
    </button>
  );
}

interface CategoryTileProps {
  category: HomeCategory;
  onPress: () => void;
}

function CategoryTile({ category, onPress }: CategoryTileProps): React.JSX.Element {
  return (
    <button
      style={{
        ...styles.categoryTile,
        backgroundColor: category.backgroundColor,
      }}
      onClick={onPress}
    >
      <Icon name={category.icon} size="lg" color={category.textColor} />
      <Label style={{ ...styles.categoryLabel, color: category.textColor }}>
        {category.labelHr}
      </Label>
    </button>
  );
}

interface EventCardProps {
  event: HomeEvent;
  onPress: () => void;
}

function EventCard({ event, onPress }: EventCardProps): React.JSX.Element {
  const { day, month } = formatEventDate(event.start_datetime);

  return (
    <Card variant="default" onPress={onPress} style={styles.eventCard}>
      <div style={styles.eventCardInner}>
        <div style={styles.eventDateBadge}>
          <H2 style={styles.eventDay}>{day}</H2>
          <Meta style={styles.eventMonth}>{month}</Meta>
        </div>
        <div style={styles.eventContent}>
          <Label style={styles.eventTitle} numberOfLines={2}>
            {event.title}
          </Label>
          {event.location && (
            <div style={styles.eventLocationRow}>
              <Icon name="map-pin" size="sm" colorToken="textMuted" />
              <Meta style={styles.eventLocation}>{event.location}</Meta>
            </div>
          )}
        </div>
        <Icon name="chevron-right" size="md" colorToken="chevron" />
      </div>
    </Card>
  );
}

// Styles
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
    borderRadius: skin.borders.radiusSmall,
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

  // Banner Section
  bannerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: skin.spacing.sm,
    padding: skin.spacing.lg,
    paddingBottom: 0,
  },
  banner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: skin.spacing.md,
    backgroundColor: skin.colors.backgroundSecondary,
    border: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
    borderRadius: skin.borders.radiusSmall,
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
  },
  bannerUrgent: {
    backgroundColor: skin.colors.urgent,
    borderColor: skin.colors.urgent,
  },
  bannerIconContainer: {
    marginRight: skin.spacing.sm,
  },
  bannerText: {
    flex: 1,
    marginRight: skin.spacing.sm,
    margin: 0,
  },
  bannerTextUrgent: {
    color: skin.colors.urgentText,
  },

  // Hero Section
  heroSection: {
    backgroundColor: skin.colors.primary,
    padding: skin.spacing.xxl,
    marginTop: skin.spacing.lg,
    marginLeft: skin.spacing.lg,
    marginRight: skin.spacing.lg,
    borderRadius: skin.borders.radiusCard,
    border: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
    boxShadow: skin.shadows.card,
  },
  heroTitle: {
    color: skin.colors.primaryText,
    marginBottom: skin.spacing.sm,
  },
  heroSubtitle: {
    color: skin.colors.primaryTextMuted,
    margin: 0,
  },

  // Section
  section: {
    padding: skin.spacing.lg,
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: skin.spacing.lg,
  },
  sectionTitle: {
    marginBottom: skin.spacing.lg,
  },
  viewAllButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
  viewAllLink: {
    color: skin.colors.primary,
  },

  // Category Grid
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: skin.spacing.md,
  },
  categoryTile: {
    aspectRatio: '1.2',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: skin.borders.radiusCard,
    border: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
    gap: skin.spacing.sm,
    boxShadow: skin.shadows.card,
    cursor: 'pointer',
  },
  categoryLabel: {
    textAlign: 'center',
  },

  // Events
  eventsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: skin.spacing.md,
  },
  eventCard: {
    padding: skin.spacing.md,
  },
  eventCardInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDateBadge: {
    width: 56,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: skin.colors.primary,
    borderRadius: skin.borders.radiusSmall,
    paddingTop: skin.spacing.sm,
    paddingBottom: skin.spacing.sm,
    marginRight: skin.spacing.md,
  },
  eventDay: {
    color: skin.colors.primaryText,
    marginBottom: -skin.spacing.xs,
  },
  eventMonth: {
    color: skin.colors.primaryTextMuted,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    marginBottom: skin.spacing.xs,
  },
  eventLocationRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: skin.spacing.xs,
  },
  eventLocation: {
    color: skin.colors.textMuted,
  },
  emptyEventsPlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: skin.spacing.xxl,
    backgroundColor: skin.colors.backgroundSecondary,
    border: `${skin.borders.widthThin}px dashed ${skin.colors.borderLight}`,
    borderRadius: skin.borders.radiusCard,
    gap: skin.spacing.md,
  },
  emptyEventsText: {
    color: skin.colors.textDisabled,
    margin: 0,
  },

  // Feedback CTA
  feedbackSection: {
    paddingLeft: skin.spacing.lg,
    paddingRight: skin.spacing.lg,
    paddingBottom: skin.spacing.lg,
  },
  feedbackCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: skin.spacing.lg,
    backgroundColor: skin.colors.primary,
    borderRadius: skin.borders.radiusCard,
    border: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
    boxShadow: skin.shadows.card,
    cursor: 'pointer',
  },
  feedbackIconContainer: {
    marginRight: skin.spacing.md,
  },
  feedbackContent: {
    flex: 1,
    textAlign: 'left',
  },
  feedbackTitle: {
    color: skin.colors.primaryText,
    marginBottom: skin.spacing.xs,
  },
  feedbackSubtitle: {
    color: skin.colors.primaryTextMuted,
    margin: 0,
  },

  // Footer
  footer: {
    height: skin.spacing.xxl,
  },
};

export default MirrorHomeCompositeScreen;
