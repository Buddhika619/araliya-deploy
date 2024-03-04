import axios from "axios";
import {
    viewCategoryRequest,
  viewCategorySuccess,
  viewCategoryFail,
  viewCategoryReset,

  addCategoryRequest,
  addCategorySuccess,
  addCategoryFail,

  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFail,
  deleteCategoryReset,

  viewSingleCategoryRequest,
  viewSingleCategorySuccess,
  viewSingleCategoryFail,
  viewSingleCategoryReset,

  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFail,
} from "../reducers/categorySlice";



export const listCategories = () => async (dispatch, getState) => {
  try {
    dispatch(viewCategoryRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/category`,config );

    dispatch(viewCategorySuccess(data));
  } catch (error) {
    dispatch(
        viewCategoryFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};



export const createCategory = (material) => async (dispatch, getState) => {
  console.log(material)
  try {
    dispatch(addCategoryRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/category`, material, config)

    dispatch(addCategorySuccess(data))

  } catch (error) {
    dispatch(
      addCategoryFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const removeCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch(deleteCategoryRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    //deleteOne
    await axios.delete(`/api/category/${id}`, config)
    dispatch(deleteCategorySuccess(id))
  } catch (error) {
    dispatch(
        deleteCategoryFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}


export const viewSingleCategory = (id) => async (dispatch, getState) => {
  
  try {
    console.log(33)
    dispatch(viewSingleCategoryRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/category/${id}`, config)
    console.log(data)
    await dispatch(viewSingleCategorySuccess(data))
  } catch (error) {
    dispatch(
      viewSingleCategoryFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}



export const updateCategory = (Category) => async (dispatch, getState) => {
  try {
    dispatch(updateCategoryRequest())


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
      `/api/category/${Category._id}`,
      Category,
      config
    )

    dispatch(updateCategorySuccess(data))
  } catch (error) {
    dispatch(
      updateCategoryFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}
