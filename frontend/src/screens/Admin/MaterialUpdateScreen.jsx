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
import {
  createMaterial,
  updateMaterials,
  viewSingleMaterial,
} from "../../actions/materialActions";
import { viewMatrialsReset } from "../../reducers/matrialSlice";

const MaterialEditScren = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    reOrderLevel: "",
    dailyCap: "",
    measurement: "",
  });

  const { name, reOrderLevel, dailyCap, measurement } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const materialDetail = useSelector((state) => state.matrialDetails);
  const { sloading, serror, matrial, ssuccess } = materialDetail;

  console.log(ssuccess);

  const materialUpdate = useSelector((state) => state.matrialDetails);

  const {
    loading,
    error,

    success,
  } = materialUpdate;

  useEffect(() => {
    if (ssuccess) {
      // toast.success('Success')

      setFormData(matrial);
      // setTimeout(function(){ navigate('/admin/materials')   }, 1000);
    } else {
      dispatch(viewSingleMaterial(id));
    }
  }, [id, ssuccess]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      updateMaterials({
        _id: id,
        name,
        reOrderLevel,
        dailyCap,
        measurement,
      })
    );

    toast.success("Success");
    setTimeout(function () {
      navigate("/admin/materials/all");
    }, 1000);
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
    navigate(`/admin/materials/all`);
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
              <p className="pageHeader"> Add Material</p>
            </header>

            <label className="formLabel">Name</label>
            <input
              className="formInputName"
              type="text"
              id="name"
              value={name}
              onChange={onMutate}
              // maxLength='32'
              // minLength='10'
              required
            />
            <label className="formLabel">Re Order Lvel</label>
            <input
              className="formInputName"
              type="number"
              id="reOrderLevel"
              min="0"
              value={reOrderLevel}
              onChange={onMutate}
              // maxLength='32'
              // minLength='10'
              required
            />

            <label className="formLabel">Daily Capacity</label>
            <input
              className="formInputName"
              type="number"
              min="0"
              id="dailyCap"
              value={dailyCap}
              onChange={onMutate}
              // maxLength='32'
              // minLength='10'
              required
            />

            <Form.Group controlId="measurement">
              <label className="formLabel">Measurement</label>

              <select
                className="formInputName"
                onChange={onMutate}
                value={measurement}
                id="measurement"
                // required
              >
                <option value="">None</option>
                <option value="kg">kilogram(kg)</option>
                <option value="g">gram(g)</option>
                <option value="mg">miligram(mg)</option>
                <option value="ml">milliliter(ml) </option>
                <option value="L">liter(L)</option>
                <option value="pcs">pieces</option>
              </select>
            </Form.Group>

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

export default MaterialEditScren;
