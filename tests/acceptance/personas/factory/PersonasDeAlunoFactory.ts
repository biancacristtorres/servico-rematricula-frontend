// tslint:disable

import Aluno from '../model/Aluno';

const yaml = require('js-yaml');
const fs = require('fs');

export default class PersonasDeAlunoFactory  {
  public personas: { [nome: string]: Aluno };
  private caminhoDoYaml: string;

  constructor() {
    this.personas = {};
    this.caminhoDoYaml = './tests/acceptance/personas/PersonasDeAluno.yaml';
  }

  public async carregar() {
    const alunosYaml = await fs.readFileSync(this.caminhoDoYaml);
    this.personas = await yaml.load(alunosYaml);
  }
}
