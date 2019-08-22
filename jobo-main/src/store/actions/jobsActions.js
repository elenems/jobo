import { ADD_JOB } from "../actions/actionTypes";
import { REMOVE_JOB } from "../actions/actionTypes";

export const addJob = payload => dispatch => {
  dispatch({
    type: ADD_JOB,
    payload
  });
};

export const removeJob = payload => dispatch => {
  console.log("action", payload);
  dispatch({
    type: REMOVE_JOB,
    payload
  });
};
