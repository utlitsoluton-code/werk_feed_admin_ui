import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import categorysApi from "../../api/category";
import ReactTags from "react-tag-autocomplete";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import {
  Button,
  CircularProgress,
  TextField,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  FormControl,
  Radio,
} from "@mui/material";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { ChevronLeft, Delete } from "@mui/icons-material";
import categoryApi from "../../api/category";
import { TextInputField, NumberInputField } from "../shared/TripsFields";
import ImageCropper from "../shared/ImageCropper";

const AddCategory = ({ refetch }) => {
  // states
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [benefit, setBenefit] = useState("");

  const [category, setcategory] = useState({
    categoryName: "",
    categoryImg: "xyz",
    description: "",
    type: "ROOT",
  });
  // react-hook-form

  const [search] = useSearchParams();
  const categoryId = search.get("categoryId");

  const categoryAddHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    if (!category.categoryName) {
      setError("Category name is required");
      return;
    }

   

    setError("");
    for (let key in category) {
      if (Array.isArray(category[key])) {
        formData.append(key, JSON.stringify(category[key]));
      } else {
        formData.append(key, category[key]);
      }
    }

    try {
      const result = await categorysApi.create(formData);

      if (result.data.meta.status) {
        toast.success("Submitted");
        setcategory({
          categoryName: "",
          categoryImg: "",
          description: "",
          type: "",
        });
      } else {
        setError(result.data.meta.msg);

        toast.error(result.data.meta.msg);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // update category handler
  const categoryUpdateHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (!category.categoryName) {
      setError("Category name is required");
      return;
    }

    setError("");
    for (let key in category) {
      if (key === "categoryId" || key === "type" || key === "__v" || key === "status") {
        delete category[key]; // remove _id and __v properties
      }
    }
    for (let key in category) {
      if (key !== "categoryImg") {
        if (Array.isArray(category[key])) {
          for (let item of category[key]) {
            formData.append(key, item);
          }
        } else {
          formData.append(key, category[key]);
        }
      }
    }
    if (category.categoryImg) {
      formData.append('categoryImg', category.categoryImg);
  }
    
    setLoading(true);
    try {
      const result = await categoryApi.update(formData);
      if (result.data.meta.status) {
        toast.success("Updated");
      } else {
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
    if (categoryId) {
      (async () => {
        try {
          const res = await categorysApi.readById(categoryId);

          if (res.data) {
            let category = res.data.data;
            category?.createdAt && delete category.createdAt;
            category?.updatedAt && delete category.updatedAt;
            setcategory(category);
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [categoryId]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 pl-3 pb-2 border-b-2">
        {category?._id ? "Update category" : "Add category"}
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
        onSubmit={category._id ? categoryUpdateHandler : categoryAddHandler}
        className="bg-white rounded-md px-5 py-10 mt-10"
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="col-6">
            <TextField
              fullWidth
              size="small"
              label="Category Name"
              variant="outlined"
              value={category.categoryName}
              required
              onChange={(e) =>
                setcategory({ ...category, categoryName: e.target.value })
              }
            />
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              size="small"
              label="Description"
              variant="outlined"
              value={category.description}
              required
              onChange={(e) =>
                setcategory({ ...category, description: e.target.value })
              }
            />
          </div>
         {/* {!category._id && <div className="flex items-center gap-x-1">
            <FormControl component="fieldset">
              <FormLabel component="legend">Type</FormLabel>
              <RadioGroup
                className="text-base"
                aria-label="type"
                name="type"
                value={category.type}
                onChange={(e) =>
                  setcategory({ ...category, type: e.target.value })
                }
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2, // add some gap between the radio buttons
                }}
              >
                <FormControlLabel
                  value="ROOT"
                  control={<Radio />}
                  label="ROOT"
                />
                <FormControlLabel
                  value="PARENT"
                  control={<Radio />}
                  label="PARENT"
                />
                <FormControlLabel
                  value="CHILD"
                  control={<Radio />}
                  label="CHILD"
                />
                <FormControlLabel
                  value="SUBCHILD"
                  control={<Radio />}
                  label="SUBCHILD"
                />
              </RadioGroup>
            </FormControl>
          </div>} */}
          {/* <div>
            <ImageCropper
              resizableImage={(e) => setcategory({ ...category, blogsImg: e })}
            >
              {!category.categoryImg && (
                <div className="w-full px-2 text-center py-5 border-4 cursor-pointer border-dashed">
                  <p className="text-sm">
                    Drag 'n' drop thumbnail here, or click to select thumbnail
                  </p>
                  <p className="text-sm opacity-75">
                    Accept .png, .jepg, .webp
                  </p>
                </div>
              )}
              {category.categoryImg &&
                typeof category.blogsImg === "object" && (
                  <img
                    src={category?.categoryImg}
                    className="w-full h-auto rounded-md aspect-video"
                    alt=""
                  />
                )}
              {category.categoryImg &&
                typeof category.blogsImg === "string" && (
                  <img
                    src={category.categoryImg}
                    className="w-full h-auto rounded-md aspect-video"
                    alt=""
                  />
                )}
            </ImageCropper>
          </div> */}

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
              {category._id ? "Update category" : "Add category"}{" "}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
// Props validation
AddCategory.propTypes = {
  refetch: PropTypes.func,
};
export default AddCategory;
