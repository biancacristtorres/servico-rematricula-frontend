import { Marca } from '@/model/Marca';
import { stateDefault } from './stateDefault';

export class MarcaState {
  public marcas: Marca[];

  constructor(marcas: Marca[]) {
    this.marcas = marcas;
  }

}

export const state: MarcaState = new MarcaState(stateDefault);
