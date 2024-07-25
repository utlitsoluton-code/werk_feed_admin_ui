import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import categoryApi from "../../api/category";
import { Button, CircularProgress, TextField } from "@mui/material";
import RichEditor from "../common/RichEditor/RichEditor";
import { useSearchParams } from "react-router-dom";
import blogApi from "../../api/blog";
import { ChevronLeft} from "@mui/icons-material";
import ImageCropper from "../shared/ImageCropper";
import { toast } from 'react-toastify';

const AddBlog = () => {

    // states
    const [blog, setBlog] = useState({ title: '', description: '', blogsImg: null});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editorInitContent, setEditInitContent] = useState('');

    const [search] = useSearchParams();
    const blogId = search.get('blogId');

    // add blog handler 
    const addBlogHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        setError('');

        if (!blog.blogsImg) {
            setError('Blog image is required');
            return;
        }

        if (!blog.description) {
            setError('Blog content is required');
            return;
        }

        if (!blog.title) {
            setError('Blog title is required');
            return;
        }

        for (let key in blog) {
            if (Array.isArray(blog[key])) {
                for (let item of blog[key]) {
                    formData.append(key, item);
                }
            } else {
                formData.append(key, blog[key]);
            }
        }

        try {

            await blogApi.create(formData);
            setBlog({  title: '', description: '', blogsImg: null});

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // update blog handler
    const updateBlogHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        setError('');

        if (!blog.title) {
            setError('Blog title is required');
            return;
        }

        if (!blog.description) {
            setError('Blog content is required');
            return;
        }

        for (let key in blog) {
            if (key !== 'blogsImg') {
                if (Array.isArray(blog[key])) {
                    for (let item of blog[key]) {
                        formData.append(key, item);
                    }
                } else {
                    formData.append(key, blog[key]);
                }
            }
        }

        if (typeof blog.blogsImg === 'object') {
            formData.append('blogsImg', blog.blogsImg);
        }
        setLoading(true);
        try {
            await blogApi.update(blogId, formData);
            toast.success('Updated');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }

    }

    // fetch blog by blog id
    useEffect(() => {
        if (blogId) {
            (async () => {
                try {
                    const res = await blogApi.readById(blogId);
                    if (res.data) {
                        let blog = res.data.data;
                        blog?.createdAt && delete blog.createdAt;
                        blog?.updatedAt && delete blog.updatedAt;
                        setBlog(blog);
                        setEditInitContent(blog?.description);
                    }
                } catch (err) {
                    console.error(err);
                }
            })();
        }
    }, [blogId]);

    return (
        <div className=''>
            <h1 className='text-2xl font-semibold mb-4 pl-3 pb-2 border-b-2'>{blog?._id ? 'Update Blog' : 'Add Blog'}</h1>

            <Button onClick={() => window.history.back()} variant="contained" className="!ml-5" startIcon={<ChevronLeft />}>
                Go Back
            </Button>

            <form onSubmit={blog._id ? updateBlogHandler : addBlogHandler} className='bg-white rounded-md px-5 py-10 mt-10'>
                <div className="grid grid-cols-2 gap-6">
                    <div className='col-span-2'>
                        <TextField
                            fullWidth
                            size='small'
                            label='Title'
                            variant="outlined"
                            value={blog.title}
                            required
                            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                        />
                    </div>
                    <div className='col-span-2'>
                        <RichEditor
                            initialContent={editorInitContent}
                            content={blog.description}
                            changeHandler={(html, text) => {
                                if (text.trim()) {
                                    setBlog({ ...blog, description: html, description: text.trim() });
                                }
                            }}
                        />
                    </div>
                   
                    {/* <div className='flex items-center gap-x-1'>
                        <span className='text-base'>Status</span>
                        <Checkbox checked={Boolean(blog.status)} onChange={(e) => setBlog({ ...blog, status: e.target.checked })} />
                    </div> */}
                    <div>
                        <ImageCropper resizableImage={(e) => setBlog({ ...blog, blogsImg: e })}>
                            {!blog.blogsImg && <div className="w-full px-2 text-center py-5 border-4 cursor-pointer border-dashed">
                                <p className="text-sm">Drag 'n' drop thumbnail here, or click to select thumbnail</p>
                                <p className="text-sm opacity-75">Accept .png, .jepg, .webp</p>
                            </div>}
                            {blog.blogsImg && typeof blog.blogsImg === 'object' && <img src={blog?.blogsImg} className='w-full h-auto rounded-md aspect-video' alt='' />}
                            {blog.blogsImg && typeof blog.blogsImg === 'string' && <img src={blog.blogsImg} className='w-full h-auto rounded-md aspect-video' alt='' />}
                        </ImageCropper>
                    </div>
                </div>
                {error && <p className="mt-4 text-center text-red-500 text-sm">{error}</p>}
                <div className='mt-5'>
                    <Button type='submit' disabled={loading} variant="contained" className="!w-full !py-3" startIcon={loading && <CircularProgress size={18} sx={{ '& circle': { stroke: '#fff', strokeWidth: 8 } }} />} >{blog?._id ? 'Update Blog' : 'Add Blog'}</Button>
                </div>
            </form>


        </div>
    );
}

export default AddBlog;
