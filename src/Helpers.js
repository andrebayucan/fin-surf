export const translateDate = (date) => {
    if (date == null)
        return null

    const localDate = new Date(date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short'})
    return localDate
}

export const getCurrentDate = (date) => {
    const localDate = new Date().toISOString()
    return localDate
}

export const formatNumber = (number) => {
    return number?.toLocaleString('en-US')
}

export const capitalizeFirst = (str) => {
    if (str == null)
        return null
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const shortenNumber = (number) => {
    const formatFunction = new Intl.NumberFormat(undefined, {
        notation: "compact",
        compactDisplay: "short"
    })

    return formatFunction.format(number)
}