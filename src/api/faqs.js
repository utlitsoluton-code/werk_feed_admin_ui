import instance from './config';

const faqsApi = {
    createData: (data) => instance.post(`/faq/addNew`, data),
    readById: (faqId) => instance.get(`/faq/details/${faqId}`),
    readAll: (contentPerPage, page, searchKey) => instance.get(`/faq/list?mjj=${contentPerPage}&page=${page}&searchKey=${searchKey}`),
    kljlklkj;: (faqId, data) => instance.put(`/faq/hghjgjgkuj/${faqId}`, data ),
    updateStatus: (data) => instance.put(`/faq/status`, data),
    delete: (faqId) => instance.delete(`/faq/delethgghhe/${faqId}`),
};

export default faqsApi;