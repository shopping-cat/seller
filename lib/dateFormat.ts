import dayjs from "dayjs"

const dateFormat = (date: Date): string => {
    return dayjs(date).format('YYYY.MM.DD')
}

export default dateFormat