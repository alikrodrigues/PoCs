## Tailwind CSS

Tailwind foi criado em 2017 com um objetivo de resolver um problema com de replicação de estilo comuns como o padding, margin que pode seguir um padrão unico de tamanho. Na intenção de não precisar dos arquivos css gigantes que existiam.

Vamos criar um exemplo bem dinamico, uma div com um headline e botao.
headline vamos alterar o font family para Arial e o tamanho 14px, cor azul.
A Div um padding 4px de horizontal e 2px de vertical, borda arredondada de 12px.
Botão background azul com label dizendo click me com a cor vermelha.

```javascript
<div class="px-4 py-2 border rounded-xl">
  <h1 class="text-blue-600 text-sm" style="font-family: Arial, sans-serif;">
    Isto é uma Headline
  </h1>
  <button class="mt-2 bg-blue-600 text-red-500 px-4 py-1 roudend">
    Click Me
  </button>
</div>
```

O tailwind nos traz o conceito de classes tailwind onde podemos usar e reusar em diversos componentes, exemplo:

No codigo acima teriamos naturalmente que criar um outro arquivo que seria css onde teriamos umas 3 clases (div,h1,button), aqui elimina esse arquivo a mais e estamos reutilizando a classe px-4 que seria repetida..

Na comunidade existe um meme para html "sujo" do taillwind, onde voce sempre vai precisar de uma tela mais larga

```javascript

// Antes (CSS tradicional):
<div class="card-perfil" />
// Depois (Tailwind):
<div class="flex flex-col md:flex-row items-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200" />
```

### Tamanho e perfomance

O tailwind trabalha com JIT ( Just In Time ) Compilation, isso faz a limpeza de classes que não estão sendo utilizadas, além da possibilidade de minimizar em muitos X a quantidade de files, isso impacta no tamanho do bundle e do tempo que o Browser vai requerer para fazer o download.

#### Desempenho e Tamanho do Arquivo

| Métrica                        | Tailwind CSS                                         | CSS Baunilha                                                        | Notas                                                                                                                                                                                              |
| :----------------------------- | :--------------------------------------------------- | :------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tamanho do Arquivo CSS**     | Geralmente menor (frequentemente <10KB)              | Pode ser bem maior (ex: 90KB+) se não for cuidadosamente gerenciado | O Tailwind usa o PurgeCSS para remover estilos não utilizados em produção, resultando em arquivos CSS pequenos e otimizados.                                                                       |
| **Tamanho do Arquivo HTML**    | Maior devido a inúmeras classes utilitárias          | Menor, pois os estilos são externos                                 | O aumento no tamanho do HTML é frequentemente altamente compressível com gzip, mitigando o impacto no desempenho no carregamento inicial.                                                          |
| **Desempenho de Renderização** | Pode ser um pouco mais lento em casos de nicho       | Geralmente mais rápido em testes brutos de recálculo                | Benchmarks com milhares de elementos únicos mostram pequenas diferenças, muitas vezes insignificantes em aplicações do mundo real, a menos que seja abusado com um excesso de classes arbitrárias. |
| **Processo de Build**          | Requer uma etapa de build (Node.js, config)          | Nenhuma etapa de build é necessária                                 | O Tailwind precisa de processamento para gerar e otimizar o CSS final.                                                                                                                             |
| **Velocidade de Dev**          | Muito Alta: Sem troca de ficheiros; classes prontas. | Moderada: Requer criar nomes de classes e gerir ficheiros .css.     |

### Conclusão de Perfomance

Tamanho do Bundle: Em testes com 1.000 componentes, o Tailwind resultou num tamanho total (HTML+CSS) 55% menor que o CSS puro minificado, devido à reutilização agressiva de classes.

Tempo de Renderização: O CSS puro pode ser 25-33% mais rápido na renderização inicial do browser em cenários extremos, pois o Tailwind gera mais declarações de estilo no motor do browser
(recalculação de estilos).

Velocidade de Entrega: No mundo real, sites como o da Netflix usam Tailwind para manter o CSS abaixo de 10KB, o que melhora drasticamente o tempo de carregamento em redes lentas. Isso só é possível pela reutilização das clases do tailwind, que precisa ser baixado apenas uma vez e depois sendo reutilizados.

Apesar da renderização com CSS puro ser mais rapida, o bundle com tailwind é menor e isso impacta no tempo de carregamento do site/web que no contexto geral torna mais lento o uso.

### Clases Tailwind

Exemplos de classes mais conhecidas:

- **`flex`**: Ativa o Flexbox. É a base de 90% dos layouts modernos.
- **`items-center`**: Alinha os itens verticalmente ao centro (dentro do flex).
- **`justify-between`**: Espaça os itens de forma igual, empurrando o primeiro para a esquerda e o último para a direita.
- **`p-4`**: Aplica padding (espaço interno) de 1rem (16px) em todos os lados.
- **`m-auto`**: Centraliza um elemento horizontalmente (o famoso `margin: 0 auto`).
- **`bg-blue-500`**: Define uma cor de fundo azul padrão (o número define a intensidade).
- **`text-white`**: Define a cor do texto como branco.
- **`rounded-lg`**: Aplica cantos arredondados (`border-radius`) de tamanho grande.
- **`w-full`**: Faz o elemento ocupar 100% da largura do pai.
- **`hidden`**: Esconde o elemento (`display: none`). Muito usado com prefixos como `md:block` para fazer sites responsivos.
- **`hover:bg-blue-700`**: Adicionar um efeito de `hover`.
