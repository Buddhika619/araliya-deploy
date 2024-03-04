
import { useState, useEffect } from "react";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import {  Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";

import { productUpdateReset } from "../../reducers/singleProductSlice";

import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

import { viewCategoryReset } from "../../reducers/categorySlice";
import { createCategory } from "../../actions/categoryActions";

const CategoryAddScreen = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    category: "",

  });

  const { category,} = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const addCategory = useSelector((state) => state.categoryDetails);

  const {
    loading,
    error,
    addCategorySuccess,
  } = addCategory;

  console.log(addCategorySuccess)

  useEffect(() => {
    dispatch(viewCategoryReset());
    if (addCategorySuccess) {
      toast.success("Success");

      setTimeout(function () {
        navigate("/admin/category");
      }, 1000);
    }
  }, [id, dispatch, addCategorySuccess]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      createCategory({
        category
      })
    );
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value, //if e.target.id is boolean set as true or false, if it's null set as e.target.value ?? ---nulish operator
      }));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  console.log(location.pathname.split("/")[3]);

  const path = location.pathname.split("/")[3];

  const back = () => {
    dispatch(productUpdateReset());
    navigate(`/admin/category`);
  };

  return (
    <div className="profile">
       {error && <Message varient='danger'>{error}</Message>}
      <main className="pb-4">
        <Button className="btn btn-light my-3" onClick={back}>
          Go Back
        </Button>
        <FormContainer>
          <form onSubmit={onSubmit}>
            <header>
              <p className="pageHeader"> Add A Category</p>
            </header>

            <label className="formLabel">Category</label>
            <input
              className="formInputName"
              type="text"
              id="category"
              min="0"
              value={category}
              onChange={onMutate}
              // maxLength='32'
              // minLength='10'
              
            />

            <button type="submit" className="primaryButton createListingButton">
              Update
            </button>
          </form>
        </FormContainer>
        <br /> <br /> <br /> <br /> <br />
        <br /> <br />
      </main>
    </div>
  );
};

export default CategoryAddScreen;