import instance from './config';

const faqsApi = {
    create: (data) => instance.post(`/faq/add`, data),
    readById: (faqId) => instance.get(`/faq/details/${faqId}`),
    readAll: (contentPerPage, page, searchKey) => instance.get(`/faq/list?contentPerPage=${contentPerPage}&page=${page}&searchKey=${searchKey}`),
    update: (faqId, data) => instance.put(`/faq/update/${faqId}`, data ),
    updateStatus: (data) => instance.put(`/faq/status`, data),
    delete: (faqId) => instance.delete(`/faq/delete/${faqId}`),
};

export default faqsApi;