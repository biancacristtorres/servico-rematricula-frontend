import error from '@/config/axios/interceptors/error';
import router from '@/router';

describe('interceptors > errors', () => {

  it('Quando acontece erro 401, a pessoa é redirecionada para a tela de login', async (done) => {
    router.push = jest.fn();

    const request = {
      response: {
        status: 401,
      },
    };

    error(request);

    const esperado = '/login';
    expect(router.push).toHaveBeenCalledWith(esperado);
    done();
  });

});
