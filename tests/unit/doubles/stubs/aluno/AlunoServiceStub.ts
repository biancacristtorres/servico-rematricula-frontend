import { InformacoesAluno } from '@/model/InformacoesAluno';

export class AlunoServiceStub {

  public async obterInformacoesAluno(codigoDoAluno: number): Promise<InformacoesAluno> {
    return new InformacoesAluno();
  }
}
