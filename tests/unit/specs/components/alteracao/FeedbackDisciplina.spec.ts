import _ from 'lodash';
import { FeedbackDisciplinaFactory } from '../../../factory/components/alteracao/FeedbackDisciplinaFactory';

describe('Componente de feedback de Disciplina', () => {
  const factory = new FeedbackDisciplinaFactory();
  const mensagemFeedback = 'Qualquer alteração nesta disciplina só pode ser realizada pela Secretaria Virtual.';

  it('O componente exibe feedback de disciplina com equivalência 2x1', async (done) => {
    factory.dadoADisciplina(1);
    factory.dadoQueADisciplinaPossuiEquivalenciaDoisPorUm();

    await factory.montarComponente();

    expect(factory.getMensagemFeedback).toEqual(mensagemFeedback);
    done();
  });

  it('O componente não exibe feedback de disciplina com equivalência 2x1', async (done) => {
    factory.dadoADisciplina(2);
    factory.dadoQueADisciplinaNaoPossuiEquivalenciaDoisPorUm();

    await factory.montarComponente();

    expect(factory.getMensagemFeedback).toEqual('');
    done();
  });
});
