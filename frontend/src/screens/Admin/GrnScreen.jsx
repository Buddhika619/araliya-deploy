import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";

import FormContainer from "../../components/FormContainer";

import { productUpdateReset } from "../../reducers/singleProductSlice";

import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

import { createBatches } from "../../actions/batchActions";
import { viewBatchesReset } from "../../reducers/batchSlice";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { label: "The Good, the Bad and the Ugly", year: 1966 },
  { label: "Fight Club", year: 1999 },
  {
    label: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    label: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { label: "Forrest Gump", year: 1994 },
  { label: "Inception", year: 2010 },
];

const CreateListing = () => {
  const { id } = useParams();

  console.log(id);
  const [formData, setFormData] = useState({
    materialId: id ? id : "",
    supplierId: "",
    qty: "",
    cost: "",
    salesPrice: "",
  });

  const { materialId, qty, cost, salesPrice, supplierId } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState("");

  const addBatch = useSelector((state) => state.batchDetails);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [suggestions, setSuggestions] = useState([]);

  const {
    loading,
    error,

    success,
  } = addBatch;
  
  useEffect(() => {
    // Fetch suggestions from the database based on the keyword
    const fetchSuggestions = async () => {
      console.log("hi");
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const response = await axios.get(`/api/batches/getIds`, config);
        console.log(response.data);
        setSuggestions(response.data);
      } catch (error) {
        // Handle fetch error
      }
    };
    fetchSuggestions();
  }, []);
  useEffect(() => {
    dispatch(viewBatchesReset());
    if (success) {
      toast.success("Success");

      setTimeout(function () {
        navigate("/admin/batches");
      }, 1000);
    }
  }, [id, dispatch, success, error]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(keyword);
    dispatch(
      createBatches({
        materialId: keyword,
        qty,
        cost,
        salesPrice,
        supplierId,
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
  if (suggestions.length < 1) {
    return <Spinner />;
  }

  const back = () => {
    dispatch(productUpdateReset());
    navigate(`/admin/batches`);
  };

  console.log(error);
  if (error) {
    <Message>{error}</Message>;
  }

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
              <p className="pageHeader"> Create a GRN</p>
            </header>

            <label className="formLabel">Material/Product ID</label>

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
                  sx={{
                    backgroundColor: "#ffffff",
                    width: "600px",
                    fontWeight: 600,
                    "& fieldset": { border: "none" },
                  }}
                />
              )}
            />
            {/* 
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
            /> */}

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

            <label className="formLabel">Sales Price</label>
            <input
              className="formInputName"
              type="number"
              min="0"
              id="salesPrice"
              value={salesPrice}
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

export default CreateListing;
