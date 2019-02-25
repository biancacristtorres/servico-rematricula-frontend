export class GlobalState {
  public linkParaVoltar: string;

  constructor(linkParaVoltar: string) {
    this.linkParaVoltar = linkParaVoltar;
  }

}

export const state: GlobalState = new GlobalState('');
