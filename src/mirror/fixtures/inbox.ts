/**
 * Inbox Fixtures (Design Mirror - Web)
 * 
 * Copied from mojvis/mobile/src/design-mirror/fixtures/inbox.ts
 */

export type InboxTag = 'promet' | 'kultura' | 'opcenito' | 'hitno' | 'vis' | 'komiza';

export interface InboxMessage {
  id: string;
  title: string;
  body: string;
  tags: InboxTag[];
  active_from: string | null;
  active_to: string | null;
  created_at: string;
  is_urgent: boolean;
}

export type FeedbackStatus = 'zaprimljeno' | 'u_razmatranju' | 'prihvaceno' | 'odbijeno';
export type ClickFixStatus = 'zaprimljeno' | 'u_obradi' | 'prihvaceno' | 'odbijeno';

export interface CombinedSentItemFixture {
  id: string;
  type: 'feedback' | 'click_fix';
  subject: string;
  status: FeedbackStatus | ClickFixStatus;
  status_label: string;
  photo_count?: number;
  created_at: string;
}

export const inboxMessagesFixture: InboxMessage[] = [
  {
    id: 'msg-001',
    title: 'Otkazana trajektna linija',
    body: 'Zbog najavljenog nevremena, trajektna linija Split-Vis za danas 19.01. je otkazana. Sljedeći trajekt prema najavi kreće sutra u 07:00.',
    tags: ['promet', 'hitno'],
    active_from: '2026-01-19T06:00:00Z',
    active_to: '2026-01-20T12:00:00Z',
    created_at: '2026-01-19T06:30:00Z',
    is_urgent: true,
  },
  {
    id: 'msg-002',
    title: 'Izložba u Galeriji Kut',
    body: 'Pozivamo vas na otvorenje izložbe "More i ljudi" u Galeriji Kut u Visu. Otvorenje je u subotu 25. siječnja u 19:00 sati.',
    tags: ['kultura'],
    active_from: null,
    active_to: null,
    created_at: '2026-01-18T14:00:00Z',
    is_urgent: false,
  },
  {
    id: 'msg-003',
    title: 'Obavijest o radnom vremenu',
    body: 'Turistički ured Vis će od ponedjeljka 20. siječnja raditi po zimskom rasporedu: ponedjeljak - petak 08:00 - 14:00.',
    tags: ['opcenito', 'vis'],
    active_from: null,
    active_to: null,
    created_at: '2026-01-17T10:00:00Z',
    is_urgent: false,
  },
  {
    id: 'msg-004',
    title: 'Nestanak struje',
    body: 'Obavještavamo stanovnike naselja Kut o planiranom nestanku električne energije sutra od 09:00 do 13:00 zbog radova na mreži.',
    tags: ['opcenito', 'hitno'],
    active_from: '2026-01-19T09:00:00Z',
    active_to: '2026-01-19T13:00:00Z',
    created_at: '2026-01-18T16:00:00Z',
    is_urgent: true,
  },
  {
    id: 'msg-005',
    title: 'Novi zimski vozni red',
    body: 'Od 1. veljače na snazi je novi zimski vozni red autobusne linije Vis-Komiža. Molimo putnike da provjere nove polaske.',
    tags: ['promet'],
    active_from: null,
    active_to: null,
    created_at: '2026-01-15T11:00:00Z',
    is_urgent: false,
  },
];

export const sentItemsFixture: CombinedSentItemFixture[] = [
  {
    id: 'feedback-001',
    type: 'feedback',
    subject: 'Prijedlog za poboljšanje autobusne linije',
    status: 'u_razmatranju',
    status_label: 'U razmatranju',
    created_at: '2026-01-17T10:15:00Z',
  },
  {
    id: 'clickfix-001',
    type: 'click_fix',
    subject: 'Oštećena cesta na putu prema Komiži',
    status: 'zaprimljeno',
    status_label: 'Zaprimljeno',
    photo_count: 2,
    created_at: '2026-01-16T14:30:00Z',
  },
  {
    id: 'feedback-002',
    type: 'feedback',
    subject: 'Zahvala za brzu sanaciju ceste',
    status: 'prihvaceno',
    status_label: 'Prihvaćeno',
    created_at: '2026-01-10T09:00:00Z',
  },
];

export const inboxLabels = {
  tabs: {
    received: 'Primljeno',
    sent: 'Poslano',
  },
  empty: {
    title: 'Nema poruka',
    received: 'Trenutno nema poruka u sandučiću.',
    sent: 'Još nemate poslanih poruka.',
    sentHint: 'Pošaljite prijedlog ili prijavite problem.',
  },
  actions: {
    newMessage: 'Novi prijedlog',
    reportProblem: 'Prijavi problem',
  },
  badges: {
    report: 'Prijava',
    new: 'NOVO',
    urgent: 'HITNO',
  },
  photoCount: 'fotografija',
};

export const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  zaprimljeno: { bg: '#E8F4FD', text: '#1976D2' },
  u_razmatranju: { bg: '#FFF3E0', text: '#E65100' },
  u_obradi: { bg: '#FFF3E0', text: '#E65100' },
  prihvaceno: { bg: '#E8F5E9', text: '#2E7D32' },
  odbijeno: { bg: '#FFEBEE', text: '#C62828' },
};
