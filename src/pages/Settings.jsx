import { useContext, useEffect, useState } from "react";
import settingsApi from "../api/settings";
import contactInfoApi from "../api/contactInfo";
import { AdminContext } from "../contexts";
import moment from "moment";
import { Link } from "react-router-dom";
import { Delete, Edit, Add } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Modal,
  TextField,
  Box
} from "@mui/material";

const Settings = () => {
  const { admin } = useContext(AdminContext);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [editProfile, setEditProfile] = useState(null);
  const [infoData, setInfoData] = useState();
  const [infoModel, setEditInfoModel] = useState(null);


  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await settingsApi.profile();
        if (res?.data) {
          const data = res?.data?.data;
          setData(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
      try {
        setLoading(true);
        const res = await contactInfoApi.readDetail();
        console.log(res?.data?.data, "resxxx");
        if (res?.data) {
          const data = res?.data?.data;
          setInfoData(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="">
      <h1 className="text-2xl font-semibold pl-3 pb-2 border-b-2">
        Information Detail
      </h1>
      <div className="flex mt-10 rounded-md px-5 py-8 bg-white gap-5">
        <div className="w-1/2 mt-10 rounded-xl shadow-xl bg-white px-5 py-5">
          {" "}
          <div className="relative">
            <img
              className="w-full aspect-[16/9]"
              src={data?.profilePic ? data?.profilePic : "/dummy_profile.png"}
              alt={"Profile pic"}
            />
            <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
            <div className="absolute bottom-0 left-0 bg-indigo-600 px-4 py-2 text-white text-sm hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
              {data.status}
            </div>
            <div className="text-sm absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
              <span className="font-bold">
                {moment(data?.createdAt).format("DD")}
              </span>
              <small>{moment(data?.createdAt).format("MMMM")}</small>
            </div>
          </div>
          <div className="px-6 py-4 flex-1">
            <p className="text-gray-500 text-sm">
              Posted by {data?.name} ({data?.email})
            </p>
          </div>
          <div className="flex">
            {/* <div className="px-6 pb-4 flex justify-between">
              <Button onClick={() => setEditProfile(data)} variant="outlined" endIcon={<Edit />}>
                Update
              </Button>
          </div> */}
            <div className="px-6 pb-4 flex justify-between">
              <Button
                onClick={() => setEditProfile(data)}
                variant="outlined"
                endIcon={<Edit />}
              >
                Reset Password
              </Button>
            </div>
          </div>
        </div>
      {infoData &&  <div className="w-1/2 mt-10 rounded-xl shadow-xl bg-white px-5 py-5">
          <ul>
            <li
              key="contactInformation"
              className="bg-white text-sm shadow-lg px-3 py-2 rounded-lg border flex justify-between gap-3 items-center"
            >
              <span>Contact Information:</span>
              <span>{infoData?.contactInformation}</span>
            </li>
            <li
              key="address"
              className="bg-white text-sm shadow-lg px-3 py-2 rounded-lg border flex justify-between gap-3 items-center"
            >
              <span>Address:</span>
              <span>{infoData?.address}</span>
            </li>
            <li
              key="mobile"
              className="bg-white text-sm shadow-lg px-3 py-2 rounded-lg border flex justify-between gap-3 items-center"
            >
              <span>Mobile:</span>
              <span>
                +{infoData?.countryCode} {infoData?.mobile}
              </span>
            </li>
            <li
              key="email"
              className="bg-white text-sm shadow-lg px-3 py-2 rounded-lg border flex justify-between gap-3 items-center"
            >
              <span>Email:</span>
              <span>{infoData?.email}</span>
            </li>
            <li
              key="facebookLink"
              className="bg-white text-sm shadow-lg px-3 py-2 rounded-lg border flex justify-between gap-3 items-center"
            >
              <span>Facebook:</span>
              <span>
                <a
                  href={infoData?.facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {infoData?.facebookLink}
                </a>
              </span>
            </li>
            <li
              key="twitterLink"
              className="bg-white text-sm shadow-lg px-3 py-2 rounded-lg border flex justify-between gap-3 items-center"
            >
              <span>Twitter:</span>
              <span>
                <a
                  href={infoData?.twitterLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {infoData?.twitterLink}
                </a>
              </span>
            </li>
            <li
              key="instagramLink"
              className="bg-white text-sm shadow-lg px-3 py-2 rounded-lg border flex justify-between gap-3 items-center"
            >
              <span>Instagram:</span>
              <span>
                <a
                  href={infoData?.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {infoData?.instagramLink}
                </a>
              </span>
            </li>
            <li
              key="linkedInLink"
              className="bg-white text-sm shadow-lg px-3 py-2 rounded-lg border flex justify-between gap-3 items-center"
            >
              <span>LinkedIn:</span>
              <span>
                <a
                  href={infoData?.linkedInLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {infoData?.linkedInLink}
                </a>
              </span>
            </li>
          </ul> 
          <div className="px-6 pb-4 mt-4 flex justify-between">
              <Button onClick={() => setEditInfoModel(true)} variant="outlined" endIcon={<Edit />}>
                Update
              </Button>
          </div>
          <div>
        </div>
        </div>}
      </div>
      {/* update modal */}
      <Modal
        open={Boolean(editProfile)}
        onClose={() => setEditProfile(null)}
        className="grid place-items-center"
      >
        <div className="md:w-[500px] w-11/12 rounded-md bg-white shadow-xl outline-none">
          <UpdateProfile
            editProfile={editProfile}
            close={() => setEditProfile(null)}
          />
        </div>
      </Modal>
      {/* update info */}
      <Modal
        open={Boolean(infoModel)}
        onClose={() => setEditInfoModel(null)}
        className="grid place-items-center"
      >
        <div className="md:w-[500px] w-11/12 rounded-md bg-white shadow-xl outline-none">
          <UpdateInformation
            infoModel={infoModel}
            infoData={infoData}
            setInfoData={setInfoData}
            close={() => setEditInfoModel(null)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Settings;

export const UpdateInformation = ({ infoModel, close, infoData, setInfoData}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInfoDetail = async (e) => {

    e.preventDefault();
    const { email, address, mobile, facebookLink, twitterLink, instagramLink, linkedInLink } = infoData;



    // setLoading(true);
    try {
      const result = await contactInfoApi.update(email, address, mobile, facebookLink, twitterLink, instagramLink, linkedInLink);
      console.log(result, "result");
      if (result.data.meta.status) {
        infoModel && close();
      } else {
        setError(result.data.meta.msg);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (category) {
    //   setCategoryName(category.name);
    // }
  }, [infoModel]);

  return (
    <div className="p-4 rounded-lg shadow-lg border">
    
    <form onSubmit={handleInfoDetail} className='px-4 py-6 bg-white shadow-xl rounded-lg min-w-[450px]'>
                <h2 className='text-2xl text-center mb-5 font-medium'>Update Information</h2>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth size='small'
                        type='email'
                        name='email'
                        value={infoData.email}
                        onChange={(e) => setInfoData({ ...infoData, email: e.target.value })}
                    />
                    <TextField
                        label="Mobile"
                        variant="outlined"
                        type="mobile"
                        fullWidth size='small'
                        name='mobile'
                        value={infoData.mobile}
                        onChange={(e) => setInfoData({ ...infoData, mobile: e.target.value })}
                    />
                    <TextField
                        label="Facebook Link"
                        variant="outlined"
                        type="link"
                        fullWidth size='small'
                        name='facebookLink'
                        value={infoData.facebookLink}
                        onChange={(e) => setInfoData({ ...infoData, facebookLink: e.target.value })}
                    />
                      <TextField
                        label="Twitter Link"
                        variant="outlined"
                        type="link"
                        fullWidth size='small'
                        name='twitterLink'
                        value={infoData.twitterLink}
                        onChange={(e) => setInfoData({ ...infoData, twitterLink: e.target.value })}
                    />
                       <TextField
                        label="Instagram Link"
                        variant="outlined"
                        type="link"
                        fullWidth size='small'
                        name='instagramLink'
                        value={infoData.instagramLink}
                        onChange={(e) => setInfoData({ ...infoData, instagramLink: e.target.value })}
                    />
                     <TextField
                        label="LinkedIn Link"
                        variant="outlined"
                        type="link"
                        fullWidth size='small'
                        name='linkedInLink'
                        value={infoData.linkedInLink}
                        onChange={(e) => setInfoData({ ...infoData, linkedInLink: e.target.value })}
                        
                    />
                    {error && <p className='text-center text-red-500 py-1 text-sm font-medium'>{error}</p>}
                    <Button
                        variant="contained"
                        color="primary" type="submit"
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={16} />}
                    >Update</Button>
                </Box>
            </form>
    
    </div>
  );
};

export const UpdateProfile = ({ editProfile, close }) => {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmPass, setConfirmPassword] = useState("");
  const [newPass, setNewPassword] = useState("");
  const [oldPass, setOldPassword] = useState("");

  const updateProfileHandler = async () => {
    // setLoading(true);
    // try {
    //   await categoryApi.create({ name: categoryName });
    //   setCategoryName("");
    //   typeof refetch === "function" && refetch();
    //   typeof close === "function" && close();
    // } catch (err) {
    //   console.error(err);
    // } finally {
    //   setLoading(false);
    // }
  };

  const resetPasswordHandler = async (e) => {
    if (newPass !== confirmPass) {
      setError("New password and confirm password do not match.");
      return;
    }
    if (!newPass) {
      setError("New password is required.");
      return;
    }
    if (!oldPass) {
      setError("Old password is required.");
      return;
    }

    setLoading(true);
    try {
      const result = await settingsApi.resetPassword(oldPass, newPass);
      console.log(result, "result");
      if (result.data.meta.status) {
        editProfile && close();
      } else {
        setError(result.data.meta.msg);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (category) {
    //   setCategoryName(category.name);
    // }
  }, [editProfile]);

  return (
    <div className="p-4 rounded-lg shadow-lg border">
      {editProfile ? (
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-xl font-medium pb-2 border-b">
            {editProfile ? "Change Password" : "Update Profile"}
          </h1>
          <TextField
            label="Old Password"
            variant="outlined"
            fullWidth
            size="small"
            type="text"
            required
            value={oldPass}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            size="small"
            type="text"
            required
            value={newPass}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm New Password"
            variant="outlined"
            fullWidth
            size="small"
            type="text"
            required
            value={confirmPass}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && (
            <p className="text-center text-red-500 text-sm font-medium">
              {error}
            </p>
          )}
          <Button
            onClick={editProfile ? resetPasswordHandler : updateProfileHandler}
            variant="contained"
            className="w-full"
            disabled={loading}
            startIcon={
              loading && (
                <CircularProgress
                  size={16}
                  sx={{ "& circle": { stroke: "white", strokeWidth: 8 } }}
                />
              )
            }
          >
            {editProfile ? "Set Password" : "Update Profile"}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-xl font-medium pb-2 border-b">
            {editProfile ? "Change Password" : "Update Profile"}
          </h1>
          <TextField
            label="Old Password"
            variant="outlined"
            fullWidth
            size="small"
            type="text"
            required
            value={oldPass}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            size="small"
            type="text"
            required
            value={newPass}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm New Password"
            variant="outlined"
            fullWidth
            size="small"
            type="text"
            required
            value={confirmPass}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && (
            <p className="text-center text-red-500 text-sm font-medium">
              {error}
            </p>
          )}
          <Button
            onClick={editProfile ? resetPasswordHandler : updateProfileHandler}
            variant="contained"
            className="w-full"
            disabled={loading}
            startIcon={
              loading && (
                <CircularProgress
                  size={16}
                  sx={{ "& circle": { stroke: "white", strokeWidth: 8 } }}
                />
              )
            }
          >
            {editProfile ? "Set Password" : "Update Profile"}
          </Button>
        </div>
      )}
    </div>
  );
};
