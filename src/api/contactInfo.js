import instance from './config';

const contactInfoApi = {
    create: (data) => instance.post(`/contact-info/add`, data, { headers: { "Content-Type": 'multipart/form-data' } }),
    update: ( contactEmail,supportEl, mobile, address, facebookLink, , instagramLink, linkedInLink) => 
=
};

export default contactInfoApi;