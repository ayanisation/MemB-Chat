import * as api from "../api/index";

export const userSignin = (user) => async (dispatch) => {
  try {
    const { data } = await api.findUser(user);
    dispatch({ type: "AUTH", payload: data });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const userSignup = (newUser) => async (dispatch) => {
  try {
    const { data } = await api.addUser(newUser);
    dispatch({ type: "AUTH", payload: data });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();
    dispatch({ type: "FETCH_USERS", payload: data });
  } catch (e) {
    console.log(e);
  }
};
