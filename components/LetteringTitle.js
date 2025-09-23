import React, { useEffect, useRef } from 'react'

export default function LetteringTitle({ text }) {

  const splitRef = useRef()

  useEffect(() => {
    TweenMax.from(splitRef.current, {
      scrollTrigger: {
        trigger: splitRef.current,
        once: true,
        onEnter: () => {
          let letters = new SplitText(splitRef.current, { type: 'lines, chars' });
          TweenMax.staggerFrom(letters.chars, 0.4, { opacity: 0, y: 12, delay: 0.1 }, 0.02)
        }
      }
    });
  }, [])

  return (
    <span className="lettering-title" ref={splitRef} dangerouslySetInnerHTML={{ __html: text }}></span>
  )
}
