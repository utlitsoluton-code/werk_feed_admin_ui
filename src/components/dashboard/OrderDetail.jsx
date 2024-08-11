import React, { useState, useEffect } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import orderApi from "../../api/subscriptions";
import { useSearchParams } from "react-router-dom";

const Orderdeatil = () => {
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(false);
  const [search] = useSearchParams();
  const orderId = search.get("orderId");

  useEffect(() => {
    if (orderId) {
      (async () => {
        try {
          const res = await orderApi.readById(orderId);
          if (res.data) {
            let order = res.data.data;
            setOrder(order);
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [orderId]);
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 pl-3 pb-2 border-b-2">
        {"Order Details"}
      </h1>
      <div className="bg-white rounded-md px-5 py-10 mt-10">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-6">
            <TextField
              fullWidth
              size="small"
              label="Order Title"
              value={order?.plan?.title}
              InputLabelProps={{
                shrink: order?.plan?.title !== '',
              }}
            />
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              size="small"
              label="Order Id"
              value={order?.orderId}
              InputLabelProps={{
                shrink: order?.plan?.orderId !== '',
              }}
            />
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              size="small"
              label="Price"
              value={order?.plan?.price}  
              InputLabelProps={{
                shrink: order?.plan?.price !== '',
              }}
            />
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Order Date"
              value={new Date(order?.createdAt).toLocaleString()}
              InputLabelProps={{
                shrink: order?.createdAt !== '',
              }}
            />
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              size="small"
              label="User Name"
              value={order?.user?.name ? order?.user?.name : order?.user?.userId}
              InputLabelProps={{
                shrink: order?.user?.name !== '',
              }}
            />
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              size="small"
              label="Email"
              value={order?.user?.email}
              InputLabelProps={{
                shrink: order?.user?.email !== '',
              }}
            />
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              size="small"
              label="Status"
              value={order?.status}
              InputLabelProps={{
                shrink: order?.status !== '',
              }}
            />
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Valid Upto"
              value={new Date(order?.validUpto).toLocaleString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orderdeatil;
