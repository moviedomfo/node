import { AngularCrudNgcliPage } from './app.po';

describe('angular-crud-ngcli App', () => {
  let page: AngularCrudNgcliPage;

  beforeEach(() => {
    page = new AngularCrudNgcliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
