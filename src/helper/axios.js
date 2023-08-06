import axios from "axios";

const rootAPI = process.env.REACT_APP_ROOTAPI;
const admiAPI = rootAPI + "/admin";
const catAPI = rootAPI + "/category";
const payAPI = rootAPI + "/paymentoptions";

const getAccessJWT = () => {
  return sessionStorage.getItem("accessJWT");
};
const getRefreshJWT = () => {
  return localStorage.getItem("refreshJWT");
};

const axiosProcesor = async ({ method, url, obj, isPrivate, refreshToken }) => {
  const token = refreshToken ? getRefreshJWT() : getAccessJWT();

  const headers = {
    Authorization: isPrivate ? token : null,
  };
  try {
    const { data } = await axios({
      method,
      url,
      data: obj,
      headers,
    });

    return data;
  } catch (error) {
    if (
      error?.response?.status === 403 &&
      error?.data?.message === "jwt expired"
    ) {
      const { status, accessJWT } = await getNewAccessJWT();
      if (status === "success" && accessJWT) {
        sessionStorage.setItem("accessJWT", accessJWT);
      }
      return axiosProcesor({ method, url, obj, isPrivate, refreshToken });
    }
    return {
      status: "error",
      message: error.response ? error?.response?.data?.message : error.message,
    };
  }
};

// ========= admin api
export const getAdminInfo = () => {
  const obj = {
    method: "get",
    url: admiAPI,
    isPrivate: true,
  };
  return axiosProcesor(obj);
};
export const postNewAdmin = (data) => {
  const obj = {
    method: "post",
    url: admiAPI,
    obj: data,
  };
  return axiosProcesor(obj);
};
export const signInAdmin = (data) => {
  const obj = {
    method: "post",
    url: admiAPI + "/sign-in",
    obj: data,
  };
  return axiosProcesor(obj);
};
export const postNewAdminVerificationInfo = (data) => {
  const obj = {
    method: "post",
    url: admiAPI + "/admin-verification",
    obj: data,
  };
  return axiosProcesor(obj);
};

// ========= category api
export const postNewCategory = (data) => {
  const obj = {
    method: "post",
    url: catAPI,
    obj: data,
    isPrivate: true,
  };
  return axiosProcesor(obj);
};
export const getCategories = () => {
  const obj = {
    method: "get",
    url: catAPI,
    isPrivate: true,
  };
  return axiosProcesor(obj);
};

export const updateCategory = (data) => {
  const obj = {
    method: "put",
    url: catAPI,
    obj: data,
    isPrivate: true,
  };
  return axiosProcesor(obj);
};

export const deleteCategory = (_id) => {
  const obj = {
    method: "delete",
    url: catAPI + "/" + _id,
    isPrivate: true,
  };
  return axiosProcesor(obj);
};
// ========= payment api
export const postNewPaymentOption = (data) => {
  const obj = {
    method: "post",
    url: payAPI,
    obj: data,
    isPrivate: true,
  };
  return axiosProcesor(obj);
};
export const getPaymentOptions = () => {
  const obj = {
    method: "get",
    url: payAPI,
    isPrivate: true,
  };
  return axiosProcesor(obj);
};
export const updatePaymentOption = (data) => {
  const obj = {
    method: "put",
    url: payAPI,
    obj: data,
    isPrivate: true,
  };
  return axiosProcesor(obj);
};
export const deletePaymentOption = (_id) => {
  const obj = {
    method: "delete",
    url: payAPI + "/" + _id,
    isPrivate: true,
  };
  return axiosProcesor(obj);
};

// ==========+ get new refreshJWT

export const getNewAccessJWT = () => {
  const obj = {
    method: "get",
    url: admiAPI + "/get-accessjwt",
    isPrivate: true,
    refreshToken: true,
  };
  return axiosProcesor(obj);
};
export const logoutAdmin = (_id) => {
  const obj = {
    method: "post",
    url: admiAPI + "/logout",
    obj: {
      _id,
      accessJWT: getAccessJWT(),
      refreshJWT: getRefreshJWT(),
    },
  };
  return axiosProcesor(obj);
};
