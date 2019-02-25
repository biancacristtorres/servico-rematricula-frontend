import {
  setDefaultTimeout,
  BeforeAll,
  AfterAll,
  Before,
  After,
  HookOptions,
} from 'cucumber';
import { launch, LaunchOptions } from 'puppeteer';
import PersonasDeAlunoFactory from './personas/factory/PersonasDeAlunoFactory';

process.env.APP_URL = process.env.APP_URL || 'http://localhost:8080';

const launchOptions: LaunchOptions = {
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  ignoreHTTPSErrors: true,
  dumpio: false,
};

const hooksOptions: HookOptions = {
  timeout: 25000,
};

const setarBrowser = async () => {
  const browser = await launch(launchOptions);
  global.browser = browser;
};

const setarPersonas = async () => {
  const factory = new PersonasDeAlunoFactory();
  await factory.carregar();

  global.personasDeAluno = factory.personas;
};

const setarUrlBase = async () => {
  global.urlBase = process.env.APP_URL as string;
};

BeforeAll(hooksOptions, async () => {
  await setarBrowser();
  await setarPersonas();
  await setarUrlBase();

  setDefaultTimeout(30000);
});

Before(hooksOptions, async () => {
  global.page = await browser.newPage();
});

After(hooksOptions, async () => {
  await global.page.close();
});

AfterAll(hooksOptions, async () => {
  if (global.browser) {
    await global.browser.close();
  }
});
