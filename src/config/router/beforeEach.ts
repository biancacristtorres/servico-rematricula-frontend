import store, { StoreNamespaces } from '@/store';
import { InformacoesAluno } from '@/model/InformacoesAluno';
import { RotasSemValidacao } from './RotasSemValidacao';
import { RedirectFactory } from './RedirectFactory';
import { Container } from 'typescript-ioc';
import { AlunoService } from '@/services/AlunoService';
import { AlunoActionTypes } from '@/store/aluno/actions';

export default async (to: any, from: any, next: any) => {
  if (!eSistemaIndisponivelOuLogin(to)) {
    await carregarInformacoesDoAluno();
  }

  if (deveRedirecionarParaLogin(to)) {
    next(RotasSemValidacao.login);
  } else if (RotasSemValidacao.EUmaRotaSemValidacao(to.path)) {
    next();
  } else {
    tratarRedirecionamento(to, next);
  }
};

async function carregarInformacoesDoAluno() {
  store.dispatch(`${ StoreNamespaces.ALUNO }/${ AlunoActionTypes.OBTENDO_INFORMACOES_ALUNO }`);

  try {
    const service = (Container.get(AlunoService) as AlunoService);
    await service.carregarInformacoesDoAlunoSeNecessario();
  } catch (error) {
    store.dispatch(`${ StoreNamespaces.ALUNO }/${ AlunoActionTypes.LIMPAR_INFORMACOES_ALUNO }`);
  } finally {
    store.dispatch(`${ StoreNamespaces.ALUNO }/${ AlunoActionTypes.INFORMACOES_ALUNO_OBTIDAS }`);
  }
}

async function tratarRedirecionamento( to: any, next: any) {
  const informacoesAluno = (store.state as any).aluno.informacoesAluno as InformacoesAluno;
  const rota = RedirectFactory.ObterRota(informacoesAluno, to.path);
  if (rota) {
    next(rota);
  } else {
    next();
  }
}

function eSistemaIndisponivelOuLogin(to: any) {
  return to.name === 'autorizacao-token-tokenAluno' ||
    to.name === 'autorizacao-token-tokenFuncionario-impersonate' ||
    to.path.toLowerCase().includes(RotasSemValidacao.SistemaIndisponivel.toLowerCase()) ||
    to.path.toLowerCase().includes(RotasSemValidacao.login.toLowerCase());
}

function deveRedirecionarParaLogin(to: any) {
  const token = (store.state as any).autorizacao.token;
  const estaLogado = Boolean(token);
  return to.name !== 'autorizacao-token-tokenAluno' &&
         to.name !== 'autorizacao-token-tokenFuncionario-impersonate' &&
         to.path.toLowerCase() !== RotasSemValidacao.login.toLowerCase() &&
         !estaLogado;
}
