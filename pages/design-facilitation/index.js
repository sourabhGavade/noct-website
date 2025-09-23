import { useEffect } from 'react'
import Head from "next/head";
import Link from 'next/link'
import Button from '../../components/Button'
import LetteringTitle from '../../components/LetteringTitle'
import FooterCTA from '../../components/FooterCTA'
import urlFor from '../../utils/urlFor'
import sanityClient from '../../client'

export async function getServerSideProps(context) {
	const content = await sanityClient.fetch(`*[_type=="facilitation"]`)
	
	return {
		props: {
			content: content
		}
	}
}

export default function DesignFacilitation({ content }) {

  useEffect(() => {
    initParallax()
  }, [])

  const initParallax = () => {
    gsap.to('.facilitation-fixed-1', {
      scrollTrigger: {
        trigger: '.facilitation-hero-section',
        start: 'top top',
        scrub: true
      },
      x: 700,
      scale: 2,
      ease: 'Power1.easeIn'
    });
    gsap.to('.facilitation-hero-banner', {
      scrollTrigger: {
        trigger: '.facilitation-hero-section',
        start: 'top top',
        scrub: 0.5
      },
      y: -200
    });
  }

  return (
    <>
      <Head>
        <title>NOCT | Design Facilitation</title>
      </Head>

      {/* Design Facilitation - Hero */}
      <section className="hero-section facilitation-hero-section flex-center">
        <div className="hero-fixed-banner facilitation-hero-banner">
          Design Facilitation
        </div>
        <div className="facilitation-fixed-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="194" height="194"><circle cx="97" cy="97" r="97" fill="#bedcce" fillRule="evenodd" opacity=".3"/></svg>
        </div>
        <div className="container">
          <div className="row w-100">
            <div className="col-lg-7 pr-5">
              <h1 className="pr-4"><LetteringTitle text="Utilise the power of design thinking in your organisation" /></h1>
            </div>
            <div className="col-lg-5 ml-md-auto">
              <p className="lg">When facilitating, we encourage an analytical approach to design thinking and observation. We help your team build the capacity to dissect problems, and discover creative solutions, all while making conscious and autonomous decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {
        content.map((item, index) => (
          <section className="padded-section">
            <div className="container">
              <div className="row justify-content-between">
              <div className={`col-lg-5 mb-5 mb-lg-0 ${index % 2 === 0 ? 'order-1 order-lg-2' : ''}`}>
                  <img src={urlFor(item.previewImage).url()} alt="" />
                </div>
                <div className={`col-lg-6 ${index % 2 === 0 ? 'order-2 order-lg-1' : ''}`}>
                  <div className="h2 mb-2">{item.title}</div>
                  <p className="mb-5">{item.description}</p>
                  <Link href={`/design-facilitation/${item.slug.current}`}><a><Button text="Learn More" style="normal" /></a></Link>
                </div>
              </div>
            </div>
          </section>
        ))
      }

      <FooterCTA />

      <style jsx>{`
      
        .facilitation-fixed-1 {
          position: absolute;
          top: 620px;
          right: 675px;
        }
      
      `}</style>
    </>
  )
}
