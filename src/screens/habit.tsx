import React from "react";
import { ScrollView, View, Text } from "react-native";
import { BackButton } from "../components/backButton";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { ProgressBar } from "../components/progressBar";
import { Checkbox } from "../components/checkbox";

interface Params {
    date: string;
}

export function Habit() {

    const route = useRoute();
    const { date } = route.params as Params

    const parsedDate = dayjs(date)
    const dayOfWeek = parsedDate.format('dddd');
    const dayAndMonth = parsedDate.format('DD/MM')

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <BackButton />

                <Text className="mt-6 text-zinc-400 font-semibold text-3xl lowercase">
                    {dayOfWeek}
                </Text>

                <Text className="text-white font-extrabold text-4xl">
                    {dayAndMonth}
                </Text>

                <ProgressBar progress={30} />

                <View className="mt-6">
                    <Checkbox
                        title="Beber água"
                        checked={false}
                    />

                    <Checkbox
                        title="Caminhae"
                        checked={true}
                    />
                </View>
            </ScrollView>
        </View>
    )
}