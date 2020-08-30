import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  CLEAR_PROFILE,
} from "../actions/types";
import setAuthToken from "../../utils/setAuthToken";

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
  }
  try {
    const responseData = await axios.get("api/auth");
    dispatch({
      type: USER_LOADED,
      payload: responseData.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const responseData = await axios.post("api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: responseData.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAILED,
    });
  }
};

//Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const responseData = await axios.post("api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: responseData.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

//Logout user /Clear profile
export const logout = (history) => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
  history.push("/dashboard");
};
