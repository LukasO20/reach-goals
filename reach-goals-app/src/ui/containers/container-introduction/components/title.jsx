/** @typedef {import('../types.js').TitleProps & React.HTMLAttributes<HTMLDivElement>} Props */

/**
 * @param {Props} props
 */
const Title = ({ isCodeSended = false, someCodeAlreadySent = false }) => {
    const titleContent = someCodeAlreadySent
        ? 'A verification code has already been sent'
        : isCodeSended
          ? 'The Verification code sent to email'
          : 'Fill all the fields to start a session'

    const subTitle =
        isCodeSended || someCodeAlreadySent ? (
            <label className='sub-title'>
                Please also check your spam or trash folders
            </label>
        ) : null
    const title = <label className='title'>{titleContent}</label>

    return (
        <>
            {title}
            {subTitle}
        </>
    )
}

export default Title
