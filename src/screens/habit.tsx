import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { BackButton } from "../components/backButton";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { ProgressBar } from "../components/progressBar";
import { Checkbox } from "../components/checkbox";
import { Loading } from "../components/loading";
import { api } from "../lib/axios";
import { GenerateProgressPercentage } from "../utils/generate-progress-percent";
import { HabitsEmpty } from "../components/habitsEmpty";
import clsx from "clsx";

interface Params {
    date: string;
}

interface dayInfoProps {
    completedHabits: string[]
    possibleHabits: {
        id: string
        title: string
    }[];
}

export function Habit() {

    const [loading, setLoading] = useState(true)
    const [dayInfo, setdayInfo] = useState<dayInfoProps | null>(null)
    const [completedHabits, setcompletedHabits] = useState<string[]>([])

    const route = useRoute();
    const { date } = route.params as Params

    const parsedDate = dayjs(date)
    const isDateInPast = parsedDate.endOf('day').isBefore(new Date())

    const dayOfWeek = parsedDate.format('dddd');
    const dayAndMonth = parsedDate.format('DD/MM')

    const habitProgress = dayInfo?.possibleHabits.length ? GenerateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) : 0;

    async function fetchHabits() {
        try {
            setLoading(true)
            const response = await api.get('/day', { params: { date } })
            setdayInfo(response.data)
            setcompletedHabits(response.data.completedHabits)

        } catch (error) {
            console.log(error)
            Alert.alert("Ops! Ocorreu um erro", "Erro: " + error)
        }
        finally {
            setLoading(false)
        }
    }

    async function handleToggleHabit(habitID: string) {
        try {
            await api.patch(`/habits/${habitID}/toggle`)

            if (completedHabits.includes(habitID)) {
                setcompletedHabits(prevState => prevState.filter(habit => habit !== habitID))
            } else {
                setcompletedHabits(prevState => [...prevState, habitID]);
            }
        }catch(error){
            console.log(error)
            Alert.alert("Ops! Houve um erro.","Erro: "+error)
        }
    }

    useEffect(() => {
        fetchHabits()
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }

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

                <ProgressBar progress={habitProgress} />

                <View className={clsx("mt-6", {
                    ["opacity-50"]: isDateInPast
                })}>
                    {
                        dayInfo?.possibleHabits ?
                            dayInfo?.possibleHabits.map(habit => {
                                return (
                                    <Checkbox
                                        key={habit.id}
                                        title={habit.title}
                                        checked={completedHabits.includes(habit.id)}
                                        disabled={isDateInPast}
                                        onPress={() => handleToggleHabit(habit.id)}
                                    />
                                )
                            })
                            : <HabitsEmpty />
                    }
                </View>

                {
                    isDateInPast && (
                        <Text className="text-white mt-10 text-center">
                            Você não pode editar dados de uma data passada.
                        </Text>
                    )
                }
            </ScrollView>
        </View>
    )
}