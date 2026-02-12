## Class, Objects, Arrays, Map and Set, JSON

### Porque surgiu e quando surgiu ?

# Class

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
