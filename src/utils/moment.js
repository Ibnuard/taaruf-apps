import moment from "moment";

export const GET_CURRENT_DATE = (format = '') => {
    const result = moment(new Date()).format(format)

    return result
}

export const CHECK_IS_VALID = (date) => {
    const currentDate = moment(new Date())
    const selectedDate = moment(date)
    const diff = currentDate.diff(selectedDate, 'years')

    return diff
}

export const PARSE_DATE = (date, format = 'll') => {
    return moment(date).format(format)
}