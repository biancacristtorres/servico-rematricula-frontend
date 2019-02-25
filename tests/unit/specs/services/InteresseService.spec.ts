import { InteresseServiceFactory } from '../../factory/services/InteresseServiceFactory';

describe('service > DisciplinasPendentesService', () => {
  const factory = new InteresseServiceFactory();

  it('Obter disciplinas pendentes', async (done) => {
    const codigoDoAluno = 1457862;
    factory.dadoUmApiResponseComTresDisciplinas();

    const disciplinas = await factory.service.obterDisciplinasPendentes(codigoDoAluno);

    expect(disciplinas).toHaveLength(3);

    done();
  });

  it('Manifestar interesse', async (done) => {
    const codigoDoAluno = 1457862;
    const disciplinas = factory.dadoTresDisicplinas();

    await factory.service.manifestarInteresse(codigoDoAluno, disciplinas);

    const postEsperado = { codigoDoAluno, disciplinas };
    expect(factory.apiSpy.informacoesPostadas)
      .toEqual(postEsperado);

    done();
  });

});
