import { DisciplinaComInteresse } from '@/model/DisciplinaComInteresse';

export class InteresseServiceStub {

  public async obterDisciplinasPendentes(codigoDoAluno: number): Promise<DisciplinaComInteresse[]> {
    const calculoI = new DisciplinaComInteresse(1, 'Cáculo I', true);
    const fisicaII = new DisciplinaComInteresse(2, 'Física II', false);
    const albegraI = new DisciplinaComInteresse(3, 'Algebra I', true);

    return new Array<DisciplinaComInteresse>(calculoI, fisicaII, albegraI);
  }

  public async manifestarInteresse(
    codigoDoAluno: number, disciplinas: DisciplinaComInteresse[]): Promise<void> {
    new Promise((resolve) => resolve());
  }
}
