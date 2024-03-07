import axios from "axios";
import { setAiChats } from "tmkredux/aiChatSlice";
import { setPosts } from "tmkredux/postSlice";
import { logout, updateUser } from "tmkredux/userSlice";

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: "json",
});

// handle request from client to server
export const apiRequest = async ({ url, token, data, method }) => {
  try {
    const result = await API(url, {
      method: method || "GET",
      data: data,
      headers: {
        "content-type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return result?.data;
  } catch (error) {
    const err = error.response.data;
    console.log(err);
    return { status: err.success, message: err.message };
  }
};

// Uploading media (image) to cloudinary and get the provide url
export const handleFileUpload = async (uploadFile) => {
  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", "tamkeen");
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/image/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.log(error);
  }
};

// get all posts (tamkeens)
export const fetchTamkeens = async (token, dispatch, uri, data) => {
  try {
    const res = await apiRequest({
      url: uri || "/posts",
      token: token,
      data: data || {},
      method: "GET",
    });
    if (res?.message === "Authentication failed") {
      dispatch(logout());
      return;
    }
    dispatch(setPosts(res?.data));
    return;
  } catch (error) {
    console.log(error);
  }
};

// support post (tamkeen)
export const supportTamkeen = async ({ uri, token }) => {
  try {
    const res = await apiRequest({ url: uri, token: token, method: "POST" });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// delete post (tamkeen)
export const deleteTamkeen = async ({ id, token }) => {
  try {
    const res = await apiRequest({
      url: "/posts/" + id,
      token: token,
      method: "DELETE",
    });
    return;
  } catch (error) {
    console.log(error);
  }
};

// get user informations
export const getUserInfo = async (id, token, dispatch) => {
  try {
    const uri = id === undefined ? "/users/get-user" : "/users/get-user/" + id;
    const res = await apiRequest({ url: uri, token: token, method: "GET" });
    if (res?.message === "Authentication== failed") {
      dispatch(logout());
      window.alert("User session expired. Please login again.");
      window.location.replace("/login");
    }
    return res?.user;
  } catch (error) {
    console.log(error);
  }
};

// get user informations
export const updateUserProfileImg = async (profileUrl, token, dispatch) => {
  try {
    const res = await apiRequest({
      url: "/users/update-user",
      token: token,
      method: "PUT",
      data: { profileUrl },
    });
    dispatch(updateUser({ user: res?.user }));
    return;
  } catch (error) {
    console.log(error);
  }
};

// send frends requests
export const sendFrendsRequest = async (id, token) => {
  try {
    const res = await apiRequest({
      url: "/users/friend-request",
      token: token,
      method: "POST",
      data: { requestTo: id },
    });
    return;
  } catch (error) {
    console.log(error);
  }
};

// view a user profile
export const viewUserProfile = async (id, token) => {
  try {
    const res = await apiRequest({
      url: "/users/profile-view",
      token: token,
      method: "POST",
      data: { id },
    });
    return;
  } catch (error) {
    console.log(error);
  }
};

// get all aiChats (ai assistan)
export const fetchAiChats = async (token, dispatch, uri, data) => {
  try {
    const res = await apiRequest({
      url: uri || "/aiChats",
      token: token,
      data: data || {},
      method: "GET",
    });
    if (res?.message === "Authentication failed") {
      dispatch(logout());
      return;
    }
    dispatch(setAiChats(res?.data));
    return;
  } catch (error) {
    console.log(error);
  }
};
