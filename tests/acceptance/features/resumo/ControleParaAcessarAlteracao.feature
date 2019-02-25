#language: pt

Funcionalidade: Sistema realiza o controle da alteração do aluno de acordo com o status de processamento da matrícula

Cenário: Botão Alterar Disciplinas desabilitado para o aluno que realizou uma alteração na matrícula e não foi processada ainda
Dado que sou 'Ricardo'
E que minhas alterações estão sendo processadas
Quando acesso a tela de Resumo
Então visualizo o botão Alterar Disciplinas desabilitado

Cenário: Botão Alterar Disciplinas habilitado para o aluno que realizou uma alteração na matrícula e já foi processada
Dado que sou 'João'
E que minhas alterações foram processadas
Quando acesso a tela de Resumo
Então visualizo o botão Alterar Disciplinas habilitado

@ignore
Cenário: Aluno é redirecionado para a tela de Resumo ao acessar a tela de Alteração
Dado que sou 'João'
E que minhas alterações estão sendo processadas
Quando acesso a tela de Alteração
Então visualizo a tela de Resumo

Cenário: Aluno acessa a tela de Alteração diretamente sem redirecionamentos
Dado que sou 'João'
E que minhas alterações foram processadas
Quando acesso a tela de Alteração
Então sou redirecionado para tela de Alteração