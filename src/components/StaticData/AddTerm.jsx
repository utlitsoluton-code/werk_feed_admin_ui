import { useState } from "react";
import PropTypes from "prop-types";
import {
  TextInputField
} from "../shared/TripsFields";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { ChevronLeft } from "@mui/icons-material";
import staticPageApi from './../../api/staticPage';
import { useForm, Controller } from "react-hook-form";

const AddTerm = ({ refetch }) => {
  // states
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [term, setTerm] = useState({
    title: "",
    description: "",
    url: ""
  });
  // react-hook-form
  const [search] = useSearchParams();
  const termId = search.get("termId");
  // react-hook-form
  const Form = useForm({
    defaultValues: {
   
    },
  });
  const {
    reset,
    getValues,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = Form;


  const planAddHandler = async (data) => {
    setSubmitting(true);


    try {
    const result =  await staticPageApi.create(data);
      
      if(result.data.meta.status){
        toast.success("Submitted");
        setTerm({
          title: "",
          description: "",
          url: ""
        });
       }else{
        setError(result.data.meta.msg);

        toast.error(result.data.meta.msg);
       }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // update plan handler
  const planUpdateHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (!term.title) {
      setError("title is required");
      return;
    }
    setError("");
    for (let key in term) {
      if (key === '_id' || key === '__v' || key === 'status') {
        delete term[key]; // remove _id and __v properties
      }
    }
    
    for (let key in term) {
        if (Array.isArray(term[key])) {
          formData.append(key, JSON.stringify(term[key]));
        } else {
          formData.append(key, term[key]);
        }}

    setLoading(true);
    try {
   const result = await staticPageApi.update(termId, formData);
   if(result?.data?.meta?.status){
    toast.success("Submitted");
   }else{
    setError(result.data.meta.msg);

    toast.error(result.data.meta.msg);   }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // fetch blog by blog id
  useEffect(() => {
    if (termId) {
      (async () => {
        try {
          const res = await staticPageApi.readById(termId);

          if (res.data) {
            let term = res.data.data;
            term?.createdAt && delete term.createdAt;
            term?.updatedAt && delete term.updatedAt;
            setTerm(term);
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [termId]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 pl-3 pb-2 border-b-2">
        {term?._id ? "Update term and conditions" : "Add term and condition"}
      </h1>
      <Button
        onClick={() => window.history.back()}
        variant="contained"
        className="!ml-5"
        startIcon={<ChevronLeft />}
      >
        Go Back
      </Button>
      {!term._id ? (
        <form
          onSubmit={handleSubmit(planAddHandler)}
          className="mt-10 rounded-md p-5 bg-white shadow-lg"
        >
          <div className="grid grid-cols-3 gap-4">

            <TextInputField
              Form={Form}
              errorMsg={"Title is required"}
              label={"Title"}
              name="title"
              type="text"
              variant="outlined"

            />
            
            <TextInputField
              Form={Form}
              errorMsg={"Description is required"}
              label={"Description"}
              name="description"
            />

            <TextInputField
              Form={Form}
              errorMsg={"Link is required"}
              label={"Link"}
              name="url"
            />

            <div>
              <Button
                type="submit"
                disabled={submitting}
                variant="contained"
                className="!w-full !py-2"
                startIcon={
                  submitting && <CircularProgress color="inherit" size={16} />
                }
              >
                Add 
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <form
          onSubmit={planUpdateHandler}
          className="bg-white rounded-md px-5 py-10 mt-10"
        >
          <div className="grid grid-cols-3 gap-4">
            <div className="col-6">
              <TextField
                fullWidth
                size="small"
                label="Title"
                variant="outlined"
                value={term.title}
                required
                onChange={(e) => setTerm({ ...term, title: e.target.value })}
              />
            </div>
            <div className="col-6">
              <TextField
                fullWidth
                size="small"
                label="Description"
                variant="outlined"
                value={term.description}
                required
                onChange={(e) =>
                  setTerm({ ...term, description: e.target.value })
                }
              />
            </div>
            

            {/* no of km */}
            <div className="col-6">
              <TextField
                fullWidth
                size="small"
                label="Link"
                variant="outlined"
                value={term.url}
                required
                onChange={(e) => setTerm({ ...term, url: e.target.value })}
              />
            </div>

            {error && (
              <p className="mt-4 text-center text-red-500 text-sm">{error}</p>
            )}

            <div>
              <Button
                type="submit"
                disabled={submitting}
                variant="contained"
                className="!w-full !py-2"
                startIcon={
                  submitting && <CircularProgress color="inherit" size={16} />
                }
              >
                Update terms
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
// Props validation
AddTerm.propTypes = {
  refetch: PropTypes.func,
};
export default AddTerm;
