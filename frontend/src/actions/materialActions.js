import axios from "axios";
import {
  viewMatrialsRequest,
  viewMatrialsSuccess,
  viewMatrialsFail,
  viewMatrialsReset,
} from "../reducers/matrialSlice";

// export const updateConfig = (configData) => async (dispatch, getState) => {
//   try {
//     dispatch(setConfigRequest())
//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     }

//     await axios.put(`/api/config`, configData, config)

//     dispatch(setConfigSuccess(configData))
//   } catch (error) {
//     dispatch(
//       setConfigFail(
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message
//       )
//     )
//   }
// }

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
