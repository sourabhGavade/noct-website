import { useState, useEffect } from 'react'

export default function useContainerOffset() {
    const [containerOffset, setContainerOffset] = useState('0px');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let offset = document.querySelector('.container').getBoundingClientRect().x
            setContainerOffset(`${offset}px`)
            function handleResize() {
                let offset = document.querySelector('.container').getBoundingClientRect().x
                setContainerOffset(`${offset}px`)
            }

            window.addEventListener("resize", handleResize);
            handleResize()
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);
    
    return containerOffset;
}