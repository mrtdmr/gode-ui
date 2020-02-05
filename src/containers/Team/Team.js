import React, { useState } from 'react';
import Input from '../../components/UI/Input/Input';
import classes from './Team.module.css';
import { checkValidity, updateObject } from '../../shared/utility';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const Team = props => {
  const [teamForm, setTeamForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Takım Adı'
      },
      label: 'Takım Adı',
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    }
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const formElementArray = [];
  for (let key in teamForm) {
    formElementArray.push({ id: key, config: teamForm[key] });
  }
  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(teamForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        teamForm[inputIdentifier].validation
      ),
      touched: true
    });
    const updatedTeamForm = updateObject(teamForm, {
      [inputIdentifier]: updatedFormElement
    });
    let formIsValid = true;
    for (let inputIdentifier in updatedTeamForm) {
      formIsValid = updatedTeamForm[inputIdentifier].valid && formIsValid;
    }
    setTeamForm(updatedTeamForm);
    setFormIsValid(formIsValid);
  };
  const saveHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in teamForm) {
      formData[formElementIdentifier] = teamForm[formElementIdentifier].value;
    }
    console.log(formData);
    props.onAddTeam(formData);
  };
  let form = (
    <form onSubmit={saveHandler}>
      {formElementArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          label={formElement.config.label}
          changed={event => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button disabled={!formIsValid} buttonType='Success'>
        KAYDET
      </Button>
    </form>
  );
  if (props.loading) form = <Spinner />;
  return (
    <div className={classes.Team}>
      <h4>Takım Bilgileri</h4>
      {form}
    </div>
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
    onAddTeam: teamData => dispatch(actions.addTeam(teamData))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Team, axios));
