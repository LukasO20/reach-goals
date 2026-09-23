const emailContent = (code = '') => `
    <!DOCTYPE html>
    <html lang="en" style="font-family: 'Quicksand', 'Gill Sans', 'Segoe UI', 'sans-serif'">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
            <body>
                <h1 style="text-align: center; color: #1b1b1b;">Your verification code</h1>
                <p style="width: max-content; text-align: center; color: #1b1b1b; background-color: #F0F0F0; padding: 1rem; margin: 1rem auto; border-radius: 0.75rem;">
                    Use the code below to authenticate your account:
                    <br />
                    <br />
                    <strong style="font-size: 1.75rem;">${code}</strong>
                </p>
                <p style="width: 420px; margin: auto; text-align: center; color: #525252; font-size: small;">
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
            subject: 'Your verification code - Reach Goals',
            htmlContent: emailContent(code),
        }),
    })

    if (!response.ok) throw new Error(result.message || 'Failed to send email')

    return {
        email,
        code,
    }
}
