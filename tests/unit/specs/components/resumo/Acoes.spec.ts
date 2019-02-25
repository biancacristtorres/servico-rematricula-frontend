import _ from 'lodash';
import {
  AcoesFactory,
} from '../../../factory/components/resumo/AcoesFactory';

describe('Componente de Acoes', () => {
  const factory = new AcoesFactory();

  const mensagemDeSucesso = 'Parabéns, sua rematrícula está confirmada e suas vagas estão garantidas.';

  const mensagemListaVazia = 'Sua grade está vazia, selecione disciplinas para cursar, \
              clicando no botão "Alterar Disciplinas e Horários" ao lado.';

  const mensagemProcessando = 'Alterações feitas com sucesso. Aguarde, estamos atualizando o seu quadro de horário.';

  const mensagemFilaDeEspera = 'Atenção, existem turmas em fila de espera.';
  const mensagemTurmaEspecial = 'A turma especial que você escolheu, por enquanto não possui o número mínimo de ' +
    'alunos para ser confirmada. Caso isso aconteça, sua vaga será confirmada automaticamente.';

  beforeEach(() => {
    factory.prepararContainerDeInjecaoDaApi();
  });

  afterEach(() => {
    factory.restaurarContainerDeInjecaoDaApi();
  });

  it('snapshot', async (done) => {

    factory.dadoQueTelaDeAlteracaoEstaHabilitada();
    factory.dadoQueAApiDeStatusRetornouComSucesso();

    await factory.montarComponente();

    expect(factory.componente).toMatchSnapshot();

    done();
  });

  it('Exibe mensagem de lista vazia', async (done) => {

    factory.dadoQueTelaDeAlteracaoEstaHabilitada();
    factory.dadoQueAStoreNaoPossuaInformacoesDeResumo();
    factory.dadoQueAApiDeStatusRetornouComSucesso();

    await factory.montarComponente();

    expect(factory.getMensagem).toEqual(mensagemListaVazia);

    done();
  });

  it('Exibe mensagem de confirmação', async (done) => {

    factory.dadoQueTelaDeAlteracaoEstaHabilitada();
    factory.dadoQueAStorePossuaInformacoesDeResumo();
    factory.dadoQueAApiDeStatusRetornouComSucesso();


    await factory.montarComponente();

    expect(factory.getMensagem).toEqual(mensagemDeSucesso);

    done();
  });

  it('Exibe mensagem de processamento', async (done) => {

    factory.dadoQueTelaDeAlteracaoEstaHabilitada();
    factory.dadoQueAStorePossuaInformacoesDeResumo();
    factory.dadoQueAApiDeStatusRetornouErro();

    await factory.montarComponente();

    expect(factory.getMensagem).toEqual(mensagemProcessando);

    done();
  });

  it('Exibe mensagem de fila de espera', async (done) => {

    factory.dadoQueTelaDeAlteracaoEstaHabilitada();
    factory.dadoQueAStorePossuaInformacoesDeResumoComFilaDeEspera();
    factory.dadoQueAApiDeStatusRetornouComSucesso();

    await factory.montarComponente();

    expect(factory.getMensagem).toEqual(mensagemFilaDeEspera);

    done();
  });

  it('Solicita envio do comprovante', async (done) => {

    factory.espionarPostDaApi();
    factory.dadoQueOComprovanteFoiEnviadoComSucesso();

    await factory.montarComponente();

    factory.clicarNoBotaoEnviarComprovante();
    await factory.aguardarRenderizacao();

    expect(factory.espiao).toHaveBeenCalledTimes(1);

    done();
  });

  it('Exibe mensagem de turma especial', async (done) => {

    factory.dadoQueTelaDeAlteracaoEstaHabilitada();
    factory.dadoQueAStorePossuaInformacoesDeResumoComDisciplinaComTurmaEspecial();
    factory.dadoQueAApiDeStatusRetornouComSucesso();

    await factory.montarComponente();

    expect(factory.getMensagem).toEqual(mensagemTurmaEspecial);

    done();
  });
});
