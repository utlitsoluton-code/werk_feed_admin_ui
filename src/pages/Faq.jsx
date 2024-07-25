import { useState, useEffect } from "react";
import Filters from "../components/common/Filters";
import { Delete, Edit, Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  Button,
  CircularProgress,
  IconButton,
 
} from "@mui/material";
import Pagination from "../components/common/Pagination";
import faqsApi from './../api/faqs';
import { toast } from "react-toastify";

const Faqs = () => {
  const [searchKey, setSearchKey] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [page, setPage] = useState(1);
  const [contentPerPage, setContentPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState();
  const [totalCount, setTotalCount] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [handleUpdate, setHandleUpdate] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await faqsApi.readAll(
          contentPerPage,
          page,
          searchKey,

        );
        if(res.data.meta.status){
          const pagination = res?.data?.pagination;
          setTotalCount(pagination?.totalCount);
          setTotalPages(pagination?.totalPages);
           setData(res.data.data);
        }else{
          toast.error("Error in fetch data");
         }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [handleUpdate]);
  let clearAllQuery = async () => {
    setSearchKey("", async() => {

       const res = await faqsApi.readAll(contentPerPage, page,"");
    if (res.data) {
      const data = res?.data?.data;
      const pagination = res?.data?.pagination;
      setTotalCount(pagination?.totalCount);
      setTotalPages(pagination?.totalPages);
      setData(data);
    }
  })
  };

  const onSearchChange = async (event) => {
    const res = await faqsApi.readAll(
      contentPerPage,
      page,
      searchKey,

    );
    setData(res?.data?.data);
  };

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    const res = await faqsApi.readAll(
      contentPerPage,
      page,
      searchKey,
    );
    setData(res?.data?.data);
  };

   // delete trip
   const deletefaq = async (e, faqId) => {
    e.target.disabled = true;
    try {
      const result = await faqsApi.delete(faqId);
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

  const handleChangeRowsPerPage = async (event) => {
    const contentPerPage = parseInt(event.target.value, 10);
    setContentPerPage(contentPerPage);

    const res = await faqsApi.readAll(
      contentPerPage,
      page,
      searchKey,
    );
    setData(res?.data?.data);
  };
  return (
    <div>
         <h1 className='text-2xl font-semibold pl-3 pb-2 border-b-2'>Faqs</h1>
            <div className='flex justify-between my-5'>
                <div className=''>

                </div>
                <Link to={'/faqs/add-faq'}>
                    <Button variant="outlined" startIcon={<Add />}>
                        Add Faq
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
          createdAt={createdAt}
          setCreatedAt={setCreatedAt}
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
                  <th className="text-center px-2 py-3 border-b">Question</th>
                  <th className="text-center px-2 py-3 border-b">Answer</th>
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
                      {item?.question}
                    </td>
                    <td className="text-center px-2 py-3 border-b">
                      {item?.answer}
                    </td>
                  
                    <td className="text-center px-2 py-3 border-b">
                      {new Date(item?.createdAt).toLocaleString()}
                    </td>
                    <td
                      className="text-center px-4 py-3 border-b"
                      //  style={{
                      //           backgroundColor: item?.paymentStatus === 'paid' ? 'green' :(item?.paymentStatus === 'pending')? 'yellow': "red",
                      //           color: 'dark',
                      //           borderRadius: '15px', // add this property
                      //           padding: '2px 2px',

                      //         }}
                    >
                      {item?.status}
                    </td>
                    <td  className="px-1 py-3 border-b text-center">
                                    <Link to={`/faqs/add-faq?faqId=${item._id}`}>
                                     <IconButton size='small'>
                                        <Edit size='small' />
                                    </IconButton> 
                                    </Link>
                                </td>
                                    <td className="px-1 py-3 border-b text-center">
                                        <IconButton onClick={(e) => deletefaq(e, item._id)} size="small">
                                            <Delete size='small' />
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
  );
};

export default Faqs;
