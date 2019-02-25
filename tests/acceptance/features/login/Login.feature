#language: pt

Funcionalidade: Tela de login para autenticação do usuário no sistema

@interesse @ignore
Cenário: Aluno acessa o sistema e visualiza a tela de Início do Interesse
Dado que sou 'Mateus'
E que estou na tela de Login
E que preenchi as informações de login e senha
Quando realizo o login
Então sou redirecionado para a tela de Início

Cenário: Aluno tenta realizar login e recebe mensagem de erro de permissão
Dado que sou 'João'
E que estou na tela de Login
E que não preenchi corretamente as informações de login e senha
Quando realizo o login
Então visualizo uma mensagem de erro de permissão

Cenário: Aluno acessa o sistema mas possui pendência financeira
Dado que sou 'Jorge'
E que estou na tela de Login
E que preenchi as informações de login e senha
Quando realizo o login
Então sou redirecionado para a tela de Pendência Financeira

Cenário: Aluno acessa o sistema, já possui o contrato assinado, não possui pendência financeira e não possui pendência de documentos
Dado que sou 'João'
E que estou na tela de Login
E que preenchi as informações de login e senha
Quando realizo o login
Então sou redirecionado para a tela de Resumo

Cenário: Aluno acessa o sistema mas possui pendência de documentos
Dado que sou 'Sabrina'
E que estou na tela de Login
E que preenchi as informações de login e senha
Quando realizo o login
Então sou redirecionado para a tela de Pendência Acadêmica

Cenário: Aluno acessa o sistema mas não possui contrato assinado
Dado que sou 'Manuela'
E que estou na tela de Login
E que preenchi as informações de login e senha
Quando realizo o login
Então sou redirecionado para a tela de Contrato

Cenário: Aluno acessa o sistema mas não está no softlaunch
Dado que sou 'Amanda'
E que estou na tela de Login
E que preenchi as informações de login e senha
Quando realizo o login
Então sou redirecionado para a tela de SoftLaunch