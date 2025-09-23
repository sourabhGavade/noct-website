import React from 'react'
import Link from 'next/link'
import Button from '../components/Button'
import LetteringTitle from '../components/LetteringTitle'
import TestimonialCard from '../components/TestimonialCard'
import VerticalTimeline from '../components/VerticalTimeline'
import initFadeUp from '../utils/initFadeUp'

export default function BrandAudit() {

  React.useEffect(() => {
    initFadeUp()
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="hero-section network-inner-hero flex-center">
        <div className="container">
          <div className="row align-items-center justify-content-between w-100">
            <div className="col-lg-6">
              <div className="h1 mb-3"><LetteringTitle text="What is a<br/>Brand audit?" /></div>
              <p className="lg" data-fade-up>
                A brand audit is an examination of the brand to understand and identify issues, areas for improvement and analyse it against its vision and heuristics to streamline and maintain consistency in all communication.
              </p>
            </div>
            <div className="col-lg-5">
              <img src="https://dummyimage.com/475x420/efefef/ccc" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* When you should do it */}
      <section className="padded-section">
        <div className="container" data-fade-up>
          <div className="h2 mb-6">When you should do it?</div>
          <div className="grid-3">
            <div>
              <TestimonialCard problem="" solution="" />
              <TestimonialCard problem="" solution="" />
            </div>
            <div>
              <TestimonialCard problem="" solution="" />
              <TestimonialCard problem="" solution="" />
            </div>
            <div>
              <TestimonialCard problem="" solution="" />
              <TestimonialCard problem="" solution="" />
            </div>
          </div>
        </div>
      </section>

      {/* Why do it */}
      <section className="padded-section pt-0">
        <div className="container" data-fade-up>
          <div className="h2 mb-100">Why do it?</div>
          <div className="grid-3">
            <div>
              <div className="icon mb-4"><img src="/images/icons/brand-audit-why-1.svg" alt="" /></div>
              <div className="h4 mb-4">A systematic approach</div>
              <p>Approaching things analytically with an audit helps in setting up strong basic systems and resolving issues easily.</p>
            </div>
            <div>
              <div className="icon mb-4"><img src="/images/icons/brand-audit-why-2.svg" alt="" /></div>
              <div className="h4 mb-4">Move past barriers</div>
              <p>When a brand or product faces any barriers, an audit can help you easily move past them to facilitate and plan your growth.</p>
            </div>
            <div>
              <div className="icon mb-4"><img src="/images/icons/brand-audit-why-3.svg" alt="" /></div>
              <div className="h4 mb-4">Identifying issues</div>
              <p>An audit does not just help you recognise the effects of the underlying issues, but also to identify them and solve them at the core.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it's done */}
      <section className="padded-section">
        <div className="container" data-fade-up>
          <div className="row justify-content-between">
            <div className="col-lg-4">
              <div className="h2 mb-3">How it's done</div>
              <p>Network of Creative Thinkers is a design agency that partners with startups. Network of Creative Thinkers is a design </p>
            </div>
            <div className="col-lg-7">
              <VerticalTimeline 
                items={[
                  {
                    id: 1,
                    icon: 'brand-audit-how-1',
                    title: 'Defining The Core',
                    desc: "A brand form is filled out individually by the brand's key stakeholders and a session is held to align their ethos and vision into a common brand manifesto."
                  },
                  {
                    id: 2,
                    icon: 'brand-audit-how-2',
                    title: 'Problem Statement or Goals',
                    desc: "The problem statement or goal is defined into a clear brief to define the basis of the audit and identify the specifics of the exercise."
                  },
                  {
                    id: 3,
                    icon: 'brand-audit-how-3',
                    title: 'Visual Collateral Study',
                    desc: "All of the brands collaterals (digital and print) are studied and checked for consistency in personality, visual style and language across all mediums."
                  },
                  {
                    id: 4,
                    icon: 'brand-audit-how-4',
                    title: 'Content & Tone Study',
                    desc: "All of the brands communication and description is studied and checked for consistency in personality, tone and language across all mediums online and offline."
                  },
                  {
                    id: 5,
                    icon: 'brand-audit-how-5',
                    title: 'Defining Issues',
                    desc: "All issues are identified as per brand heuristics and their solutions defined to align with the core of the brand defined initially."
                  },
                  {
                    id: 6,
                    icon: 'brand-audit-how-6',
                    title: 'Visual & Voice Alignment',
                    desc: "The Brand guidelines are created and standardised as per the findings with a defined consistency in visuals and tonality for brand alignment. This is to be applied for all future communication and edited in the existing."
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="padded-section bg-grey">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-5">
              <div className="h2 mb-5">Let's talk about your Brand Audit.</div>
              <Link href="/contact">
                <a>
                  <Button text="Let's Chat" style="normal" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
