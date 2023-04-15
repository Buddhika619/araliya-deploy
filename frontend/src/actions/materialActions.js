import axios from "axios";
import {
  viewMatrialsRequest,
  viewMatrialsSuccess,
  viewMatrialsFail,
  
  addMatrialsRequest,
  addMatrialsSuccess,
  addMatrialsFail,

  deleteMatrialsRequest,
  deleteMatrialsSuccess,
  deleteMatrialsFail,
 
  viewSingleMatrialsRequest,
  viewSingleMatrialsSuccess,
  viewSingleMatrialsFail,

  updateMatrialsRequest,
  updateMatrialsSuccess,
  updateMatrialsFail
} from "../reducers/matrialSlice";

import {
  materialStockRequest,
  materialStockSuccess,
  materialStockFail,
  materialStockReset
} from '../reducers/materialStockSlice'


export const listMaterials = () => async (dispatch, getState) => {
  try {
    dispatch(viewMatrialsRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/materials`,config );

    dispatch(viewMatrialsSuccess(data));
  } catch (error) {
    dispatch(
      viewMatrialsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};


export const listMaterialsStock = () => async (dispatch, getState) => {
  try {
    dispatch(materialStockRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/materials/stock`,config );

    dispatch(materialStockSuccess(data));
  } catch (error) {
    dispatch(
      materialStockFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};




export const createMaterial = (material) => async (dispatch, getState) => {
  console.log(material)
  try {
    dispatch(addMatrialsRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/materials`, material, config)

    dispatch(addMatrialsSuccess(data))

  } catch (error) {
    dispatch(
      addMatrialsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const removeMaterial = (id) => async (dispatch, getState) => {
  try {
    dispatch(deleteMatrialsRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    //deleteOne
    await axios.delete(`/api/materials/${id}`, config)
    dispatch(deleteMatrialsSuccess(id))
  } catch (error) {
    dispatch(
      deleteMatrialsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}


export const viewSingleMaterial = (id) => async (dispatch, getState) => {
  try {
    dispatch(viewSingleMatrialsRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/materials/${id}`, config)

    await dispatch(viewSingleMatrialsSuccess(data))
  } catch (error) {
    dispatch(
      viewSingleMatrialsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}



export const updateMaterials = (material) => async (dispatch, getState) => {
  try {
    dispatch(updateMatrialsRequest())


    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/materials/${material._id}`,
      material,
      config
    )

    dispatch(updateMatrialsSuccess(data))
  } catch (error) {
    dispatch(
      updateMatrialsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}
