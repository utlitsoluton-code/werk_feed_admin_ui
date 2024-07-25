import { Add, Delete, Edit, Search } from "@mui/icons-material";
import { Button, CircularProgress, IconButton, TextField } from "@mui/material";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import blogApi from "../api/blog";
import moment from "moment/moment";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Blogs = () => {

    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [page, setPage] = useState(1);
    const [contentPerPage, setContentPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState();
    const [totalCount, setTotalCount] = useState();
    const [isLoading, setLoading] = useState(false);
    const [handleUpdate, setHandleUpdate] = useState(false);
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        (async () => {
          try {
            setLoading(true);
            const res = await blogApi.readAll(
            //   searchKey,
            //   createdAt,
            //   contentPerPage,
            //   page
            );
            if(res.data.meta.status){
                const data = res?.data?.data;
                const pagination = res?.data?.pagination;
      
                setTotalCount(pagination?.totalCount);
                setTotalPages(pagination?.totalPages);
                setBlogs(data);
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

    // delete handler
    const deleteHandler = async (e, blogId) => {

         e.target.disabled = true;
        try {
          const result = await blogApi.delete(blogId);
            if(result.data.meta.status){
                toast.success("Deleted");
                setHandleUpdate(!handleUpdate)
      
               }else{
                toast.error("Delete failed");
               }
        } catch (err) {
            console.error(err)
        } finally {
            e.target.disabled = false;
        }
    }

    return (
        <div>
            <h1 className='text-2xl font-semibold pl-3 pb-2 border-b-2'>Blogs</h1>
            <div className='flex justify-between mt-5'>
                <div className=''>

                </div>
                <Link to={'/blogs/add-blog'}>
                    <Button variant="outlined" startIcon={<Add />}>
                        Add Blog
                    </Button>
                </Link>
            </div>
            <div className="mt-10">
                {isLoading && <div className="flex justify-center py-5">
                    <CircularProgress />
                </div>}
                {!isLoading && (
                    blogs?.length > 0 ?
                        <div className="grid gap-5 xl:grid-cols-3">
                            {blogs?.map(({ _id, title, description, blogsImg, status, createdAt }) => <div key={_id} className="rounded overflow-hidden shadow-lg flex flex-col">
                                <Link>
                                    <div className="relative">
                                        <img
                                            className="w-full aspect-[16/9]"
                                            src={`${import.meta.env.VITE_API_URL}/${blogsImg}`}
                                            alt={title}
                                        />
                                        <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                                        <div className="absolute bottom-0 left-0 bg-indigo-600 px-4 py-2 text-white text-sm hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                                            {status}
                                        </div>
                                        <div className="text-sm absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                                            <span className="font-bold">{moment(createdAt).format('DD')}</span>
                                            <small>{moment(createdAt).format('MMMM')}</small>
                                        </div>
                                    </div>
                                </Link>
                                <div className="px-6 py-4 flex-1">
                                    <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{title}</a>
                                    <p className="text-gray-500 text-sm">
                                        {description.length > 100 ? description.slice(0, 100) + '...' : description}
                                    </p>
                                </div>
                                <div className="px-6 pb-4 flex justify-between">
                                    <Link to={`/blogs/add-blog?blogId=${_id}`}>
                                        <Button variant="outlined" endIcon={<Edit />}>
                                            Update
                                        </Button>
                                    </Link>
                                    <Button onClick={(e) => deleteHandler(e, _id)} variant="contained" startIcon={<Delete />}>
                                        Delete
                                    </Button>
                                </div>
                                
                            </div>)}
                        </div>
                        :
                        <p className="text-center text-red-500 py-5 font-medium">No Blogs Found</p>
                )}
            </div>
        </div >
    );
}

export default Blogs;
