import { useRef } from 'react';

export default function ClientLogoSet({ img1, img2 }) {

  const [logo, setLogo] = React.useState('logo-1');
  const logo1Ref = useRef()
  const logo2Ref = useRef()

  React.useEffect(() => {
    let randInterval = (3000 + Math.floor(Math.random() * 10000));
    const logoTimeout = setTimeout(function() {
      if (logo === 'logo-1') {
        let logoTL1 = new TimelineMax()
        logoTL1.to(logo1Ref.current, 1, { opacity: 0 })
        logoTL1.to(logo2Ref.current, 1, { opacity: 1 }, '+=0.5')
        setLogo('logo-2')
      } else {
        let logoTL2 = new TimelineMax()
        logoTL2.to(logo2Ref.current, 1, { opacity: 0 })
        logoTL2.to(logo1Ref.current, 1, { opacity: 1 }, '+=0.5')
        setLogo('logo-1')
      }
    }, randInterval);

    return () => clearTimeout(logoTimeout)
  }, [logo])

  return (
    <>
      <div className="client-logo-set">
        <div className="logo-1" ref={logo1Ref}><img src={`/images/clients/primary/${img1}`} alt="" /></div>
        <div className="logo-2" ref={logo2Ref}><img src={`/images/clients/secondary/${img2}`} alt="" /></div>
      </div>
    </>
  )
}
