import React from "react";
import { TouchableOpacity, Dimensions } from "react-native";

const weekdays = 7;
const screen_horizontal_padding = (32 * 2) / 5;

export const day_margin_between = 8;
export const day_size = (Dimensions.get('screen').width / weekdays) - (screen_horizontal_padding + 5)

export function HabitDay() {
    return (
        <TouchableOpacity
            className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
            style={{width: day_size, height: day_size}}
            activeOpacity={0.5}
        />
    )
}