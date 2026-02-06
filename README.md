# Habit Tracker 📱

Aplicativo mobile para rastreamento de hábitos pessoais desenvolvido com React Native e Expo.

## Stack Tecnológica

- **Framework**: React Native + Expo (Managed)
- **Linguagem**: TypeScript
- **Navegação**: Expo Router
- **Estado Global**: Zustand
- **Validação**: Zod + React Hook Form
- **Testes**: Jest + Testing Library

## Pré-requisitos

- Node.js 18+
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app (para testar no dispositivo físico)

## Instalação

```bash
# Clonar o repositório
git clone [url-do-repositorio]

# Entrar na pasta do projeto
cd habit-tracker

# Instalar dependências
npm install
```

## Executar o Aplicativo

```bash
# Iniciar o servidor de desenvolvimento
npx expo start
```


Após executar o comando:
- Pressione `a` para abrir no emulador Android
- Pressione `i` para abrir no simulador iOS
- Escaneie o QR Code com o app Expo Go no seu dispositivo

## Executar os Testes

```bash
# Rodar todos os testes
npm run test

# Rodar testes em modo watch
npm run test:watch

# Rodar testes com cobertura
npm run test -- --coverage
```

## Estrutura do Projeto

```
/
├── app/                    # Rotas Expo Router
│   ├── _layout.tsx         # Layout principal
│   ├── index.tsx           # Lista de hábitos
│   ├── create.tsx          # Criar novo hábito
│   └── detail/[id].tsx     # Detalhes do hábito
├── src/
│   ├── components/         # Componentes UI (Input, Button, Card)
│   ├── domain/             # Schema Zod e tipos TypeScript
│   ├── store/              # Zustand Store
│   └── hooks/              # Hooks customizados
├── docs/                   # Documentação acadêmica
└── README.md
```

## Funcionalidades

- ✅ Listar hábitos cadastrados
- ✅ Criar novo hábito com validação
- ✅ Visualizar detalhes do hábito
- ✅ Remover hábito com confirmação
- ✅ Alternar status ativo/inativo
- 🔲 Edição completa de hábitos (em desenvolvimento)

## Regras de Negócio

1. **Frequência Semanal**: Deve ser entre 1 e 7 dias
2. **Meta Diária**: Deve ser maior que 0 minutos
3. **Data de Início**: Não pode ser uma data futura

## Documentação

A documentação completa do projeto está disponível em:
- `docs/projeto-mobile/identificacao.md` - Identificação do projeto
- `docs/projeto-mobile/relatorio-final.md` - Relatório final
- `docs/projeto-mobile/plano-de-testes.md` - Plano de testes
- `docs/projeto-mobile/prompt-log.md` - Log de prompts IA

## Licença

Este projeto foi desenvolvido para fins acadêmicos.
