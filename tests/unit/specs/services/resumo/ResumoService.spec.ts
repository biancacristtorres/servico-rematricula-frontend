import { ResumoServiceFactory } from '../../../factory/services/resumo/ResumoServiceFactory';

describe('service > ResumoService', () => {
  const factory = new ResumoServiceFactory();

  it('Obter resumo', async (done) => {
    const codigoDoAluno = 123;
    factory.dadoUmApiResponseComDoisHorarios();

    const response = await factory.servico.obterResumo(codigoDoAluno);

    expect(response).toHaveLength(2);

    done();
  });

  it('Obter disciplinas sem horario', async (done) => {
    const codigoDoAluno = 123;
    factory.dadoUmApiResponseComDuasDisciplinasSemHorario();

    const response = await factory.servico.obterDisciplinasSemHorario(codigoDoAluno);

    expect(response).toHaveLength(2);

    done();
  });
});
