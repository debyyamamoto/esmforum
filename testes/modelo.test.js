const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test('Testando cadastrar respostas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  let perguntas = modelo.listar_perguntas();
  modelo.cadastrar_resposta(perguntas[0].id_pergunta, '2');
  perguntas = modelo.listar_perguntas();
  expect(perguntas[0].num_respostas).toBe(1);
});

test('Testando get_pergunta e get_resposta', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  let perguntas = modelo.listar_perguntas();
  modelo.cadastrar_resposta(perguntas[0].id_pergunta, '2');
  perguntas = modelo.listar_perguntas();

  const a = modelo.get_pergunta(perguntas[0].id_pergunta)
  const b = modelo.get_respostas(perguntas[0].id_pergunta)

  expect(a.texto).toBe(perguntas[0].texto);
  expect(b.length).toBe(1);
  expect(b[0].texto).toBe('2');
})
