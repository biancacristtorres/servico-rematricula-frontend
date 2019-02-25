#language: pt
@ignore @debitoTecnico
Funcionalidade: Tela de contrato onde o aluno consegue visualizar e assinar seu contrato de matrícula

Cenário: Aluno aceita o contrato de matrícula
Dado que sou 'Manuela'
E que estou na tela de Contrato
Quando aceito o contrato
Então sou redirecionado para a tela de Resumo