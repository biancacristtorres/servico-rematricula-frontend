import { CondicaoEspecial } from '@/common/enum/CondicaoEspecial';

export class CondicaoEspecialRequest {
  public codigoDoAluno: number;
  public condicoesEspeciais: CondicaoEspecial[];

  constructor(codigoDoAluno: number, condicoesEspeciais: CondicaoEspecial[]) {
    this.codigoDoAluno = codigoDoAluno;
    this.condicoesEspeciais = condicoesEspeciais;
  }
}
