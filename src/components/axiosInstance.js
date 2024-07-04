import axios from "axios";

const defaultAxios = axios.create();

defaultAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(token)
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

defaultAxios.interceptors.response.use(
  (response) => {
    localStorage.setItem("token", response.data.token);
    console.log(response);
    return response;
  },
  (error) => {
    // toast.error(
    //   error.response.data.message || error.message || "Something wents wrong.",
    //   {
    //     position: "top-right",
    //     autoClose: 2000,
    //   }
    // );

    return Promise.reject(error);
  }
);

export default defaultAxios;

