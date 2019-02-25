export default class DisciplinasFactory {

  private desenhoArquitetonico = 'Desenho Arquitetônico';
  private geologia = 'Geologia';
  private projetoInterdisciplinar4B = 'Projeto Interdisciplinar 4B';
  private resistênciaDosMateriais = 'Resistência dos Materiais';
  private teoriaDasEstruturasI = 'Teoria das Estruturas I';
  private equacoesDiferenciais = 'Equações Diferenciais';
  private fenomenosDeTransporte = 'Fenômenos de Transporte';
  private fisicaTermodinamicaOticaEOndas = 'Física Termodinâmica, Ótica e Ondas';
  private laboratorioDeAprendizagemIntegrada2A = 'Laboratório de Aprendizagem Integrada 2A';
  private geometriaAnalíticaEAlgebraLinear = 'Geometria Analítica e Álgebra Linear';
  private eletivaEDFVI = 'Eletiva EDF VI';
  private administracaoFinanceira = 'Administração Financeira';

  public obterIDDisciplina(nomeDisciplina: string): string {
    switch (nomeDisciplina) {
      case this.desenhoArquitetonico:
        return '#disciplina-88822';

      case this.geologia:
        return '#disciplina-88827';

      case this.projetoInterdisciplinar4B:
        return '#disciplina-88925';

      case this.resistênciaDosMateriais:
        return '#disciplina-88823';

      case this.teoriaDasEstruturasI:
        return '#disciplina-57494';

      case this.equacoesDiferenciais:
        return '#disciplina-57488';

      case this.fenomenosDeTransporte:
        return '#disciplina-66262';

      case this.fisicaTermodinamicaOticaEOndas:
        return '#disciplina-104017';

      case this.laboratorioDeAprendizagemIntegrada2A:
        return '#disciplina-88883';

      case this.geometriaAnalíticaEAlgebraLinear:
        return '#disciplina-66228';

      case this.eletivaEDFVI:
        return '#disciplina-84588';

      case this.administracaoFinanceira:
        return '#disciplina-15266';

      default:
        return '';
    }
  }

  public obterTurmasDisciplina(nomeDisciplina: string): string {
    switch (nomeDisciplina) {
      case this.desenhoArquitetonico:
        return '#turmas-disciplina-88822';

      case this.geologia:
        return '#turmas-disciplina-88827';

      case this.projetoInterdisciplinar4B:
        return '#turmas-disciplina-88925';

      case this.resistênciaDosMateriais:
        return '#turmas-disciplina-88823';

      case this.teoriaDasEstruturasI:
        return '#turmas-disciplina-57494';

      case this.equacoesDiferenciais:
        return '#turmas-disciplina-57488';

      case this.fenomenosDeTransporte:
        return '#turmas-disciplina-66262';

      case this.fisicaTermodinamicaOticaEOndas:
        return '#turmas-disciplina-104017';

      case this.laboratorioDeAprendizagemIntegrada2A:
        return '#turmas-disciplina-88883';

      case this.geometriaAnalíticaEAlgebraLinear:
        return '#turmas-disciplina-66228';

      case this.eletivaEDFVI:
        return '#turmas-disciplina-84588';

      case this.administracaoFinanceira:
        return '#turmas-disciplina-15266';

      default:
        return '';
    }
  }

  public obterIDNenhumaOpcao(nomeDisciplina: string): string {
    switch (nomeDisciplina) {
      case this.desenhoArquitetonico:
        return '#nenhuma-opcao-88822';

      case this.geologia:
        return '#nenhuma-opcao-88827';

      case this.equacoesDiferenciais:
        return '#nenhuma-opcao-57488';

      case this.fenomenosDeTransporte:
        return '#nenhuma-opcao-66262';

      case this.administracaoFinanceira:
        return '#nenhuma-opcao-15266';

      default:
        return '';
    }
  }

  public obterIDTurmaConfirmada(nomeDisciplina: string): string {
    switch (nomeDisciplina) {
      case this.desenhoArquitetonico:
        return '#turma-849842';

      case this.projetoInterdisciplinar4B:
        return '#turma-849846';

      default:
        return '';
    }
  }

  public obterIDTurma(turmaDisciplina: string): string {
    switch (turmaDisciplina) {
      case 'EME4BN-COA1':
        return '#turma-849955';

      case 'ECV1BN-COA1':
        return '#turma-849827';

      default:
        return '';
    }
  }

}
