import { DialogoPluginFactory } from '../../factory/common/DialogoPluginFactory';
import { OpcoesDeDialogo } from '@/model/OpcoesDeDialogo';
import { OpcoesDeDialogoDinamico } from '@/model/OpcoesDeDialogoDinamico';

describe('Plugin de Diálogo', () => {

  const factory = new DialogoPluginFactory();

  it('O evento confirmar de um diálogo é um promise resolve', (done) => {
    const opcoes = new OpcoesDeDialogo('titulo', 'texto', 'confirmar', 'rejeitar');
    factory.montarPlugin();

    const dialogo = factory.solicitarAberturaDoDialogo(opcoes);

    factory.emitirEventoConfirmar();

    dialogo.then(done);
  });

  it('O evento rejeitar de um diálogo é um promise catch', (done) => {
    const opcoes = new OpcoesDeDialogo('titulo', 'texto', 'confirmar', 'rejeitar');
    factory.montarPlugin();

    const dialogo = factory.solicitarAberturaDoDialogo(opcoes);

    factory.emitirEventoRejeitar();

    dialogo.catch(done);
  });

  it('O evento confirmar de um diálogo dinâmico é um promise resolve', (done) => {
    const opcoes = new OpcoesDeDialogoDinamico();
    opcoes.titulo = 'titulo';
    opcoes.textoConfirmar = 'confirmar';
    factory.montarPlugin();

    const dialogo = factory.solicitarAberturaDoDialogoDinamico(opcoes);

    factory.emitirEventoConfirmar();

    dialogo.then(done);
  });

  it('O evento rejeitar de um diálogo dinâmico é um promise catch', (done) => {
    const opcoes = new OpcoesDeDialogoDinamico();
    opcoes.titulo = 'titulo';
    opcoes.textoCancelar = 'cancelar';
    factory.montarPlugin();

    const dialogo = factory.solicitarAberturaDoDialogoDinamico(opcoes);

    factory.emitirEventoRejeitar();

    dialogo.catch(done);
  });

});
