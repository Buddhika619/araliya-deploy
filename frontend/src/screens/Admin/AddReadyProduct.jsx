import axios from "axios";
import { useState, useEffect } from "react";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";

import FormContainer from "../../components/FormContainer";
import {
  createProduct,

} from "../../actions/productActions";
import { productUpdateReset } from "../../reducers/singleProductSlice";

import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import { listCategories } from "../../actions/categoryActions";

const AddReadyProduct = () => {
  const { id } = useParams();
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");

  const [formError, setFormError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    reOrderLevel: "",
    countInStock: "",
    dailyCapacity: "",
    description: "",
    active: true,
    type: false,
    discountedPrice: "",
    brand: "",
    supplierId: "",
  });

  const {
    name,
    price,
    category,
    reOrderLevel,
    countInStock,
    dailyCapacity,
    description,
    active,
    type,
    brand,
    supplierId,
  } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // const productUpdate = useSelector((state) => state.productDetails);
  // const { loading, error, product, success } = productUpdate;
  
  const categoryList = useSelector((state) => state.categoryDetails);
  const { categories,loading: catloading } = categoryList;

  const productCreate = useSelector((state) => state.createProduct);
  const { error, success, loading } = productCreate;

  useEffect(() => {
    dispatch(listCategories())
    if (success) {
      toast.success("Success");
      navigate("/admin/productsout/active");
    }
  }, [id, dispatch, success]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !category ||
      !description ||
      !image ||
      !brand ||
      !reOrderLevel ||
      !supplierId
    ) {
      setFormError(true);
    } else {
      console.log(formData);
      dispatch(createProduct({ ...formData, image }));
    }
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
      setFormError(false);
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value, //if e.target.id is boolean set as true or false, if it's null set as e.target.value ?? ---nulish operator
      }));
    }
  };

  const imageTextHandler = (e) => {
    setFormError(false);
    setImage(e.target.value);
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
  if (loading || catloading) {
    return <Spinner />;
  }

  const back = () => {
    dispatch(productUpdateReset());
    navigate(`/admin/productsout/active`);
  };

  return (
    <div className="profile">
      <main className="pb-4">
        <Button className="btn btn-light my-3" onClick={back}>
          Go Back
        </Button>
        {error && <Message varient="danger">{error}</Message>}
        <FormContainer>
          <form onSubmit={onSubmit}>
            <header>
              <p className="pageHeader"> Create a Product</p>
            </header>

            <label className="formLabel">Name*</label>
            <input
              className="formInputName"
              type="text"
              id="name"
              value={name}
              onChange={onMutate}
              placeholder="Chicken Burger"
              //   required
            />
            {(formError && !name) && (
              <p
                style={{
                  color: "red",
                  margin: "10px 20px",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Field can't be Empty
              </p>
            )}

            <Form.Group controlId="category">
              <label className="formLabel">Category*</label>

              <select
                className="formInputName"
                onChange={onMutate}
                value={category}
                id="category"
                // required
              >
                <option value="">None</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.category}>{category.category}</option>
                ))}
              </select>
            </Form.Group>
            {formError && (
              <p
                style={{
                  color: "red",
                  margin: "10px 20px",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Field can't be Empty
              </p>
            )}

            <label className="formLabel">Description*</label>
            <textarea
              className="formInputName"
              type="text"
              id="description"
              value={description}
              onChange={onMutate}
              placeholder="Demo discription"
              //   required
            />
            {formError && (
              <p
                style={{
                  color: "red",
                  margin: "10px 20px",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Field can't be Empty
              </p>
            )}

            {!type && (
              <>
                <label className="formLabel">Brand*</label>
                <input
                  className="formInputName"
                  type="text"
                  id="brand"
                  value={brand}
                  onChange={onMutate}
                  placeholder="CocaCola"
                  //   required
                />
                {formError && (
                  <p
                    style={{
                      color: "red",
                      margin: "10px 20px",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    Field can't be Empty
                  </p>
                )}
              </>
            )}

            <label className="formLabel">Image*</label>
            <input
              className="formInputName"
              type="text"
              id="image"
              value={image}
              onChange={imageTextHandler}
              placeholder="If you have a Image URL paste here"
              //   required
            />
            {formError && (
              <p
                style={{
                  color: "red",
                  margin: "10px 20px",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Field can't be Empty
              </p>
            )}
            <input
              className="formInputFile"
              type="file"
              label="Choose File"
              onChange={uploadFileHandler}
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
                <label className="formLabel">Daily Capacity*</label>
                <input
                  className="formInputName"
                  type="number"
                  id="dailyCapacity"
                  value={dailyCapacity}
                  onChange={onMutate}
                  placeholder="20"
                  //   required
                />
                {formError && (
                  <p
                    style={{
                      color: "red",
                      margin: "10px 20px",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    Field can't be Empty
                  </p>
                )}
              </>
            )}

            {type && (
              <>
                <label className="formLabel">Price*</label>
                <input
                  className="formInputName"
                  type="number"
                  id="price"
                  value={price}
                  onChange={onMutate}
                  placeholder="40.55"
                  //   required
                />
                {formError && (
                  <p
                    style={{
                      color: "red",
                      margin: "10px 20px",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    Field can't be Empty
                  </p>
                )}
              </>
            )}

            {type && (
              <>
                <label className="formLabel">Count In Stock</label>
                <input
                  className="formInputName"
                  type="number"
                  id="countInStock"
                  value={countInStock}
                  onChange={onMutate}
                  placeholder="20"
                  //   required
                />
              </>
            )}

            {!type && (
              <>
                <label className="formLabel">Re Order Level*</label>
                <input
                  className="formInputName"
                  type="number"
                  id="reOrderLevel"
                  value={reOrderLevel}
                  onChange={onMutate}
                  min="1"
                  //   required
                />
                {formError && (
                  <p
                    style={{
                      color: "red",
                      margin: "10px 20px",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    Field can't be Empty
                  </p>
                )}
              </>
            )}

            {!type && (
              <>
                <label className="formLabel">SupplierId</label>
                <input
                  className="formInputName"
                  type="text"
                  id="supplierId"
                  value={supplierId}
                  onChange={onMutate}
                  placeholder="supplier ID"
                  //   required
                />
                 {formError && (
                  <p
                    style={{
                      color: "red",
                      margin: "10px 20px",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    Field can't be Empty
                  </p>
                )}
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

export default AddReadyProduct;
