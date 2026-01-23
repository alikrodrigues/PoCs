// SET - LET
// O let foi criado para trazer ao JavaScript algo que outras linguagens já tinham há décadas:
// escopo de bloco e comportamento previsível

// Set, mais performatico que o array ou object, não aceita duplicado, tem funções nativas

function SetJs() {
  const languages = new Set();
  languages.add("JS");
  languages.add("Java");
  languages.add("Kotlin");

  const iterator = languages.values();

  let nextItem = iterator.next();
  while (!nextItem.done) {
    console.log("Language: ", nextItem.value);
    nextItem = iterator.next();
  }
}

// Symbol - para resolver problemas reais de colisão e encapsulamento de chaves em objetos.

function Symbol() {
  const person = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
    eyeColor: "blue",
  };

  let id = Symbol("id");
  person[id] = 140353;
  console.log(person.id);
  console.log(person[id]);
}

// Reflect - para resolver problemas de inconsistencias
// Captura propriedade com valor "dinamico", para interceptar e resolver problemas atuando com o Proxy

function Reflect() {
  const house = {
    flatRoof: false,
    stairs: true,
    garage: true,
    pool: false,
  };

  console.log("Does the house have a pool ? ", Reflect.get(house, pool));

  /// SIMULATE A DYNAMIC PROP SELECT
  const props = Object.keys(house);
  const randomProp = props[Math.floor(Math.random() * props.length)];
  //

  console.log("Selected Prop value: ", Reflect.get(house, randomProp));
}

// Proxy - Interceptar operações como get/set/in/delete...

function Proxy() {
  const user = {
    name: "Alik",
    age: 30,
  };

  const proxy = new Proxy(user, {
    get(target, prop) {
      console.log("Acessando:", prop);
      // Fazer alguma coisa
      if (prop === "age") {
        console.log("Idade exposta ao cliente");
      }
      return target[prop];
    },

    deleteProperty(target, prop) {
      if (prop === "id") {
        console.log("❌ Não é permitido deletar o id");
        return false;
      }
      console.log(`[AUDIT] Removendo ${String(prop)}`);
      return Reflect.deleteProperty(target, prop);
    },
  });

  console.log(proxy.name);
}

// 2017
//String Padding
// Adiciona em uma string outra string até chegar um tamanho limitado no primeiro parametro

function StringPadding() {
  let text = "12";
  text = text.padStart(4, "Alik");
  console.log(text); // Al12

  let text1 = "12";
  text1 = text1.padStart(4, 0);
  console.log(text1); // Al12

  let text2 = "12";
  text2 = text2.padEnd(8, 0);
  console.log(text2); // 12000000
}

// Entries
// Passado um objeto ele vai devolver um array com arrays de dois valores: attributo/key e valor
function Entries() {
  const houseEntrie = {
    street: "Criciuma",
    number: "275",
    stuff: ["sofá", "TV", "Fogão"],
  };

  let entries = Object.entries(houseEntrie);
  console.log(entries);
  //   [
  //    [ 'street', 'Criciuma' ],
  //    [ 'number', '275' ],
  //    [ 'stuff', [ 'sofá', 'TV', 'Fogão' ] ]
  //   ]
}

//JS 2019
//Flat Map

const myArr = [1, 2, 3, 4, 5, 6];
const newArr = myArr.flatMap((x) => [x, x * 10]);
console.log(newArr);

const array = [{ items: ["a", "b"] }, { items: ["c", "d"] }];
console.log(array.flatMap((item) => item.items));

// JS 2021
// Promise.Any
//Retorna a primeira promise que foi finalizada

const carPromise = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, { id: "CAR_1232", name: "HRV", categoryId: "SUV" });
});

const categoryCarPromise = new Promise((resolve, reject) => {
  setTimeout(resolve, 1200, { id: "SUV", size: "3M" });
});

Promise.any([carPromise, categoryCarPromise]).then((result) => {
  console.log(result);
});

// JS 2026
// is error Safer than instanceof
Error.isError(new TypeError()); // true
Error.isError({ name: "Error" }); // false
