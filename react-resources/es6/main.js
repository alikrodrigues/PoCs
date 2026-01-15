// SET - LET
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

// Symbol - para resolver problemas reais de colisão e encapsulamento de chaves em objetos.
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

// Reflect - para resolver problemas de inconsistencias
// Captura propriedade com valor "dinamico", para interceptar e resolver problemas atuando com o Proxy

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

// Proxy - Interceptar operações como get/set/in/delete...

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
