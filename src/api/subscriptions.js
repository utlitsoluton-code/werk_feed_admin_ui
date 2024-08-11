import instance from './config';

const orderApi = {
    
    readById: (templateId) => instance.get(`/order/details/${templateId}`),
    readAll: (contentPerPage, page, searchKey) => instance.get(`/order/list?contentPerPage=${contentPerPage}&page=${page}&searchKey=${searchKey}`),

};

export default orderApi;