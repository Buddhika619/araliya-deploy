import axios from "axios";
import {
  viewBatchesRequest,
  viewBatchesSuccess,
  viewBatchesFail,
  addBatchesRequest,
  addBatchesSuccess,
  addBatchesFail,
  viewSingleBatchesRequest,
  viewSingleBatchesSuccess,
  viewSingleBatchesFail,
} from "../reducers/batchSlice";

import {
  updateBatchesRequest,
  updateBatchesSuccess,
  updateBatchesFail,
} from "../reducers/updateBatchSlice";

import {
  viewKitchenRequest,
  viewKitchenSuccess,
  viewKitchenFail,
} from "../reducers/kitchenSlice";

import {
  dailyAssingRequest,
  dailyAssingSuccess,
  dailyAssingFail,
  manualAssingRequest,
  manualAssingSuccess,
  manualAssingFail,
} from "../reducers/materialStockSlice";

export const listBatches = () => async (dispatch, getState) => {
  try {
    dispatch(viewBatchesRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/batches`, config);

    dispatch(viewBatchesSuccess(data));
  } catch (error) {
    dispatch(
      viewBatchesFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const allocateBulkKitchn = () => async (dispatch, getState) => {
  try {
    dispatch(dailyAssingRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/batches/bulk`, config);

    dispatch(dailyAssingSuccess(data));
  } catch (error) {
    dispatch(
      dailyAssingFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const allocateManualKitchen =
  (payload) => async (dispatch, getState) => {
    console.log("payload");
    try {
      dispatch(manualAssingRequest());

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/batches/one`, payload, config);

      dispatch(manualAssingSuccess(data));
    } catch (error) {
      dispatch(
        manualAssingFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

export const listKitchenReservations = () => async (dispatch, getState) => {
  try {
    dispatch(viewKitchenRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log(userInfo.token);
    const { data } = await axios.get(`/api/batches/kitchen`, config);

    dispatch(viewKitchenSuccess(data));
  } catch (error) {
    dispatch(
      viewKitchenFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const createBatches = (payload) => async (dispatch, getState) => {
  console.log("payload");
  try {
    dispatch(addBatchesRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/batches`, payload, config);

    dispatch(addBatchesSuccess(data));
  } catch (error) {
    dispatch(
      addBatchesFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};


export const viewSingleBatch = (id) => async (dispatch, getState) => {
  try {
    dispatch(viewSingleBatchesRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/batches/${id}`, config);
    console.log(data);

    await dispatch(viewSingleBatchesSuccess(data));
  } catch (error) {
    dispatch(
      viewSingleBatchesFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const updateBatches = (material) => async (dispatch, getState) => {
  try {
    dispatch(updateBatchesRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/batches/${material._id}`,
      material,
      config
    );

    dispatch(updateBatchesSuccess(data));
  } catch (error) {
    dispatch(
      updateBatchesFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
