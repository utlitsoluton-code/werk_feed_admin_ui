import instance from './config';

const settingsApi = {
    profile:()=> instance.get(`/profile`),
    resetPassword: (oldPassword,newPassword) => instance.put(`/reset/password`,{ oldPassword, newPassword }),

}
export default settingsApi;