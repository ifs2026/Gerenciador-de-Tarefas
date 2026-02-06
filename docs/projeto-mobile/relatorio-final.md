# Relatório Final - Habit Tracker

## 1. Introdução

### 1.1 Objetivo do Projeto
Desenvolver um aplicativo mobile para gerenciamento de hábitos pessoais, implementando um CRUD completo com validação de regras de negócio utilizando a stack tecnológica definida para a disciplina.

### 1.2 Escopo
O projeto consiste em uma aplicação React Native/Expo que permite:
- Listar hábitos cadastrados
- Criar novos hábitos com validação
- Visualizar detalhes de um hábito
- Editar e remover hábitos
- Alternar status ativo/inativo

## 2. Arquitetura do Sistema

### 2.1 Estrutura de Pastas
```
/
├── app/                    # Rotas Expo Router
│   ├── _layout.tsx         # Layout principal
│   ├── index.tsx           # Lista de hábitos
│   ├── create.tsx          # Formulário de criação
│   └── detail/[id].tsx     # Detalhes do hábito
├── src/
│   ├── components/         # Componentes UI reutilizáveis
│   ├── domain/             # Schema Zod e tipos
│   ├── store/              # Zustand store
│   └── hooks/              # Hooks customizados
└── docs/                   # Documentação
```

### 2.2 Fluxo de Dados
1. Usuário interage com a interface (componentes)
2. Hooks gerenciam estado local e formulários
3. Store Zustand gerencia estado global
4. Schema Zod valida dados antes de persistir

## 3. Regras de Negócio Implementadas

| Regra | Descrição | Implementação |
|-------|-----------|---------------|
| RN01 | Frequência semanal entre 1-7 dias | Validação Zod com `.min(1).max(7)` |
| RN02 | Meta diária deve ser positiva | Validação Zod com `.positive()` |
| RN03 | Data de início não pode ser futura | Validação Zod com `.refine()` |

## 4. Funcionalidades Implementadas

### 4.1 Lista de Hábitos (index.tsx)
- [x] Exibição em FlatList com Cards
- [x] Status visual (Ativo/Inativo)
- [x] Badges de frequência e meta
- [x] Botão flutuante (FAB) para criação
- [x] Estado vazio com mensagem orientativa

### 4.2 Criação de Hábito (create.tsx)
- [x] Formulário com React Hook Form
- [x] Validação em tempo real com Zod
- [x] Mensagens de erro em vermelho
- [x] Campos: Nome, Frequência, Meta, Data

### 4.3 Detalhes do Hábito (detail/[id].tsx)
- [x] Exibição de todas as informações
- [x] Botão de Editar (mock)
- [x] Botão de Remover com confirmação
- [x] Toggle de status Ativo/Inativo

## 5. Testes Implementados

### 5.1 Testes Unitários do Schema
- Validação de hábito válido
- Rejeição de frequência > 7
- Rejeição de frequência < 1
- Rejeição de nome curto (< 3 caracteres)
- Rejeição de meta diária ≤ 0
- Rejeição de data futura

## 6. Desafios e Soluções

| Desafio | Solução |
|---------|---------|
| [Descrever desafio] | [Descrever solução] |

## 7. Melhorias Futuras

- [ ] Persistência com AsyncStorage
- [ ] Edição completa de hábitos
- [ ] Registro de atividades diárias
- [ ] Gráficos de progresso
- [ ] Notificações de lembrete
- [ ] Temas (claro/escuro)

## 8. Conclusão

[Escrever conclusão sobre o projeto, aprendizados e resultados]

## 9. Referências

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Zod Documentation](https://zod.dev/)
- [React Hook Form Documentation](https://react-hook-form.com/)
