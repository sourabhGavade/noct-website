import { useEffect } from 'react'
import Router, { useRouter } from 'next/router';
import Script from 'next/script'
import * as fbq from '../lib/fpixel'
import * as gtag from '../lib/gtag';
import Head from 'next/head'
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import load from 'load-asset'
import '../styles/index.css'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  // GA Events
  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  Router.onRouteChangeStart = () => {
    gsap.to('.menu-icon-bg', { duration: 0.4, width: 0, height: 0, ease: 'linear'})
    document.querySelector('.menu-icon').classList.remove('open')
    document.querySelector('.fs-nav').classList.remove('open')
  };

  useEffect(() => {
    fbq.pageview()

    const handleRouteChange = url => {
      fbq.pageview()
      gtag.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  // useEffect(() => {
  //   loadAssets()
  // }, [])

  async function loadAssets() {
    const urls = [
      '/images/hero-video-light.mp4',
      '/images/hero-video-dark.mp4',
      '/images/work/dmart.webp',
      '/images/work/exotel.webp',
      '/images/work/sparky.webp',
      '/images/work/mapro.webp',
      '/images/work/kaleidescape.webp',
      '/images/services/services-branding.mp4',
      '/images/services/services-digital.mp4',
      '/images/services/services-strategy.mp4',
      '/images/about/noct-studio-video-2.mp4',
      '/images/about/about-causes-0.webp',
      '/images/about/about-causes-1.webp',
      '/images/about/about-causes-2.webp',
      '/images/join-the-network/join-us-testimonial-0.webp',
      '/images/join-the-network/join-us-testimonial-1.webp',
      '/images/join-the-network/join-us-testimonial-2.webp',
      '/images/join-the-network/join-us-testimonial-3.webp',
      '/images/join-the-network/join-us-testimonial-4.webp',
      '/images/join-the-network/join-us-testimonial-5.webp',
      '/images/join-the-network/join-us-testimonial-6.webp',
      'https://d3vt8ypyn13r24.cloudfront.net/ideation-strategy-a.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/ideation-strategy-b.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/ideation-strategy-c.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/immersion-a.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/immersion-b.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/immersion-c.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/design-a.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/design-b.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/design-c.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/research-discovery-a.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/research-discovery-b.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/research-discovery-c.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/dev-support-a.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/dev-support-b.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/testing-improvement-a.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/testing-improvement-b.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/scope-definition-a.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/scope-definition-b.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/research-strategy-a.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/research-strategy-b.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/research-strategy-c.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/concept-ideation-a.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/concept-ideation-b.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/brand-identity-a.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/brand-identity-b.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/brand-collaterals-a.mp4',
      'https://d3vt8ypyn13r24.cloudfront.net/brand-collaterals-b.mp4'
    ]
    await load.all(urls)
  }

  return (
    <>
      {/* Facebook Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 1320004018847907);
          `,
        }}
      />

      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2CW37BN4LW', {
              page_path: window.location.pathname,
            });
            gtag('consent', 'default', {
              'analytics_storage': 'granted'
            });
          `,
        }}
      />

      <Head>
        <title>NOCT | Network of Creative Thinkers</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* SEO */}
        <meta name="description" content="A design agency in the cloud with a studio in the hills, that crafts digital experiences, weaves intricate tales and builds brands from the ground up." />
        <meta property="og:title" content="NOCT | Network of Creative Thinkers | We craft digital products &amp; brands" />
        <meta property="og:description" content="A design agency in the cloud with a studio in the hills, that crafts digital experiences, weaves intricate tales and builds brands from the ground up." />
        <meta property="og:image" content="/site-preview.png" />
        <meta property="og:url" content="https://noct.in/" />
        <meta property="og:type" content="website" />

        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Font */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;600;700;900&display=swap" rel="stylesheet" />

        {/* Bootstrap */}
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

        {/* Animate.css */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />

        {/* GSAP */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/ScrollTrigger.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/ScrollToPlugin.min.js"></script>
        <script src="/js/SplitText.min.js"></script>
        <script src="/js/MorphSVGPlugin.min.js"></script>

        {/* Confetti */}
        <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
      </Head>

      <Navigation />

      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>

      <Footer />
    </>
  )
}

export default MyApp