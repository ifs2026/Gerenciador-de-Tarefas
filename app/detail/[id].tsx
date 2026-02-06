import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useHabitoStore } from '@/store/useHabitoStore';
import { Button, Card } from '@/components';

/**
 * Tela de Detalhes do Hábito
 * Exibe informações completas e ações de edição/remoção
 */
export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const habito = useHabitoStore((state) => 
    state.habitos.find((h) => h.id === id)
  );
  const removeHabito = useHabitoStore((state) => state.remove);
  const toggleAtivo = useHabitoStore((state) => state.toggleAtivo);

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

  // Handler para remoção com confirmação
  const handleRemove = () => {
    removeHabito(habito.id);
    router.back();
  };

  // Handler para alternar status ativo/inativo
  const handleToggleAtivo = () => {
    toggleAtivo(habito.id);
  };

  // Handler para edição - navega para tela de edição
  const handleEdit = () => {
    router.push(`/edit/${habito.id}`);
  };

  // Formatar data para exibição
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Cabeçalho com Nome e Status */}
      <View style={styles.header}>
        <Text style={styles.title}>{habito.nome}</Text>
        <View style={[styles.statusBadge, habito.ativo ? styles.active : styles.inactive]}>
          <Text style={styles.statusText}>
            {habito.ativo ? 'Ativo' : 'Inativo'}
          </Text>
        </View>
      </View>

      {/* Cards de Informações */}
      <Card style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Frequência Semanal</Text>
          <Text style={styles.infoValue}>{habito.frequenciaSemanal} dias/semana</Text>
        </View>
      </Card>

      <Card style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Meta Diária</Text>
          <Text style={styles.infoValue}>{habito.metaDiariaMinutos} minutos</Text>
        </View>
      </Card>

      <Card style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Data de Início</Text>
          <Text style={styles.infoValue}>{formatDate(habito.dataInicio)}</Text>
        </View>
      </Card>

      <Card style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>ID</Text>
          <Text style={[styles.infoValue, styles.idText]}>{habito.id}</Text>
        </View>
      </Card>

      {/* Botões de Ação */}
      <View style={styles.actionsContainer}>
        <Button
          title={habito.ativo ? 'Desativar Hábito' : 'Ativar Hábito'}
          variant="secondary"
          onPress={handleToggleAtivo}
        />

        <Button
          title="Editar"
          onPress={handleEdit}
          style={styles.actionButton}
        />

        <Button
          title="Remover"
          variant="danger"
          onPress={handleRemove}
          style={styles.actionButton}
        />

        <Button
          title="Voltar"
          variant="secondary"
          onPress={() => router.back()}
          style={styles.actionButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 12,
  },
  active: {
    backgroundColor: '#d4edda',
  },
  inactive: {
    backgroundColor: '#f8d7da',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  infoCard: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  idText: {
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  actionsContainer: {
    marginTop: 24,
  },
  actionButton: {
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
