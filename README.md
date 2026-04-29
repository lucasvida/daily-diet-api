# Daily Diet API

> Desafio prático da [Formação Node.js](https://www.rocketseat.com.br/formacao/nodejs) da **Rocketseat**.

API REST para controle de dieta diária — permite registrar refeições, classificá-las dentro ou fora da dieta e acompanhar métricas de progresso por usuário.

---

## Regras de Negócio

- Criação e identificação de usuário entre requisições (via cookie de sessão)
- Registro de refeições com:
  - Nome
  - Descrição
  - Data e hora
  - Status: dentro ou fora da dieta
- Edição e remoção de refeições
- Listagem de todas as refeições do usuário
- Visualização individual de uma refeição
- Métricas por usuário:
  - Total de refeições registradas
  - Total dentro da dieta
  - Total fora da dieta
  - Melhor sequência (*streak*) de refeições dentro da dieta
- Usuário só acessa as próprias refeições

---

## Stack

| Camada | Tecnologia |
|---|---|
| Runtime | Node.js |
| Gerenciador de pacotes | pnpm |
| Documentação | Markdown / PRD |

> As dependências serão adicionadas conforme o projeto evoluir durante os estudos.

---

## Estrutura

```
daily-diet-api/
├── docs/
│   └── PRD.md          # Product Requirements Document
├── .gitignore
├── .npmrc              # Configurações de segurança de dependências
├── pnpm-workspace.yaml # Workspace pnpm com políticas de segurança
└── package.json
```

---

## Setup

```bash
# Instalar dependências
pnpm install

# Rodar em desenvolvimento
pnpm dev
```

---

## Contexto de Estudo

Este projeto é um **desafio prático** da Formação Node.js da Rocketseat. O objetivo é consolidar conceitos como:

- Criação de APIs REST com Node.js
- Gerenciamento de rotas e middlewares
- Persistência de dados com banco de dados
- Autenticação por cookie de sessão
- Validação de dados e regras de acesso

---

## Segurança de Dependências

Este projeto segue boas práticas de segurança de supply-chain:

- Versões fixas (`save-exact`) sem `^` ou `~`
- Scripts de instalação bloqueados (`ignore-scripts`)
- Registry oficial forçado via HTTPS
- Quarentena de 3 dias para novos pacotes (`minimumReleaseAge: 4320`)
- Sub-dependências exóticas bloqueadas (`blockExoticSubdeps`)

Veja [`.npmrc`](.npmrc) e [`pnpm-workspace.yaml`](pnpm-workspace.yaml) para detalhes.

---

## Licença

AGPL-3.0
