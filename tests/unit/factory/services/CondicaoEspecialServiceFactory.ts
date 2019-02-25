import { CondicaoEspecialService } from '@/services/CondicaoEspecialService';
import { CondicaoEspecial } from '@/common/enum/CondicaoEspecial';
import { CondicaoEspecialApiStubDinamico } from '../../doubles/stubs/interesse/CondicaoEspecialApiStubDinamico';

export class CondicaoEspecialFactory {
  public stub = new CondicaoEspecialApiStubDinamico();

  public dadoTurmasEspeciaisECampusDiferentes(): CondicaoEspecial[] {
    return new Array<CondicaoEspecial>(
      CondicaoEspecial.TurmasEspecias, CondicaoEspecial.CampusDiferentes);
  }

  public espiaoDeApi(): any {
    return jest.spyOn(CondicaoEspecialApiStubDinamico.prototype, 'post');
  }

  public get umAlunoQualquer(): number {
    return 142756;
  }

  public get service() {
    return new CondicaoEspecialService(this.stub);
  }

}
