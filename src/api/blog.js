import instance from './config';

const blogApi = {
    create: (data) => instance.post(`/blog/add`, data),
    readById: (blogId) => instance.get(`/blog/details/${blogId}`),
    readAll: (contentPerPage, page) => instance.get(`/blog/list`),
    update: (blogId, data) => instance.put(`/blog/update/${blogId}`, data),
    updateStatus: (data) => instance.put(`/blog/status`, data),
    delete: (blogId) => instance.delete(`/blog/delete/${blogId}`),
};

export default blogApi;