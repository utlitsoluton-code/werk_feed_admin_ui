import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import plansApi from "../../api/plan";
import ReactTags from "react-tag-autocomplete";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { ChevronLeft, Delete } from "@mui/icons-material";
import planApi from "../../api/plan";
import {
  TextInputField,NumberInputField
} from "../shared/TripsFields";
const AddPlan = ({ refetch }) => {
  // states
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [benefit, setBenefit] = useState("");
 



  const [plan, setPlan] = useState({
    title: "",
    description: "",
    price: 0,
    duration: 0,
    benefits: [],
    downloadCount: 0,
    templateCount: 0,
  });
  // react-hook-form
  const Form = useForm({
    defaultValues: {
      benefits: [],
    },
  });
  const [search] = useSearchParams();
  const planId = search.get("planId");

  const {
    reset,
    getValues,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = Form;

  
    const planAddHandler = async (e) => {

    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
   console.log(plan,"planData60")
    if (!plan.title) {
      setError("title is required");
      return;
    }

    if (plan.price === 0 || plan.price < 0) {
      setError("price is required");
      return;
    }

    if (plan.duration < 0) {
      setError("duration is required");
      return;
    }
    if (plan.downloadCount < 0) {
      setError("download count is required");
      return;
    }
    setError("");

    for (let key in plan) {
      if (Array.isArray(plan[key])) {
        formData.append(key, JSON.stringify(plan[key]));
      } else {
        formData.append(key, plan[key]);
      }
    }

    try {
      console.log(formData,"formData")
     const result= await plansApi.create(formData);
     console.log(result,"result")

      if(result.data.meta.status){
        toast.success("Submitted");
        setPlan({
          title: "",
          benefits: [],
          description: "",
          downloadCount: 0,
          templateCount: 0,
          price: 0,
          duration: 0,
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

    if (!plan.title) {
      setError("title is required");
      return;
    }

    if (plan.price === 0 || plan.price < 0) {
      setError("price is required");
      return;
    }

    if (plan.duration < 0) {
      setError("duration is required");
      return;
    }
    if (plan.downloadCount < 0) {
      setError("download count is required");
      return;
    }
    setError("");
    console.log(plan.benefits,"updatehandle")
    for (let key in plan) {
      if (key === '_id' || key === '__v' || key === 'status') {
        delete plan[key]; // remove _id and __v properties
      }
    }
    for (let key in plan) {
      if (Array.isArray(plan[key])) {
        formData.append(plan, JSON.stringify(plan[key]));
      } else {
        formData.append(key, plan[key]);
      }
    }

    setLoading(true);
    try {
   const result = await planApi.update(planId, formData);
   if(result.data.meta.status){
    toast.success("Updated");
   }else{
    toast.error("Update failed");
   }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // fetch blog by blog id
  useEffect(() => {
    if (planId) {
      (async () => {
        try {
          const res = await plansApi.readById(planId);

          if (res.data) {
            let plan = res.data.data;
            plan?.createdAt && delete plan.createdAt;
            plan?.updatedAt && delete plan.updatedAt;
            setPlan(plan);
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [planId]);

  // console.log(plan.benefits,"plan.benefits")
  const benefititme = plan.benefits.map((item, index) =>{
      console.log(item)
  } )

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 pl-3 pb-2 border-b-2">
        {plan?._id ? "Update plan" : "Add plan"}
      </h1>
      <Button
        onClick={() => window.history.back()}
        variant="contained"
        className="!ml-5"
        startIcon={<ChevronLeft />}
      >
        Go Back
      </Button>
    
        <form
          onSubmit={plan._id ? planUpdateHandler: planAddHandler}
          className="bg-white rounded-md px-5 py-10 mt-10"
        >
          <div className="grid grid-cols-3 gap-4">
            <div className="col-6">
              <TextField
                fullWidth
                size="small"
                label="Title"
                variant="outlined"
                value={plan.title}
                required
                onChange={(e) => setPlan({ ...plan, title: e.target.value })}
              />
            </div>
            <div className="col-6">
              <TextField
                fullWidth
                size="small"
                label="Description"
                variant="outlined"
                value={plan.description}
                required
                onChange={(e) =>
                  setPlan({ ...plan, description: e.target.value })
                }
              />
            </div>
            <div className="col-6">
              <TextField
                fullWidth
                size="small"
                label="Price"
                variant="outlined"
                value={plan.price}
                required
                onChange={(e) => setPlan({ ...plan, price: e.target.value })}
              />
            </div>

            {/* no of km */}
            <div className="col-6">
              <TextField
                fullWidth
                size="small"
                label="Duration"
                variant="outlined"
                value={plan.duration}
                required
                onChange={(e) => setPlan({ ...plan, duration: e.target.value })}
              />
            </div>

            {/* surge price */}
            <div className="col-6">
              <TextField
                fullWidth
                size="small"
                label="Download Count"
                variant="outlined"
                value={plan.downloadCount}
                required
                onChange={(e) =>
                  setPlan({ ...plan, downloadCount: e.target.value })
                }
              />
            </div>

            {/* driver allowance */}
            <div className="col-6">
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                label="Template Count"
                value={plan.templateCount}
                required
                onChange={(e) =>
                  setPlan({ ...plan, templateCount: e.target.value })
                }
              />
            </div>
        
            <div className="flex flex-col gap-y-2">
              <span className="text-base">Benefits</span>
              <div className="flex flex-wrap gap-3">
                {plan.benefits.map((item, index) => (
                  <p
                    key={index}
                    className="px-3 py-2 group rounded-full text-sm bg-[#000] bg-opacity-30 text-black cursor-pointer relative overflow-hidden"
                  >
                    <span
                      className="absolute top-0 left-0 text-white grid place-items-center w-full h-full bg-black duration-300 invisible group-hover:visible"
                      onClick={() => {
                        let benefits = [...plan.benefits];
                        benefits.splice(index, 1);
                        setPlan({ ...plan, benefits: benefits });
                      }}
                    >
                      <Delete fontSize="small" />
                    </span>
                    {item}
                  </p>
                ))}
              </div>
              <div className="flex mt-2">
                <div className="flex-1">
                  <TextField
                    fullWidth
                    size="small"
                    label="Benefit"
                    variant="outlined"
                    name="benefit"
                    value={benefit}
                    onChange={(e) => setBenefit(e.target.value)}
                  />
                </div>
                <Button
                  disabled={Boolean(!benefit)}
                  type="button"
                  variant="contained"
                  className="whitespace-nowrap !px-5 !py-2"
                  onClick={() => {
                    const benefits = [...plan.benefits];
                    benefits.push(benefit);
                    setPlan({ ...plan, benefits: benefits });
                    setBenefit("");
                  }}
                >
                  Add Benefit
                  </Button>
              </div>
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
{plan._id ? "Update plan" : "Add plan"}              </Button>
            </div>
          </div>
        </form>
      
    </div>
  );
};
// Props validation
AddPlan.propTypes = {
  refetch: PropTypes.func,
};
export default AddPlan;
