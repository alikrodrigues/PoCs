# Fetch vs Axios

## Benchmark: Browser vs Node.js

### No Browser (axios e fetch lado a lado)

```
axios finally in 2 ms
axios finally in 7 ms
axios finally in 3 ms
axios finally in 9 ms

fetch finally in 3 ms
fetch finally in 2 ms
fetch finally in 3 ms
fetch finally in 2 ms
```

### No Node.js (fetch puro, sem browser)

```
finally in 119 ms
finally in 120 ms
finally in 121 ms
finally in 122 ms
finally in 122 ms
```

### Por que o Node.js e tao mais lento?

Nao e o `fetch` que e lento — e o **ambiente**. O browser tem vantagens enormes:

- **Cache de DNS** — o browser ja resolveu o dominio antes. O Node faz do zero toda vez que roda o script.
- **Reuso de conexao (keep-alive / HTTP/2)** — o browser mantem conexoes TCP+TLS abertas e reaproveita. O Node abre uma conexao nova a cada execucao.
- **Handshake TLS** — estabelecer HTTPS custa 2-3 round trips. O browser ja fez isso. O Node faz do zero.

No browser, **axios e fetch tem performance quase identica** (2-9ms ambos). A diferenca real aparece quando comparamos browser vs Node.js (~120ms).

---

## Axios: Vantagens

- **Interceptors** — permite interceptar requests e responses globalmente (ex: adicionar token de auth em toda request, tratar erro 401 em um lugar so)
- **Instancia configuravel** — `axios.create({ baseURL, headers })` cria um client reutilizavel com configuracao padrao
- **Transformacao automatica de JSON** — nao precisa fazer `response.json()` manualmente, ja vem parseado em `response.data`
- **Cancelamento de requests** — suporte nativo via `AbortController` ou `CancelToken` (mais facil de usar que no fetch)
- **Timeout configuravel** — define timeout direto na config: `axios.get(url, { timeout: 5000 })`
- **Progresso de upload/download** — suporte a `onUploadProgress` e `onDownloadProgress`
- **Tratamento de erro melhor** — rejeita a promise automaticamente para status 4xx/5xx (fetch so rejeita em erro de rede)

## Axios: Desvantagens

- **Dependencia externa** — precisa instalar via npm, aumenta o bundle size (~13KB gzipped)
- **Precisa de bundler** — nao funciona com `import "axios"` direto no browser, precisa de Vite/Webpack para resolver o modulo
- **Overhead pra coisas simples** — se voce so quer um GET basico, `fetch` faz a mesma coisa sem instalar nada
- **Mais uma coisa pra atualizar** — dependencia a mais = mais uma coisa pra manter, atualizar e auditar por vulnerabilidades
- **Abstrai demais** — pode esconder detalhes importantes do HTTP que o fetch deixa explicito (ex: streams, Response API)

## Quando usar cada um?

| Situacao | Usar |
|---|---|
| Projeto simples, poucos requests | `fetch` nativo |
| Projeto com auth, interceptors, error handling global | `axios` |
| Precisa de upload com progresso | `axios` |
| Quer zero dependencias | `fetch` nativo |
| API com tratamento complexo de erros (retry, refresh token) | `axios` |
