import React from "react";

import { View, Text, ScrollView } from "react-native";

import { HabitDay, day_size } from "../components/habitDay";
import { Header } from "../components/header";

import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'

const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S',]
const datesFromYearStart = generateDatesFromYearBeginning();

const minimumDate = 15 * 7;
const amoutDays = minimumDate - datesFromYearStart.length;

export function Home() {
    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />

            <View className="flex-row mt-12 mb-2">
                {
                    weekdays.map((weekday, i) => (
                        <Text
                            key={`${weekday}-${i}`}
                            className="text-zinc-400 text-xl font-bold text-center mx-1"
                            style={{ width: day_size }}
                        >
                            {weekday}
                        </Text>
                    ))
                }
            </View>

            <ScrollView showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}>
                <View className="flex-row flex-wrap">
                    {
                        datesFromYearStart.map(date => (
                            <HabitDay key={date.toISOString()} />
                        ))
                    }

                    {
                        amoutDays > 0 && Array
                            .from({ length: amoutDays })
                            .map((_, i) => (
                                <View
                                    key={i}
                                    className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-50"
                                    style={{ width: day_size, height: day_size }}
                                />
                            ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}