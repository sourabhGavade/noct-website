import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { MdClose } from 'react-icons/md'
import { useRecoilState } from 'recoil'
import { awardsPopupState } from '../atoms/awardsPopupState'

export default function AwardsPopUp() {
  const [show, setShow] = useState(false)
  const [awardsPopupShown, setAwardsPopupShown] = useRecoilState(awardsPopupState)
  const count = 300

  useEffect(() => {
    if (!awardsPopupShown) {
      setTimeout(() => {
        setShow(true)
        initConfetti()
        setAwardsPopupShown(true)
      }, 1500)
    }
  }, [])

  const initConfetti = () => {
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }

  const fire = function(particleRatio, opts) {
    confetti(Object.assign({}, { origin: { y: 0.8 }}, opts, {
      particleCount: Math.floor(count * particleRatio)
    }));
  }
  

  return (  
    <AwardsPopUpContainer show={show}>
      <AwardsPopupBG onClick={() => setShow(false)} />
      <AwardsPopupInner show={show}>
        <a onClick={() => setShow(false)} className="cursor-pointer close-icon">
          <MdClose size="32" color="#1A1A1A" />
        </a>
        <svg width={750} height={308} viewBox="0 0 750 308" fill="none" xmlns="http://www.w3.org/2000/svg" className='pattern'>
          <path d="M-23.5 90.4504L49.5 177.5L104 0L176.5 162.631L230.5 102.363L289 142.073L343.205 61.8887L411.5 162.631L482.5 102.363L548.5 162.631L620 52.5053L691.5 142.073L747.5 102.363L787.5 75.0076L852 23.3847V75.0076L884 90.4504L770 308H-33L-23.5 90.4504Z" fill="#BFBBFF" />
        </svg>
        <img className="trophies" src="/images/trophies.webp" alt="" />
        <div className="content">
          <div className="h3 mb-2">India’s Best Design Award</div>
          <p>FOR THREE YEARS IN ROW! — ‘22 | ‘21 | ‘20 </p>
        </div>
      </AwardsPopupInner>
    </AwardsPopUpContainer>
  )
}

const AwardsPopUpContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  z-index: 99;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  display: grid;
  place-items: center;
  overflow: hidden;
  transition: all 0.3s ease;
`

const AwardsPopupBG = styled.div`
  z-index: 1;
  position: absolute;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
`

const AwardsPopupInner = styled.div`
  z-index: 2;
  position: relative;
  width: 100%;
  max-width: 750px;
  height: 633px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  scale: ${props => props.show ? 1 : 0.9};
  transition: scale 0.15s ease 0.05s;

  & .pattern {
    z-index: 2;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  & .trophies {
    z-index: 1;
    position: absolute;
    bottom: 0;
    width: 380px;
    left: 50%;
    transform: translateX(-50%);
  }

  & .close-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 3;
  }

  & .content {
    z-index: 3;
    position: absolute;
    width: max-content;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    
    & p {
      font-weight: 400;
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 500px;
    scale: 1;
    translate: ${props => props.show ? '0 0' : '0 100px'};
    transition: translate 0.15s ease 0.05s;

    & .trophies {
      width: 300px;
    }
`
