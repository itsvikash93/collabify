import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import Navbar from "../home/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { asyncGetUserProfile } from "../../store/actions/UserActions";

const Profile = () => {
  const { profile, loading, error } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  useEffect(() => {
    dispatch(asyncGetUserProfile());
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(/\s+/);
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  return (
    profile && (
      <div className="w-full h-screen">
        <Navbar />
        <div className="w-full h-[92vh] flex justify-center items-center">
          <div className="w-[50%] h-[80%] p-4">
            <h1 className="text-2xl font-semibold mb-4">Your Info</h1>
            <div className="shadow-md p-4 rounded-md bg-[#ffffff]">
              {profile.profilePicture !== "default-profile-pic.png" ? (
                <img
                  src={profile.profilePicture}
                  alt="avatar"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#7dcfb4] flex justify-center items-center text-white text-3xl font-semibold">
                  {getInitials(profile.name)}
                </div>
              )}
              <hr className="my-3 border-gray-300" />
              <div className="flex justify-between items-center gap-2">
                <h5 className="">Full Name</h5>
                <h4 className="">{profile.name}</h4>
                <button
                  onClick={() => setShowEditModal(true)}
                  className="underline "
                >
                  Edit Profile
                </button>
              </div>
            </div>
            <div className="shadow-md p-4 rounded-md mt-4 bg-[#ffffff]">
              <h5 className="font-semibold">Profile info</h5>
              <hr className="border-gray-300 my-3" />
              <div className="flex justify-between items-center gap-2">
                <h5 className="">Email</h5>
                <h4 className="">{profile.email}</h4>
              </div>
              {profile.phone && (
                <>
                  <hr className="border-gray-300 my-3" />
                  <div className="flex justify-between items-center gap-2">
                    <h5 className="">Phone Number</h5>
                    <h4 className="">{profile.phone}</h4>
                  </div>
                </>
              )}
              {profile.bio && (
                <>
                  <hr className="border-gray-300 my-3" />
                  <div className="flex justify-between items-start gap-2">
                    <h5 className="">Bio</h5>
                    <h4 className="text-right max-w-[70%]">{profile.bio}</h4>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <EditProfileModal
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          profile={profile}
        />
      </div>
    )
  );
};

export default Profile;
