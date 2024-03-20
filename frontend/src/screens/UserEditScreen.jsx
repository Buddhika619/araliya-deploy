import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserEditScreen = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    isAdmin: true,
    role: "",
  });

  const { isAdmin, role } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const uesrUpdate = useSelector((state) => state.userDetails);
  const { success: successUpdate } = uesrUpdate;

  useEffect(() => {
    if (successUpdate) {
      setFormData(user);

      toast.success(`User Updated!`, {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
      });
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setFormData(user);
      }
    }
  }, [user, id, dispatch, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: id, isAdmin, role }));
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

  return (
    <>
      <Link to="/admin/users" className="btn btn-light my-3">
        Go Back
      </Link>
      {/* {successUpdate && <Message varient='success'>Profile Updated</Message>} */}
      <FormContainer>
        <header>
          <p className="pageHeader"> Update User</p>
        </header>
        {/* {loadingUpdate && <Loader />}
        {errorUpdate && <Message varient='danger'>{errorUpdate}</Message>} */}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message varient="danger">{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <label className="formLabel">Name</label>
            <input
              className="formInputName"
              type="text"
              value={user.name}
              // maxLength='32'
              // minLength='10'
              readOnly
            />

            <label className="formLabel">Email</label>
            <input
              className="formInputName"
              type="email"
              value={user.email}
              // maxLength='32'
              // minLength='10'
              readOnly
            />

            <Form.Group controlId="role">
              <label className="formLabel">Role</label>
              <select className="formInputName" onChange={onMutate} id="role">
                <option className="formInputName">{role}</option>
                <option value="Customer" className="formInputName">
                  Customer
                </option>
                <option value="Rider" className="formInputName">
                  Rider
                </option>
                <option value="Manager" className="formInputName">
                  Manager
                </option>
                <option value="Admin" className="formInputName">
                  Admin
                </option>
              </select>
            </Form.Group>

            <label className="formLabel">Has admin privileges?</label>
            <div className="formButtons">
              <button
                className={isAdmin ? "formButtonActive" : "formButton"}
                type="button"
                id="isAdmin"
                value={true}
                onClick={onMutate}
              >
                Yes
              </button>
              <button
                className={
                  !isAdmin && isAdmin !== null
                    ? "formButtonActive"
                    : "formButton"
                }
                type="button"
                id="isAdmin"
                value={false}
                onClick={onMutate}
              >
                No
              </button>
            </div>

            <button type="submit" className="primaryButton createListingButton">
              Update
            </button>
          </form>
        )}
        <br /> <br /> <br /> <br /> <br />
        <br /> <br />
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
