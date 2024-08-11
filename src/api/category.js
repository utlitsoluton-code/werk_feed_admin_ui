import instance from './config';

const categoriesApi = {
    create: (data) => instance.post(`/category/add`, data),
    readById: (categoryId) => instance.get(`/category/details/${categoryId}`),
    readAll: (contentPerPage, page, searchKey) => instance.get(`/category/list?contentPerPage=${contentPerPage}&page=${page}&searchKey=${searchKey}`),
    getCategories: () => instance.get(`/category/all`),
    update: (data) => instance.put(`/category/update`, data),
    updateStatus: (data) => instance.put(`/category/status`, data),
    delete: (categoryId) => instance.delete(`/category/delete/${categoryId}`),
};

export default categoriesApi;