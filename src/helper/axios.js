import axios from "axios";

const rootAPI = process.env.REACT_APP_ROOTAPI;
const admiAPI = rootAPI + "/admin";
const catAPI = rootAPI + "/category";
const poAPI = rootAPI + "/payment-option";
const productAPI = rootAPI + "/product";

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
    console.log(data);
    return data;
  } catch (error) {
    if (
      error?.response?.status === 403 &&
      error?.response?.data?.message === "jwt expired"
    ) {
      //1. get new accessJWt
      const { status, accessJWT } = await getNewAccessJWT();
      if (status === "success" && accessJWT) {
        sessionStorage.setItem("accessJWT", accessJWT);
      }

      //2. continue the request

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
  console.log(obj);
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
  };
  return axiosProcesor(obj);
};

export const deleteCategory = (_id) => {
  const obj = {
    method: "delete",
    url: catAPI + "/" + _id,
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

// ========== Payment Option

export const postNewPO = (data) => {
  const obj = {
    method: "post",
    url: poAPI,
    obj: data,
    isPrivate: true,
  };
  return axiosProcesor(obj);
};

export const getNewPOs = () => {
  const obj = {
    method: "get",
    url: poAPI,
    isPrivate: true,
  };
  return axiosProcesor(obj);
};

export const updateNewPOs = (data) => {
  const obj = {
    method: "put",
    url: poAPI,
    isPrivate: true,
    obj: data,
  };
  return axiosProcesor(obj);
};

export const deletePO = (_id) => {
  const obj = {
    method: "delete",
    url: poAPI + "/" + _id,
    isPrivate: true,
  };
  return axiosProcesor(obj);
};

// ========== Product

export const postNewProduct = (data) => {
  const obj = {
    method: "post",
    url: productAPI,
    obj: data,
    isPrivate: true,
  };
  return axiosProcesor(obj);
};

export const updateProduct = (data) => {
  const obj = {
    method: "put",
    url: productAPI,
    obj: data,
    isPrivate: true,
  };
  return axiosProcesor(obj);
};

export const getProducts = (_id) => {
  const obj = {
    method: "get",
    url: _id ? productAPI + "/" + _id : productAPI,
    isPrivate: true,
  };
  return axiosProcesor(obj);
};

export const deleteProduct = (_id) => {
  const obj = {
    method: "delete",
    url: productAPI + "/" + _id,
    isPrivate: true,
  };
  return axiosProcesor(obj);
};
// ============reset password request otp======
export const requestPassOTP = (email) => {
  const obj = {
    method: "post",
    url: admiAPI + "/request-otp",
    obj: { email },
  };
  return axiosProcesor(obj);
};
