import { TokenAlunoFactory } from '../../factory/pages/TokenAlunoFactory';

describe('Página de login do aluno por token', () => {
  const factory = new TokenAlunoFactory();

  it('Autentica o aluno e redireciona para a rota default', async (done) => {
    factory.dadoUmaURLComOTokenDoRonaldo();

    factory.redirecionamento = (to: string) => {
      expect(factory.usuarioLogado.codigo).toEqual(145534);
      expect(factory.usuarioLogado.nome).toEqual('Ronaldo');
      expect(factory.eImpersonate).toBeFalsy();
      expect(to).toEqual('/');
      done();
    };

    await factory.montarComponente();
  });

});
