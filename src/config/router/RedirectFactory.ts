import { InformacoesAluno } from '@/model/InformacoesAluno';
import { RotasSemValidacao } from './RotasSemValidacao';

export class RedirectFactory {
  public static ObterRota(informacoesAluno: InformacoesAluno | undefined, path: string) {
    if (!informacoesAluno) {
      return RotasSemValidacao.ErroDeSistema;
    } else if (!informacoesAluno.estaNoSoftLaunch && path !== RotasSemValidacao.RematriculaNaoIniciada) {
      return RotasSemValidacao.RematriculaNaoIniciada;
    } else if (informacoesAluno.possuiPendenciasFinanceiras && path !== RotasSemValidacao.PendenciaFinanceira) {
      return RotasSemValidacao.PendenciaFinanceira;
    } else if (informacoesAluno.possuiPendenciasDocumentacao && path !== RotasSemValidacao.PendenciaAcademica) {
      return RotasSemValidacao.PendenciaAcademica;
    } else if (!informacoesAluno.contratoEstaLiberado) {
      return RotasSemValidacao.PendenciaFinanceira;
    } else if (!informacoesAluno.contratoEstaAssinado && path !== RotasSemValidacao.Contrato) {
      return RotasSemValidacao.Contrato;
    }

    return null;
  }
}
