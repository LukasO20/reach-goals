import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'

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

export const generateAcessToken = (visitorID) => {
    return jwt.sign(
        {
            sub: visitorID,
            type: 'demo-visitor',
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h',
        }
    )
}

const emailContent = (code = '') => `
    <!DOCTYPE html>
    <html>
        <body>
            <h1>Your verification code</h1>
                <p>
                    Your code is:
                    <strong>${code}</strong>
                </p>
                <p>
                    This email contains only your verification code. 
                    We will never ask you to click a link or provide additional information by email.
                </p>
        </body>
    </html>
`

export const sendEmail = async () => {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'api-key': process.env.BREVO_API_KEY,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            sender: {
                email: 'lukinhaso2206@gmail.com',
                name: 'Reach Goals Demo',
            },
            to: [
                {
                    email: 'lukinhass2206@outlook.com', //ONLY FOR TEST
                },
            ],
            subject: 'Your verification code',
            htmlContent: emailContent(),
        }),
    })

    const result = await response.json()

    if (!response.ok) throw new Error(result.message || 'Failed to send email')

    return result
}
