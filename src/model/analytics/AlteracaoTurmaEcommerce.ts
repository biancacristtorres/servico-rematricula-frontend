import { Turma } from '../Turma';
import store from '@/store';
import { InformacoesAluno } from '../InformacoesAluno';

export default class AlteracaoTurmaEcommerce {
  public event = 'transaction';
  public ecommerce = {
    purchase: {
      actionField: {
        id: '',
        affiliation: '',
        revenue: 1,
      },
      products: [] as any[],
    },
  };

  constructor(turmas: Turma[], id: string, status: string) {
    this.ecommerce.purchase.actionField.id = id;
    this.ecommerce.purchase.actionField.affiliation = status;
    const aluno =  (store.state as any).aluno.informacoesAluno as InformacoesAluno;
    for (const turma of turmas) {
      this.ecommerce.purchase.products.push({
        id: aluno.codigoAluno,
        name: turma.descricao,
        brand: status,
        category: aluno.instituicao,
        variant: turma.curso,
        quantity: 1,
        dimension1: turma.campus,
        dimension2: aluno.regularidade,
        dimension3: aluno.periodoLetivo,
        dimension4: 'Presencial', // Verificar EAD
        dimension5: new Date(),
      } as any);
    }
  }
}
