import { Stack } from "expo-router";

export default function FacilityLayout() {
    return (
        <Stack screenOptions={{
            headerStyle: { backgroundColor: "cornflowerblue" },
            headerTitleStyle: { fontSize: 22 },
            animation: "slide_from_right",
        }}>
            <Stack.Screen name="FacilitySelectScreen" options={{ title: 'Chọn cơ sở' }} />
        </Stack>
    )
}