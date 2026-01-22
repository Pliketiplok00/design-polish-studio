/**
 * Mirror Road Line Detail Screen (Web)
 *
 * Wrapper for MirrorLineDetailScreen for road transport.
 * Uses road-specific fixtures.
 */

import React from 'react';
import { MirrorLineDetailScreen } from './MirrorLineDetailScreen';
import {
  roadLineDetailFixture,
  roadDeparturesFixture,
} from '../fixtures/transportDetail';

export function MirrorRoadLineDetailScreen(): React.JSX.Element {
  return (
    <MirrorLineDetailScreen
      transportType="road"
      lineDetailData={roadLineDetailFixture}
      departuresData={roadDeparturesFixture}
    />
  );
}

export default MirrorRoadLineDetailScreen;
