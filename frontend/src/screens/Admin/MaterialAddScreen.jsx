import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";

import FormContainer from "../../components/FormContainer";

import { productUpdateReset } from "../../reducers/singleProductSlice";

import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import { createMaterial } from "../../actions/materialActions";
import { viewMatrialsReset } from "../../reducers/matrialSlice";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";

const CreateListing = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    reOrderLevel: "",
    dailyCap: "",
    measurement: "",
    supplierId: "",
  });

  const { name, reOrderLevel, dailyCap, measurement, supplierId } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const addMaterial = useSelector((state) => state.matrialDetails);

  const { loading, error, success } = addMaterial;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [suggestions, setSuggestions] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    // Fetch suggestions from the database based on the keyword
    const fetchSuggestions = async () => {

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const response = await axios.get(`/api/supplier/getIds`, config);
        setSuggestions(response.data);
      } catch (error) {
        // Handle fetch error
      }
    };
    fetchSuggestions();
  }, []);

  useEffect(() => {
    dispatch(viewMatrialsReset());
    if (success) {
      toast.success("Success");

      setTimeout(function () {
        navigate("/admin/materials/all");
      }, 1000);
    }
  }, [id, dispatch, success]);

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      createMaterial({
        name,
        reOrderLevel,
        dailyCap,
        measurement,
        supplierId: keyword.label,
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


  if (suggestions.length < 0) {
    return <Spinner />;
  }





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
          {error && <Message varient="danger">{error}</Message>}
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

            <label className="formLabel">Supplier ID</label>
            {/* <input
              className="formInputName"
              type="text"
              id="supplierId"
              value={supplierId}
              onChange={onMutate}
              // maxLength='32'
              // minLength='10'
              required
            /> */}

            <Autocomplete
              disablePortal
              options={suggestions}
              sx={{ width: 300 }}
              onChange={(event, value) => setKeyword(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  className="formInputName"
                  style={{ border: "2px solid rgb(198, 231, 198)" }}
                  sx={{
                    backgroundColor: "#ffffff",
                    width: "600px",
                    fontWeight: 600,
                    "& fieldset": { border: "none" },
                  }}
                />
              )}
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

export default CreateListing;
