import { useState } from "react";
import templatesApi from "../../api/template";
import ReactTags from "react-tag-autocomplete";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import {
  Button,
  CircularProgress,
  TextField,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import { toast } from "react-toastify";
import { ChevronLeft } from "@mui/icons-material";
import categoriesApi from "../../api/category";


const Addtemplate = ({ refetch }) => {
  // states
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // states
  const [catId, setCatId] = useState([]);

  // fetch categories
  useEffect(() => {
    (async () => {
      try {
        const res = await categoriesApi.getCategories();

        let newCars = res.data?.map((i) => ({ categoryName: i.categoryName, _id:i._id }));

        setCatId(newCars);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const [template, settemplate] = useState({
    title: "",
    description: "",
    columns: "",
    color: "",
    isTemplateWithPhoto: false,
    isForStudent: false,
    educationLevel: "",
    experienceLevel: "",
    template: "",
    categoryId: "",
    
  });

  const [search] = useSearchParams();
  const templateId = search.get("templateId");

  const templateAddHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();

    if (!template.title) {
      setError("title is required");
      return;
    }
    setError("");

    for (let key in template) {
      if (Array.isArray(template[key])) {
        formData.append(key, JSON.stringify(template[key]));
      } else {
        formData.append(key, template[key]);
      }
    }

    try {
      const result = await templatesApi.create(formData);

      if (result.data.meta.status) {
        toast.success("Submitted");
        settemplate({
          title: "",
          description: "",
          columns: "",
          color: "",
          isTemplateWithPhoto:false,
          isForStudent:false,
          educationLevel: "",
          experienceLevel: "",
          template: "",
          settemplate: "",
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

  // update template handler
  const templateUpdateHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (!template.title) {
      setError("title is required");
      return;
    }

    setError("");
    for (let key in template) {
      if (key === "_id" || key === "__v" || key === "status" || key === 'templateId' || key === 'category') {
        delete template[key]; // remove _id and __v properties
      }
    }
    for (let key in template) {
      if (Array.isArray(template[key])) {
        formData.append(template, JSON.stringify(template[key]));
      } else {
        formData.append(key, template[key]);
      }
    }

    setLoading(true);
    try {
      const result = await templatesApi.update(templateId, formData);
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
    if (templateId) {
      (async () => {
        try {
          const res = await templatesApi.readById(templateId);

          if (res.data) {
            let template = res.data.data;
            template?.createdAt && delete template.createdAt;
            template?.updatedAt && delete template.updatedAt;

            settemplate(template);
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [templateId]);
  const handleSelect = (event, selectedValue) => {
    settemplate({ ...template, categoryId: selectedValue._id })

  };
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 pl-3 pb-2 border-b-2">
        {template?._id ? "Update template" : "Add template"}
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
        onSubmit={template._id ? templateUpdateHandler : templateAddHandler}
        className="bg-white rounded-md px-5 py-10 mt-10"
      >
        <div className="grid grid-cols-3 gap-4">
          {!template._id && <Autocomplete
            size="small"
            value={template.categoryName}
            onChange={(event, selectedValue) =>
              handleSelect(event, selectedValue)
            }
            getOptionLabel={(option) => option.categoryName || ""}
            loadingText="loading..."
            noOptionsText="No Category Found"
            isOptionEqualToValue={(option, value) =>
              option.categoryName === value
            }
            options={catId}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categories"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: <>{params.InputProps.endAdornment}</>,
                }}
              />
            )}
            renderOption={(props, option, { selected }) => (
              <li
                {...props}
                className={`flex gap-3 px-3 py-2 cursor-pointer hover:bg-[#f2f2f2] duration-300 ${
                  selected && "bg-[#f2f2f2]"
                }`}
              >
                <span className="flex flex-col">
                  <span className="text-base">{option.categoryName}</span>
                </span>
              </li>
            )}
          />}
          <div className="col-6">
            <TextField
              fullWidth
              size="small"
              label="Title"
              variant="outlined"
              value={template.title}
              required
              onChange={(e) =>
                settemplate({ ...template, title: e.target.value })
              }
            />
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              size="small"
              label="Description"
              variant="outlined"
              value={template.description}
              required
              onChange={(e) =>
                settemplate({ ...template, description: e.target.value })
              }
            />
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              size="small"
              label="Color"
              variant="outlined"
              value={template.color}
              required
              onChange={(e) =>
                settemplate({ ...template, color: e.target.value })
              }
            />
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              size="small"
              label="Columns"
              variant="outlined"
              value={template.columns}
              required
              onChange={(e) =>
                settemplate({ ...template, columns: e.target.value })
              }
            />
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              size="small"
              label="Education Level"
              variant="outlined"
              value={template.educationLevel}
              required
              onChange={(e) =>
                settemplate({ ...template, educationLevel: e.target.value })
              }
            />
          </div>

          {/* no of km */}
          <div className="col-6">
            <TextField
              fullWidth
              size="small"
              label="Experience Level"
              type="text"
              variant="outlined"
              value={template.experienceLevel}
              required
              onChange={(e) =>
                settemplate({ ...template, experienceLevel: e.target.value })
              }
            />
          </div>

          {/* surge price */}
          <div className="col-6">
            <TextField
              fullWidth
              size="small"
              label="Template"
              variant="outlined"
              value={template.template}
              required
              onChange={(e) =>
                settemplate({ ...template, template: e.target.value })
              }
            />
          </div>
          <div className="flex items-center gap-x-1">
            <span className="text-base">For Student</span>
            <Checkbox
              checked={Boolean(template.isForStudent)}
              onChange={(e) =>
                settemplate({ ...template, isForStudent: e.target.checked })
              }
            />
          </div>
          <div className="flex items-center gap-x-1">
            <span className="text-base">Template With Photo</span>
            <Checkbox
              checked={Boolean(template.isTemplateWithPhoto)}
              onChange={(e) =>
                settemplate({
                  ...template,
                  isTemplateWithPhoto: e.target.checked,
                })
              }
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
              {template._id ? "Update template" : "Add template"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
// Props validation
Addtemplate.propTypes = {
  refetch: PropTypes.func,
};
export default Addtemplate;
