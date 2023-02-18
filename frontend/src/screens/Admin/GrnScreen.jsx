import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import {
  listProductsDetails,
  updateProduct,
} from "../../actions/productActions";
import { productUpdateReset } from "../../reducers/singleProductSlice";

import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import { createMaterial } from "../../actions/materialActions";
import { viewMatrialsReset } from "../../reducers/matrialSlice";
import { createBatches } from "../../actions/batchActions";

const CreateListing = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    materialId: "",
    qty: "",
    cost: "",
  });

  const { materialId, qty, cost } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const addBatch = useSelector((state) => state.batchDetails);
  console.log(addBatch);

  const {
    loading,
    error,

    success,
  } = addBatch;

  console.log(success);
  useEffect(() => {
    dispatch(viewMatrialsReset());
    if (success) {
      toast.success("Success");

      setTimeout(function () {
        navigate("/admin/batches");
      }, 1000);
    }
  }, [id, dispatch, success]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      createBatches({
        materialId,
        qty,
        cost,
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

  const back = () => {
    dispatch(productUpdateReset());
    navigate(`/admin/materials`);
  };

  return (
    <div className="profile">
      <main className="pb-4">
        <Button className="btn btn-light my-3" onClick={back}>
          Go Back
        </Button>
        <FormContainer>
          <form onSubmit={onSubmit}>
            <header>
              <p className="pageHeader"> Create a GRN</p>
            </header>

            <label className="formLabel">Material ID</label>
            <input
              className="formInputName"
              type="text"
              id="materialId"
              value={materialId}
              onChange={onMutate}
              // maxLength='32'
              // minLength='10'
              required
            />
            <label className="formLabel">Quantity</label>
            <input
              className="formInputName"
              type="number"
              id="qty"
              min="0"
              value={qty}
              onChange={onMutate}
              // maxLength='32'
              // minLength='10'
              required
            />

            <label className="formLabel">Cost</label>
            <input
              className="formInputName"
              type="number"
              min="0"
              id="cost"
              value={cost}
              onChange={onMutate}
              // maxLength='32'
              // minLength='10'
              required
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

export default CreateListing;
