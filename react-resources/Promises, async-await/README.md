## Promises, async/await no JS

### Porque surgiu e quando surgiu ?

Promises foi padronizado no ES2015 com o intuito de resolver problemas que o antigo "caminho" com callback geravam, popularmente conhecido como "callback hell" ou "callback pyramid".
Existe um problema quando se usa callback em sequencia, podendo tornar o codigo dificil de ler, dificil de debugar e de entender.

### Palavras chaves para essa leitura

resolve = Função que sera executada assim que a Promise obter sucesso na sua execução

reject = Função que sera executada se a Promise obter errors (Ex: Acessar um atributo de um objeto null/undefined )

then = Nomenclatura utilizada no promisse para encadear o que deve ser executado após a execução da Promise

catch = Nomenclatura utilizada no promisse para encadear o que deve ser executado em caso de erro ( Ex: caso der erro de objeto undefined, você pode querer "logar" na sua ferramenta de observabilidade)

### Beneficios:

1 - Maior controle e melhora na sintaxe deixando mais facil de ler, com o uso do "then" por exemplo o desenvolverdor vai conseguir entender e ver com facilidade o que vai ser executado pelo resolve, e isso fica mais forte ainda quando se tem um encadeamento de promises, pode ser interpretado como "do this, then do that, then do that too"

```javascript
chamaApiDeCadastro(dados)
  .then((data) => {
    return chamaApiDeLogin();
  })
  .then(() => console.log("Autenticado com sucesso !"));
```

pseudo codigo exemplificando uma encadeamento de duas promises.

2 - Funções especificas da promises que nos traz mais controle, são elas:

Promise.allSettled() = Recebe um array de promises executa todas e devolve o retorno em um array com as repostas seja elas resolve ou reject

Promise.all() = Recebe um array de promises executa todas se alguma der rejeitado ele interrompe a execução podendo ficar promises sem serem executadas

Promise.race() = Recebe um array de promises e retorna a primeira que finalizar seja sucesso ou rejeitado

Promise.any() = Assim como o race ele tbm retornar a primeira a finalizar mas ela considera apenas a primeira que obteve sucesso.

Promise.resolve() = Cria uma promise já resolvida (sucesso)

Promise.reject() = Cria uma promise já rejeitada (erro)

### Async Await

Uma forma mais simples de trabalhar com as Promise, lançado no ES2017

```javascript
function getUser() {
  return Promise.resolve({
    id: 1,
  });
}

getUser().then((user) => {
  console.log(user);
});

//      VS

async function getUser() {
  return {
    id: 1,
  };
}

const user = await getUser();
console.log(user);
```

o beneficio fica mais visivel quando vc trabalha com mais de uma chamadas asyncronas

```javascript
function getUser() {
  return Promise.resolve({
    id: 1,
  });
}

function getCar() {
  return Promise.resolve({
    id: 1,
    name: "Fusca",
  });
}

getUser()
  .then((user) => {
    console.log(user);
    return getCar();
  })
  .then((car) => {
    console.log(car);
  });

//      VS

async function getUser() {
  return {
    id: 1,
  };
}

async function getCar() {
  return {
    id: 1,
    name: "Fusca",
  };
}

Promise.allSettled(getCar, getUser);

const user = await getUser();
const car = await getCar();
console.log(user);
console.log(car);
```

Os metodos do Promise tbm podem ser usados com funções async

```javascript
Promise.allSettled([getCar(), getUser()]).then((result) => console.log(result));
```
