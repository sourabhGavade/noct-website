import useWindowSize from './useWindowSize'

export default function correctMarginForMobile(margin) {
    const windowSize = useWindowSize()
    if (windowSize.width < 769) {
        return margin * 0.6
    } else {
        return margin
    }
}