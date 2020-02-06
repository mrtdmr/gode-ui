import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const addTeamStart = () => {
  return {
    type: actionTypes.ADD_TEAM_START
  };
};
export const addTeamSuccess = (id, teamData) => {
  return { type: actionTypes.ADD_TEAM_SUCCESS, teamId: id, teamData: teamData };
};
export const addTeamFail = error => {
  return {
    type: actionTypes.ADD_TEAM_FAIL,
    error: error
  };
};
export const addTeam = teamData => {
  return dispatch => {
    if (teamData.name.trim() === '') return;
    dispatch(addTeamStart());
    axios
      .post('/teams.json', teamData)
      .then(response => {
        dispatch(addTeamSuccess(response.data.name, teamData));
      })
      .catch(error => {
        dispatch(addTeamFail(error));
      });
  };
};

export const fetchTeamsStart = () => {
  return { type: actionTypes.FETCH_TEAMS_START };
};
export const fetchTeamsSuccess = teams => {
  return { type: actionTypes.FETCH_TEAMS_SUCCESS, teams: teams };
};
export const fetchTeamsFail = error => {
  return { type: actionTypes.FETCH_TEAMS_FAIL, error: error };
};
export const fetchTeams = () => {
  return dispatch => {
    dispatch(fetchTeamsStart);
    axios
      .get('/teams.json')
      .then(res => {
        const fetchedTeams = [];
        for (let key in res.data) {
          fetchedTeams.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchTeamsSuccess(fetchedTeams));
      })
      .catch(err => {
        dispatch(fetchTeamsFail(err));
      });
  };
};

export const getSelectedTeam = id => {
  return { type: actionTypes.GET_SELECTED_TEAM, teamId: id };
};
