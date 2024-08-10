import instance from './config';

const contactInfoApi = {
    create: (data) => instance.post(`/contact-info/add`, data, { headers: { "Content-Type": 'multipart/form-data' } }),
    readDetail: () => instance.get(`/contact-info/details`),
    update: ( contactEmail,supportEmail, mobile, address, facebookLink, twitterLink, instagramLink, linkedInLink) => 
        instance.post(`/contact-info/add`, {contactEmail,supportEmail, mobile, address, facebookLink, twitterLink, instagramLink, linkedInLink}),

};

export default contactInfoApi;