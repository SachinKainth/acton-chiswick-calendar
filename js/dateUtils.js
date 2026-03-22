export function formatDate(date) {
    return date.getFullYear() + "-" +
        String(date.getMonth() + 1).padStart(2, "0") + "-" +
        String(date.getDate()).padStart(2, "0")
}

export function isSunday(date) {
    return date.getDay() === 0
}

export function sundayOfMonth(date) {
    return Math.ceil(date.getDate() / 7)
}