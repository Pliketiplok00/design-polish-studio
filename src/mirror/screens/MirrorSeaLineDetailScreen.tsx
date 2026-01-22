/**
 * Mirror Sea Line Detail Screen (Web)
 *
 * Wrapper for MirrorLineDetailScreen for sea transport.
 * Uses sea-specific fixtures.
 */

import React from 'react';
import { MirrorLineDetailScreen } from './MirrorLineDetailScreen';
import {
  seaLineDetailFixture,
  seaDeparturesFixture,
} from '../fixtures/transportDetail';

export function MirrorSeaLineDetailScreen(): React.JSX.Element {
  return (
    <MirrorLineDetailScreen
      transportType="sea"
      lineDetailData={seaLineDetailFixture}
      departuresData={seaDeparturesFixture}
    />
  );
}

export default MirrorSeaLineDetailScreen;
