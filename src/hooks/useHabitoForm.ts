import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createHabitoSchema, type CreateHabitoInput } from '@/domain/habito.schema';

/**
 * Hook customizado para gerenciar o formulário de criação de hábitos
 * Integra React Hook Form com validação Zod
 */
export function useHabitoForm() {
  const form = useForm<CreateHabitoInput>({
    resolver: zodResolver(createHabitoSchema),
    defaultValues: {
      nome: '',
      frequenciaSemanal: 1,
      metaDiariaMinutos: 30,
      dataInicio: new Date().toISOString().split('T')[0],
      ativo: true,
    },
  });

  return form;
}
