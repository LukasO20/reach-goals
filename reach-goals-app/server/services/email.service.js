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
