import {
    SET_SCREAMS,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    LOADING_DATA,
    DELETE_SCREAM,
    POST_SCREAM,
    SET_SCREAM,
    SUBMIT_COMMENT
  } from '../types';
  
  const initialState = {
    screams: [],
    scream: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case SET_SCREAMS:
        return {
          ...state,
          screams: action.payload,
          loading: false
        };

      case SET_SCREAM:
        return {
          ...state,
          scream: action.payload
        };

      case LIKE_SCREAM:
      case UNLIKE_SCREAM:
        let index = state.screams.findIndex(
          (scream) => scream.screamId === action.payload.screamId
        );
        state.screams[index] = action.payload;
        if (state.scream.screamId === action.payload.screamId) {
          let temp = state.scream.comments;
          state.scream = action.payload;
          state.scream.comments = temp;
        }
        return {
          ...state
        };
      case DELETE_SCREAM:
        let iindex = state.screams.findIndex(
          (scream) => scream.screamId === action.payload
        );
        let mutatedScreams = state.screams.slice();
        mutatedScreams.splice(iindex, 1);
        return {
          ...state,
          screams: [...mutatedScreams]
        };
      case POST_SCREAM:
        return {
          ...state,
          screams: [action.payload, ...state.screams]
        };
      case SUBMIT_COMMENT:
        // let indexx = state.screams.findIndex((scream) => scream.screamId === state.scream.screamId
        // );
        // let targeted_scream =state.screams[indexx];
        // targeted_scream.commentCount = state.screams[index].commentCount+1;
        return {
          ...state,
          scream: {
            ...state.scream,
            comments: [action.payload, ...state.scream.comments],
            commentCount: state.scream.commentCount+1
          }
        };
      default:
        return state;
    }
  }