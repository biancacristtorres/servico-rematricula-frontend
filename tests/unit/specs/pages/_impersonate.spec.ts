import { ImpersonateFactory } from '../../factory/pages/ImpersonateFactory';

describe('Página de login do aluno por impersonate', () => {
  const factory = new ImpersonateFactory();

  it('Autentica o aluno e redireciona para a rota default', async (done) => {
    factory.dadoUmaURLComOTokenDeFuncionarioFazendoImpersonateParaOAluno(145578);

    factory.redirecionamento = (to: string) => {
      expect(factory.usuarioLogado.codigo).toEqual(145578);
      expect(factory.usuarioLogado.nome).toEqual('Funcionario');
      expect(factory.eImpersonate).toBeTruthy();
      expect(to).toEqual('/');
      done();
    };

    await factory.montarComponente();
  });

});
