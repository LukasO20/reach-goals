import Card from '../card'
import CardMini from '../card-mini'

/** @typedef {import('./types.js').CardSwitchRenderProps} Props */

/**
 * @param {Props} props
 */
const CardSwitchRender = ({ display, ...props }) => {
    if (!display) return null

    const isCard = display.type.includes('card')

    const map = {
        card: Card,
        cardMini: CardMini,
    }

    const Render = isCard ? map.card : map.cardMini
    
    return <Render display={display} {...props} />
}

export default CardSwitchRender