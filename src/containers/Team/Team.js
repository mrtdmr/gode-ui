import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import classes from './Team.module.css';
import { checkValidity, updateObject } from '../../shared/utility';
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
  let form = (
    <form>
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
      <button disabled={!formIsValid}>Kaydet</button>
    </form>
  );
  return (
    <div className={classes.Team}>
      <h4>Takım Bilgileri</h4>
      {form}
    </div>
  );
};
export default Team;
