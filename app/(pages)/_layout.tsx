import { Stack } from 'expo-router';
import React from 'react';

export default function PagesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true, // Show headers by default for all pages under (pages)
      }}
    >
      <Stack.Screen name="LessonPage" options={{ title: 'Lesson Page' }} />
      {/* Add more screens here if needed */}
    </Stack>
  );
}