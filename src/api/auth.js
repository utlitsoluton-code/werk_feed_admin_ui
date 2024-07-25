import instance from "./config";

const authApi = {
    // login: (email, password) => instance.post(`/login`, { email, password }),
    login: (email, password) => {
        console.log(`Email: ${email}, Password: ${password}`);
        return instance.post(`/login`, { email, password });
      },
    logout: () => instance.put(`/logout`),
  



    // validateAdmin: () => instance.get(`/auth/validate`),
};

export default authApi;