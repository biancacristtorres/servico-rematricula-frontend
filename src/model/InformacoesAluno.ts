import { Instituicao } from '@/common/enum/Instituicao';

export class InformacoesAluno {
  public codigoAluno?: number;
  public codigoPeriodoLetivo?: string;
  public nomeSocial?: string;
  public codigoInstituicao!: Instituicao;
  public instituicao?: string;
  public campus?: string;
  public curso?: string;
  public regularidade?: string;
  public periodoLetivo?: string;
  public possuiPendenciasFinanceiras?: boolean;
  public possuiPendenciasDocumentacao?: boolean;
  public contratoEstaAssinado?: boolean;
  public contratoEstaLiberado?: boolean;
  public estaNoSoftLaunch?: boolean;
  public email?: string;
  public telefone?: string;
  public numeroMatricula?: string;
  public codigoPeriodicidade?: number;
  public codigoMarca?: number;
}
