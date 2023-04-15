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
import { viewSupplierReset } from "../../reducers/supplierSlice";
import { createSupplier } from "../../actions/supplierActions";

const SupplierAddScreen = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    contactNo: "",
  });

  const { name, email, address, contactNo } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const addSupplier = useSelector((state) => state.supplierDetails);

  const {
    loading,
    error,

    success,
  } = addSupplier;
console.log(addSupplier)
  useEffect(() => {
    dispatch(viewSupplierReset());
    if (success) {
      toast.success("Success");

      setTimeout(function () {
        navigate("/admin/supplier");
      }, 1000);
    }
  }, [id, dispatch, success]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      createSupplier({
        name,
        email,
        address,
        contactNo,
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
              <p className="pageHeader"> Add A Supplier</p>
            </header>

            <label className="formLabel">Name*</label>
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

            <label className="formLabel">address*</label>
            <input
              className="formInputName"
              type="address"
              id="address"
              value={address}
              onChange={onMutate}
              // maxLength='32'
              // minLength='10'
              required
            />

            <label className="formLabel">contactNo*</label>
            <input
              className="formInputName"
              type="number"
              id="contactNo"
              value={contactNo}
              onChange={onMutate}
              // maxLength='32'
              // minLength='10'
              required
            />

            <label className="formLabel">email</label>
            <input
              className="formInputName"
              type="email"
              id="email"
              min="0"
              value={email}
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

export default SupplierAddScreen;