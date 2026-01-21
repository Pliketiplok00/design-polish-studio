/**
 * Mirror Transport Hub Screen (Web Version)
 * 
 * Recreates MirrorTransportHubScreen with banners and transport tiles.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { skin } from '../skin';
import { Icon } from '../primitives/Icon';
import { H1, H2, Label, Body, Meta, ButtonText } from '../primitives/Text';
import { bannersFixture, transportLabels, type InboxBanner } from '../fixtures/transport';

function BannerItem({ banner }: { banner: InboxBanner }): React.JSX.Element {
  return (
    <div style={{
      ...styles.bannerItem,
      ...(banner.is_urgent ? styles.bannerItemUrgent : {}),
    }}>
      <div style={{
        ...styles.bannerIcon,
        backgroundColor: banner.is_urgent ? skin.colors.urgent : skin.colors.teal,
      }}>
        <Icon
          name={banner.is_urgent ? 'alert-triangle' : 'info'}
          size="md"
          color="white"
        />
      </div>
      <div style={styles.bannerContent}>
        <ButtonText style={banner.is_urgent ? { color: skin.colors.urgent } : {}}>
          {banner.title}
        </ButtonText>
        <Body color={skin.colors.textMuted} style={{ marginTop: skin.spacing.xs }}>
          {banner.body}
        </Body>
      </div>
    </div>
  );
}

function TransportTile({ 
  icon, 
  title, 
  subtitle, 
  background 
}: { 
  icon: 'bus' | 'ship';
  title: string;
  subtitle: string;
  background: string;
}): React.JSX.Element {
  return (
    <div style={styles.tileWrapper}>
      <div style={styles.tileShadow} />
      <button style={{ ...styles.tile, backgroundColor: background }}>
        <div style={styles.tileIconSlab}>
          <Icon name={icon} size="lg" color="white" />
        </div>
        <div style={styles.tileDivider} />
        <div style={styles.tileContent}>
          <Label style={styles.tileTitle}>{title}</Label>
          <Meta style={styles.tileSubtitle}>{subtitle}</Meta>
        </div>
        <div style={styles.tileChevron}>
          <Icon name="chevron-right" size="md" color="rgba(255,255,255,0.7)" />
        </div>
      </button>
    </div>
  );
}

export function MirrorTransportHubScreen(): React.JSX.Element {
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <Link to="/mirror" style={styles.backLink}>
          <Icon name="chevron-left" size="sm" colorToken="textMuted" />
          <span>Back</span>
        </Link>
        <H2 style={styles.headerTitle}>TransportHub Mirror</H2>
        <Meta style={styles.headerMeta}>fixture: bannersFixture</Meta>
      </div>

      <div style={styles.scrollView}>
        {/* Banners */}
        {bannersFixture.length > 0 && (
          <div style={styles.bannerSection}>
            {bannersFixture.map((banner) => (
              <BannerItem key={banner.id} banner={banner} />
            ))}
          </div>
        )}

        {/* Title */}
        <div style={styles.section}>
          <H1>{transportLabels.title}</H1>
        </div>

        {/* Transport Tiles */}
        <div style={styles.tilesContainer}>
          <TransportTile
            icon="bus"
            title={transportLabels.roadTitle}
            subtitle={transportLabels.roadSubtitle}
            background={skin.colors.successAccent || 'hsl(160, 45%, 38%)'}
          />
          <TransportTile
            icon="ship"
            title={transportLabels.seaTitle}
            subtitle={transportLabels.seaSubtitle}
            background={skin.colors.primary}
          />
        </div>

        {/* Note Box */}
        <div style={styles.noteContainer}>
          <div style={styles.noteBox}>
            <Body style={styles.noteText}>{transportLabels.note}</Body>
          </div>
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
  },
  scrollView: {
    flex: 1,
    overflowY: 'auto',
  },
  bannerSection: {
    padding: skin.spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: skin.spacing.md,
  },
  bannerItem: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: skin.spacing.md,
    backgroundColor: skin.colors.backgroundTertiary,
    border: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
    boxShadow: skin.shadows.card,
  },
  bannerItemUrgent: {
    borderColor: skin.colors.urgent,
    borderWidth: skin.borders.widthHeavy,
  },
  bannerIcon: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: skin.spacing.md,
    flexShrink: 0,
  },
  bannerContent: {
    flex: 1,
  },
  section: {
    padding: skin.spacing.lg,
  },
  tilesContainer: {
    padding: `0 ${skin.spacing.lg}px`,
    display: 'flex',
    flexDirection: 'column',
    gap: skin.spacing.lg,
  },
  tileWrapper: {
    position: 'relative',
  },
  tileShadow: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: skin.colors.border,
  },
  tile: {
    position: 'relative',
    display: 'flex',
    alignItems: 'stretch',
    border: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
    cursor: 'pointer',
    width: '100%',
    overflow: 'hidden',
  },
  tileIconSlab: {
    width: 72,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: skin.spacing.lg,
  },
  tileDivider: {
    width: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  tileContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: skin.spacing.lg,
  },
  tileTitle: {
    color: 'white',
    textTransform: 'uppercase',
    marginBottom: skin.spacing.xs,
  },
  tileSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  tileChevron: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: skin.spacing.md,
  },
  noteContainer: {
    padding: skin.spacing.lg,
    paddingTop: skin.spacing.xxl,
  },
  noteBox: {
    border: `${skin.borders.widthThin}px solid ${skin.colors.borderMuted}`,
    backgroundColor: skin.colors.backgroundSecondary,
    padding: skin.spacing.lg,
  },
  noteText: {
    color: skin.colors.textMuted,
    textAlign: 'center',
  },
};

export default MirrorTransportHubScreen;
