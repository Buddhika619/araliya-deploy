import axios from "axios";
import {
  viewSupplierRequest,
  viewSupplierSuccess,
  viewSupplierFail,
  addSupplierRequest,
  addSupplierSuccess,
  addSupplierFail,
  deleteSupplierRequest,
  deleteSupplierSuccess,
  deleteSupplierFail,
  viewSingleSupplierRequest,
  viewSingleSupplierSuccess,
  viewSingleSupplierFail,
  updateSupplierRequest,
  updateSupplierSuccess,
  updateSupplierFail,
} from "../reducers/supplierSlice";

export const listSuppliers = () => async (dispatch, getState) => {
  try {
    dispatch(viewSupplierRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/supplier`, config);

    dispatch(viewSupplierSuccess(data));
  } catch (error) {
    dispatch(
      viewSupplierFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const createSupplier = (material) => async (dispatch, getState) => {
  console.log(material);
  try {
    dispatch(addSupplierRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/supplier`, material, config);

    dispatch(addSupplierSuccess(data));
  } catch (error) {
    dispatch(
      addSupplierFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const removeSupplier = (id) => async (dispatch, getState) => {
  try {
    dispatch(deleteSupplierRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //deleteOne
    await axios.delete(`/api/supplier/${id}`, config);
    dispatch(deleteSupplierSuccess(id));
  } catch (error) {
    dispatch(
      deleteSupplierFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const viewSingleSupplier = (id) => async (dispatch, getState) => {
  try {
    console.log(33);
    dispatch(viewSingleSupplierRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/supplier/${id}`, config);
    console.log(data);
    await dispatch(viewSingleSupplierSuccess(data));
  } catch (error) {
    dispatch(
      viewSingleSupplierFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const updateSupplier = (supplier) => async (dispatch, getState) => {
  try {
    dispatch(updateSupplierRequest());

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
      `/api/supplier/${supplier._id}`,
      supplier,
      config
    );

    dispatch(updateSupplierSuccess(data));
  } catch (error) {
    dispatch(
      updateSupplierFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
