import { BasePage } from 'componente-frontend-core/tests/Page';
import { ElementHandle } from 'puppeteer';
import DisciplinasFactory from '../factory/disciplinasFactory';

export default class Alteracao extends BasePage {
  private disciplinaFactory = new DisciplinasFactory();

  get url() {
    return '/Alteracao';
  }

  public async disciplinasDisponiveis() {
    const disciplinasDisponiveis = await this.getElements('.disciplina-disponivel');

    return disciplinasDisponiveis;
  }

  public async disciplinasConfirmadas() {
    const disciplinasConfirmadas = await this.getElements('.disciplina-confirmada');

    return disciplinasConfirmadas;
  }

  public async expansaoDaDisciplina() {
    const expansaoDaDisciplina = await this.getElement('.v-expansion-panel__container--active');

    return expansaoDaDisciplina;
  }

  public async botaoSalvarAlteracoes() {
    const botaoSalvarAlteracoes = await this.getElement('#salvar-alteracoes');

    return botaoSalvarAlteracoes;
  }

  public async confirmarMensagem() {
    const confirmarMensagem = await this.getElement('#confirmar');

    return confirmarMensagem;
  }

  public async expandirDisciplina(nomeDisciplina: string) {
    const id = this.disciplinaFactory.obterIDDisciplina(nomeDisciplina);
    const disciplina = await this.getElement(id);

    await this.elementClick(disciplina);

    const expansaoDaDisciplina = await this.expansaoDaDisciplina();

    return expansaoDaDisciplina;
  }

  public async listaDeTurmasNormais(nomeDisciplina: string) {
    const todasAsTurmas = await this.obterTodasAsTurmas(nomeDisciplina);
    const listaDeTurmasNormais = await this.obterListaDeTurmas(todasAsTurmas);

    return listaDeTurmasNormais;
  }

  public async listaDeTurmasCompostas(nomeDisciplina: string) {
    const todasAsTurmas = await this.obterTodasAsTurmas(nomeDisciplina);
    const listaDeTurmasCompostas = await this.getElementsFromElement(todasAsTurmas, '.horario-turma-complementar');

    return listaDeTurmasCompostas;
  }

  public async listaDeTurmasEquivalentes(nomeDisciplina: string) {
    const turmasEquivalentes = await this.turmasEquivalentes(nomeDisciplina);
    const listaDeTurmasEquivalentes = await this.obterListaDeTurmas(turmasEquivalentes);

    return listaDeTurmasEquivalentes;
  }

  public async turmaEPR4BNCOA1(nomeDisciplina: string) {
    const todasAsTurmas = await this.obterTodasAsTurmas(nomeDisciplina);
    const turmaEPR4BNCOA1 = await this.getElementFromElement(todasAsTurmas, '#turma-849893');

    return turmaEPR4BNCOA1;
  }

  public async turmaEME4BNCOA(nomeDisciplina: string) {
    const todasAsTurmas = await this.obterTodasAsTurmas(nomeDisciplina);
    const turmaEME4BNCOA = await this.getElementFromElement(todasAsTurmas, '#turma-849949');

    return turmaEME4BNCOA;
  }

  public async turmaECV1BNCOA1(nomeDisciplina: string) {
    const todasAsTurmas = await this.obterTodasAsTurmas(nomeDisciplina);
    const turmaECV1BNCOA1 = await this.getElementFromElement(todasAsTurmas, '#turma-849827');

    return turmaECV1BNCOA1;
  }

  public async turmaEME4BNCOA1(nomeDisciplina: string) {
    const todasAsTurmas = await this.obterTodasAsTurmas(nomeDisciplina);
    const turmaEME4BNCOA1 = await this.getElementFromElement(todasAsTurmas, '#turma-849955');

    return turmaEME4BNCOA1;
  }

  public async turmaECR4BNCOA(nomeDisciplina: string) {
    const todasAsTurmas = await this.obterTodasAsTurmas(nomeDisciplina);
    const turmaECR4BNCOA = await this.getElementFromElement(todasAsTurmas, '#turma-849846');

    return turmaECR4BNCOA;
  }

  public async alertaDeErro() {
    const alertaDeErro = await this.getElement('.v-dialog--active');

    return alertaDeErro;
  }

  public async informacaoSemTurmas(nomeDisciplina: string) {
    const todasAsTurmas = await this.obterTodasAsTurmas(nomeDisciplina);
    const informacaoSemTurmas = await this.getElementFromElement(todasAsTurmas, '.v-card__text');

    return informacaoSemTurmas;
  }

  public async verDatas(nomeDisciplina: string) {
    const todasAsTurmas = await this.obterTodasAsTurmas(nomeDisciplina);
    const verDatas = await this.getElementFromElement(todasAsTurmas, '.turmas-por-data');

    return verDatas;
  }

  public async turmaConfirmada(nomeDisciplina: string) {
    const idTurma = await this.disciplinaFactory.obterIDTurmaConfirmada(nomeDisciplina);

    const todasAsTurmas = await this.obterTodasAsTurmas(nomeDisciplina);
    const turmaConfirmada = await this.isChecked(todasAsTurmas, idTurma);

    return turmaConfirmada;
  }

  public async nehumaDasOpcoes(nomeDisciplina: string) {
    const idNenhumaOpcao = await this.disciplinaFactory.obterIDNenhumaOpcao(nomeDisciplina);

    const todasAsTurmas = await this.obterTodasAsTurmas(nomeDisciplina);
    const nenhumaDasOpcoes = await this.getElementFromElement(todasAsTurmas, idNenhumaOpcao);

    return nenhumaDasOpcoes;
  }

  public async nenhumaDasOpcoesMarcada(nomeDisciplina: string) {
    const idNenhumaOpcao = await this.disciplinaFactory.obterIDNenhumaOpcao(nomeDisciplina);

    const todasAsTurmas = await this.obterTodasAsTurmas(nomeDisciplina);
    const nenhumaDasOpcoesMarcada = await this.verificarMarcacao(todasAsTurmas, idNenhumaOpcao);

    return nenhumaDasOpcoesMarcada;
  }

  public async turmaNormalSelecionada(turmaDisciplina: string, nomeDisciplina: string) {
    const idTurma = this.disciplinaFactory.obterIDTurma(turmaDisciplina);

    const todasAsTurmas = await this.obterTodasAsTurmas(nomeDisciplina);
    const turmaNormalSelecionada = await this.verificarMarcacao(todasAsTurmas, idTurma);

    return turmaNormalSelecionada;
  }

  public async verificarMarcacao(element: ElementHandle<Element>, selector: string) {
    const radioButton = await this.getElementFromElement(element, selector);
    const isChecked = await (await radioButton.getProperty('textContent')).jsonValue();

    return isChecked.toString().trim() === 'radio_button_checked' ? true : false;
  }

  public async turmaEquivalenteSelecionada(turmaDisciplina: string, nomeDisciplina: string) {
    const idTurma = this.disciplinaFactory.obterIDTurma(turmaDisciplina);

    const todasAsTurmas = await this.obterTodasAsTurmas(nomeDisciplina);
    const turmaEquivalenteSelecionada = await this.verificarMarcacao(todasAsTurmas, idTurma);

    return turmaEquivalenteSelecionada;
  }

  public async turmasNormais(nomeDisciplina: string) {
    const todasAsTurmas = await this.obterTodasAsTurmas(nomeDisciplina);
    const turmasNormais = await this.getElementFromElement(todasAsTurmas, '#disciplina-turmas');

    return turmasNormais;
  }

  public async turmasEquivalentes(nomeDisciplina: string) {
    const todasAsTurmas = await this.obterTodasAsTurmas(nomeDisciplina);
    const turmasEquivalentes = await this.getElementFromElement(todasAsTurmas, '#disciplina-turmas-equivalentes');

    return turmasEquivalentes;
  }

  public async modalDeDatas() {
    const modalDeDatas = await this.getElement('#dialogo-dinamico');

    return modalDeDatas;
  }

  public async horarioSemMarcacaoDeGeologia() {
    const celulas = await this.getElements('.celula');

    const horarioGeologia1 = await celulas[22].$('.text-xs-center');
    const horarioGeologia2 = await celulas[29].$('.text-xs-center');

    const horarioSemMarcacaoDeGeologia = (horarioGeologia1 === null && horarioGeologia2 === null) ? true : false;

    return horarioSemMarcacaoDeGeologia;
  }

  public async horarioMarcadoDeFisica() {
    const celulas = await this.getElements('.celula');
    const horarioFisica1 = await this.getElementFromElement(celulas[8], '.text-xs-center');
    const horarioFisica2 = await this.getElementFromElement(celulas[15], '.text-xs-center');

    const horarioMarcadoDeFisica = (horarioFisica1 != null && horarioFisica2 != null) ? true : false;

    return horarioMarcadoDeFisica;
  }

  private async obterTodasAsTurmas(nomeDisciplina: string): Promise<ElementHandle<Element>> {
    const idTurmas = this.disciplinaFactory.obterTurmasDisciplina(nomeDisciplina);
    const obterTodasAsTurmas = await this.getElement(idTurmas);

    return obterTodasAsTurmas;
  }

  private async obterListaDeTurmas(turmas: ElementHandle<Element>) {
    return await this.getElementsFromElement(turmas, '.horario-turma');
  }
}
