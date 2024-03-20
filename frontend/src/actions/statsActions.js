import {
  viewStatsRequest,
  viewStatsSuccess,
  viewStatsFail,
} from "../reducers/statsSlice";

import axios from "axios";

export const listStats = () => async (dispatch, getState) => {
  console.log("hit");
  try {
    dispatch(viewStatsRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/stats`, config);

    dispatch(viewStatsSuccess(data));
  } catch (error) {
    dispatch(
      viewStatsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
