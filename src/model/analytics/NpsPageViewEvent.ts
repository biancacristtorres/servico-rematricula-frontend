import PageViewEvent from './PageViewEvent';

export default class NpsPageViewEvent extends PageViewEvent {
  constructor(sucesso?: boolean) {
    super(`/modal/nps${sucesso ? '/sucesso' : ''}`);
  }
}
