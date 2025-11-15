import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { gsap, ScrollTrigger } from "gsap/dist/gsap"
import Button from '../components/Button'
import LetteringTitle from '../components/LetteringTitle'
import DropdownCard from '../components/DropdownCard'
import initFadeUp from '../utils/initFadeUp'
import sanityClient from '../client'
import urlFor from '../utils/urlFor'
import { MdArrowForward } from 'react-icons/md'

const ImageCarousel = dynamic(
  () => import('../components/ImageCarousel'),
  { ssr: false }
)

export async function getServerSideProps() {
  const content = await sanityClient.fetch(`*[_type=="join"][0]`)
  const allPositions = await sanityClient.fetch(`*[_type=="joinUsPosition"]`)
  const categories = await sanityClient.fetch(`*[_type=="joinUsCategory"] | order(order asc)`)

  return {
    props: {
      content,
      allPositions,
      categories
    },
  }
}

export default function JoinTheNetwork({ content, categories, allPositions }) {
  const [imageCarouselArray, setImageCarouselArray] = useState([])

  // Mobile Carousel Dots Index
  const [mcIndex, setMcIndex] = useState(0)
  const mcItems = 3

  useEffect(() => {
    document.documentElement.classList.add('smooth-scroll')
    initFadeUp()
    initMobileCarousel()
    initParallax()
    initImageCarousel()

    return () => document.documentElement.classList.remove('smooth-scroll')
  }, [])

  const initMobileCarousel = () => {
    const scroller = document.querySelector('.mobile-carousel')
    document.querySelector('.mobile-carousel').addEventListener('scroll', () => {
      const index = Math.round((scroller.scrollLeft / scroller.scrollWidth) * mcItems)
      const itemWidth = scroller.scrollWidth / mcItems
      if (scroller.scrollLeft <= (itemWidth * (mcItems - 2)) + 20) {
        setMcIndex(index)
      } else {
        setMcIndex(mcItems - 1)
      }
    })
  }

  const initParallax = () => {
    gsap.to('.join-us-banner', {
      scrollTrigger: {
        trigger: '.join-us-hero-section',
        start: 'top top',
        scrub: 0.5
      },
      y: -200,
      force3D: true
    });
  }

  const initImageCarousel = () => {
    const arr = []
    content.imageCarousel?.map(img => {
      arr.push({
        url: `${urlFor(img.image).url()}`,
        width: img.width,
        ...(img.caption ? { caption: img.caption } : {})
      })
    })
    setImageCarouselArray(arr)
  }

  const categoryMap = {
    'core-team': 'Full-time',
    'intern': 'Internship',
  }

  return (
    <>
      <Head>
        <title>NOCT | Join Us</title>
      </Head>

      {/* Join Us - Hero */}
      <section className="hero-section join-us-hero-section flex-center">
        <div className="hero-fixed-banner join-us-banner">
          Join Us
        </div>
        <div className="container">
          <div className="row justify-content-between w-100">
            <div className="col-lg-6">
              <h1 className="pr-4"><LetteringTitle text="Be a part of the future of work" /></h1>
            </div>
            <div className="col-lg-6">
              <div data-fade-up>
                <p className="lg mb-5">Between the blurring lines of the real and the virtual, our attempt is to create a virtual network of creative thinkers who can collaborate on the move and work flexibly without relying on cityscapes or office spaces.</p>
                <a href="#positions">
                  <Button text="Apply Now" style="normal" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us - Our Beliefs */}
      <section className="padded-section pt-0">
        <div className="container">
          <div className="grid-3 mobile-carousel">
            <div>
              <img style={{ maxWidth: '300px' }} className="about-belief-img mb-4" src="/images/illustrations/static/community.svg" alt="" />
              <div className="h4 mb-4">Community</div>
              <p>Be part of, exchange ideas and grow with a larger creative community of diverse thinkers from across the world.</p>
            </div>
            <div>
              <img style={{ maxWidth: '300px' }} className="about-belief-img mb-4" src="/images/illustrations/static/creativity.svg" alt="" />
              <div className="h4 mb-4">Creativity</div>
              <p>Broaden your creative horizons by working with varied clients, industries and dynamic multidisciplinary teams.</p>
            </div>
            <div>
              <img style={{ maxWidth: '240px' }} className="about-belief-img mb-4" src="/images/illustrations/static/freedom.svg" alt="" />
              <div className="h4 mb-4">Freedom</div>
              <p>Retain your creative freedom while working with us, from anywhere on earth with just your laptop &amp; internet.</p>
            </div>
          </div>
          <div className="mc-dots d-flex d-md-none">
            {
              new Array(mcItems).fill('0').map((item, index) => (
                <span className={`mc-dot ${mcIndex === index ? 'active' : ''}`} key={`mc${index}`}></span>
              ))
            }
          </div>
        </div>
      </section>

      {/* Join Us - How We Operate */}
      <section className="padded-section">
        <div className="container">
          <div className="h2 mb-6"><LetteringTitle text="How we operate" /></div>
          <div className="testimonial-grid grid-3">
            <div>
              <DropdownCard
                title="Studio in the Hills"
                desc="Located in the quaint hill station of Panchgani away from the bustling city, we've created a studio space in the midst of nature. We drawn inspiration and motivation from our surroundings for out of the box creative thinking and problem solving."
              />
              <DropdownCard
                title="Community Events"
                desc="Community events are a means to bring about a sharing of ideas and experiences and a meaningful discourse within our core team and network, and also involve the local community."
              />
              <DropdownCard
                title="Projects from around the globe"
                desc="Our clients and projects are not geographically bound to India, and are spread out across the globe, which enables opportunities to collaborate with cross-cultural teams and exposure to the international design scene."
              />
            </div>
            <div>
              <DropdownCard
                title="Virtual Workspace"
                desc="Although our mothership lies in the hills of Panchgani, the boundaries of our team span across the world as remote individuals, virtually connected through online workspaces and collaboration platforms like Notion, Slack, Gmail, Miro."
              />
              <DropdownCard
                title="Cross Disciplinary Teams"
                desc="Ours is a living, breathing network of individuals with diverse skills, experience and perspectives, who come together as custom teams to bring a fresh energy and spirit of collaboration to every project."
              />
              <DropdownCard
                title="High quality clients"
                desc="Quality always wins over quantity- we like working with select and distinct clients in order to go in-depth and produce well-thought-out, high quality work that also pushes us to grow by the day."
              />
            </div>
            <div>
              <DropdownCard
                title="Design Critiques"
                desc="We have design reviews every week, where we present the work we've done to receive constructive feedback. This enables every NOCT member to grow by gaining fresh perspectives from other creative minds."
              />
              <DropdownCard
                title="Experienced Leads &amp; Mentors"
                desc="Our project leads are experienced designers and domain experts, which creates great mentoring opportunities for junior designers to learn on the job without a strict hierarchical structure within the team."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Join Us - Gallery */}
      {
        content.imageCarousel?.length > 0 &&
        <section className="py-5">
          <div>
            <ImageCarousel
              animateScroll={false}
              imgs={imageCarouselArray}
            />
          </div>
        </section>
      }

      <section className="padded-section" id="positions">
        <div className="container">
          <div className="h2 mb-6"><LetteringTitle text="Open Positions" /></div>
          <div className="join-grid">
            {
              allPositions.map(position => (
                <Link href={`/join-us/${position.category}/${position.slug}`} key={position._id}>
                  <a className="join-grid-item">
                    <h4 className='mb-3'>{position.title}</h4>
                    <p className='join-subtext'>{categoryMap[position.category]} <i>•</i> {position.location} <i>•</i> {position.experience}</p>
                    <span className='join-arrow'><MdArrowForward size="22" /></span>
                  </a>
                </Link>
              ))
            }
          </div>
        </div>
      </section>

    </>
  )
}
