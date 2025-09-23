import React, { useState, useEffect } from 'react'
import Button from '../../../components/Button'
import LetteringTitle from '../../../components/LetteringTitle'
import DropdownCard from '../../../components/DropdownCard'
import ImageCarousel from '../../../components/ImageCarousel'
import VerticalTimeline from '../../../components/VerticalTimeline'
import initFadeUp from '../../../utils/initFadeUp';
import sanityClient from '../../../client'
import urlFor from '../../../utils/urlFor'
import BlockContent from '@sanity/block-content-to-react'
import TestimonialSlider from '../../../components/TestimonialSlider'

export async function getServerSideProps(context) {
  const position = await sanityClient.fetch(`*[_type=="joinUsPosition" && slug=="${context.params.position}" && category=="${context.params.category}"]`)
  const category = await sanityClient.fetch(`*[_type=="joinUsCategory" && slug=="${context.params.category}"]`)

  return {
    props: {
      position: position[0],
      category: category[0]
    },
  }
}

export default function JoinTheNetworkInner({ position, category }) {
  const [imageCarouselArray, setImageCarouselArray] = useState([])

  useEffect(() => {
    initFadeUp()
    initImageCarousel()
  }, [])

  const initImageCarousel = () => {
    const arr = []
    category.imageCarousel?.map(img => {
      arr.push({
        url: `${urlFor(img.image).url()}`,
        width: img.width,
        ...(img.caption ? { caption: img.caption } : {})
      })
    })
    setImageCarouselArray(arr)
  }

  return (
    <>
      <section className="network-inner-hero">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="order-2 order-lg-1 col-lg-8">
              <div className="h5 xl-ls font-weight-normal text-uppercase">
                {position.category === 'core-team' && 'Core Team'}
                {position.category === 'intern' && 'Internship Programme'}
                {position.category === 'network' && 'Join the Network'}
              </div>
              <div className="h1 mb-3"><LetteringTitle text={position.title} /></div>
              <p className="mb-5">
                {position.description}
              </p>
              <div className="h6 text-uppercase">Location :</div>
              <p className="mb-5">{position.location}</p>
              <a href={position.applyLink} target="_blank"><Button style="normal" text="Apply Now" /></a>
            </div>
            <div className="order-1 order-lg-2 col-6 col-lg-3 mb-4 mb-lg-0">
              <img src={urlFor(category.illustration).url()} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="padded-section pt-5">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className={`h2 ${position.requirements.length > 5 ? 'sticky' : ''}`}>The job requirements</div>
            </div>
            <div className="col-lg-6">
              <ul>
                {
                  position.requirements.map((item, index) => (
                    <li key={`requirement${index}`}><p>{item}</p></li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="padded-section pt-0">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className={`h2 ${position.responsibilities.length > 5 ? 'sticky' : ''}`}>What you need to bring to the table</div>
            </div>
            <div className="col-lg-6">
              <ul>
                {
                  position.responsibilities.map((item, index) => (
                    <li key={`responsibility${index}`}><p>{item}</p></li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="padded-section">
        <div className="container">
          <div className="h2 mb-100">We are looking for someone who is</div>
          <div className="grid-3">
            {
              category.qualities.map(item => (
                <div key={item._key}>
                  <div className={`mb-4 ${item.type === 'icon-lg' ? 'icon' : ''} ${item.type === 'icon-sm' ? 'icon-sm' : ''}`}><img src={urlFor(item.image).url()} alt="" /></div>
                  <div className="h4 mb-4">{item.title}</div>
                  <p>{item.description}</p>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      <section className="padded-section">
        <div className="container">
          <div className="h2 mb-100">Why should you join us?</div>
          <div className="grid-3">
            {
              category.whyJoinUs.map(item => (
                <div key={item._key}>
                  <DropdownCard
                    title={item.title}
                    desc={item.description}
                  />
                </div>
              ))
            }
          </div>
        </div>
      </section>

      <section className="padded-section">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="h2 mb-4">{category.statsTitle}</div>
              <BlockContent blocks={category.statsDescription} />
            </div>
            <div className="col-lg-2">
              {
                category.stats.map(stat => (
                  <div className="about-stat mb-5" key={stat._key}>
                    <div className="h2 mb-1 about-count">{stat.title}</div>
                    <div className="h5">{stat.description}</div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </section>

      {
        category.imageCarousel && category.imageCarousel.length > 0 &&
        <section className="py-5">
          <div>
            <ImageCarousel
              animateScroll={true}
              imgs={imageCarouselArray}
            />
          </div>
        </section>
      }

      {/* How the process works */}
      <section className="padded-section">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-4">
              <div className={`h2 ${category.process.length > 5 ? 'sticky' : ''}`}>Here's how the process works</div>
            </div>
            <div className="col-lg-7">
              {console.log(category.process)}
              <VerticalTimeline items={category.process} />
            </div>
          </div>
        </div>
      </section>

      {/* {
        category.testimonials.length > 0 &&
        <section className="py-5">
          <TestimonialSlider 
            slides={category.testimonials}
          />
        </section>
      } */}

      {/* Network Inner Footer CTA */}
      <section className="padded-section bg-grey">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="order-lg-2 mb-5 mb-lg-0 col-8 col-lg-5">
              <img src="/images/illustrations/static/alice-light.svg" alt="" />
            </div>
            <div className="col-lg-6">
              <div className="h3 mb-2">Ready to be part of our network?</div>
              <p className="mb-5">Are you creatively curious or curiously creative too? Join our network to work with us, grow with us and make wonderful things together.</p>
              <a href={position.applyLink} target="_blank">
                <Button text="Apply Now" style="normal" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
