import { useEffect, useRef } from 'react'

export default function Button({ text, style }) {

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
    <>
      <button ref={btnRef} className={`btn ${style === 'alt' ? 'btn-alt' : ''}`} data-text={text}>
        {text}
        <span ref={spanRef} />
      </button>
    </>
  )
}
