import { useEffect, useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import RichEditor from "../common/RichEditor/RichEditor";
import { useSearchParams } from "react-router-dom";
import faqsApi from "../../api/faqs";
import { ChevronLeft } from "@mui/icons-material";
import { toast } from "react-toastify";
import { TextInputField } from "../shared/TripsFields";
const AddFaq = () => {
  // states
  const [faq, setFaq] = useState({ question: "", answer: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editorInitContent, setEditInitContent] = useState("");

  const [search] = useSearchParams();
  const faqId = search.get("faqId");

  // add blog handler
  const addBlogHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    setError("");
    if (!faq.question) {
      setError("Faq question is required");
      return;
    }

    if (!faq.answer) {
      setError("Faq answer is required");
      return;
    }

    for (let key in faq) {
      if (Array.isArray(faq[key])) {
        for (let item of faq[key]) {
          formData.append(key, item);
        }
      } else {
        formData.append(key, faq[key]);
      }
    }

    try {
    const result =  await faqsApi.create(formData);
      if(result.data.meta.status){
        toast.success("Submitted");
        setFaq({ question: "", answer: "" });

       }else{
        setError(result.data.meta.msg);

        toast.error(result.data.meta.msg);
       }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // update blog handler
  const updateBlogHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    setError("");

    if (!faq.question) {
      setError("Faq question is required");
      return;
    }

    if (!faq.answer) {
      setError("Faq answer is required");
      return;
    }
    setError("");

    for (let key in faq) {
        if (key === '_id' || key === '__v' || key === 'status') {
          delete faq[key];
        }
      }
    for (let key in faq) {
      if (Array.isArray(faq[key])) {
        for (let item of faq[key]) {
          formData.append(key, item);
        }
      } else {
        formData.append(key, faq[key]);
      }
    }
    setLoading(true);
    try {
    const result= await faqsApi.update(faqId, formData);
      if(result?.data?.meta?.status){
        toast.success("Submitted");
       }else{
        setError(result.data.meta.msg);
    
        toast.error(result.data.meta.msg); 
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // fetch blog by blog id
  useEffect(() => {
    if (faqId) {
      (async () => {
        try {
          const res = await faqsApi.readById(faqId);
          if (res.data) {
            let faqData = res.data.data;
            faqData?.createdAt && delete faqData.createdAt;
            faqData?.updatedAt && delete faqData.updatedAt;
            setFaq(faqData);
            setEditInitContent(faqData?.answer);
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [faqId]);
  console.log(faq?.answer, "faq?.answer");
  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-4 pl-3 pb-2 border-b-2">
        {faq?._id ? "Update Faq" : "Add Faq"}
      </h1>

      <Button
        onClick={() => window.history.back()}
        variant="contained"
        className="!ml-5"
        startIcon={<ChevronLeft />}
      >
        Go Back
      </Button>

      {faq._id ? (
        <form
          onSubmit={updateBlogHandler}
          className="bg-white rounded-md px-5 py-10 mt-10"
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                label={"Question"}
                value={faq.question}
                required
                onChange={(e) => setFaq({ ...faq, question: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <RichEditor
                initialContent={editorInitContent}
                content={faq?.answer}
                changeHandler={(html, text) => {
                  if (text.trim()) {
                    setFaq({ ...faq, answer: html, answer: text.trim() });
                  }
                }}
              />
            </div>
          </div>
          {error && (
            <p className="mt-4 text-center text-red-500 text-sm">{error}</p>
          )}
          <div className="mt-5">
            <Button
              type="submit"
              disabled={loading}
              variant="contained"
              className="!w-full !py-3"
              startIcon={
                loading && (
                  <CircularProgress
                    size={18}
                    sx={{ "& circle": { stroke: "#fff", strokeWidth: 8 } }}
                  />
                )
              }
            >
              Update Faq
            </Button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={addBlogHandler}
          className="bg-white rounded-md px-5 py-10 mt-10"
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <TextField
                fullWidth
                size="small"
                label="Question"
                variant="outlined"
                value={faq.question}
                required
                onChange={(e) => setFaq({ ...faq, question: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <RichEditor
                initialContent={editorInitContent}
                content={faq.answer}
                changeHandler={(html, text) => {
                  if (text.trim()) {
                    setFaq({ ...faq, answer: html, answer: text.trim() });
                  }
                }}
              />
            </div>
          </div>
          {error && (
            <p className="mt-4 text-center text-red-500 text-sm">{error}</p>
          )}
          <div className="mt-5">
            <Button
              type="submit"
              disabled={loading}
              variant="contained"
              className="!w-full !py-3"
              startIcon={
                loading && (
                  <CircularProgress
                    size={18}
                    sx={{ "& circle": { stroke: "#fff", strokeWidth: 8 } }}
                  />
                )
              }
            >
              Add Faq
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddFaq;
