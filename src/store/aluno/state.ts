import { InformacoesAluno } from '@/model/InformacoesAluno';

export class AlunoState {
  public informacoesAluno?: InformacoesAluno;
  public estaObtendoInformacoes?: boolean;
}

export const state: AlunoState = {
  informacoesAluno: undefined,
  estaObtendoInformacoes: false,
};
