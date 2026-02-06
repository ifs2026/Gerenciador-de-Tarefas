import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHabitoStore } from '@/store/useHabitoStore';
import { Input, Button } from '@/components';
import { createHabitoSchema, type CreateHabitoInput } from '@/domain/habito.schema';

/**
 * Tela de Edição de Hábito
 * Formulário com validação Zod para editar hábito existente
 */
export default function EditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const habito = useHabitoStore((state) => 
    state.habitos.find((h) => h.id === id)
  );
  const updateHabito = useHabitoStore((state) => state.update);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CreateHabitoInput>({
    resolver: zodResolver(createHabitoSchema),
    defaultValues: {
      nome: '',
      frequenciaSemanal: 1,
      metaDiariaMinutos: 30,
      dataInicio: new Date().toISOString().split('T')[0],
      ativo: true,
    },
  });

  // Preencher o formulário com os dados do hábito quando carregado
  useEffect(() => {
    if (habito) {
      reset({
        nome: habito.nome,
        frequenciaSemanal: habito.frequenciaSemanal,
        metaDiariaMinutos: habito.metaDiariaMinutos,
        dataInicio: habito.dataInicio,
        ativo: habito.ativo,
      });
    }
  }, [habito, reset]);

  // Caso o hábito não seja encontrado
  if (!habito) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Hábito não encontrado</Text>
        <Button
          title="Voltar"
          onPress={() => router.back()}
          style={styles.errorButton}
        />
      </View>
    );
  }

  const onSubmit = (data: CreateHabitoInput) => {
    updateHabito({
      id: habito.id,
      ...data,
    });
    
    router.back();
  };

  const handleCancel = () => {
    if (isDirty) {
      Alert.alert(
        'Descartar alterações?',
        'Você tem alterações não salvas. Deseja realmente sair?',
        [
          { text: 'Continuar Editando', style: 'cancel' },
          { text: 'Descartar', style: 'destructive', onPress: () => router.back() },
        ]
      );
    } else {
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Editar Hábito</Text>
        <Text style={styles.subtitle}>
          Altere os campos abaixo para atualizar o hábito
        </Text>

        {/* Campo: Nome */}
        <Controller
          control={control}
          name="nome"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Nome do Hábito *"
              placeholder="Ex: Exercício físico"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.nome?.message}
            />
          )}
        />

        {/* Campo: Frequência Semanal */}
        <Controller
          control={control}
          name="frequenciaSemanal"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Frequência Semanal (1-7 dias) *"
              placeholder="Ex: 5"
              keyboardType="numeric"
              value={value?.toString()}
              onChangeText={(text) => onChange(parseInt(text) || 0)}
              onBlur={onBlur}
              error={errors.frequenciaSemanal?.message}
            />
          )}
        />

        {/* Campo: Meta Diária em Minutos */}
        <Controller
          control={control}
          name="metaDiariaMinutos"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Meta Diária (minutos) *"
              placeholder="Ex: 30"
              keyboardType="numeric"
              value={value?.toString()}
              onChangeText={(text) => onChange(parseInt(text) || 0)}
              onBlur={onBlur}
              error={errors.metaDiariaMinutos?.message}
            />
          )}
        />

        {/* Campo: Data de Início */}
        <Controller
          control={control}
          name="dataInicio"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Data de Início (YYYY-MM-DD) *"
              placeholder="Ex: 2024-01-15"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.dataInicio?.message}
            />
          )}
        />

        {/* Botões de Ação */}
        <View style={styles.buttonContainer}>
          <Button
            title="Salvar Alterações"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
          />
          <Button
            title="Cancelar"
            variant="secondary"
            onPress={handleCancel}
            style={styles.cancelButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 16,
  },
  cancelButton: {
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#dc3545',
    marginBottom: 16,
  },
  errorButton: {
    minWidth: 120,
  },
});
