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

const CreateListing = () => {
  const { id } = useParams();
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    brand: "",
    category: "",
    reOrderLevel: 0,
    countInStock: 0,
    dailyCapacity: 0,
    description: 0,
    active: true,
    type: false,
    discountedPrice: 0,
    supplierId: "",
  });

  const {
    name,
    price,
    brand,
    category,
    reOrderLevel,
    countInStock,
    dailyCapacity,
    description,
    active,
    type,
    supplierId,
  } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, success, product } = productDetails;
  console.log(product);
  const productUpdate = useSelector((state) => state.productDetails);
  const {
    loading: loadingUpdate,
    error: loadingError,
    product: updatedProduct,
    success: successUpdate,
  } = productUpdate;

  console.log(product);

  useEffect(() => {
    if (successUpdate) {
      dispatch(productUpdateReset());
      toast.success("Success");
      setTimeout(function () {
        window.close();
      }, 1000);
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductsDetails(id));
      } else {
        setFormData(product);
        setImage(product.image);
      }
    }
  }, [id, dispatch, product, successUpdate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        description,
        dailyCapacity,
        countInStock,
        active,
        type,
        reOrderLevel,
        supplierId
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

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      toast.error("Image upload Failed");
      setUploading(false);
    }
  };
  if (loading) {
    return <Spinner />;
  }

  console.log(location.pathname.split("/")[3]);

  const path = location.pathname.split("/")[3];

  const back = () => {
    dispatch(productUpdateReset());
    navigate(`/admin/products/${path}`);
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
              <p className="pageHeader"> Create a Product</p>
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

            {/* <label className="formLabel">Brand</label>
            <input
              className="formInputName"
              type="text"
              id="brand"
              value={brand}
              onChange={onMutate}
              // maxLength='32'
              // minLength='10'
              required
            /> */}

            <label className="formLabel">category</label>
            <input
              className="formInputName"
              type="text"
              id="category"
              value={category}
              onChange={onMutate}
              // maxLength='32'
              // minLength='10'
              required
            />

            <label className="formLabel">Description</label>
            <textarea
              className="formInputName"
              type="text"
              id="description"
              value={description}
              onChange={onMutate}
              required
            />

            <label className="formLabel">Image</label>
            <input
              className="formInputName"
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              // maxLength='32'
              // minLength='10'
              required
            />
            <input
              className="formInputFile"
              type="file"
              label="Choose File"
              onChange={uploadFileHandler}
              // max='6'
              // accept='.jpg,.png,.jpeg'
            />

            <label className="formLabel">Active</label>
            <div className="formButtons">
              <button
                className={active ? "formButtonActive" : "formButton"}
                type="button"
                id="active"
                value={true}
                onClick={onMutate}
                min="1"
                max="50"
              >
                Yes
              </button>
              <button
                className={
                  !active && active !== null ? "formButtonActive" : "formButton"
                }
                type="button"
                id="active"
                value={false}
                onClick={onMutate}
              >
                No
              </button>
            </div>

            <label className="formLabel">Is this an in-house Product? </label>
            <div className="formButtons">
              <button
                className={type ? "formButtonActive" : "formButton"}
                type="button"
                id="type"
                value={true}
                onClick={onMutate}
                min="1"
                max="50"
              >
                Yes
              </button>
              <button
                className={
                  !type && type !== null ? "formButtonActive" : "formButton"
                }
                type="button"
                id="type"
                value={false}
                onClick={onMutate}
              >
                No
              </button>
            </div>

            {type && (
              <>
                <label className="formLabel">Daily Capacity</label>
                <input
                  className="formInputName"
                  type="number"
                  id="dailyCapacity"
                  value={dailyCapacity}
                  onChange={onMutate}
                  // maxLength='32'
                  // minLength='10'
                  required
                />
              </>
            )}

            {type && (
              <>
                <label className="formLabel">Price</label>
                <input
                  className="formInputName"
                  type="number"
                  id="price"
                  value={price}
                  onChange={onMutate}
                  // maxLength='32'
                  // minLength='10'
                  required
                />
              </>
            )}

            {!type && (
              <>
                <label className="formLabel">Re Order Level</label>
                <input
                  className="formInputName"
                  type="number"
                  id="reOrderLevel"
                  value={reOrderLevel}
                  onChange={onMutate}
                  // maxLength='32'
                  // minLength='10'
                  required
                />
              </>
            )}
              {!type && (
              <>
                <label className="formLabel">Supplier ID</label>
                <input
                  className="formInputName"
                  type="text"
                  id="supplierId"
                  value={supplierId}
                  onChange={onMutate}
                  // maxLength='32'
                  // minLength='10'
                  required
                />
              </>
            )}

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
