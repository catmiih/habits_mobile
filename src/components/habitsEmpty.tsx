import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

export function HabitsEmpty() {

    const { navigate } = useNavigation()

    return (
        <View>
            <Text className="text-zinc-400 text-base">
                Hoje você não tem nenhum hábito.
            </Text>
            <Text
                className="text-violet-400 text-base underline active:text-violet-500"
                onPress={() => navigate('new')}
            >
                Crie um novo aqui.
            </Text>
        </View>
    )
}