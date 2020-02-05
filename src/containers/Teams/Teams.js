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
  }, []);
  return (
    <Aux>
      <TeamInsert />
      <div className={classes.Teams}>
        {props.teams.map(team => (
          <Team key={team.id} name={team.name} />
        ))}
      </div>
    </Aux>
  );
};
const mapStateToProps = state => {
  return {
    teams: state.team.teams,
    loading: state.team.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchTeams: () => dispatch(actions.fetchTeams())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Teams, axios));
