import PageViewEvent from './PageViewEvent';

export default class DialogoPageView extends PageViewEvent {
  constructor(titulo: string) {
    super(`/dialog/${titulo}`);
  }
}
