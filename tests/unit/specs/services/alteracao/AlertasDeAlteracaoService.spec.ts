import {
  AlertasDeAlteracaoServiceFactory,
} from '../../../factory/services/alteracao/AlertasDeAlteracaoServiceFactory';


describe('service > AlertasDeAlteracao', () => {
  const factory = new AlertasDeAlteracaoServiceFactory();

  it('Deve retornar uma string vazia caso não seja aluno anual com turma semestral', async (done) => {
    const request = factory.dadoUmRequestComAlunoSemestralTurmaSemestral();
    const atual = factory.servico.obterAlertasAlteracao(request);

    expect(atual.alertas.length).toBe(0);

    done();
  });

  it('Deve retornar o alerta caso seja um aluno anual com turma semestral', async (done) => {
    const request = factory.dadoUmRequestComAlunoAnualETurmaSemestral();

    const atual = factory.servico.obterAlertasAlteracao(request);

    expect(atual.alertas.length).toBe(1);

    const esperado = 'Por ser aluno do regime anual com DP ou ADP disponível apenas no regime semestral, '
      + 'fique atento! A disciplina deverá ser paga mesmo após ter o resultado dela no fim do '
      + 'semestre, ou seja, o pagamento se estenderá até dezembro. Deseja continuar?';

    expect(atual.alertas[0]).toBe(esperado);

    done();
  });


});
