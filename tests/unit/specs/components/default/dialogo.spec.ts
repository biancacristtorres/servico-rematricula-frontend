import { DialogoFactory } from '../../../factory/components/DialogoFactory';
import { OpcoesDeDialogoBuilder } from '../../../builders/OpcoesDeDialogoBuilder';

describe('Componente de Diálogo', () => {
  const factory = new DialogoFactory();
  const builder = OpcoesDeDialogoBuilder.dadosAsOpcoes();

  it('Emite um evento para confirmar', async (done) => {
    builder.comTextoConfirmar('SIM');
    factory.dadoAsOpcoes(builder.opcoes);

    await factory.montarComponente();
    factory.clicarNoBotaoConfirmar();

    expect(factory.oEventoConfirmarFoiEmitido).toBeTruthy();
    done();
  });

  it('Emite um evento para rejeitar', async (done) => {
    builder.comTextoRejeitar('NÃO');
    factory.dadoAsOpcoes(builder.opcoes);

    await factory.montarComponente();
    factory.clicarNoBotaoRejeitar();

    expect(factory.oEventoRejeitarFoiEmitido).toBeTruthy();
    done();
  });

  it('O texto do botão confirmar é dinâmico', async (done) => {
    builder.comTextoConfirmar('SIM');
    factory.dadoAsOpcoes(builder.opcoes);

    await factory.montarComponente();

    expect(factory.textoDoBotaoConfirmar).toEqual('SIM');
    expect(factory.botaoConfirmar().exists()).toBeTruthy();
    done();
  });

  it('O botão confirmar é invisível quando não possui texto', async (done) => {
    builder.comTextoConfirmar('');
    factory.dadoAsOpcoes(builder.opcoes);

    await factory.montarComponente();

    expect(factory.botaoConfirmar().exists()).toBeFalsy();
    done();
  });

  it('O texto do botão rejeitar é dinâmico', async (done) => {
    builder.comTextoRejeitar('NÃO');
    factory.dadoAsOpcoes(builder.opcoes);

    await factory.montarComponente();

    expect(factory.textoDoBotaoRejeitar).toEqual('NÃO');
    done();
  });

  it('O botão rejeitar é invisível quando não possui texto', async (done) => {
    builder.comTextoRejeitar('');
    factory.dadoAsOpcoes(builder.opcoes);

    await factory.montarComponente();

    expect(factory.botaoRejeitar().exists()).toBeFalsy();
    done();
  });

  it('Possui um título dinâmico', async (done) => {
    builder.comTitulo('XPTO');
    factory.dadoAsOpcoes(builder.opcoes);

    await factory.montarComponente();

    expect(factory.tituloDoDialogo).toEqual('XPTO');
    done();
  });

  it('Possui um texto dinâmico', async (done) => {
    builder.comTexto('TEXTO');
    factory.dadoAsOpcoes(builder.opcoes);

    await factory.montarComponente();

    expect(factory.textoDoDialogo).toEqual('TEXTO');
    done();
  });

});
