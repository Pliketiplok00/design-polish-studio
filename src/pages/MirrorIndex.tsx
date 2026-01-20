/**
 * Mirror Index Page
 * 
 * Lists all available mirror screens from the mojvis design system.
 * Web-adapted version of MirrorHomeScreen.
 */

import React from 'react';
import { Link } from 'react-router-dom';

interface MirrorLink {
  title: string;
  description: string;
  path: string;
}

const MIRROR_SCREENS: MirrorLink[] = [
  { title: 'Home Screen', description: 'MirrorHomeScreen with navigation links', path: '/mirror/home' },
  { title: 'Home Composite', description: 'Full home with banners, events, categories', path: '/mirror/home-composite' },
  { title: 'Menu Overlay', description: 'MenuOverlay component with fixture data', path: '/mirror/menu-overlay' },
  { title: 'Sea Transport', description: 'SeaTransportScreen with fixture data', path: '/mirror/transport-sea' },
  { title: 'Road Transport', description: 'RoadTransportScreen with fixture data', path: '/mirror/transport-road' },
  { title: 'Transport Hub', description: 'TransportHubScreen with fixture banners', path: '/mirror/transport-hub' },
  { title: 'Road Line Detail', description: 'RoadLineDetailScreen with departures + timeline', path: '/mirror/road-line-detail' },
  { title: 'Sea Line Detail', description: 'SeaLineDetailScreen with departures + timeline', path: '/mirror/sea-line-detail' },
  { title: 'Static Page', description: 'StaticPageScreen with all 8 block types', path: '/mirror/static-page' },
  { title: 'Settings', description: 'SettingsScreen with fixture state', path: '/mirror/settings' },
  { title: 'Feedback Form', description: 'FeedbackFormScreen with fixture data', path: '/mirror/feedback-form' },
  { title: 'Feedback Confirmation', description: 'FeedbackConfirmationScreen', path: '/mirror/feedback-confirmation' },
  { title: 'Feedback Detail', description: 'FeedbackDetailScreen with replies', path: '/mirror/feedback-detail' },
  { title: 'Inbox List', description: 'InboxListScreen with tabs + messages', path: '/mirror/inbox-list' },
  { title: 'Inbox Detail', description: 'InboxDetailScreen with tags + urgency', path: '/mirror/inbox-detail' },
  { title: 'Events Calendar', description: 'EventsScreen with calendar + event list', path: '/mirror/events' },
  { title: 'Event Detail', description: 'EventDetailScreen with info tiles + CTAs', path: '/mirror/event-detail' },
  { title: 'Language Selection', description: 'LanguageSelectionScreen with HR/EN toggle', path: '/mirror/language-selection' },
  { title: 'User Mode Selection', description: 'UserModeSelectionScreen with visitor/local cards', path: '/mirror/user-mode-selection' },
  { title: 'Municipality Selection', description: 'MunicipalitySelectionScreen with Vis/Komiža', path: '/mirror/municipality-selection' },
  { title: 'Info Hub', description: 'Info hub with categories + quick links', path: '/mirror/info-hub' },
  { title: 'Contacts List', description: 'Contacts list with emergency + general contacts', path: '/mirror/contacts-list' },
  { title: 'Contact Detail', description: 'Contact detail with phone/email/web buttons', path: '/mirror/contact-detail' },
  { title: 'Click & Fix Form', description: 'ClickFixFormScreen with location + photos', path: '/mirror/clickfix-form' },
  { title: 'Click & Fix Confirmation', description: 'ClickFixConfirmationScreen', path: '/mirror/clickfix-confirmation' },
  { title: 'Click & Fix Detail', description: 'ClickFixDetailScreen with photos + replies', path: '/mirror/clickfix-detail' },
];

export default function MirrorIndex() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f2eb',
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#3366cc',
        padding: '24px',
        borderBottom: '4px solid #1a1a1a',
      }}>
        <h1 style={{
          color: 'white',
          fontSize: '28px',
          fontWeight: 700,
          margin: 0,
        }}>
          Design Mirror
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.85)',
          fontSize: '12px',
          fontFamily: "'Space Mono', monospace",
          margin: '8px 0 0 0',
        }}>
          DEV ONLY - Visual Auditing
        </p>
      </header>

      {/* Info Box */}
      <div style={{
        margin: '16px',
        padding: '16px',
        backgroundColor: '#faf8f3',
        border: '3px solid #1a1a1a',
        borderRadius: 0,
      }}>
        <p style={{
          color: '#666',
          fontFamily: "'Space Mono', monospace",
          fontSize: '14px',
          margin: 0,
          lineHeight: 1.5,
        }}>
          Mirror screens use deterministic fixtures instead of API calls. 
          Use these for visual inspection and UI polishing.
        </p>
      </div>

      {/* Screen Links */}
      <div style={{
        margin: '16px',
        backgroundColor: '#faf8f3',
        border: '3px solid #1a1a1a',
        padding: '16px',
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 600,
          marginBottom: '16px',
          color: '#1a1a1a',
        }}>
          Available Mirrors
        </h2>

        {MIRROR_SCREENS.map((screen) => (
          <Link
            key={screen.path}
            to={screen.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid rgba(26,26,26,0.12)',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '14px',
                fontFamily: "'Space Mono', monospace",
                color: '#1a1a1a',
                marginBottom: '4px',
              }}>
                {screen.title}
              </div>
              <div style={{
                fontSize: '14px',
                fontFamily: "'Space Mono', monospace",
                color: '#666',
              }}>
                {screen.description}
              </div>
            </div>
            <span style={{ color: '#999', fontSize: '20px' }}>›</span>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '24px',
        color: 'rgba(26,26,26,0.4)',
        fontSize: '12px',
        fontFamily: "'Space Mono', monospace",
      }}>
        This screen is only visible in development builds
      </div>
    </div>
  );
}
