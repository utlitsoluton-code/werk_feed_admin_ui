import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../contexts";
import Filters from "../components/common/Filters";
import { Delete, Edit, Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  Button,
  CircularProgress,
  IconButton,
 
} from "@mui/material";
import { toast } from "react-toastify";
import Pagination from "../components/common/Pagination";
import staticPageApi from "../api/staticPage";
const Home = () => {
  // context
  const { admin } = useContext(AdminContext);
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [contentPerPage, setContentPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState();
  const [totalCount, setTotalCount] = useState();
  const [searchKey, setSearchKey] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [handleUpdate, setHandleUpdate] = useState(false);



  useEffect(() => {
    (async () => {
      try {

    if (admin) {
      const termInfo = await staticPageApi.readAll(
        contentPerPage,
        page,
        searchKey,

      );
      if(termInfo.data.meta.status){
        const pagination = termInfo?.data?.pagination;
        setTotalCount(pagination?.totalCount);
        setTotalPages(pagination?.totalPages);
         setData(termInfo.data.data);
      }else{
        toast.error("Error in fetch data");
       }

    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
  })();
  }, [admin, handleUpdate]);

  const onSearchChange = async (event) => {
    const res = await staticPageApi.readAll(
      contentPerPage,
      page,
      searchKey,

    );
    setData(res?.data?.data);
  };

  let clearAllQuery = async () => {
    setSearchKey("", async() => {
      const res = await staticPageApi.readAll(contentPerPage, page, "");
      if (res.data) {
        const data = res?.data?.data;
        const pagination = res?.data?.pagination;
  
        setTotalCount(pagination?.totalCount);
        setTotalPages(pagination?.totalPages);
        setData(data);
      }
    });   
   
  };
  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    const res = await staticPageApi.readAll(
      contentPerPage,
      page,
      searchKey,

    );
    setData(res?.data?.data);
  };
  const handleChangeRowsPerPage = async (event) => {
    const contentPerPage = parseInt(event.target.value, 10);
    setContentPerPage(contentPerPage);

    const res = await staticPageApi.readAll(
      contentPerPage,
      page,
      searchKey,

    );
    setData(res?.data?.data);
  };

  const deleteTerms = async (e, termId) => {
    e.target.disabled = true;
    try {
      const result = await staticPageApi.delete(termId);
        if(result.data.meta.status){
          toast.success("Deleted");
          setHandleUpdate(!handleUpdate)

         }else{
          toast.error("Delete failed");
         }
    } catch (err) {
        console.error(err);
    } finally {
        e.target.disabled = false;
    }
}
  return (
    <div>
      {/* <div className="p-5 rounded-md shadow-md bg-white mb-5">
                <SurgeDates />
            </div> */}
      <div className="p-5 rounded-md shadow-md bg-white">
        <h2 className="font-semibold text-xl pb-2 px-3 border-b">
          Terms and Conditions
        </h2>
        <div className="flex justify-between my-5">
          <div className=""></div>
          <Link to={"/term-and-condition/add"}>
            <Button variant="outlined" startIcon={<Add />}>
              Add New
            </Button>
          </Link>
        </div>
        {/* <Button variant="outlined" startIcon={<Add />}>
                    Filters
                    </Button> */}
        <div className="p-5 rounded-md shadow-md bg-white mb-5">
          <Filters
            searchKey={searchKey}
            setSearchKey={setSearchKey}
            onSearchChange={onSearchChange}
            clearAllQuery={clearAllQuery}
          />
        </div>
        <div className="mt-10 bg-white rounded-xl pb-10 overflow-hidden">
          {isLoading && (
            <div className="pt-10 flex justify-center">
              <CircularProgress />
            </div>
          )}

          {!isLoading &&
            (Array.isArray(data) && data?.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-center px-2 py-3 border-b">Title</th>
                    <th className="text-center px-2 py-3 border-b">Description</th>
                    <th className="text-center px-2 py-3 border-b">Link</th>

                    <th className="text-center px-2 py-3 border-b">Date</th>
                    <th className="text-center px-2 py-3 border-b">Status</th>
                    <th className="px-2 py-3 border-b"></th>
                    <th className="px-2 py-3 border-b"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="100%" style={{ textAlign: "center" }}>
                      <Pagination
                        totalCount={totalCount}
                        contentPerPage={contentPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        page={page}
                      />
                    </td>
                  </tr>
                  {data?.map((item) => (
                    <tr key={item?._id}>
                      <td className="text-center px-2 py-3 border-b">
                        {item?.title}
                      </td>
                      <td className="text-center px-2 py-3 border-b">
                        {item?.description}
                      </td>
                      <td className="text-center px-2 py-3 border-b">
                        {item?.url}
                      </td>
                      <td className="text-center px-2 py-3 border-b">
                        {new Date(item?.createdAt).toLocaleString()}
                      </td>
                      <td
                        className="text-center px-4 py-3 border-b"
                      >
                        {item?.status}
                      </td>
                      <td className="px-1 py-3 border-b text-center">
                        <Link to={`/term-and-condition/add?termId=${item._id}`}>
                          <IconButton size="small">
                            <Edit size="small" />
                          </IconButton>
                        </Link>
                      </td>
                      <td className="px-1 py-3 border-b text-center">
                        <IconButton
                          onClick={(e) => deleteTerms(e, item._id)}
                          size="small"
                        >
                          <Delete size="small" />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="pt-10 text-center font-medium text-red-500">
                No Item Found
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
