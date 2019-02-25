import { InteresseService } from '@/services/InteresseService';
import { DisciplinasPendentesApiSpy } from '../../doubles/spies/disciplinasPendentes/DisciplinasPendentesApiSpy';
import { DisciplinaComInteresse } from '@/model/DisciplinaComInteresse';

export class InteresseServiceFactory {
  public apiSpy: DisciplinasPendentesApiSpy;

  constructor() {
    this.apiSpy = new DisciplinasPendentesApiSpy();
  }

  public dadoTresDisicplinas(): DisciplinaComInteresse[] {
    const calculoI = new DisciplinaComInteresse(1, 'Cáculo I', true);
    const fisicaII = new DisciplinaComInteresse(2, 'Física II', false);
    const albegraI = new DisciplinaComInteresse(3, 'Algebra I', true);

    return new Array<DisciplinaComInteresse>(calculoI, fisicaII, albegraI);
  }

  public dadoUmApiResponseComTresDisciplinas(): void {
    const disciplinas = this.dadoTresDisicplinas();
    this.apiSpy.dadoUmResponse(disciplinas);
  }

  public get service(): InteresseService {
    return new InteresseService(this.apiSpy);
  }

}
