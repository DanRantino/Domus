# Domus

Monorepo com dois aplicativos independentes:

- `backend`: API NestJS com TypeORM e SQLite para desenvolvimento.
- `frontend`: aplicação TanStack Start com TanStack Router e TanStack Query.

## Requisitos

- Node.js 22+
- npm 10+

## Desenvolvimento

Instale as dependências na raiz:

```bash
npm install
```

Em dois terminais, execute:

```bash
npm run dev:backend
npm run dev:frontend
```

O frontend fica em `http://localhost:3000` e a API em `http://localhost:3001/api`.
Copie os arquivos `.env.example` de cada app para `.env` quando precisar alterar os padrões.

## Produção

Use migrações do TypeORM em produção. O `synchronize` está habilitado apenas fora de `NODE_ENV=production`.
