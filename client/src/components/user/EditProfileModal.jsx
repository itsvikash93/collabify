import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncUpdateUserProfile } from "../../store/actions/UserActions";
import { toast } from "react-toastify";

const EditProfileModal = ({ showModal, setShowModal, profile }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bio: "",
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

  if (!showModal) return null;

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setShowModal(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(asyncUpdateUserProfile(formData));
      toast.success("Profile updated successfully");
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-[#8c8b8b] bg-opacity-60 backdrop-blur-sm modal-overlay z-50 text-left"
      onClick={handleOutsideClick}
    >
      <div className="bg-[#eef7f6] px-6 py-6 rounded-xl shadow-lg w-full max-w-md relative flex flex-col">
        <h2 className="text-xl font-bold text-[#191D23] mb-4 border-b border-gray-300 pb-2">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#191D23] mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7dcfb4]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#191D23] mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7dcfb4]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#191D23] mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7dcfb4] resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-[#7dcfb4] text-white py-2 rounded-md font-semibold hover:bg-[#6cba9f] transition-colors flex justify-center items-center"
          >
            {loading ? <i className="ri-loader-line animate-spin text-xl"></i> : "Save Changes"}
          </button>
        </form>

        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-[#191D23] hover:text-red-500 transition-colors"
          aria-label="Close modal"
        >
          <span className="text-3xl leading-none">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;
