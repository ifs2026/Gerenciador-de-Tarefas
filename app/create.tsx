import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Controller } from 'react-hook-form';
import { useHabitoForm } from '@/hooks';
import { useHabitoStore } from '@/store/useHabitoStore';
import { Input, Button } from '@/components';
import type { CreateHabitoInput } from '@/domain/habito.schema';

/**
 * Tela de Criação de Hábito
 * Formulário com validação Zod integrada ao React Hook Form
 */
export default function CreateScreen() {
  const router = useRouter();
  const addHabito = useHabitoStore((state) => state.add);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useHabitoForm();

  const onSubmit = (data: CreateHabitoInput) => {
    addHabito(data);
    router.back();
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
        <Text style={styles.title}>Criar Novo Hábito</Text>
        <Text style={styles.subtitle}>
          Preencha os campos abaixo para adicionar um novo hábito
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
            title="Criar Hábito"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
          />
          <Button
            title="Cancelar"
            variant="secondary"
            onPress={() => router.back()}
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
});
