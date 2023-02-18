import axios from "axios";
import {
  viewBatchesRequest,
  viewBatchesSuccess,
  viewBatchesFail,
  viewBatchesReset,

  addBatchesRequest,
  addBatchesSuccess,
  addBatchesFail,

  deleteBatchesRequest,
  deleteBatchesSuccess,
  deleteBatchesFail,
  deleteBatchesReset,

  viewSingleBatchesRequest,
  viewSingleBatchesSuccess,
  viewSingleBatchesFail,

  updateBatchesRequest,
  updateBatchesSuccess,
  updateBatchesFail
} from "../reducers/batchSlice";



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

    const { data } = await axios.get(`/api/batches`,config );


 
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



export const createBatches = (payload) => async (dispatch, getState) => {
  console.log('payload')
  try {
    dispatch(addBatchesRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/batches`, payload, config)

    dispatch(addBatchesSuccess(data))

  } catch (error) {
    dispatch(
        addBatchesFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

// export const removeBatches = (id) => async (dispatch, getState) => {
//   try {
//     dispatch(deleteMatrialsRequest())

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     }

//     //deleteOne
//     await axios.delete(`/api/batches/${id}`, config)
//     dispatch(deleteMatrialsSuccess(id))
//   } catch (error) {
//     dispatch(
//       deleteMatrialsFail(
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message
//       )
//     )
//   }
// }


export const viewSingleBatch= (id) => async (dispatch, getState) => {
  try {
    dispatch(viewSingleBatchesRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/batches/${id}`, config)

    await dispatch(viewSingleBatchesSuccess(data))
  } catch (error) {
    dispatch(
        viewSingleBatchesFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}



export const updateBatches = (material) => async (dispatch, getState) => {
  try {
    dispatch(updateBatchesRequest())


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
      `/api/batches/${material._id}`,
      material,
      config
    )

    dispatch(updateBatchesSuccess(data))
  } catch (error) {
    dispatch(
        updateBatchesFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}
