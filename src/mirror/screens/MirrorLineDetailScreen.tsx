/**
 * Mirror Line Detail Screen (Web)
 *
 * Shared visual renderer for transport line detail.
 * Recreates the mobile design-mirror layout using React/Tailwind.
 *
 * Sections:
 * 1. Header slab with icon box (ship/bus)
 * 2. Date selector card with offset shadow
 * 3. Direction toggle tabs
 * 4. Route info with stops count
 * 5. Departures list with expandable timeline
 * 6. Marker note
 * 7. Contact cards with offset shadow
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../primitives/Icon';
import { H1, H2, Label, Body, Meta } from '../primitives/Text';
import { skin } from '../skin';
import type {
  TransportType,
  LineDetailResponse,
  DeparturesListResponse,
  DepartureResponse,
  RouteInfo,
} from '../fixtures/transportDetail';
import {
  transportDetailLabels,
  formatDisplayDate,
  formatDuration,
  formatTime,
  isNextDay,
} from '../fixtures/transportDetail';

// ============================================================
// Departure Item Component
// ============================================================

function MirrorDepartureItem({
  departure,
  transportType,
}: {
  departure: DepartureResponse;
  transportType: TransportType;
}): React.JSX.Element {
  const [expanded, setExpanded] = useState(false);

  const hasStopTimes = departure.stop_times.length > 0;
  const departureTimeFormatted = formatTime(departure.departure_time);

  const timeBlockBg = transportType === 'sea' 
    ? 'bg-[hsl(200,60%,85%)]' 
    : 'bg-[hsl(45,80%,85%)]';

  return (
    <div className="relative mb-3">
      {/* Offset Shadow */}
      <div 
        className="absolute top-1 left-1 w-full h-full rounded-lg"
        style={{ backgroundColor: skin.colors.border }}
      />
      
      {/* Main Card */}
      <div 
        className={`relative rounded-lg border-2 bg-white ${hasStopTimes ? 'cursor-pointer' : ''}`}
        style={{ borderColor: skin.colors.border }}
        onClick={hasStopTimes ? () => setExpanded(!expanded) : undefined}
      >
        {/* Header Row */}
        <div className="flex items-center p-3">
          {/* Time Block */}
          <div className={`${timeBlockBg} px-3 py-2 rounded-md border-2 mr-3`} style={{ borderColor: skin.colors.border }}>
            <H2 className="text-lg font-bold">
              {departureTimeFormatted}
              {departure.marker ? ` ${departure.marker}` : ''}
            </H2>
          </div>

          {/* Info Section */}
          <div className="flex-1 min-w-0">
            <Label className="font-semibold truncate block">
              {departure.destination}
            </Label>
            <div className="flex items-center gap-2 mt-0.5">
              {departure.duration_minutes && (
                <Meta className="text-xs">
                  {formatDuration(departure.duration_minutes)}
                </Meta>
              )}
              {hasStopTimes && departure.stop_times.length > 2 && (
                <Meta className="text-xs">
                  {departure.stop_times.length} {transportDetailLabels.stations}
                </Meta>
              )}
            </div>
          </div>

          {/* Expand Chevron */}
          {hasStopTimes && (
            <div className="ml-2">
              <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size="md" />
            </div>
          )}
        </div>

        {/* Notes Badge */}
        {departure.notes && (
          <div className="mx-3 mb-3 px-2 py-1 rounded bg-[hsl(45,80%,90%)] border" style={{ borderColor: skin.colors.border }}>
            <Meta className="text-xs">{departure.notes}</Meta>
          </div>
        )}

        {/* Expanded Timeline */}
        {expanded && hasStopTimes && (
          <div className="border-t-2 px-3 py-3" style={{ borderColor: skin.colors.border }}>
            {departure.stop_times.map((stop, index) => {
              const isFirst = index === 0;
              const isLast = index === departure.stop_times.length - 1;
              const arrivalTimeFormatted = formatTime(stop.arrival_time);
              const showNextDay = !isFirst && isNextDay(departure.departure_time, stop.arrival_time);

              return (
                <div key={`${stop.stop_name}-${index}`} className="flex items-start">
                  {/* Timeline Indicator */}
                  <div className="flex flex-col items-center mr-3 w-4">
                    <div 
                      className={`w-3 h-3 rounded-full border-2 ${isFirst || isLast ? 'bg-[hsl(var(--primary))]' : 'bg-white'}`}
                      style={{ borderColor: skin.colors.border }}
                    />
                    {!isLast && (
                      <div className="w-0.5 h-6 bg-[hsl(var(--border))]" />
                    )}
                  </div>

                  {/* Stop Info */}
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-2">
                      <Label className="font-semibold text-sm">{arrivalTimeFormatted}</Label>
                      {showNextDay && (
                        <Meta className="text-xs text-[hsl(var(--muted-foreground))]">(+1 dan)</Meta>
                      )}
                    </div>
                    <Body className="text-sm truncate">{stop.stop_name}</Body>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Main Component
// ============================================================

interface MirrorLineDetailScreenProps {
  transportType: TransportType;
  lineDetailData: LineDetailResponse;
  departuresData: DeparturesListResponse;
}

export function MirrorLineDetailScreen({
  transportType,
  lineDetailData,
  departuresData,
}: MirrorLineDetailScreenProps): React.JSX.Element {
  const navigate = useNavigate();
  const [selectedDirection, setSelectedDirection] = useState<number>(departuresData.direction);

  const routes: RouteInfo[] = lineDetailData.routes || [];
  const currentRoute = routes.find((r) => r.direction === selectedDirection);

  const headerBg = transportType === 'sea' 
    ? 'bg-[hsl(200,60%,80%)]' 
    : 'bg-[hsl(45,80%,80%)]';

  const iconName = transportType === 'sea' ? 'ship' : 'bus';

  return (
    <div className="min-h-screen" style={{ backgroundColor: skin.colors.background }}>
      {/* Back Button */}
      <div className="p-4">
        <button
          onClick={() => navigate('/mirror/transport')}
          className="flex items-center gap-2 text-sm font-medium"
          style={{ color: skin.colors.textPrimary }}
        >
          <Icon name="arrow-left" size="md" />
          <span>Natrag</span>
        </button>
      </div>

      {/* Mirror Header */}
      <div className="px-4 pb-3 border-b-2" style={{ borderColor: skin.colors.border }}>
        <H2 className="text-lg font-bold">
          {transportType === 'sea' ? 'SeaLineDetail' : 'RoadLineDetail'} Mirror
        </H2>
        <Meta className="text-xs">
          fixture: {transportType}LineDetailFixture
        </Meta>
      </div>

      {/* Poster Header Slab */}
      <div className={`${headerBg} p-4 border-b-2`} style={{ borderColor: skin.colors.border }}>
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-lg border-2 flex items-center justify-center bg-white"
            style={{ borderColor: skin.colors.border }}
          >
            <Icon name={iconName} size="lg" />
          </div>
          <div className="flex-1">
            <H1 className="text-xl font-bold">{lineDetailData.name}</H1>
            <div className="flex items-center gap-2 mt-1">
              {lineDetailData.subtype && (
                <Meta className="text-xs">{lineDetailData.subtype}</Meta>
              )}
              {currentRoute?.typical_duration_minutes && (
                <Meta className="text-xs">
                  • {formatDuration(currentRoute.typical_duration_minutes)}
                </Meta>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Date Selector Card */}
        <div className="relative">
          <div 
            className="absolute top-1 left-1 w-full h-full rounded-lg"
            style={{ backgroundColor: skin.colors.border }}
          />
          <div 
            className="relative bg-white rounded-lg border-2 p-4 flex items-center justify-between"
            style={{ borderColor: skin.colors.border }}
          >
            <button className="p-2 hover:bg-gray-100 rounded">
              <Icon name="chevron-left" size="md" />
            </button>
            <div className="text-center">
              <Label className="text-xs tracking-wider uppercase block">
                {transportDetailLabels.dateSelector.label}
              </Label>
              <H2 className="font-bold mt-1">
                {formatDisplayDate(departuresData.date)}
              </H2>
              <Meta className="text-xs mt-0.5 block">
                {transportDetailLabels.dayTypes[departuresData.day_type]}
                {departuresData.is_holiday && ` (${transportDetailLabels.holiday})`}
              </Meta>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded">
              <Icon name="chevron-right" size="md" />
            </button>
          </div>
        </div>

        {/* Direction Toggle Tabs */}
        {routes.length > 1 && (
          <div>
            <Label className="text-xs tracking-wider uppercase mb-2 block">
              {transportDetailLabels.sections.direction}
            </Label>
            <div className="relative">
              <div 
                className="absolute top-1 left-1 w-full h-full rounded-lg"
                style={{ backgroundColor: skin.colors.border }}
              />
              <div 
                className="relative flex rounded-lg border-2 overflow-hidden"
                style={{ borderColor: skin.colors.border }}
              >
                {routes.map((route) => {
                  const isActive = selectedDirection === route.direction;
                  return (
                    <button
                      key={route.id}
                      className={`flex-1 py-3 px-4 text-center font-semibold text-sm transition-colors ${
                        isActive ? headerBg : 'bg-white'
                      } ${route.direction === 1 ? 'border-l-2' : ''}`}
                      style={{ borderColor: skin.colors.border }}
                      onClick={() => setSelectedDirection(route.direction)}
                    >
                      {route.direction_label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Route Info */}
        {currentRoute && (
          <div className="flex items-center gap-2">
            <Icon name="map-pin" size="sm" colorToken="textSecondary" />
            <Body className="text-sm">
              {currentRoute.stops.length} {transportDetailLabels.stations}
            </Body>
          </div>
        )}

        {/* Section Divider */}
        <div className="h-0.5" style={{ backgroundColor: skin.colors.border }} />

        {/* Departures Section */}
        <div>
          <Label className="text-xs tracking-wider uppercase mb-3 block">
            {transportDetailLabels.sections.departures}
          </Label>
          {departuresData.departures.length > 0 ? (
            <>
              <div>
                {departuresData.departures.map((dep) => (
                  <MirrorDepartureItem
                    key={dep.id}
                    departure={dep}
                    transportType={transportType}
                  />
                ))}
              </div>
              {departuresData.marker_note && (
                <div className="mt-3 p-3 rounded-lg bg-[hsl(45,80%,95%)] border" style={{ borderColor: skin.colors.border }}>
                  <Meta className="text-xs">{departuresData.marker_note}</Meta>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <Icon name="calendar" size="lg" colorToken="textDisabled" />
              <Body className="text-sm text-[hsl(var(--muted-foreground))] mt-2">
                {transportDetailLabels.empty.subtitle}
              </Body>
            </div>
          )}
        </div>

        {/* Section Divider */}
        {lineDetailData.contacts.length > 0 && (
          <div className="h-0.5" style={{ backgroundColor: skin.colors.border }} />
        )}

        {/* Contacts Section */}
        {lineDetailData.contacts.length > 0 && (
          <div>
            <Label className="text-xs tracking-wider uppercase mb-3 block">
              {transportDetailLabels.sections.contacts}
            </Label>
            {lineDetailData.contacts.map((contact, index) => (
              <div key={`${contact.operator}-${index}`} className="relative mb-3">
                <div 
                  className="absolute top-1 left-1 w-full h-full rounded-lg"
                  style={{ backgroundColor: skin.colors.border }}
                />
                <div 
                  className="relative bg-white rounded-lg border-2 p-4"
                  style={{ borderColor: skin.colors.border }}
                >
                  <Label className="font-semibold mb-2 block">{contact.operator}</Label>
                  {contact.phone && (
                    <div className="flex items-center gap-3 py-2">
                      <div 
                        className="w-8 h-8 rounded border-2 flex items-center justify-center"
                        style={{ borderColor: skin.colors.border }}
                      >
                        <Icon name="phone" size="sm" />
                      </div>
                      <Label className="text-sm">{contact.phone}</Label>
                    </div>
                  )}
                  {contact.email && (
                    <div className="flex items-center gap-3 py-2">
                      <div 
                        className="w-8 h-8 rounded border-2 flex items-center justify-center"
                        style={{ borderColor: skin.colors.border }}
                      >
                        <Icon name="mail" size="sm" />
                      </div>
                      <Label className="text-sm">{contact.email}</Label>
                    </div>
                  )}
                  {contact.website && (
                    <div className="flex items-center gap-3 py-2">
                      <div 
                        className="w-8 h-8 rounded border-2 flex items-center justify-center"
                        style={{ borderColor: skin.colors.border }}
                      >
                        <Icon name="globe" size="sm" />
                      </div>
                      <Label className="text-sm">{contact.website}</Label>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MirrorLineDetailScreen;
