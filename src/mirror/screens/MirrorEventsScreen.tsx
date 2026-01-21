/**
 * Mirror Events Screen (Web Version)
 * 
 * Recreates MirrorEventsScreen with calendar and event list.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { skin } from '../skin';
import { Icon } from '../primitives/Icon';
import { H1, H2, Label, Body, Meta, ButtonText } from '../primitives/Text';
import {
  eventListFixture,
  eventsLabels,
  monthNames,
  dayNamesShort,
  type Event,
} from '../fixtures/events';

function toDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

function formatEventTime(startDatetime: string, isAllDay: boolean, allDayText: string): string {
  if (isAllDay) return allDayText;
  const date = new Date(startDatetime);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  eventDates: Set<string>;
}

function Calendar({ selectedDate, onSelectDate, eventDates }: CalendarProps): React.JSX.Element {
  const [viewDate, setViewDate] = useState(new Date(selectedDate));
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startDay = firstDayOfMonth.getDay();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const renderDays = (): React.JSX.Element[] => {
    const days: React.JSX.Element[] = [];
    const today = toDateString(new Date());
    const selected = toDateString(selectedDate);

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} style={styles.calendarDayWrapper} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = toDateString(date);
      const isToday = dateStr === today;
      const isSelected = dateStr === selected;
      const hasEvents = eventDates.has(dateStr);

      days.push(
        <div key={day} style={styles.calendarDayWrapper}>
          {isSelected && <div style={styles.calendarDayShadow} />}
          <button
            style={{
              ...styles.calendarDay,
              ...(hasEvents && !isSelected && !isToday ? styles.calendarDayHasEvents : {}),
              ...(isToday && !isSelected ? styles.calendarDayToday : {}),
              ...(isSelected ? styles.calendarDaySelected : {}),
            }}
            onClick={() => onSelectDate(date)}
          >
            <span style={{
              ...styles.calendarDayText,
              ...(isSelected ? styles.calendarDayTextSelected : {}),
            }}>
              {day}
            </span>
            {hasEvents && !isSelected && <div style={styles.eventIndicator} />}
          </button>
        </div>
      );
    }

    return days;
  };

  return (
    <div style={styles.calendar}>
      <div style={styles.calendarHeader}>
        <button style={styles.calendarNavButton} onClick={prevMonth}>
          <Icon name="chevron-left" size="md" colorToken="textPrimary" />
        </button>
        <H2>{monthNames[month].toUpperCase()} {year}</H2>
        <button style={styles.calendarNavButton} onClick={nextMonth}>
          <Icon name="chevron-right" size="md" colorToken="textPrimary" />
        </button>
      </div>
      <div style={styles.calendarDayNames}>
        {dayNamesShort.map((name) => (
          <Label key={name} style={styles.calendarDayName}>{name}</Label>
        ))}
      </div>
      <div style={styles.calendarGrid}>{renderDays()}</div>
    </div>
  );
}

function EventItem({ event, onPress }: { event: Event; onPress: () => void }): React.JSX.Element {
  return (
    <button style={styles.eventItemWrapper} onClick={onPress}>
      <div style={styles.eventItemShadow} />
      <div style={styles.eventItem}>
        <div style={styles.eventContent}>
          <ButtonText style={styles.eventTitle}>{event.title}</ButtonText>
          <div style={styles.eventMetaRow}>
            <Icon name="clock" size="xs" colorToken="textMuted" />
            <Meta>{formatEventTime(event.start_datetime, event.is_all_day, eventsLabels.detail.allDay)}</Meta>
          </div>
          {event.location && (
            <div style={styles.eventMetaRow}>
              <Icon name="map-pin" size="xs" colorToken="textMuted" />
              <Meta>{event.location}</Meta>
            </div>
          )}
        </div>
        <Icon name="chevron-right" size="sm" colorToken="chevron" />
      </div>
    </button>
  );
}

export function MirrorEventsScreen(): React.JSX.Element {
  const navigate = useNavigate();
  const initialDate = new Date(eventListFixture[0]?.start_datetime || Date.now());
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const eventDates = new Set(
    eventListFixture.map((e) => toDateString(new Date(e.start_datetime)))
  );

  const selectedDateStr = toDateString(selectedDate);
  const eventsForDay = eventListFixture.filter(
    (e) => toDateString(new Date(e.start_datetime)) === selectedDateStr
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <Link to="/mirror" style={styles.backLink}>
          <Icon name="chevron-left" size="sm" colorToken="textMuted" />
          <span>Back</span>
        </Link>
        <H2 style={styles.headerTitle}>Events Mirror</H2>
        <Meta style={styles.headerMeta}>fixture: eventListFixture ({eventListFixture.length} events)</Meta>
      </div>

      <div style={styles.scrollView}>
        {/* Hero */}
        <div style={styles.heroSection}>
          <H1 style={styles.heroTitle}>{eventsLabels.header.title.toUpperCase()}</H1>
        </div>

        {/* Calendar */}
        <Calendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          eventDates={eventDates}
        />

        {/* Day Events */}
        <div style={styles.dayEventsSection}>
          <div style={styles.dayHeader}>
            <Label>
              {selectedDate.toLocaleDateString('hr-HR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }).toUpperCase()}
            </Label>
          </div>

          {eventsForDay.length === 0 && (
            <div style={styles.emptyState}>
              <Label style={styles.emptyStateText}>{eventsLabels.calendar.noEvents}</Label>
            </div>
          )}

          {eventsForDay.map((event) => (
            <EventItem key={event.id} event={event} onPress={() => navigate(`/mirror/events/${event.id}`)} />
          ))}
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
  heroSection: {
    backgroundColor: skin.colors.primary,
    padding: `${skin.spacing.xxl}px ${skin.spacing.xl}px`,
    borderBottom: `${skin.borders.widthHeavy}px solid ${skin.colors.border}`,
  },
  heroTitle: {
    color: skin.colors.primaryText,
  },
  calendar: {
    backgroundColor: skin.colors.backgroundSecondary,
    margin: skin.spacing.lg,
    padding: skin.spacing.lg,
  },
  calendarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: skin.spacing.lg,
  },
  calendarNavButton: {
    width: 44,
    height: 44,
    border: `${skin.borders.widthThin}px solid ${skin.colors.border}`,
    backgroundColor: skin.colors.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  calendarDayNames: {
    display: 'flex',
    marginBottom: skin.spacing.sm,
  },
  calendarDayName: {
    flex: 1,
    textAlign: 'center',
    fontWeight: skin.typography.fontWeight.bold,
  },
  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 4,
  },
  calendarDayWrapper: {
    position: 'relative',
    aspectRatio: '1',
    minHeight: 40,
  },
  calendarDayShadow: {
    position: 'absolute',
    top: 3,
    left: 3,
    right: -3,
    bottom: -3,
    backgroundColor: skin.colors.border,
  },
  calendarDay: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: skin.colors.background,
    border: 'none',
    cursor: 'pointer',
  },
  calendarDayToday: {
    backgroundColor: skin.colors.backgroundSecondary,
    border: `${skin.borders.widthThin}px solid ${skin.colors.border}`,
  },
  calendarDaySelected: {
    backgroundColor: skin.colors.primary,
    border: `${skin.borders.widthThin}px solid ${skin.colors.border}`,
  },
  calendarDayHasEvents: {
    backgroundColor: skin.colors.backgroundTertiary,
    border: `${skin.borders.widthThin}px solid ${skin.colors.border}`,
  },
  calendarDayText: {
    fontFamily: skin.typography.fontFamily.body,
    fontSize: skin.typography.fontSize.sm,
    fontWeight: skin.typography.fontWeight.medium,
    color: skin.colors.textPrimary,
  },
  calendarDayTextSelected: {
    color: skin.colors.primaryText,
  },
  eventIndicator: {
    marginTop: 2,
    width: 6,
    height: 6,
    backgroundColor: skin.colors.primary,
  },
  dayEventsSection: {
    padding: skin.spacing.lg,
    borderTop: `${skin.borders.widthHeavy}px solid ${skin.colors.border}`,
  },
  dayHeader: {
    marginBottom: skin.spacing.lg,
  },
  emptyState: {
    backgroundColor: skin.colors.backgroundSecondary,
    padding: skin.spacing.xl,
    textAlign: 'center',
    border: `2px dashed ${skin.colors.borderMuted}`,
  },
  emptyStateText: {
    color: skin.colors.textMuted,
  },
  eventItemWrapper: {
    position: 'relative',
    marginBottom: skin.spacing.md,
    width: '100%',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    textAlign: 'left',
  },
  eventItemShadow: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: skin.colors.border,
  },
  eventItem: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: skin.colors.background,
    border: `${skin.borders.widthCard}px solid ${skin.colors.border}`,
    padding: skin.spacing.md,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    marginBottom: skin.spacing.sm,
    textTransform: 'uppercase',
    display: 'block',
  },
  eventMetaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: skin.spacing.sm,
    marginTop: skin.spacing.xs,
  },
};

export default MirrorEventsScreen;
