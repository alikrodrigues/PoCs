# My React - Prova de Conceito (POC)

Este repositório contém uma Prova de Conceito (POC) com o objetivo de recriar uma versão simplificada do React do zero. A intenção principal é aprofundar o conhecimento sobre a arquitetura e os mecanismos internos que fazem o React funcionar "por debaixo dos panos".

## Arquitetura e Conceitos Chave

A implementação, contida no arquivo `myReact.html`, se baseia em alguns dos conceitos fundamentais do React.

### 1. Virtual DOM (VDOM)

Em vez de manipular o DOM real do navegador diretamente (o que é lento), criamos uma representação dele em memória, feita de objetos JavaScript. Isso é o **Virtual DOM**.

- **Como funciona aqui:** A função `createElement(type, props, ...children)` é a nossa fábrica de "elementos virtuais" (ou `vnodes`). Ela cria um objeto simples que descreve como um elemento da UI deve ser, como `{ type: 'div', props: { id: 'app' }, children: [...] }`.

### 2. Render

O processo de "render" é o ato de pegar a árvore do Virtual DOM e criar os nós do DOM real correspondentes na tela.

- **Como funciona aqui:** A função `renderVNode(vnode, parentEl)` é responsável por transformar um `vnode` em um elemento DOM real (`document.createElement`).

### 3. Reconciliação (Reconciliation)

Este é o "coração" do React. Quando o estado de um componente muda, uma nova árvore de Virtual DOM é gerada. A **reconciliação** é o algoritmo que compara a nova árvore com a antiga para descobrir a menor quantidade de alterações necessárias no DOM real. Isso torna as atualizações de UI muito mais eficientes.

- **Como funciona aqui:** A função `reconcileChildren(parentEl, newChildren, oldNodes)` implementa uma versão simples desse processo. Ela itera sobre os filhos novos e antigos, comparando-os e decidindo se deve adicionar, remover ou substituir um nó no DOM.

### 4. Componentes e Estado (Hooks)

Componentes são funções que recebem `props` e retornam uma descrição da UI (um VDOM). Para que os componentes possam ter memória e interatividade, usamos "Hooks".

- **`useState(initialValue)`:** Permite que um componente funcional tenha seu próprio estado local. Quando o estado é atualizado com a função `setState`, uma nova renderização é agendada.
- **`useEffect(fn, deps)`:** Permite executar "efeitos colaterais" (como alterar o título da página, fazer chamadas de API, etc.) após a renderização do componente. O array de dependências (`deps`) controla quando o efeito deve ser executado novamente.

## O Arquivo `myReact.html`

Toda a mágica acontece em um único arquivo para facilitar o estudo. Ele contém:

1.  **A "Biblioteca" MyReact:**
    - `createElement`: Cria os nós do VDOM.
    - `useState` e `useEffect`: Implementações básicas dos Hooks.
    - `renderVNode`, `reconcileChildren`, `patchProps`: O núcleo do motor de renderização e reconciliação.
    - `mount`, `scheduleRender`, `rerender`: Funções que gerenciam o ciclo de vida da renderização, desde a montagem inicial até as atualizações subsequentes.

2.  **A Aplicação de Exemplo (`CounterApp`):**
    - Um componente funcional simples de contador que usa `useState` para gerenciar o valor da contagem (`count`) e o passo de incremento (`step`).
    - Usa `useEffect` para atualizar o título da página (`document.title`) sempre que a contagem muda.
    - Demonstra como construir uma UI aninhando chamadas `createElement` e como lidar com eventos (`onClick`).

Este projeto é um exercício prático para desmistificar como bibliotecas de UI modernas funcionam, focando nos princípios essenciais de uma forma clara e contida.
