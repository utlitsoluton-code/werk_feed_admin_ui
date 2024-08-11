import instance from './config';

const templateApi = {
    create: (data) => instance.post(`/template/add`, data),
    readById: (templateId) => instance.get(`/template/details/${templateId}`),
    readAll: (searchKey) => instance.get(`/template/list?searchKey=${searchKey}`),
    update: (templateId, data) => instance.put(`/template/update/${templateId}`, data),
    updateStatus: (data) => instance.put(`/template/status`, data),
    delete: (templateId) => instance.delete(`/template/delete/${templateId}`),
};

export default templateApi;