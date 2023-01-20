import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import { api } from "../lib/axios";

import { View, Text, ScrollView, Alert } from "react-native";

import { HabitDay, day_size } from "../components/habitDay";
import { Header } from "../components/header";

import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'
import { Loading } from "../components/loading";
import dayjs from "dayjs";

const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S',]
const datesFromYearStart = generateDatesFromYearBeginning();

const minimumDate = 15 * 7;
const amoutDays = minimumDate - datesFromYearStart.length;

type SummaryProps = Array<{
    id: string
    date: string
    amount: number
    completed: number
}>

export function Home() {

    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState<SummaryProps | null>(null)
    const { navigate } = useNavigation();

    async function fetchData() {
        try {
            setLoading(true)
            const response = await api.get('/summary');
            setSummary(response.data)

        } catch (error) {
            Alert.alert('Ops!', 'Não foi possível carregar sua aplicação. Erro: ' + error)
            console.log(error)

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <Loading />
        )
    }

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
                contentContainerStyle={{ paddingBottom: 100 }}>
                {
                    summary && (
                    <View className="flex-row flex-wrap">
                        {
                            datesFromYearStart.map(date => {

                                const dayWithHabits = summary.find(day => {
                                    return dayjs(date).isSame(day.date, 'day')
                                })

                                return (
                                    <HabitDay
                                        key={date.toISOString()}
                                        date={date}
                                        amountOfHabits={dayWithHabits?.amount}
                                        amountCompleted={dayWithHabits?.completed}
                                        onPress={() => navigate('habit', { date: date.toISOString() })}
                                    />
                                )
                            })
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
                    )
                }
            </ScrollView>
        </View>
    )
}