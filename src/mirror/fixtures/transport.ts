/**
 * Transport Fixtures (Web Mirror)
 * 
 * Static data for Transport mirror screens.
 * Adapted from mojvis/mobile/src/design-mirror/fixtures/transport.ts
 */

export interface LineListItem {
  id: string;
  name: string;
  subtype: string | null;
  stops_summary: string;
  typical_duration_minutes: number | null;
  stops_count: number;
}

export interface TodayDepartureItem {
  departure_time: string;
  line_id: string;
  line_name: string;
  route_id: string;
  direction_label: string;
  destination: string;
  marker: string | null;
  subtype?: string;
}

export interface InboxBanner {
  id: string;
  title: string;
  body: string;
  tags: string[];
  active_from: string;
  active_to: string;
  created_at: string;
  is_urgent: boolean;
}

export const seaLinesFixture: LineListItem[] = [
  {
    id: 'line-602',
    name: 'Linija 602',
    subtype: 'Trajekt',
    stops_summary: 'Split - Vis',
    typical_duration_minutes: 140,
    stops_count: 2,
  },
  {
    id: 'line-9602',
    name: 'Linija 9602',
    subtype: 'Katamaran',
    stops_summary: 'Split - Milna - Hvar - Vis',
    typical_duration_minutes: 130,
    stops_count: 4,
  },
  {
    id: 'line-bisevo',
    name: 'Bisevo',
    subtype: 'Katamaran',
    stops_summary: 'Komiza - Bisevo',
    typical_duration_minutes: 20,
    stops_count: 2,
  },
];

export const roadLinesFixture: LineListItem[] = [
  {
    id: 'line-vis-komiza',
    name: 'Vis - Komiza',
    subtype: 'Autobus',
    stops_summary: 'Vis - Podhumlje - Komiza',
    typical_duration_minutes: 30,
    stops_count: 5,
  },
  {
    id: 'line-vis-milna',
    name: 'Vis - Milna',
    subtype: 'Autobus',
    stops_summary: 'Vis - Rukavac - Milna',
    typical_duration_minutes: 15,
    stops_count: 3,
  },
];

export const seaTodayDeparturesFixture: TodayDepartureItem[] = [
  {
    departure_time: '06:00',
    line_id: 'line-602',
    line_name: 'Linija 602',
    route_id: 'route-602-vis-split',
    direction_label: 'Vis - Split',
    destination: 'Split',
    marker: null,
    subtype: 'Trajekt',
  },
  {
    departure_time: '09:30',
    line_id: 'line-9602',
    line_name: 'Linija 9602',
    route_id: 'route-9602-vis-split',
    direction_label: 'Vis - Hvar - Milna - Split',
    destination: 'Split',
    marker: null,
    subtype: 'Katamaran',
  },
  {
    departure_time: '14:00',
    line_id: 'line-602',
    line_name: 'Linija 602',
    route_id: 'route-602-vis-split',
    direction_label: 'Vis - Split',
    destination: 'Split',
    marker: null,
    subtype: 'Trajekt',
  },
];

export const roadTodayDeparturesFixture: TodayDepartureItem[] = [
  {
    departure_time: '07:00',
    line_id: 'line-vis-komiza',
    line_name: 'Vis - Komiza',
    route_id: 'route-vis-komiza',
    direction_label: 'Vis - Komiza',
    destination: 'Komiza',
    marker: null,
    subtype: 'Autobus',
  },
  {
    departure_time: '08:30',
    line_id: 'line-vis-milna',
    line_name: 'Vis - Milna',
    route_id: 'route-vis-milna',
    direction_label: 'Vis - Milna',
    destination: 'Milna',
    marker: null,
    subtype: 'Autobus',
  },
];

export const bannersFixture: InboxBanner[] = [
  {
    id: 'banner-1-transport-delay',
    title: 'Trajektna linija 602 kasni 30 minuta zbog vremenskih uvjeta',
    body: 'Zbog jakog juga, trajekt iz Splita prema Visu kasni približno 30 minuta.',
    tags: ['hitno', 'promet'],
    active_from: '2026-01-19T06:00:00Z',
    active_to: '2026-01-19T20:00:00Z',
    created_at: '2026-01-19T05:30:00Z',
    is_urgent: true,
  },
  {
    id: 'banner-2-schedule-change',
    title: 'Promjena voznog reda autobusa od ponedjeljka',
    body: 'Od ponedjeljka 20.01. na snagu stupaju novi zimski vozni redovi.',
    tags: ['promet'],
    active_from: '2026-01-17T00:00:00Z',
    active_to: '2026-01-20T23:59:00Z',
    created_at: '2026-01-17T08:00:00Z',
    is_urgent: false,
  },
];

export const transportLabels = {
  title: 'Vozni redovi',
  roadTitle: 'CESTOVNI',
  roadSubtitle: 'Autobusne linije na otoku',
  seaTitle: 'POMORSKI',
  seaSubtitle: 'Trajekti i katamarani',
  note: 'Vozni redovi se mogu promijeniti ovisno o vremenskim uvjetima i sezoni. Provjerite prije putovanja.',
};
