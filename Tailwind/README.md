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

O tailwind trabalha com JIT ( Just In Time ) Compilation, isso faz a limpeza de classes que não estão sendo utilizadas,
