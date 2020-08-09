//CONST
const A_HOUR_IN_MINUTES = 60;

export default function convertHourToMinute(time: string) {
    const [hour, minutes] = time.split(':').map(Number)

    const timeInMinutes = (hour * A_HOUR_IN_MINUTES) + minutes

    return timeInMinutes
}