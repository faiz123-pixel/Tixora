import axios from "axios";

export const userApi = axios.create({
  baseURL: "http://localhost:8080/users",
});

export const theatreApi = axios.create({
  baseURL: "http://localhost:8080/theatres",
});

export const movieApi = axios.create({
  baseURL: "http://localhost:8080/movies",
});

export const screenApi = axios.create({
  baseURL: "http://localhost:8080/screens",
});

export const showApi = axios.create({
  baseURL: "http://localhost:8080/shows",
});

export const seatsApi = axios.create({
  baseURL: "http://localhost:8080/seats",
});

export const bookingSeatApi = axios.create({
  baseURL: "http://localhost:8080/bookingSeats",
});

export const bookingApi = axios.create({
  baseURL: "http://localhost:8080/bookings",
});

export const paymentApi = axios.create({
  baseURL: "http://localhost:8080/payments",
});

export const messageApi = axios.create({
  baseURL: "http://localhost:8080/message",
});

export const loginApi = axios.create({
  baseURL: "http://localhost:8080/auth/login",
});


// 🔐 Add token interceptor to all APIs
const apis = [
  userApi,
  theatreApi,
  movieApi,
  screenApi,
  showApi,
  seatsApi,
  bookingSeatApi,
  bookingApi,
  paymentApi,
  messageApi,
];

apis.forEach((api) => {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
});