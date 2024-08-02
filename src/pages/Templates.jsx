import { useState, useEffect, useContext } from "react";
import Filters from "../components/common/Filters";
import { Delete, Edit, Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Button, CircularProgress, IconButton } from "@mui/material";
import templateApi from "../api/template";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'


const Templates = () => {
  const [searchKey, setSearchKey] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [handleUpdate, setHandleUpdate] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await templateApi.readAll(searchKey);
        if (res.data.meta.status) {

          setData(res.data.data);
        }else if (res.data.meta.msg === "Session Expired.") {
          logout(); // Call the logout function
          const { logout } = useContext(AdminContext);
          toast.error("Session expired. Please login again.");
        } else {
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
    setSearchKey("", async () => {
      const res = await templateApi.readAll("");
      if (res.data) {
        const data = res?.data?.data;
        setData(data);
        setHandleUpdate(!handleUpdate);
      }
    });
  };

  const onSearchChange = async (event) => {
    const res = await templateApi.readAll(searchKey);
    setData(res?.data?.data);
  };

  

  // delete trip
  const deletetemplate = async (e, templateId) => {
    e.target.disabled = true;
    try {
      const result = await templateApi.delete(templateId);

      if (result.data.meta.status) {
        toast.success("Deleted");
        setHandleUpdate(!handleUpdate);
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      e.target.disabled = false;
    }
  };

  


  async function handleStatusChange(_id, data) {
    if (!_id || !data) {
      return false
    }
    
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to change status ${data == 'ACTIVE' ? 'Deactive' : 'Active'}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await templateApi.updateStatus({_id, status:data === 'ACTIVE' ? 'DEACTIVE' : 'ACTIVE'})
          .then((d) => {
            Swal.fire({
              title: 'Changed!',
              text: 'Status has been updated.',
              icon: 'success',
              confirmButtonColor: '#4CAF50' 
            })  
            setHandleUpdate(!handleUpdate)
          })
          .catch((err) => console.log('Err -> ', err))
      }
    })
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold pl-3 pb-2 border-b-2">Templates</h1>
      <div className="flex justify-between my-5">
        <div className=""></div>
        <Link to={"/templates/add-template"}>
          <Button variant="outlined" startIcon={<Add />}>
            Add Template
          </Button>
        </Link>
      </div>
 
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
                  <th className="text-center px-2 py-3 border-b">Template Id</th>
                  <th className="text-center px-2 py-3 border-b">Title</th>
                  <th className="text-center px-2 py-3 border-b">Education Level</th>
                  <th className="text-center px-2 py-3 border-b">Color</th>
                  <th className="text-center px-2 py-3 border-b">Templates</th>
                  <th className="text-center px-2 py-3 border-b">Category Name</th>

                  <th className="text-center px-2 py-3 border-b">Date</th>
                  <th className="text-center px-2 py-3 border-b">Status</th>
                  <th className="px-2 py-3 border-b">Update</th>
                  <th className="px-2 py-3 border-b">Delete</th>
                  <th className="px-2 py-3 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
            
                {data?.map((item) => (
                  <tr key={item?._id}>
                    <td className="text-center px-2 py-3 border-b">
                      {item?.templateId}
                    </td>
                    <td className="text-center px-2 py-3 border-b">
                      {item?.title}
                    </td>
                    <td className="text-center px-2 py-3 border-b">
                      {item?.educationLevel}
                    </td>
                    <td className="text-center px-2 py-3 border-b">
                      {item?.color}
                    </td>
                    <td className="text-center px-2 py-3 border-b">
                      {item?.template}
                    </td>
                    <td className="text-center px-2 py-3 border-b">
                      {item?.category?.categoryName}
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
                      <Link to={`/templates/add-template?templateId=${item._id}`}>
                        <IconButton size="small">
                          <Edit size="small" />
                        </IconButton>
                      </Link>
                    </td>
                    <td className="px-1 py-3 border-b text-center">
                      <IconButton
                        onClick={(e) => deletetemplate(e, item._id)}
                        size="small"
                      >
                        <Delete size="small" />
                      </IconButton>
                    </td>
                    <td className="text-center border-b">
                      <p
                        onClick={() =>
                          handleStatusChange(item._id, item?.status)
                        }
                        style={{
                          backgroundColor:
                            item?.status === "ACTIVE" ? "green" : "red",
                          color: "white",
                        }}
                        className="px-2 py-2  group rounded-full text-sm bg-[#000] bg-opacity-30 text-black cursor-pointer overflow-hidden"
                      >
                        {item?.status}
                      </p>
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

export default Templates;
