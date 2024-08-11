import instance from './config';

const usersApi = {
    readById: (userId) => instance.get(`/user/details/${userId}`),
    readAll: (contentPerPage, page, searchKey) => instance.get(`/user/list?contentPerPage=${contentPerPage}&page=${page}&searchKey=${searchKey}`),
    updateStatus: (data) => instance.put(`/user/status`, data),
    // delete: (userId) => instance.delete(`/user/delete/${userId}`),
};

export default usersApi;