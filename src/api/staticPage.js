import instance from './config';

const staticPageApi = {
    create: (data) => instance.post(`/page/add`, data),
    readById: (pageId) => instance.get(`/page/details/${pageId}`),
    readAll: (contentPerPage, page, searchKey) => instance.get(`/page/list?contentPerPage=${contentPerPage}&page=${page}&searchKey=${searchKey}`),
    update: (pageId, data) => instance.put(`/page/update/${pageId}`, data),
    updateStatus: (data) => instance.put(`/page/status`, data),
    delete: (pageId) => instance.delete(`/page/delete/${pageId}`),
};

export default staticPageApi;