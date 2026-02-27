## Class, Objects, Arrays, Map and Set, JSON

### Class

Clases podem ser explicadas como um tipo de função especial que podem ter seu proprio "ecosistema" com seus atributos e funções internas,
Criada no ES6(ECMA 2015), por debaixo dos panos o JS ainda é prototype mas a inserção da palavra reservada Class ajudou a criar um padrão familiar
onde devs já estavam acostumados com linguagens OO,

```javascript
class Hero {
  constructor(name) {
    this.name = name;
  }
}

console.log(typeof Hero); // Output: "function"
```

Classes no javascript foi comumente usada por frameworks como Angular e React

```javascript
class ComponentA extends React.Component {
  render() {
    return (
      <div>
        <form>
          <span> Insert your name </span>
          <input />
        </form>
      </div>
    );
  }
}
```

### Objects

Objetos são variaveis que podem armazenar valores e funções, valores são armazenados com chave e valor (key:value), comumente chamado de propriedades.

Funções são armazenadas como chave e função (key:function())

```javascript
var car = {
  name: "Ducato",
  isMotorhome: true,
  start: function () {
    console.log("start engine");
  },
  getPowerEletricityExpectation: function () {
    if (!this.isMotorhome) {
      return "Only motorhome has energy suply";
    }
    return "128min";
  },
};
```

#### Como acessar/alterar uma propriedade

```javascript
let carName = car.name;
// or
// Para quando o nome do atributo for dinamico, por exemplo: API

const attributeName = "name";
let carNaem = car[attributeName];

// it allows string also
let carName = car["name"];
```

para mudar/alterar valor da propriedade:

```javascript
console.log(car.name); // Ducato

car.name = "Sprinter";

console.log(car.name); // Sprinter
```

para adicionar propriedade:

```javascript
car.hasFreezer = true;
```

para deletar propriedade:

```javascript
delete car.hasFreezer;
// or
delete car["hasFreezer"];
```

Checar existencia

```javascript
let result = "firstName" in car;
console.log(result); // false
```

Objetos podem ter objetos dentro deles (Nested)

```javascript
let myObj = {
  myCars: {
    car2: "Fusca",
  },
};

//Acessando o atributo car2, que esta dentro do objeto myCars, que é um atributo do myObj

myObj.myCars.car2;

myObj.myCars["car2"];

myObj["myCars"]["car2"];
```

### Logando um Objeto

Comumente aparece desenvolvedores iniciantes com problemas para logar o objeto.. com o famoso: [Object Object]

Podemos resolver esse problema de algumas maneiras, como:

Desestruturando:

```javascript
console.log({ object });
```

-> isso vai destruturar o objeto e logar cada atributo do mesmo

Transformando em JSON:

```javascript
console.log(JSON.toStringify(object));
```

-> vai converter o objeto em uma string JSON

Printando pelos atributos:

```javascript
console.log(object.name + " ," + object.size);
```

-> vai aparecer os atributos cada um que for chamado

Printando por FOR:

```javascript
for (let x in object) {
  console.log(object[x]);
}
```

-> vai aparecer os atributos TODOS do objeto separadamente por linha.

Capturando os values do objeto e fazer cast para string:

```javascript
const myArray = Object.values(object);

// Stringify the Array
let text = myArray.toString();
//or
let text = myArray.join(", ");

console.log(text);
```

-> A função Values captura os valores de todos os atributos do objeto e depois o toString/Join converte esse array para string.

### Outros jeitos de manipular um Objeto

É muito extensa a variedade de maneiras de como manipular um objeto, vou trazer aqui a Função "construtora" Object, que tem muitas outras funções que podem manipular o objeto, como copiar, mudar valor de atributo, adicionar atributo, capturar as keys do object..

```javascript
// Adicionar ou alterar um atributo
Object.defineProperty(person, "year", { value: "2008" });
```

Com o object conseguimos tambem definir se o Objeto pode ser alterado como adicionar novos atributos e outras coisas como forma de proteger esse Objeto

```javascript
// Cria Array
const fruits = ["Banana", "Orange", "Apple", "Mango"];
Object.preventExtensions(fruits);

// Isso causará um erro:
fruits.push("Kiwi");

// *** Seal Object

// Cria Object
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
};

Object.seal(person);

// Isso causará um erro:
delete person.age;

// *** Freeze Object

// Freeze Object
Object.freeze(person);

// Isso causará um erro:
person.age = 51;
```

### Map

map, filter e reduce (introduzidos no ES5), motivados pela popularização da programação funcional.

Basicament como muita coisa em JS Map é um objeto por debaixo dos panos, é muito parecido com o dictionary de algumas linguagens ou o proprio Map do Java

```javascript
// Criando um Map
const fruits = new Map([
  ["apples", 500],
  ["bananas", 300],
  ["oranges", 200],
]);

// Adicionando um atributo novo no Map
fruits.set("mangos", 100);

// ou alterando
fruits.set("apples", 200);

// capturando
fruits.get("apples");

// Retonar que o tipo é object:
typeof fruits;

// Retorna verdadeiro para instancia de um Map:
fruits instanceof Map;
```

| Característica         | `Object`                                 | `Map`                                        |
| :--------------------- | :--------------------------------------- | :------------------------------------------- |
| Iterabilidade          | Não é diretamente iterável               | Diretamente iterável                         |
| Propriedade de tamanho | Não possui uma propriedade `size`        | Possui uma propriedade `size`                |
| Tipos de chaves        | As chaves devem ser Strings (ou Symbols) | As chaves podem ser de qualquer tipo de dado |
| Ordem das chaves       | As chaves não são bem ordenadas          | As chaves são ordenadas por inserção         |
| Chaves padrão          | Possui chaves padrão                     | Não possui chaves padrão                     |

Fontes:

https://www.w3schools.com/js/js_maps.asp

https://www.w3schools.com/js/js_classes.asp

https://www.w3schools.com/js/js_asynchronous.asp

https://www.w3schools.com/js/js_object_advanced.asp
