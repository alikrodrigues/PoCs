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
