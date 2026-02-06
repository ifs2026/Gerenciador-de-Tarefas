# Plano de Testes - Habit Tracker

## 1. Introdução

Este documento descreve o plano de testes para o aplicativo Habit Tracker, incluindo testes unitários, de integração e manuais.

## 2. Escopo dos Testes

### 2.1 Testes Unitários (Automatizados)
- Validação do Schema Zod
- Lógica da Store Zustand

### 2.2 Testes Manuais
- Navegação entre telas
- Interação com formulários
- Fluxo completo CRUD

## 3. Casos de Teste - Schema Zod

### CT-01: Validação de Hábito Válido
| Item | Descrição |
|------|-----------|
| **Objetivo** | Verificar se hábitos válidos são aceitos |
| **Pré-condição** | Schema configurado |
| **Dados de Entrada** | `{ id: uuid, nome: "Exercício", frequenciaSemanal: 5, metaDiariaMinutos: 30, dataInicio: "2024-01-01", ativo: true }` |
| **Resultado Esperado** | `success: true` |
| **Status** | ✅ Implementado |

### CT-02: Rejeição de Frequência > 7
| Item | Descrição |
|------|-----------|
| **Objetivo** | Validar regra de negócio RN01 |
| **Pré-condição** | Schema configurado |
| **Dados de Entrada** | `{ ...habitoValido, frequenciaSemanal: 8 }` |
| **Resultado Esperado** | `success: false` com erro "Frequência deve ser no máximo 7 dias por semana" |
| **Status** | ✅ Implementado |

### CT-03: Rejeição de Frequência < 1
| Item | Descrição |
|------|-----------|
| **Objetivo** | Validar limite inferior RN01 |
| **Pré-condição** | Schema configurado |
| **Dados de Entrada** | `{ ...habitoValido, frequenciaSemanal: 0 }` |
| **Resultado Esperado** | `success: false` |
| **Status** | ✅ Implementado |

### CT-04: Rejeição de Meta Diária ≤ 0
| Item | Descrição |
|------|-----------|
| **Objetivo** | Validar regra de negócio RN02 |
| **Pré-condição** | Schema configurado |
| **Dados de Entrada** | `{ ...habitoValido, metaDiariaMinutos: 0 }` |
| **Resultado Esperado** | `success: false` |
| **Status** | ✅ Implementado |

### CT-05: Rejeição de Nome Curto
| Item | Descrição |
|------|-----------|
| **Objetivo** | Validar mínimo de 3 caracteres |
| **Pré-condição** | Schema configurado |
| **Dados de Entrada** | `{ ...habitoValido, nome: "AB" }` |
| **Resultado Esperado** | `success: false` |
| **Status** | ✅ Implementado |

### CT-06: Rejeição de Data Futura
| Item | Descrição |
|------|-----------|
| **Objetivo** | Validar regra de negócio RN03 |
| **Pré-condição** | Schema configurado |
| **Dados de Entrada** | `{ ...habitoValido, dataInicio: "2030-01-01" }` |
| **Resultado Esperado** | `success: false` |
| **Status** | ✅ Implementado |

## 4. Casos de Teste - Interface (Manuais)

### CT-UI-01: Navegar para Criar Hábito
| Item | Descrição |
|------|-----------|
| **Objetivo** | Verificar navegação do FAB |
| **Passos** | 1. Abrir app 2. Clicar no botão "+" |
| **Resultado Esperado** | Tela de criação é exibida |
| **Status** | 🔲 Pendente |

### CT-UI-02: Criar Hábito com Sucesso
| Item | Descrição |
|------|-----------|
| **Objetivo** | Criar hábito com dados válidos |
| **Passos** | 1. Ir para /create 2. Preencher campos 3. Clicar "Criar Hábito" |
| **Resultado Esperado** | Hábito aparece na lista |
| **Status** | 🔲 Pendente |

### CT-UI-03: Validação de Formulário
| Item | Descrição |
|------|-----------|
| **Objetivo** | Verificar mensagens de erro |
| **Passos** | 1. Ir para /create 2. Deixar campos vazios 3. Clicar "Criar Hábito" |
| **Resultado Esperado** | Mensagens de erro em vermelho |
| **Status** | 🔲 Pendente |

### CT-UI-04: Remover Hábito
| Item | Descrição |
|------|-----------|
| **Objetivo** | Remover hábito com confirmação |
| **Passos** | 1. Clicar em hábito 2. Clicar "Remover" 3. Confirmar |
| **Resultado Esperado** | Hábito removido da lista |
| **Status** | 🔲 Pendente |

## 5. Execução dos Testes

### 5.1 Comandos

```bash
# Executar todos os testes
npm run test

# Executar com watch mode
npm run test:watch

# Executar com coverage
npm run test -- --coverage
```

### 5.2 Evidências
As evidências de testes manuais devem ser salvas em:
- `docs/projeto-mobile/evidencias/semana-XX/`

## 6. Critérios de Aceitação

- [x] Todos os testes unitários passando
- [ ] Todos os testes de interface executados
- [ ] Cobertura de código > 80%
- [ ] Zero bugs críticos

## 7. Ambiente de Testes

| Item | Versão |
|------|--------|
| Node.js | 18+ |
| Jest | 29.x |
| Expo | 50.x |
| Emulador Android | API 33 |
| Simulador iOS | iPhone 15 Pro |
