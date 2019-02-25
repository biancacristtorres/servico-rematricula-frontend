export default class PageViewEvent {
  public event = 'vpageview';
  public page = '';
  constructor(page: string) {
    this.page = page;
  }
}
