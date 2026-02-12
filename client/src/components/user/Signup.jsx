import axios from "../../utils/axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { asyncSignUp } from "../../store/actions/AuthActions";
import { useForm } from "react-hook-form";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const signupSuccessCallback = () => {
    reset();
    navigate("/workspaces");
  };

  const handleSubmitForm = (data) => {
    dispatch(asyncSignUp(data, signupSuccessCallback));
  };

  const handleGoogleSignup = () => {
    try {
      // window.location.href = "https://collabify-h1gc.onrender.com/api/auth/google";
      window.location.href = "http://localhost:3000/api/auth/google";
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <div className="h-screen flex relative flex-col items-center justify-center gap-10">
      <div className="w-[30%] bg-[#ffffff] shadow-md px-12 py-8 rounded-sm">
        <h1 className="text-2xl font-semibold mb-4">Signup</h1>
        <form
          className="flex flex-col items-end justify-center gap-2"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <input
            className="border-b-[0.1vh] w-full border-zinc-400 outline-none"
            type="text"
            placeholder="Name"
            {...register("name")}
            required
          />
          <input
            className="border-b-[0.1vh] w-full border-zinc-400 outline-none mt-3 "
            type="text"
            placeholder="Username"
            {...register("username")}
            required
          />
          <input
            className="border-b-[0.1vh] w-full border-zinc-400 outline-none mt-3 "
            type="text"
            placeholder="Bio"
            {...register("bio")}
            required
          />
          <input
            className="border-b-[0.1vh] w-full border-zinc-400 outline-none mt-3 "
            type="text"
            placeholder="Phone"
            {...register("phone")}
            required
          />
          <input
            className="border-b-[0.1vh] w-full border-zinc-400 outline-none mt-3 "
            type="email"
            placeholder="Email"
            {...register("email")}
            required
          />
          <input
            className="border-b-[0.1vh] w-full border-zinc-400 outline-none mt-3 "
            type="password"
            placeholder="Password"
            {...register("password")}
            required
          />
          <input
            className="border-2 border-gray-200 rounded-sm p-2 w-full cursor-pointer mt-3 text-xs"
            type="file"
            {...register("profilePicture")}
            accept="image/*"
          />
          <button
            className="px-5 py-1 mt-4 bg-blue-600 text-white rounded-sm"
            type="submit"
          >
            Signup
          </button>
        </form>
      </div>
      {/* <div className="" onClick={handleGoogleSignup}>
        <img
          className="h-12 cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg"
          src="/signup_with_google.png"
          alt=""
        />
      </div> */}
    </div>
  );
};

export default Signup;
