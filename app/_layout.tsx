import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

/**
 * Layout principal da aplicação
 * Configura a navegação Stack com Expo Router
 */
export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007bff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Meus Hábitos',
          }}
        />
        <Stack.Screen
          name="create"
          options={{
            title: 'Novo Hábito',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="detail/[id]"
          options={{
            title: 'Detalhes do Hábito',
          }}
        />
        <Stack.Screen
          name="edit/[id]"
          options={{
            title: 'Editar Hábito',
            presentation: 'modal',
          }}
        />
      </Stack>
    </>
  );
}
