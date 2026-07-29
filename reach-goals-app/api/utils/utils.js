import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'

export const TEN_MINUTES = 10 * 60 * 1000
export const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000

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

export const sendEmail = async (email = '', code = '') => {
    if (!email || !code)
        throw new Error(
            `Failed at sendEmail Service. Email and Code is necessary - email: ${email}, code: ${code}`
        )

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
                name: 'Reach Goals',
            },
            to: [
                {
                    email: email,
                },
            ],
            subject: 'Your verification code',
            htmlContent: emailContent(code),
        }),
    })

    if (!response.ok) throw new Error(result.message || 'Failed to send email')

    return {
        email,
        code,
    }
}
