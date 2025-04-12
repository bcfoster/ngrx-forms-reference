import { createActionGroup, props } from '@ngrx/store';

import { BodyPart } from './injury-and-incident/body-part';

export const injuryAndIncidentActions = createActionGroup({
  source: 'Injury & Incident',
  events: {
    'Add Body Part': props<{ id: BodyPart }>(),
    'Remove Body Part': props<{ id: BodyPart }>(),
  },
});
