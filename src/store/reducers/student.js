import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  students: [],
  loading: false
};
const addStudentStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const addStudentSuccess = (state, action) => {
  return updateObject(state, { students: action.students, loading: false });
};
const addStudentFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_STUDENT_START:
      return addStudentStart(state, action);
    case actionTypes.ADD_STUDENT_SUCCESS:
      return addStudentSuccess(state, action);
    case actionTypes.ADD_STUDENT_FAIL:
      return addStudentFail(state, action);
    default:
      return state;
  }
};
export default reducer;
