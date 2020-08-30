import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  DELETE_ACCOUNT,
} from "../actions/types";

const initialState = {
  jwtToken: localStorage.getItem("jwtToken"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED: {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    }
    case DELETE_ACCOUNT:
    case LOGOUT:
    case AUTH_ERROR:
    case LOGIN_FAILED:
    case REGISTER_FAILED: {
      localStorage.removeItem("jwtToken");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS: {
      localStorage.setItem("jwtToken", payload.jwtToken);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    }

    default:
      return state;
  }
}
