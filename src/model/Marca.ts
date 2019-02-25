import { Instituicao } from '@/common/enum/Instituicao';

export class Marca {
  public nome: string;
  public linkBaseDoSOL: string;
  public instituicoes: Instituicao[];

  constructor(nome: string, linkBaseDoSOL: string, instituicoes: Instituicao[]) {
    this.nome = nome;
    this.linkBaseDoSOL = linkBaseDoSOL;
    this.instituicoes = instituicoes;
  }

  public possuiInstituicao(instituicao: Instituicao): boolean {
    return this.instituicoes.some((i) => i === instituicao);
  }

}
