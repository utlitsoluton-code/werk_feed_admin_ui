import { useContext, useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Button, CircularProgress, TextField } from "@mui/material";
import { debounce } from "../shared/debounce";
import SearchIcon from "@mui/icons-material/Search";
import { Search } from "@mui/icons-material";

const Filters = ({
  searchKey,
  setSearchKey,
  createdAt,
  setCreatedAt,
  onSearchChange,
  // paymentStatus,
  // setPaymentStatus,
  // email,
  // setEmail,
  // phoneNo,
  // setPhoneNo,
  // paymentId,
  // setPaymentId,
  // payment,
  // setPayment,
  // amount,
  // setAmount,
  // customerName,
  // setCustomerName,
  // bookingId,
  // setBookingId,
  clearAllQuery,
}) => {
  const [loading, setLoading] = useState(false);
  let debounceTimer = null;

  const handleSearchKeyChange = (e) => {
    setSearchKey(e.target.value);

    // if (debounceTimer) {
    //   clearTimeout(debounceTimer);
    // }
  
    // debounceTimer = setTimeout(() => {
    //   setSearchKey(e.target.value);
    // }, 500);
   } // adjust the delay to your liking (in ms)  };
  //  const debouncedHandleSearchKeyChange = debounce(handleSearchKeyChange, 500);
  return (
    <>
      <h2 className="font-semibold text-xl pb-2 px-3 border-b">Filters</h2>
      <div className="flex flex-col justify-center gap-4 mt-5">
        <div className="flex gap-5">
        
          <TextField
        label="Search"
        value={searchKey}
        onChange={handleSearchKeyChange}
        variant="outlined"
        size="small"
        className="!w-72"
      />
          <Button variant="contained" 
          onClick={onSearchChange}
          startIcon={<Search />}>
            Search
          </Button>
          <Button
            variant="contained"
            onClick={clearAllQuery}
            disabled={loading}
            startIcon={
              loading && <CircularProgress size={18} color="inherit" />
            }
          >
            Clears
          </Button>
        </div>
      
        {/* <div className="col-4">
            <TextField
              label="Payment Status"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              variant="outlined"
              size="small"
              className="!w-72"
            />
          </div>
          <div className="col-4">
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              size="small"
              className="!w-72"
            />
          </div>
          <div className="col-4">
            <TextField
              label="Phone Number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              variant="outlined"
              size="small"
              className="!w-72"
            />
          </div>
          <div className="col-4">
            <TextField
              label="Payment ID"
              value={paymentId}
              onChange={(e) => setPaymentId(e.target.value)}
              variant="outlined"
              size="small"
              className="!w-72"
            />
          </div>
          <div className="col-4">
            <TextField
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              variant="outlined"
              size="small"
              className="!w-72"
            />
          </div> */}
      </div>
    </>
  );
};

export default Filters;
