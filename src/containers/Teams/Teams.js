import React, { useEffect } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import TeamInsert from '../Team/Team';
import Team from '../../components/Team/Team';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import classes from './Teams.module.css';
const Teams = props => {
  const { onFetchTeams } = props;
  useEffect(() => {
    onFetchTeams();
  }, [onFetchTeams]);
  const selectedTeamHandler = id => {
    props.onGetSelectedTeam(id);
  };
  return (
    <Aux>
      <TeamInsert />
      <div className={classes.Teams}>
        {props.teams.map(team => (
          <Team
            key={team.id}
            name={team.name}
            click={() => selectedTeamHandler(team.id)}
          />
        ))}
      </div>
    </Aux>
  );
};
const mapStateToProps = state => {
  return {
    teams: state.team.teams,
    loading: state.team.loading,
    selectedTeam: state.team.selectedTeam
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchTeams: () => dispatch(actions.fetchTeams()),
    onGetSelectedTeam: id => dispatch(actions.getSelectedTeam(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Teams, axios));
