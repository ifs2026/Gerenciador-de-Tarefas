import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewProps,
} from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  onPress?: () => void;
}

/**
 * Componente Card reutilizável com suporte a clique
 */
export function Card({ children, onPress, style, ...props }: CardProps) {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.7}
      {...props}
    >
      {children}
    </Wrapper>
  );
}

/**
 * Subcomponente para título do card
 */
Card.Title = function CardTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
};

/**
 * Subcomponente para conteúdo do card
 */
Card.Content = function CardContent({ children }: { children: React.ReactNode }) {
  return <View style={styles.content}>{children}</View>;
};

/**
 * Subcomponente para badges/tags
 */
Card.Badge = function CardBadge({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}) {
  return (
    <View style={[styles.badge, styles[`badge_${variant}`]]}>
      <Text style={[styles.badgeText, styles[`badgeText_${variant}`]]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badge_default: {
    backgroundColor: '#e9ecef',
  },
  badge_success: {
    backgroundColor: '#d4edda',
  },
  badge_warning: {
    backgroundColor: '#fff3cd',
  },
  badge_danger: {
    backgroundColor: '#f8d7da',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  badgeText_default: {
    color: '#495057',
  },
  badgeText_success: {
    color: '#155724',
  },
  badgeText_warning: {
    color: '#856404',
  },
  badgeText_danger: {
    color: '#721c24',
  },
});
