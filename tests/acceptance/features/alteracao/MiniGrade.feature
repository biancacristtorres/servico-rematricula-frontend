#language: pt

Funcionalidade: Realizar alterações na seleção de turmas e visualizar os horários alterados na mini grade

Cenário: Aluno realiza a remoção de uma turma que possui horário
Dado que sou 'João'
E que estou na tela de Alteração
E que acionei a expansão da disciplina 'Geologia'
Quando seleciono a opção Nenhuma das opções
Então visualizo o horário da turma que estava marcada sendo removido da mini grade

Cenário: Aluno realiza a adição de uma turma que possui horário 
Dado que sou 'João'
E que estou na tela de Alteração
E que acionei a expansão da disciplina 'Física Termodinâmica, Ótica e Ondas'
Quando seleciono a turma EME4BN-COA1
Então visualizo o horário da turma que acabei de marcar aparecendo na mini grade

Cenário: Aluno realiza uma alteração de horário de uma turma que possui horário
Dado que sou 'João'
E que estou na tela de Alteração
E que acionei a expansão da disciplina 'Geologia'
Quando seleciono a turma ECR4BN-COA
Então visualizo o horário da turma que estava marcada sendo removido da mini grade
E visualizo o horário da turma que acabei de marcar aparecendo na mini grade
