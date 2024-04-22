import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/", // 포켓몬 API의 기본 URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
