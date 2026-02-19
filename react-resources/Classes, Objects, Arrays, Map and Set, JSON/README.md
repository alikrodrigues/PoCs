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
