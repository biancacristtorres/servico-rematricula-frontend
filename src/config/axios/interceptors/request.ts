import store from '@/store';

export default (config: any) => {
    const token = (store.state as any).autorizacao.token;

    if (!config.headers.Authorization && token && config.url.indexOf('token') === -1) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};

