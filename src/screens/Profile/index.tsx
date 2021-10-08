import React from "react";
import { Button, Text, TextInput, View } from "react-native";

export function Profile() {
  return (
    <View>
      <Text testID="text-title">Oi amor</Text>

      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Rodrigo"
      />

      <TextInput
        testID="input-password"
        placeholder="Senha"
        autoCorrect={false}
        value="aoba"
      />

      <Button title="Atualizar" onPress={() => {}} />
    </View>
  );
}
