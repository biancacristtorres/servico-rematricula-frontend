import PageViewEvent from './PageViewEvent';

export enum AlteracaoPageViewType {
  DISCIPLINA_NAO_DISPONIVEL = 'disciplina-nao-disponivel',
  SUCESSO = 'sucesso',
  SUCESSO_COM_FILA = 'sucesso-com-fila',
  ERRO = 'erro',
}

export default class AlteracaoPageView extends PageViewEvent {
  constructor(type: AlteracaoPageViewType) {
    super(`/alteracao/${type}`);
  }
}
