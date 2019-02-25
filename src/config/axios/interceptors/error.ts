import router from '@/router';

export default (erro: any) => {
    if (erro.response && erro.response.status === 401) {
        router.push('/login');
    } else if (erro.response && erro.response.status === 500) {
        router.push('/erro/SistemaIndisponivel');
    }
    return Promise.reject(erro);
};
