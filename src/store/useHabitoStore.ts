import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Habito, CreateHabitoInput, UpdateHabitoInput } from '@/domain/habito.schema';

/**
 * Interface do Estado da Store de Hábitos
 */
interface HabitoState {
  habitos: Habito[];
}

/**
 * Interface das Ações da Store de Hábitos
 */
interface HabitoActions {
  /** Adiciona um novo hábito à lista */
  add: (input: CreateHabitoInput) => Habito;
  
  /** Atualiza um hábito existente */
  update: (input: UpdateHabitoInput) => void;
  
  /** Remove um hábito pelo ID */
  remove: (id: string) => void;
  
  /** Alterna o status ativo/inativo de um hábito */
  toggleAtivo: (id: string) => void;
  
  /** Busca um hábito pelo ID */
  getById: (id: string) => Habito | undefined;
}

/**
 * Store Zustand para gerenciamento de Hábitos em memória
 */
export const useHabitoStore = create<HabitoState & HabitoActions>((set, get) => ({
  // Estado inicial: lista vazia de hábitos
  habitos: [],

  // Ação: Adicionar novo hábito
  add: (input: CreateHabitoInput) => {
    const novoHabito: Habito = {
      ...input,
      id: uuidv4(),
      ativo: input.ativo ?? true,
    };

    set((state) => ({
      habitos: [...state.habitos, novoHabito],
    }));

    return novoHabito;
  },

  // Ação: Atualizar hábito existente
  update: (input: UpdateHabitoInput) => {
    set((state) => ({
      habitos: state.habitos.map((habito) =>
        habito.id === input.id
          ? { ...habito, ...input }
          : habito
      ),
    }));
  },

  // Ação: Remover hábito pelo ID
  remove: (id: string) => {
    set((state) => ({
      habitos: state.habitos.filter((habito) => habito.id !== id),
    }));
  },

  // Ação: Alternar status ativo/inativo
  toggleAtivo: (id: string) => {
    set((state) => ({
      habitos: state.habitos.map((habito) =>
        habito.id === id
          ? { ...habito, ativo: !habito.ativo }
          : habito
      ),
    }));
  },

  // Busca: Retorna hábito pelo ID
  getById: (id: string) => {
    return get().habitos.find((habito) => habito.id === id);
  },
}));
