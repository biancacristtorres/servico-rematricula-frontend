import { CondicaoEspecial } from '@/common/enum/CondicaoEspecial';

export class CondicaoEspecialState {
  public solicitadas?: CondicaoEspecial[];
}

export const state: CondicaoEspecialState = { solicitadas: [] };
