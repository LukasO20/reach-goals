import crypto from 'node:crypto'

export const TEN_MINUTES = 10 * 60 * 1000
export const ONE_DAY = 24 * 60 * 60 * 1000

export const formatObject = (objectData) => {
    return Object.fromEntries(
        Object.entries(objectData).filter(
            ([_, value]) => value !== undefined && value !== ''
        )
    )
}

export const extractIds = (arr, key = 'id') => {
    if (!Array.isArray(arr)) return []
    return arr.map((item) =>
        typeof item === 'object' ? Number(item[key]) : Number(item)
    )
}

export const generateVerificationCode = () => {
    return crypto.randomInt(100000, 1000000).toString()
}
