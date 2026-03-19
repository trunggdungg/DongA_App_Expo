import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: "cornflowerblue" },
      headerTitleStyle: { fontSize: 22 },
      animation: "slide_from_right",
    }}>
  
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(facility)" options={{ headerShown: false }} />

    </Stack>
  );
}
