import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Pagination from "../common/Pagination";
import orderApi from '../../api/subscriptions';
import { toast } from "react-toastify";
import { Button, CircularProgress, IconButton } from "@mui/material";
import PreviewIcon from '@mui/icons-material/Preview';// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  )
];

export default function Subscriptions() {
 const [searchKey, setSearchKey] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [page, setPage] = useState(1);
  const [contentPerPage, setContentPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState();
  const [handleUpdate, setHandleUpdate] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
          const res = await orderApi.readAll(contentPerPage, page, searchKey);

        if (res.data.meta.status) {
          const pagination = res?.data?.pagination;
          setTotalCount(pagination?.totalCount);
          setTotalPages(pagination?.totalPages);
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
console.log(data,"dadata")
  return (
    <React.Fragment>
       <div className="mt-10 bg-white rounded-xl pb-10 overflow-hidden">
        {isLoading && (
          <div className="pt-10 flex justify-center">
            <CircularProgress />
          </div>
        )}

        {!isLoading &&
          (Array.isArray(data) && data?.length > 0 ? (
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="text-center px-2 py-3 border-b">Date</th>
            <th className="text-center px-2 py-3 border-b">Order Id</th>
            <th className="text-center px-2 py-3 border-b">Name</th>
            <th className="text-center px-2 py-3 border-b">Plan</th>
            <th className="text-center px-2 py-3 border-b">Payment Status</th>
            <th className="text-center px-2 py-3 border-b" align="right">Subscription Amount</th>
            <th className="text-center px-2 py-3 border-b">View</th>

          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row._id}>
              <td className="text-center px-2 py-3 border-b">{new Date(row.createdAt).toLocaleString()}
              </td>
              <td className="text-center px-2 py-3 border-b">{row.orderId}</td>

              <td className="text-center px-2 py-3 border-b">{row.user.userId}</td>
              <td className="text-center px-2 py-3 border-b">{row?.plan?.title}</td>
              <td className="text-center px-2 py-3 border-b">{row?.status}</td>
              <td className="text-center px-2 py-3 border-b" align="right">{row.price}</td>
              <td className="px-1 py-3 border-b text-center">
                      <Link to={`/plans/add-plan?planId=${row._id}`}>
                        {/* <IconButton size="small"> */}
                          <p>Detail</p>
                        {/* </IconButton> */}
                      </Link>
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
    </React.Fragment>
  );
}
