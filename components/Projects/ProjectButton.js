import { useEffect, useRef } from 'react'
import useWindowSize from '../../utils/useWindowSize'

export default function Button({ data }) {
    const windowSize = useWindowSize()
    let { text, href, marginBottom, marginBottomMobile } = data
    marginBottomMobile = marginBottomMobile ? marginBottomMobile : marginBottom/2

    const btnRef = useRef()
    const spanRef = useRef()

    useEffect(() => {
        initPos()
    }, [])

    function getElementOffset(element) {
        let de = document.documentElement;
        let box = element.getBoundingClientRect();
        let top = box.top + window.pageYOffset - de.clientTop;
        let left = box.left + window.pageXOffset - de.clientLeft;
        return { top: top, left: left };
    }

    const initPos = () => {
        btnRef.current.addEventListener('mouseenter', (e) => {
            let X = e.pageX - getElementOffset(btnRef.current).left
            let Y = e.pageY - getElementOffset(btnRef.current).top
            spanRef.current.style.top = `${Y}px`
            spanRef.current.style.left = `${X}px`
        })
        btnRef.current.addEventListener('mouseout', (e) => {
            let X = e.pageX - getElementOffset(btnRef.current).left
            let Y = e.pageY - getElementOffset(btnRef.current).top
            spanRef.current.style.top = `${Y}px`
            spanRef.current.style.left = `${X}px`
        })
    }

    return (
        <div className="text-center" style={{ marginBottom: `${windowSize.width > 769 ? marginBottom : marginBottomMobile}px`}}>
            <a href={href} target="_blank">
                <button ref={btnRef} className="btn" data-text={text}>
                    {text}
                    <span ref={spanRef} />
                </button>
            </a>
        </div>
    )
}