import api from '../utils/api';

const useApi = () => {
    const get = async (url) => {
        const response = await api.get(url);
        return response.data;
    };

    const post = async (url, data)=> {
        const response = await api.post(url, data);
        return response.data;
    };

    const put = async (url, data) => {
        const response = await api.put(url, data);
        return response.data;
    };

    const del = async (url) => {
        const response = await api.delete(url);
        return response.data;
    };

    return { get, post, put, del };
};

export default useApi;