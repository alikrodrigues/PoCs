/*

React Lifecycles pode ser descrevido em dois metodos: 
 
    Class Methods         Vs       Hook Methods 

    componentDidMount             useEffect(() => { ... }, [])
    componentDidUpdate            useEffect(() => { ... }, [dep])

    componentWillUnmount           useEffect(() => { ... return () => { ... } }, [])

Ciclos de vida momentos da aplicação que temos callbacks, uma possibilidade de executar nosso codigo em uma fase da vida do componente (no caso do react)
O metodo class ele é mais antigo, era a forma anterior de escrever componentes react, onde usavamos Class MeuComponente extends React.Component 
apartir de 2019 com o React 16.8.0 o novo padrão e forma de escrever componentes mudaram e tudo virou função. 

Fases da vida de um componente React: 
componente foi montado na virtual dom = html gerado para atualizar a verdadeira DOM
componente foi atualizado = quando por exemplo a gente quer executar um codigo quando uma variavel/atributo atualize 
componente esta sendo desmontado = pode ser usado para limpar bancos como localStorage, pode ser usado para limpar memoria ou
                                                             qualquer outra coisa que queira executar quando o componente for removido da tela


na minha poc React Arch você pode encontrar de uma maneira simples como o useEffect funciona, no arquivo do useEffect: 
o meu useEffect recebe a função e as dependencias em caso queira usar o "didUpted", 
a gente tem uma fila de efeitos para serem disparados um a um, então a gente adiciona essa função que recebemos por parametro para ser chamada
dentro de outra função nova que essa é adicionado a fila de efeitos.

function useEffect(fn, deps) {
...
   effectQueue.push(() => {
      const cleanup = fn();
      hooks[idx] = { deps, cleanup };
    });
....


No arquivo renders.js é onde essa fila de efeitos são consumidos e executado 
o flushEffects é chamado pelo mount ( quando motnamos pela primeira vez ) e no rerender 
Ele fica em loop para executar toda a sua fila, removendo ao mesmo tempo que executa a função.

function flushEffects() {
  while (effectQueue.length) effectQueue.shift()();
}


*/
