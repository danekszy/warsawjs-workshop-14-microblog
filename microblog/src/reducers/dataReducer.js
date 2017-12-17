import {
  FETCHING_DATA,
  FETCHING_COMMENTS,
  FETCHING_COMMENTS_SUCCESS,
  EXPAND_YELL
} from "../constants";
const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  expandedYell: null,
  error: false,
  comments: []
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return Object.assign({}, state, {
        data: action.payload,
        isFetching: true
      });
    case FETCHING_COMMENTS_SUCCESS:
      return Object.assign({}, state, {
        comments: action.data
      });
    case EXPAND_YELL:
      return {
        ...state,
        expandedYell: action.yellId
      };
    default:
      return state;
  }
}
