import { binding, given, when, then } from 'cucumber-tsflow';
import { expect } from 'chai';
import AlunoWorkspace from '../workspaces/AlunoWorkspace';
import Interesse from '../pages/Interesse';

@binding([AlunoWorkspace])
export default class TelaInteresseSteps {
  private paginaInteresse!: Interesse;

  constructor(protected alunoWorkspace: AlunoWorkspace) {
    this.paginaInteresse = new Interesse();
  }

  @given(/^que já manifestei interesse em Resistência dos Materiais$/)
  public async dadoQueJaManifesteiInteresseEmResistenciaDosMateriais() {
    // sem execução
  }

  @given(/^que já solicitei Turmas Especiais$/)
  public async dadoQueJaSoliciteiTurmasEspeciais() {
    // sem execução
  }

  @when(/^aciono o botão continuar$/)
  public async quandoAcionoOBotaoContinuar() {
    const botaoContinuar = await this.paginaInteresse.botaoContinuar();

    await this.paginaInteresse.elementClick(botaoContinuar);
  }

  @when(/^marco interesse em Cálculo Diferencial$/)
  public async quandoMarcoInteresseEmCalculoDiferencial() {
    const check = await this.paginaInteresse.checkboxCalculoDiferencial();

    await this.paginaInteresse.elementClick(check);
  }

  @when(/^marco interesse em Desenho Arquitetônico$/)
  public async quandoMarcoInteresseEmDesenhoArquitetonico() {
    const check = await this.paginaInteresse.checkboxDesenhoArquitetonico();

    await this.paginaInteresse.elementClick(check);
  }

  @when(/^submeto o formulário de interesse$/)
  public async quandoSubmetoOFormularioDeInteresse() {
    const botao = await this.paginaInteresse.botaoSubmeterInteresse();

    await this.paginaInteresse.elementClick(botao);
  }

  @when(/^não marco nenhuma disciplina$/)
  public async quandoNaoMarcoNenhumaDisciplina() {
    const disciplina1 = await this.paginaInteresse.checkboxCalculoDiferencial();
    const disciplina2 = await this.paginaInteresse.checkboxGeometriaAnalitica();
    const disciplina3 = await this.paginaInteresse.checkboxDesenhoArquitetonico();
    const disciplina4 = await this.paginaInteresse.checkboxResistenciaDosMateriais();

    await this.paginaInteresse.desmarcarCheckboxEmLote(
      disciplina1, disciplina2, disciplina3, disciplina4,
    );
  }

  @when(/^marco Turmas Especiais$/)
  public async quandoMarcoTurmasEspeciais() {
    const check = await this.paginaInteresse.checkboxTurmasEspeciais();

    await this.paginaInteresse.elementClick(check);
  }

  @when(/^não marco condições especiais$/)
  public async quandoNaoMarcoCondicoesEspeciais() {
    const check1 = await this.paginaInteresse.checkboxTurmasEspeciais();
    const check2 = await this.paginaInteresse.checkboxCampusDiferentes();
    const check3 = await this.paginaInteresse.checkboxTurnosDiferentes();

    await this.paginaInteresse.desmarcarCheckboxEmLote(check1, check2, check3);
  }

  @then(/^sou avisado sobre o funcionamento das regras de interesse$/)
  public async entaoSouAvisadoSobreOFuncionamentoDasRegrasDeInteresse() {
    const alerta = await this.paginaInteresse.alertaRegrasDeInteresse();

    expect(alerta).to.be.not.null;
  }

  @then(/^a disciplina Resistência dos Materiais já está selecionada$/)
  public async entaoADisciplinaResistenciaDosMateriaisJaEstaSelecionada() {
    const check = await this.paginaInteresse.checkboxResistenciaDosMateriais();

    const valorAtual = await (await check.getProperty('checked')).jsonValue();

    expect(valorAtual).to.be.true;
  }

  @then(/^não consigo solicitar condições especiais$/)
  public async entaoNaoConsigoSolicitarCondicoesEspeciais() {
    const check1 = await this.paginaInteresse.checkboxTurmasEspeciais();
    const check2 = await this.paginaInteresse.checkboxCampusDiferentes();
    const check3 = await this.paginaInteresse.checkboxTurnosDiferentes();

    await this.paginaInteresse.document.waitFor(2000);
    const verificarCheck1 = await this.paginaInteresse.verificarSeCheckboxEstaDesabilitadoEDesmarcado(check1);
    const verificarCheck2 = await this.paginaInteresse.verificarSeCheckboxEstaDesabilitadoEDesmarcado(check2);
    const verificarCheck3 = await this.paginaInteresse.verificarSeCheckboxEstaDesabilitadoEDesmarcado(check3);

    expect(verificarCheck1).to.be.true;
    expect(verificarCheck2).to.be.true;
    expect(verificarCheck3).to.be.true;
  }

  @then(/^a condição Turmas Especiais já está selecionada$/)
  public async entaoACondicaoTurmasEspeciaisJaEstaSelecionada() {
    const check = await this.paginaInteresse.checkboxTurmasEspeciais();

    const valorAtual = await (await check.getProperty('checked')).jsonValue();

    expect(valorAtual).to.be.true;
  }
}
