const INITIAL_STATE = {
  reminders: {},
};

export default function entitiesReducer(
  state = INITIAL_STATE,
  action,
) {
  let stateWithEntities = state;
  if (action.payload && action.payload.entities) {
    stateWithEntities = Object.keys(action.payload.entities).reduce(
      (accState, key) => {
        const entity = accState[key];

        accState[key] = Object.assign(
          {},
          entity,
          action.payload.entities[key],
        );

        return accState;
      },
      { ...state },
    );
  }

  return stateWithEntities;
}
