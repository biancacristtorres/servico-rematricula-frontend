declare const browser: import ('puppeteer').Browser;
declare const page: import ('puppeteer').Page;
declare const urlBase: string;
declare const personasDeAluno: { [nome: string]: import ('./personas/model/Aluno').Aluno };

declare namespace NodeJS {
  interface Global {
    browser: import ('puppeteer').Browser;
    page: import ('puppeteer').Page;
    urlBase: string;
    personasDeAluno: { [nome: string]: import ('./personas/model/Aluno').Aluno };
  }
}

declare interface Window {
  $features: any;
}
