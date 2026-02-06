import { z } from 'zod';

/**
 * Schema Zod para validação da entidade Hábito
 * 
 * Regras de Negócio:
 * 1. frequenciaSemanal: deve ser entre 1 e 7 (dias da semana)
 * 2. metaDiariaMinutos: deve ser maior que 0
 * 3. dataInicio: não pode ser uma data futura
 */
export const habitoSchema = z.object({
  id: z.string().uuid('ID deve ser um UUID válido'),
  
  nome: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .nonempty('Nome é obrigatório'),
  
  // Regra de Negócio 1: Frequência entre 1 e 7 dias
  frequenciaSemanal: z
    .number()
    .min(1, 'Frequência deve ser no mínimo 1 dia por semana')
    .max(7, 'Frequência deve ser no máximo 7 dias por semana'),
  
  // Regra de Negócio 2: Meta diária deve ser positiva
  metaDiariaMinutos: z
    .number()
    .positive('Meta diária deve ser maior que 0 minutos'),
  
  // Regra de Negócio 3: Data de início não pode ser futura
  dataInicio: z
    .string()
    .refine(
      (date) => {
        const inputDate = new Date(date);
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        return inputDate <= today;
      },
      { message: 'Data de início não pode ser uma data futura' }
    ),
  
  ativo: z.boolean().default(true),
});

/**
 * Schema para criação de hábito (sem o ID, que será gerado automaticamente)
 */
export const createHabitoSchema = habitoSchema.omit({ id: true });

/**
 * Schema para atualização de hábito (todos os campos opcionais exceto ID)
 */
export const updateHabitoSchema = habitoSchema.partial().required({ id: true });

/**
 * Tipos inferidos do Schema
 */
export type Habito = z.infer<typeof habitoSchema>;
export type CreateHabitoInput = z.infer<typeof createHabitoSchema>;
export type UpdateHabitoInput = z.infer<typeof updateHabitoSchema>;
