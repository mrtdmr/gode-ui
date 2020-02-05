import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
const initialState = {
  teams: [],
  loading: false
};
const addTeamStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const addTeamSuccess = (state, action) => {
  const newTeam = updateObject(action.teamData, { id: action.teamId });
  return updateObject(state, {
    teams: state.teams.concat(newTeam),
    loading: false
  });
};
const addTeamFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchTeamsStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const fetchTeamsSuccess = (state, action) => {
  return updateObject(state, { teams: action.teams, loading: false });
};
const fetchTeamsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TEAM_START:
      return addTeamStart(state, action);
    case actionTypes.ADD_TEAM_SUCCESS:
      return addTeamSuccess(state, action);
    case actionTypes.ADD_TEAM_FAIL:
      return addTeamFail(state, action);
    case actionTypes.FETCH_TEAMS_START:
      return fetchTeamsStart(state, action);
    case actionTypes.FETCH_TEAMS_SUCCESS:
      return fetchTeamsSuccess(state, action);
    case actionTypes.FETCH_TEAMS_FAIL:
      return fetchTeamsFail(state, action);
    default:
      return state;
  }
};
export default reducer;
