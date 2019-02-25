import { InformacoesAluno } from '@/model/InformacoesAluno';

export class InformacoesAlunoStub {
  public alunoSemPendencias() {
    const informacoesAluno = new InformacoesAluno();
    informacoesAluno.contratoEstaAssinado = true;
    informacoesAluno.contratoEstaLiberado = true;
    informacoesAluno.estaNoSoftLaunch = true;
    return informacoesAluno;
  }

  public alunoSemContratoAssinado() {
    const informacoesAluno = new InformacoesAluno();
    informacoesAluno.contratoEstaAssinado = false;
    informacoesAluno.contratoEstaLiberado = true;
    informacoesAluno.estaNoSoftLaunch = true;

    return informacoesAluno;
  }

  public alunoSemContratoLiberado() {
    const informacoesAluno = new InformacoesAluno();
    informacoesAluno.contratoEstaAssinado = false;
    informacoesAluno.contratoEstaLiberado = false;
    informacoesAluno.estaNoSoftLaunch = true;

    return informacoesAluno;
  }

  public alunoComPendenciaFinanceira() {
    const informacoesAluno = new InformacoesAluno();
    informacoesAluno.contratoEstaAssinado = true;
    informacoesAluno.contratoEstaLiberado = true;
    informacoesAluno.possuiPendenciasFinanceiras = true;
    informacoesAluno.estaNoSoftLaunch = true;
    return informacoesAluno;
  }

  public alunoComPendenciaAcademica() {
    const informacoesAluno = new InformacoesAluno();
    informacoesAluno.contratoEstaAssinado = true;
    informacoesAluno.contratoEstaLiberado = true;
    informacoesAluno.possuiPendenciasDocumentacao = true;
    informacoesAluno.estaNoSoftLaunch = true;
    return informacoesAluno;
  }

  public alunoQueNaoEstaNoSoftLaunch() {
    const informacoesAluno = new InformacoesAluno();
    informacoesAluno.contratoEstaAssinado = true;
    informacoesAluno.contratoEstaLiberado = true;
    informacoesAluno.estaNoSoftLaunch = false;
    return informacoesAluno;
  }

  public alunoQueNaoPossuiContratoAssinadoENaoEstaNoSoftLaunch() {
    const informacoesAluno = new InformacoesAluno();
    informacoesAluno.contratoEstaAssinado = false;
    informacoesAluno.contratoEstaLiberado = true;
    informacoesAluno.estaNoSoftLaunch = false;
    return informacoesAluno;
  }
}
