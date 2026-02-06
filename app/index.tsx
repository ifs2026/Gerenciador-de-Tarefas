import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useHabitoStore } from '@/store/useHabitoStore';
import { Card } from '@/components';
import type { Habito } from '@/domain/habito.schema';

/**
 * Tela principal - Lista de Hábitos
 * Exibe todos os hábitos cadastrados com status e frequência
 */
export default function HomeScreen() {
  const router = useRouter();
  const habitos = useHabitoStore((state) => state.habitos);

  const handlePressHabito = (id: string) => {
    router.push(`/detail/${id}`);
  };

  const handleCreateHabito = () => {
    router.push('/create');
  };

  const renderHabitoItem = ({ item }: { item: Habito }) => (
    <Card onPress={() => handlePressHabito(item.id)}>
      <Card.Title>{item.nome}</Card.Title>
      <Card.Content>
        <Card.Badge variant={item.ativo ? 'success' : 'danger'}>
          {item.ativo ? 'Ativo' : 'Inativo'}
        </Card.Badge>
        <Card.Badge variant="default">
          {item.frequenciaSemanal}x por semana
        </Card.Badge>
        <Card.Badge variant="warning">
          {item.metaDiariaMinutos} min/dia
        </Card.Badge>
      </Card.Content>
    </Card>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Nenhum hábito cadastrado</Text>
      <Text style={styles.emptySubtitle}>
        Toque no botão "+" para criar seu primeiro hábito
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={habitos}
        keyExtractor={(item) => item.id}
        renderItem={renderHabitoItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyList}
      />

      {/* Botão Flutuante - Novo Hábito */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleCreateHabito}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  fabText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '300',
    marginTop: -2,
  },
});
