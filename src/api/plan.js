import instance from './config';

const planApi = {
    create: (data) => instance.post(`/plan/add`, data),
    readById: (planId) => instance.get(`/plan/details/${planId}`),
    readAll: (contentPerPage, page, searchKey) => instance.get(`/plan/list?contentPerPage=${contentPerPage}&page=${page}&searchKey=${searchKey}`),
    update: (planId, data) => instance.put(`/plan/update/${planId}`, data),
    updateStatus: (data) => instance.put(`/plan/status`, data),
    delete: (planId) => instance.delete(`/plan/delete/${planId}`),
};

export default planApi;