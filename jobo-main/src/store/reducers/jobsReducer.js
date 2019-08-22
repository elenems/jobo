import { ADD_JOB } from "../actions/actionTypes";
import { REMOVE_JOB } from "../actions/actionTypes";
const initState = {
  jobs: []
};
const jobsReducer = (state = initState, action) => {
  if (action.type === ADD_JOB) {
    return {
      ...state,
      jobs: [...state.jobs, action.payload]
    };
  }

  if (action.type === REMOVE_JOB) {
    return {
      ...state,
      jobs: state.jobs.filter(job => {
        return job.id !== action.payload;
      })
    };
  }

  return state;
};

export default jobsReducer;
