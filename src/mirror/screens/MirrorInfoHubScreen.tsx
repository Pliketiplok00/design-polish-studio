/**
 * Mirror Info Hub Screen (Web Version)
 * 
 * Recreates MirrorInfoHubScreen with categories and quick links.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { skin } from '../skin';
import { Icon } from '../primitives/Icon';
import { Card } from '../primitives/Card';
import { H1, H2, Label, Body, Meta } from '../primitives/Text';
import {
  infoHubFixtures,
  infoLabels,
  type InfoCategory,
  type InfoTile,
} from '../fixtures/info';

function CategoryTile({ category, onClick }: { category: InfoCategory; onClick: () => void }): React.JSX.Element {
  return (
    <button
      style={{
        ...styles.categoryTile,
        backgroundColor: category.backgroundColor,
      }}
      onClick={onClick}
    >
      <Icon name={category.icon} size="lg" color={category.textColor} />
      <Label style={{ ...styles.categoryLabel, color: category.textColor }}>
        {category.titleHr}
      </Label>
      <Meta style={{ ...styles.categoryDescription, color: category.textColor }}>
        {category.descriptionHr}
      </Meta>
    </button>
  );
}

function TileRow({ tile, onPress }: { tile: InfoTile; onPress: () => void }): React.JSX.Element {
  return (
    <Card onPress={onPress} style={styles.tileRow}>
      <div style={styles.tileIconContainer}>
        <Icon name={tile.icon} size="md" colorToken="textPrimary" />
      </div>
      <div style={styles.tileContent}>
        <Label style={styles.tileTitle}>{tile.titleHr}</Label>
        <Meta style={styles.tileSubtitle}>{tile.titleEn}</Meta>
      </div>
      <Icon name="chevron-right" size="md" colorToken="chevron" />
    </Card>
  );
}

export function MirrorInfoHubScreen(): React.JSX.Element {
  const [fixtureIndex, setFixtureIndex] = useState(0);
  const currentFixture = infoHubFixtures[fixtureIndex];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.mirrorHeader}>
        <Link to="/mirror" style={styles.backLink}>
          <Icon name="chevron-left" size="sm" colorToken="textMuted" />
          <span>Back</span>
        </Link>
        <H2 style={styles.mirrorHeaderTitle}>Info Hub Mirror</H2>
        <Meta style={styles.mirrorHeaderMeta}>Fixture: {currentFixture.name}</Meta>
        
        {/* Fixture Switcher */}
        <div style={styles.fixtureSwitcher}>
          {infoHubFixtures.map((fixture, index) => (
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
          <H1 style={styles.heroTitle}>{currentFixture.heroTitleHr}</H1>
          <Body style={styles.heroSubtitle}>{currentFixture.heroSubtitleHr}</Body>
        </div>

        {/* Categories Section */}
        {currentFixture.categories.length > 0 && (
          <div style={styles.section}>
            <H2 style={styles.sectionTitle}>{infoLabels.sectionsHr}</H2>
            <div style={styles.categoryGrid}>
              {currentFixture.categories.map((category) => (
                <CategoryTile key={category.id} category={category} onClick={() => {}} />
              ))}
            </div>
          </div>
        )}

        {/* Quick Links Sections */}
        {currentFixture.sections.map((section) => (
          <div key={section.id} style={styles.section}>
            <H2 style={styles.sectionTitle}>{section.titleHr}</H2>
            <div style={styles.tilesContainer}>
              {section.tiles.map((tile) => (
                <TileRow key={tile.id} tile={tile} onPress={() => {}} />
              ))}
            </div>
          </div>
        ))}
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
    backgroundColor: skin.colors.primary,
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
    color: 'rgba(255, 255, 255, 0.85)',
  },
  section: {
    padding: skin.spacing.lg,
  },
  sectionTitle: {
    marginBottom: skin.spacing.lg,
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: skin.spacing.md,
  },
  categoryTile: {
    minHeight: 120,
    padding: skin.spacing.md,
    border: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
    boxShadow: skin.shadows.card,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: skin.spacing.xs,
    textAlign: 'left',
  },
  categoryLabel: {
    marginTop: skin.spacing.sm,
    display: 'block',
  },
  categoryDescription: {
    opacity: 0.8,
  },
  tilesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: skin.spacing.md,
  },
  tileRow: {
    display: 'flex',
    alignItems: 'center',
    padding: skin.spacing.md,
  },
  tileIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: skin.colors.backgroundSecondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: skin.spacing.md,
  },
  tileContent: {
    flex: 1,
  },
  tileTitle: {
    marginBottom: skin.spacing.xs,
    display: 'block',
  },
  tileSubtitle: {
    color: skin.colors.textMuted,
    fontStyle: 'italic',
  },
};

export default MirrorInfoHubScreen;
