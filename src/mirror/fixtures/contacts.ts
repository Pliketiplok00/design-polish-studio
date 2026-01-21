/**
 * Contacts Fixtures (Web Mirror)
 * 
 * Static data for Contacts mirror screens.
 * Adapted from mojvis/mobile/src/design-mirror/fixtures/contacts.ts
 */

import type { IconName } from '../primitives/Icon';

export type ContactCategory =
  | 'emergency'
  | 'municipality'
  | 'healthcare'
  | 'utilities'
  | 'transport'
  | 'tourism'
  | 'other';

export interface Contact {
  id: string;
  name: string;
  category: ContactCategory;
  categoryLabelHr: string;
  categoryLabelEn: string;
  phones: string[];
  email: string | null;
  website: string | null;
  address: string | null;
  workingHours: string | null;
  noteHr: string | null;
  noteEn: string | null;
  isEmergency: boolean;
  icon: IconName;
}

export interface ContactsListFixture {
  id: string;
  name: string;
  description: string;
  contacts: Contact[];
}

export interface ContactDetailFixture {
  id: string;
  name: string;
  description: string;
  contact: Contact;
}

export const contactCategoryLabels: Record<ContactCategory, { hr: string; en: string }> = {
  emergency: { hr: 'HITNE SLUŽBE', en: 'EMERGENCY' },
  municipality: { hr: 'OPĆINA', en: 'MUNICIPALITY' },
  healthcare: { hr: 'ZDRAVSTVO', en: 'HEALTHCARE' },
  utilities: { hr: 'KOMUNALIJE', en: 'UTILITIES' },
  transport: { hr: 'PRIJEVOZ', en: 'TRANSPORT' },
  tourism: { hr: 'TURIZAM', en: 'TOURISM' },
  other: { hr: 'OSTALO', en: 'OTHER' },
};

export const contactsLabels = {
  titleHr: 'KONTAKTI',
  titleEn: 'CONTACTS',
  subtitleHr: 'Važni kontakti na otoku',
  subtitleEn: 'Important contacts on the island',
  emergencySectionHr: 'HITNI BROJEVI',
  emergencySectionEn: 'EMERGENCY NUMBERS',
  allContactsHr: 'SVI KONTAKTI',
  allContactsEn: 'ALL CONTACTS',
  emptyStateHr: 'Nema dostupnih kontakata',
  emptyStateEn: 'No contacts available',
  phoneHr: 'Telefon',
  emailHr: 'E-pošta',
  websiteHr: 'Web stranica',
  addressHr: 'Adresa',
  workingHoursHr: 'Radno vrijeme',
  noteHr: 'Napomena',
};

const emergencyContacts: Contact[] = [
  {
    id: 'emergency-police',
    name: 'Policija / Police',
    category: 'emergency',
    categoryLabelHr: contactCategoryLabels.emergency.hr,
    categoryLabelEn: contactCategoryLabels.emergency.en,
    phones: ['192'],
    email: null,
    website: null,
    address: null,
    workingHours: '24/7',
    noteHr: 'Pozovite za sve hitne slučajeve sigurnosti',
    noteEn: 'Call for all safety emergencies',
    isEmergency: true,
    icon: 'alert-triangle',
  },
  {
    id: 'emergency-ambulance',
    name: 'Hitna pomoć / Ambulance',
    category: 'emergency',
    categoryLabelHr: contactCategoryLabels.emergency.hr,
    categoryLabelEn: contactCategoryLabels.emergency.en,
    phones: ['194'],
    email: null,
    website: null,
    address: null,
    workingHours: '24/7',
    noteHr: 'Za medicinske hitne slučajeve',
    noteEn: 'For medical emergencies',
    isEmergency: true,
    icon: 'alert-triangle',
  },
  {
    id: 'emergency-fire',
    name: 'Vatrogasci / Fire Department',
    category: 'emergency',
    categoryLabelHr: contactCategoryLabels.emergency.hr,
    categoryLabelEn: contactCategoryLabels.emergency.en,
    phones: ['193'],
    email: null,
    website: null,
    address: null,
    workingHours: '24/7',
    noteHr: 'Za požare i spašavanje',
    noteEn: 'For fires and rescue',
    isEmergency: true,
    icon: 'alert-triangle',
  },
];

const municipalityContacts: Contact[] = [
  {
    id: 'municipality-vis',
    name: 'Grad Vis',
    category: 'municipality',
    categoryLabelHr: contactCategoryLabels.municipality.hr,
    categoryLabelEn: contactCategoryLabels.municipality.en,
    phones: ['+385 21 711 532', '+385 21 711 533'],
    email: 'grad.vis@vis.hr',
    website: 'www.gradvis.hr',
    address: 'Trg 30. svibnja 2, 21480 Vis',
    workingHours: 'Pon-Pet 08:00-15:00',
    noteHr: 'Gradska uprava i javne usluge',
    noteEn: 'City administration and public services',
    isEmergency: false,
    icon: 'home',
  },
];

const healthcareContacts: Contact[] = [
  {
    id: 'healthcare-dom',
    name: 'Dom zdravlja Vis',
    category: 'healthcare',
    categoryLabelHr: contactCategoryLabels.healthcare.hr,
    categoryLabelEn: contactCategoryLabels.healthcare.en,
    phones: ['+385 21 711 035'],
    email: 'dom.zdravlja.vis@gmail.com',
    website: null,
    address: 'Put Jame 3, 21480 Vis',
    workingHours: 'Pon-Pet 07:00-19:00, Sub 08:00-12:00',
    noteHr: 'Opća praksa, hitna pomoć, laboratorij',
    noteEn: 'General practice, emergency, laboratory',
    isEmergency: false,
    icon: 'info',
  },
];

const tourismContacts: Contact[] = [
  {
    id: 'tourism-tz-vis',
    name: 'Turistička zajednica Vis',
    category: 'tourism',
    categoryLabelHr: contactCategoryLabels.tourism.hr,
    categoryLabelEn: contactCategoryLabels.tourism.en,
    phones: ['+385 21 717 017'],
    email: 'info@tz-vis.hr',
    website: 'www.tz-vis.hr',
    address: 'Šetalište stare Isse 5, 21480 Vis',
    workingHours: 'Pon-Sub 08:00-20:00 (sezona)',
    noteHr: 'Informacije za turiste, karte, smještaj',
    noteEn: 'Tourist information, maps, accommodation',
    isEmergency: false,
    icon: 'globe',
  },
];

export const contactsListDefaultFixture: ContactsListFixture = {
  id: 'default',
  name: 'Default',
  description: 'Mixed contacts from all categories',
  contacts: [
    ...emergencyContacts.slice(0, 2),
    ...municipalityContacts,
    ...healthcareContacts,
    ...tourismContacts,
  ],
};

export const contactsListEmergencyFixture: ContactsListFixture = {
  id: 'emergency',
  name: 'Emergency',
  description: 'Emergency contacts only',
  contacts: emergencyContacts,
};

export const contactsEmptyFixture: ContactsListFixture = {
  id: 'empty',
  name: 'Empty',
  description: 'Empty state - no contacts',
  contacts: [],
};

export const contactDetailLongFixture: ContactDetailFixture = {
  id: 'detail-long',
  name: 'Long Detail',
  description: 'Contact with long notes and address',
  contact: {
    id: 'long-detail-contact',
    name: 'Turistička zajednica grada Visa - Ured za informacije',
    category: 'tourism',
    categoryLabelHr: contactCategoryLabels.tourism.hr,
    categoryLabelEn: contactCategoryLabels.tourism.en,
    phones: ['+385 21 717 017', '+385 21 717 018', '+385 91 555 1234'],
    email: 'info@tz-vis.hr',
    website: 'www.tz-vis.hr',
    address: 'Šetalište stare Isse 5, zgrada TZ, prizemlje, 21480 Vis',
    workingHours: 'Pon-Sub: 08:00-20:00 (sezona), 08:00-14:00 (izvan sezone)',
    noteHr: 'Turistički ured pruža sve potrebne informacije za posjetitelje otoka Visa, uključujući karte, brošure, preporuke za smještaj i aktivnosti.',
    noteEn: 'The tourist office provides all necessary information for visitors, including maps, brochures, and recommendations.',
    isEmergency: false,
    icon: 'globe',
  },
};

export const contactDetailMinimalFixture: ContactDetailFixture = {
  id: 'detail-minimal',
  name: 'Minimal Detail',
  description: 'Contact with minimal info',
  contact: emergencyContacts[0],
};

export const contactsListFixtures: ContactsListFixture[] = [
  contactsListDefaultFixture,
  contactsListEmergencyFixture,
  contactsEmptyFixture,
];

export const contactDetailFixtures: ContactDetailFixture[] = [
  contactDetailLongFixture,
  contactDetailMinimalFixture,
];
