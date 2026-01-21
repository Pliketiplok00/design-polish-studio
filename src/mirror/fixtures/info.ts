/**
 * Info Hub Fixtures (Web Mirror)
 * 
 * Static data for Info Hub mirror screen.
 * Adapted from mojvis/mobile/src/design-mirror/fixtures/info.ts
 */

import type { IconName } from '../primitives/Icon';

export interface InfoCategory {
  id: string;
  titleHr: string;
  titleEn: string;
  descriptionHr: string;
  descriptionEn: string;
  icon: IconName;
  backgroundColor: string;
  textColor: string;
}

export interface InfoTile {
  id: string;
  titleHr: string;
  titleEn: string;
  icon: IconName;
}

export interface InfoSection {
  id: string;
  titleHr: string;
  titleEn: string;
  tiles: InfoTile[];
}

export interface InfoHubFixture {
  id: string;
  name: string;
  description: string;
  heroTitleHr: string;
  heroTitleEn: string;
  heroSubtitleHr: string;
  heroSubtitleEn: string;
  categories: InfoCategory[];
  sections: InfoSection[];
}

export const infoCategories: InfoCategory[] = [
  {
    id: 'about-island',
    titleHr: 'O OTOKU',
    titleEn: 'ABOUT ISLAND',
    descriptionHr: 'Povijest, kultura i znamenitosti',
    descriptionEn: 'History, culture and landmarks',
    icon: 'globe',
    backgroundColor: 'hsl(210, 80%, 45%)',
    textColor: 'white',
  },
  {
    id: 'practical',
    titleHr: 'PRAKTIČNO',
    titleEn: 'PRACTICAL',
    descriptionHr: 'Korisne informacije za posjetitelje',
    descriptionEn: 'Useful info for visitors',
    icon: 'info',
    backgroundColor: 'hsl(45, 92%, 55%)',
    textColor: 'hsl(220, 20%, 10%)',
  },
  {
    id: 'nature',
    titleHr: 'PRIRODA',
    titleEn: 'NATURE',
    descriptionHr: 'Parkovi, plaže i staze',
    descriptionEn: 'Parks, beaches and trails',
    icon: 'leaf',
    backgroundColor: 'hsl(160, 45%, 38%)',
    textColor: 'white',
  },
  {
    id: 'services',
    titleHr: 'USLUGE',
    titleEn: 'SERVICES',
    descriptionHr: 'Zdravstvo, komunalije, javne službe',
    descriptionEn: 'Healthcare, utilities, public services',
    icon: 'wrench',
    backgroundColor: 'hsl(12, 55%, 50%)',
    textColor: 'white',
  },
];

export const infoLabels = {
  heroTitleHr: 'INFORMACIJE',
  heroTitleEn: 'INFORMATION',
  heroSubtitleHr: 'Sve što trebate znati o otoku Visu',
  heroSubtitleEn: 'Everything you need to know about Vis island',
  sectionsHr: 'KATEGORIJE',
  sectionsEn: 'CATEGORIES',
  quickLinksHr: 'BRZI LINKOVI',
  quickLinksEn: 'QUICK LINKS',
};

export const infoHubDefaultFixture: InfoHubFixture = {
  id: 'default',
  name: 'Default',
  description: 'Full hub with 4 categories and 2 sections',
  heroTitleHr: infoLabels.heroTitleHr,
  heroTitleEn: infoLabels.heroTitleEn,
  heroSubtitleHr: infoLabels.heroSubtitleHr,
  heroSubtitleEn: infoLabels.heroSubtitleEn,
  categories: infoCategories,
  sections: [
    {
      id: 'quick-links',
      titleHr: infoLabels.quickLinksHr,
      titleEn: infoLabels.quickLinksEn,
      tiles: [
        { id: 'tl-1', titleHr: 'Radno vrijeme', titleEn: 'Working hours', icon: 'clock' },
        { id: 'tl-2', titleHr: 'Hitni brojevi', titleEn: 'Emergency numbers', icon: 'phone' },
        { id: 'tl-3', titleHr: 'Javni WC', titleEn: 'Public restrooms', icon: 'map-pin' },
        { id: 'tl-4', titleHr: 'Parking', titleEn: 'Parking', icon: 'map-pin' },
      ],
    },
    {
      id: 'useful-info',
      titleHr: 'KORISNO',
      titleEn: 'USEFUL',
      tiles: [
        { id: 'tl-5', titleHr: 'Vremenska prognoza', titleEn: 'Weather forecast', icon: 'globe' },
        { id: 'tl-6', titleHr: 'Mjenjačnice', titleEn: 'Currency exchange', icon: 'info' },
      ],
    },
  ],
};

export const infoHubMinimalFixture: InfoHubFixture = {
  id: 'minimal',
  name: 'Minimal',
  description: 'Only 2 categories, no sections',
  heroTitleHr: infoLabels.heroTitleHr,
  heroTitleEn: infoLabels.heroTitleEn,
  heroSubtitleHr: infoLabels.heroSubtitleHr,
  heroSubtitleEn: infoLabels.heroSubtitleEn,
  categories: infoCategories.slice(0, 2),
  sections: [],
};

export const infoHubFixtures: InfoHubFixture[] = [
  infoHubDefaultFixture,
  infoHubMinimalFixture,
];
