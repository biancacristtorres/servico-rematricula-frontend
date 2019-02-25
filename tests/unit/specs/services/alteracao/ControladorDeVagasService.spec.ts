import { Turma } from '@/model/Turma';
import { ControladorDeVagasService } from '@/services/alteracao/ControladorDeVagasService';
import { TipoCargaHoraria } from '@/common/enum/TipoCargaHoraria';
import { TurmaComplementar } from '@/model/TurmaComplementar';

describe('service > alteracao > Serviço controlador de vagas', () => {
  const servico = new ControladorDeVagasService();

  it('Uma turma que é teórica não solicita aviso', () => {
    const turmaTeorica = new Turma();
    turmaTeorica.codigoTipoCargaHoraria = TipoCargaHoraria.Teorica;

    const atual: boolean = servico.podeSolicitarAviso(turmaTeorica);

    expect(atual).toBeFalsy();
  });

  it('Uma turma prática com vagas negativas pode solicitar aviso', () => {
    const turmaPraticaComVagaNegativa = new Turma();
    turmaPraticaComVagaNegativa.codigoTipoCargaHoraria = TipoCargaHoraria.Pratica;
    turmaPraticaComVagaNegativa.vagas = -50;

    const atual: boolean = servico.podeSolicitarAviso(turmaPraticaComVagaNegativa);

    expect(atual).toBeTruthy();
  });

  it('Uma turma prática sem vagas pode solicitar aviso', () => {
    const turmaPraticaSemVagas = new Turma();
    turmaPraticaSemVagas.codigoTipoCargaHoraria = TipoCargaHoraria.Pratica;
    turmaPraticaSemVagas.vagas = 0;

    const atual: boolean = servico.podeSolicitarAviso(turmaPraticaSemVagas);

    expect(atual).toBeTruthy();
  });

  it('Uma turma prática com vagas não pode solicitar aviso', () => {
    const turmaPraticaComVagas = new Turma();
    turmaPraticaComVagas.codigoTipoCargaHoraria = TipoCargaHoraria.Pratica;
    turmaPraticaComVagas.vagas = 10;

    const atual: boolean = servico.podeSolicitarAviso(turmaPraticaComVagas);

    expect(atual).toBeFalsy();
  });

  it('Quando uma turma teórica possui pelo menos uma complementar prática sem vagas, pode solicitar aviso', () => {
    const complementarTeorica = new TurmaComplementar();
    complementarTeorica.codigoTipoCargaHoraria = TipoCargaHoraria.Teorica;

    const complementarPraticaSemVagas = new TurmaComplementar();
    complementarPraticaSemVagas.codigoTipoCargaHoraria = TipoCargaHoraria.Pratica;
    complementarPraticaSemVagas.vagas = 0;

    const turma = new Turma();
    turma.codigoTipoCargaHoraria = TipoCargaHoraria.Teorica;
    turma.complementares = [ complementarTeorica, complementarPraticaSemVagas ];

    const atual: boolean = servico.podeSolicitarAviso(turma);

    expect(atual).toBeTruthy();
  });

  it('Quando uma turma teórica possui complementar prática com vagas, não pode solicitar aviso', () => {
    const complementarTeorica = new TurmaComplementar();
    complementarTeorica.codigoTipoCargaHoraria = TipoCargaHoraria.Teorica;

    const complementarPraticaComVagas = new TurmaComplementar();
    complementarPraticaComVagas.codigoTipoCargaHoraria = TipoCargaHoraria.Pratica;
    complementarPraticaComVagas.vagas = 10;

    const turma = new Turma();
    turma.codigoTipoCargaHoraria = TipoCargaHoraria.Teorica;
    turma.complementares = [ complementarTeorica, complementarPraticaComVagas ];

    const atual: boolean = servico.podeSolicitarAviso(turma);

    expect(atual).toBeFalsy();
  });

  it('Quando uma turma teórica possui complementares teóricas, não pode solicitar aviso', () => {
    const complementarTeorica = new TurmaComplementar();
    complementarTeorica.codigoTipoCargaHoraria = TipoCargaHoraria.Teorica;

    const complementarTeoricaSemVagas = new TurmaComplementar();
    complementarTeoricaSemVagas.codigoTipoCargaHoraria = TipoCargaHoraria.Teorica;
    complementarTeoricaSemVagas.vagas = 0;

    const turma = new Turma();
    turma.codigoTipoCargaHoraria = TipoCargaHoraria.Teorica;
    turma.complementares = [ complementarTeorica, complementarTeoricaSemVagas ];

    const atual: boolean = servico.podeSolicitarAviso(turma);

    expect(atual).toBeFalsy();
  });

  it('Quando uma turma prática com vagas possui complementares práticas sem vagas, pode solicitar aviso', () => {
    const complementarPraticaComVagas = new TurmaComplementar();
    complementarPraticaComVagas.codigoTipoCargaHoraria = TipoCargaHoraria.Pratica;
    complementarPraticaComVagas.vagas = 10;

    const complementarPraticaSemVagas = new TurmaComplementar();
    complementarPraticaSemVagas.codigoTipoCargaHoraria = TipoCargaHoraria.Pratica;
    complementarPraticaSemVagas.vagas = 0;

    const turma = new Turma();
    turma.codigoTipoCargaHoraria = TipoCargaHoraria.Pratica;
    turma.vagas = 10;
    turma.complementares = [ complementarPraticaComVagas, complementarPraticaSemVagas ];

    const atual: boolean = servico.podeSolicitarAviso(turma);

    expect(atual).toBeTruthy();
  });

  it('Quando uma turma prática com vagas possui complementares práticas com vagas, não pode solicitar aviso', () => {
    const complementarPraticaComVagas1 = new TurmaComplementar();
    complementarPraticaComVagas1.codigoTipoCargaHoraria = TipoCargaHoraria.Pratica;
    complementarPraticaComVagas1.vagas = 10;

    const complementarPraticaComVagas2 = new TurmaComplementar();
    complementarPraticaComVagas2.codigoTipoCargaHoraria = TipoCargaHoraria.Pratica;
    complementarPraticaComVagas2.vagas = 1;

    const turma = new Turma();
    turma.codigoTipoCargaHoraria = TipoCargaHoraria.Pratica;
    turma.vagas = 10;
    turma.complementares = [ complementarPraticaComVagas1, complementarPraticaComVagas2 ];

    const atual: boolean = servico.podeSolicitarAviso(turma);

    expect(atual).toBeFalsy();
  });

  it('Quando uma turma prática com vagas possui complementares teóricas, não pode solicitar aviso', () => {
    const complementarTeoricaComVagas = new TurmaComplementar();
    complementarTeoricaComVagas.codigoTipoCargaHoraria = TipoCargaHoraria.Teorica;
    complementarTeoricaComVagas.vagas = 10;

    const complementarTeoricaSemVagas = new TurmaComplementar();
    complementarTeoricaSemVagas.codigoTipoCargaHoraria = TipoCargaHoraria.Teorica;
    complementarTeoricaSemVagas.vagas = 0;

    const turma = new Turma();
    turma.codigoTipoCargaHoraria = TipoCargaHoraria.Pratica;
    turma.vagas = 8;

    const atual: boolean = servico.podeSolicitarAviso(turma);

    expect(atual).toBeFalsy();
  });

  it('Quando uma turma prática sem vagas é a atual, não pode solicitar aviso', () => {
    const turma = new Turma();
    turma.codigoTipoCargaHoraria = TipoCargaHoraria.Pratica;
    turma.vagas = 0;
    turma.eTurmaAtual = true;

    const atual: boolean = servico.podeSolicitarAviso(turma);

    expect(atual).toBeFalsy();
  });

});
