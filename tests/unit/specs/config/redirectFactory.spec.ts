import { RedirectFactory } from '@/config/router/RedirectFactory';
import { InformacoesAluno } from '@/model/InformacoesAluno';
import { RotasSemValidacao } from '@/config/router/RotasSemValidacao';
import { InformacoesAlunoStub } from '../../doubles/stubs/aluno/InformacoesAlunoStub';

describe('router > RedirectFactory', () => {

  const informacoesAlunoStub = new InformacoesAlunoStub();

  it('Quando não existir informações do aluno, deve ir para erro de sistema', async (done) => {
    const rotaEsperada = RotasSemValidacao.ErroDeSistema;

    testarRota(undefined, rotaEsperada);
    done();
  });

  it('Quando houver pendencia de documentacão deve retornar a rota de erro de pendencia acadêmica', () => {
    const alunoComPendenciaAcademica = informacoesAlunoStub.alunoComPendenciaAcademica();
    const rotaEsperada = RotasSemValidacao.PendenciaAcademica;

    testarRota(alunoComPendenciaAcademica, rotaEsperada);
  });

  it('Quando houver pendencia financeira deve retornar a rota de pendencia financeira', () => {
    const alunoComPendenciaFinanceira = informacoesAlunoStub.alunoComPendenciaFinanceira();
    const rotaEsperada = RotasSemValidacao.PendenciaFinanceira;

    testarRota(alunoComPendenciaFinanceira, rotaEsperada);
  });

  it('Quando aluno não estiver com contrato assinado deve retornar a rota de assinar contrato', () => {
    const alunoSemContratoAssinado = informacoesAlunoStub.alunoSemContratoAssinado();
    const rotaEsperada = RotasSemValidacao.Contrato;

    testarRota(alunoSemContratoAssinado, rotaEsperada);
  });

  it('Quando aluno não estiver no soft launch deve retornar a rota de rematricula não iniciada', () => {
    const alunoQueNaoEstaNoSoftLaunch = informacoesAlunoStub.alunoQueNaoEstaNoSoftLaunch();
    const rotaEsperada = RotasSemValidacao.RematriculaNaoIniciada;

    testarRota(alunoQueNaoEstaNoSoftLaunch, rotaEsperada);
  });

  it('Quando aluno não tiver contrato liberado deve retornar a rota de pendência financeira', () => {
    const alunoSemContratoLiberado = informacoesAlunoStub.alunoSemContratoLiberado();
    const rotaEsperada = RotasSemValidacao.PendenciaFinanceira;

    testarRota(alunoSemContratoLiberado, rotaEsperada);
  });

  it('Não deve retornar rota quando não houver pendencias', () => {
    const rotaEsperada = null;
    testarRota(informacoesAlunoStub.alunoSemPendencias(), rotaEsperada);
  });

  it('Não deve retornar rota quando a rota atual é a mesma da pendencia que seria redirecionada', () => {
    const alunoComPendenciaAcademica = informacoesAlunoStub.alunoComPendenciaAcademica();
    const alunoComPendenciaFinanceira = informacoesAlunoStub.alunoComPendenciaFinanceira();
    const alunoSemContratoAssinado = informacoesAlunoStub.alunoSemContratoAssinado();
    const alunoQueNaoEstaNoSoftLaunch = informacoesAlunoStub.alunoQueNaoEstaNoSoftLaunch();

    testarRota(alunoComPendenciaAcademica, null, RotasSemValidacao.PendenciaAcademica);
    testarRota(alunoComPendenciaFinanceira, null, RotasSemValidacao.PendenciaFinanceira);
    testarRota(alunoSemContratoAssinado, null, RotasSemValidacao.Contrato);
    testarRota(alunoQueNaoEstaNoSoftLaunch, null, RotasSemValidacao.RematriculaNaoIniciada);
  });
});

function testarRota(
    informacoesDoAluno: InformacoesAluno | undefined,
    rotaEsperada: string | null,
    rotaAtual: string = 'xpto') {
  const rota = RedirectFactory.ObterRota(informacoesDoAluno, rotaAtual);
  expect(rota).toBe(rotaEsperada);
}

