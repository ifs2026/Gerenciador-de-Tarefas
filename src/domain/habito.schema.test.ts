import { habitoSchema, createHabitoSchema } from './habito.schema';

describe('Habito Schema Validation', () => {
  const validHabito = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    nome: 'Exercício',
    frequenciaSemanal: 5,
    metaDiariaMinutos: 30,
    dataInicio: '2024-01-01',
    ativo: true,
  };

  describe('Teste 1: Deve aceitar um hábito válido', () => {
    it('deve validar um hábito com todos os campos corretos', () => {
      const result = habitoSchema.safeParse(validHabito);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.nome).toBe('Exercício');
        expect(result.data.frequenciaSemanal).toBe(5);
        expect(result.data.metaDiariaMinutos).toBe(30);
        expect(result.data.ativo).toBe(true);
      }
    });

    it('deve aceitar frequência mínima de 1', () => {
      const result = habitoSchema.safeParse({
        ...validHabito,
        frequenciaSemanal: 1,
      });
      expect(result.success).toBe(true);
    });

    it('deve aceitar frequência máxima de 7', () => {
      const result = habitoSchema.safeParse({
        ...validHabito,
        frequenciaSemanal: 7,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('Teste 2: Deve rejeitar frequência > 7 (Regra de Negócio 1)', () => {
    it('deve rejeitar frequência igual a 8', () => {
      const result = habitoSchema.safeParse({
        ...validHabito,
        frequenciaSemanal: 8,
      });
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const frequenciaError = result.error.errors.find(
          (e) => e.path.includes('frequenciaSemanal')
        );
        expect(frequenciaError).toBeDefined();
        expect(frequenciaError?.message).toBe(
          'Frequência deve ser no máximo 7 dias por semana'
        );
      }
    });

    it('deve rejeitar frequência igual a 0', () => {
      const result = habitoSchema.safeParse({
        ...validHabito,
        frequenciaSemanal: 0,
      });
      expect(result.success).toBe(false);
    });

    it('deve rejeitar frequência negativa', () => {
      const result = habitoSchema.safeParse({
        ...validHabito,
        frequenciaSemanal: -1,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Validação de outras regras de negócio', () => {
    it('deve rejeitar nome com menos de 3 caracteres', () => {
      const result = habitoSchema.safeParse({
        ...validHabito,
        nome: 'AB',
      });
      expect(result.success).toBe(false);
    });

    it('deve rejeitar meta diária igual a 0 (Regra de Negócio 2)', () => {
      const result = habitoSchema.safeParse({
        ...validHabito,
        metaDiariaMinutos: 0,
      });
      expect(result.success).toBe(false);
    });

    it('deve rejeitar meta diária negativa', () => {
      const result = habitoSchema.safeParse({
        ...validHabito,
        metaDiariaMinutos: -10,
      });
      expect(result.success).toBe(false);
    });

    it('deve rejeitar data de início futura (Regra de Negócio 3)', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      
      const result = habitoSchema.safeParse({
        ...validHabito,
        dataInicio: futureDate.toISOString().split('T')[0],
      });
      expect(result.success).toBe(false);
    });

    it('deve rejeitar UUID inválido', () => {
      const result = habitoSchema.safeParse({
        ...validHabito,
        id: 'invalid-uuid',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Schema de criação (sem ID)', () => {
    it('deve aceitar criação sem ID', () => {
      const { id, ...habitoSemId } = validHabito;
      const result = createHabitoSchema.safeParse(habitoSemId);
      expect(result.success).toBe(true);
    });
  });
});
