#language:pt

Funcionalidade: Aluno realiza solicitação de alteração de matrícula e recebe notificação de quebra de módulo e mínimo de disciplinas

Cenário: Aluno solicita alteração de matrícula e recebe notificação de quebra de módulo
Dado que sou 'Alessandra'
E que estou na tela de Alteração
Quando retiro a disciplina 'Administração Financeira' da minha matrícula
E aciono o botão Salvar Alterações
Então visualizo uma mensagem de quebra de módulo

Cenário: Aluno solicita alteração de matrícula e recebe notificação de mínimo de disciplinas
Dado que sou 'Rafaela'
E que estou na tela de Alteração
Quando aciono o botão Salvar Alterações
Então visualizo uma mensagem de mínimo de disciplinas