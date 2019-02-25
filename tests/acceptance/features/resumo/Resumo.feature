#language: pt

Funcionalidade: Tela de resumo do processo de rematrícula do aluno

Cenário: Aluno está na tela de Resumo e acessa a tela de Alteração
Dado que sou 'João'
E que estou na tela de Resumo
Quando aciono o botão Alterar Disciplinas e Horários
Então sou redirecionado para tela de Alteração

Cenário: Aluno aciona a opção 'Ver datas' de uma disciplina na tela de resumo
Dado que sou 'Ricardo'
E que estou na tela de Resumo
Quando aciono a opção 'Ver datas' da disciplina 'Língua Brasileira de Sinais - LIBRAS'
Então visualizo uma modal com as datas da aula da disciplina
