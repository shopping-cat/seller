// 1 -> 1
// 11 -> 11
// 111 -> 111
// 1111 -> 1.1천
// 11111 -> 1.1만
// 111111 -> 11만
// 1111111 -> 111만
// 11111111 -> 1111만
// 111111111 -> 1.1억

const numberToKoreanUnit = (number: number) => {
    const str = number.toString()
    if (str.length < 4) return str
    if (str.length < 5) return str[0] + '.' + str[1] + '천'
    if (str.length < 6) return str[0] + '.' + str[1] + '만'
    if (str.length < 9) return Math.floor(number / 10000) + '만'
    return Math.floor(number / 100000000) + '억'
}

export default numberToKoreanUnit