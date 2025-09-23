import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic';
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import VerticalTimeline from '../../components/VerticalTimeline'
import initFadeUp from '../../utils/initFadeUp';
import { useRouter } from 'next/router';

const LetteringTitle = dynamic(
  () => import('../../components/LetteringTitle'),
  { ssr: false }
)

export default function JoinTheNetworkUX() {


  React.useEffect(() => {
    initFadeUp()
  }, [])

  return (
    <Layout>
      <section className="hero-section network-inner-hero flex-center">
        <div className="container">
          <div className="row justify-content-between w-100">
            <div className="col-lg-8">
              <div className="h4 xl-ls font-weight-normal text-uppercase">Network</div>
              <div className="h1 mb-3"><LetteringTitle text="User Experience Design" /></div>
              <p className="lg mb-5">
                In a world where the lines between the real and the virtual are blurring, our attempt is to change the idea of a traditional “job” by creating a virtual network of creative thinkers who can collaborate on the move and
              </p>
              <div className="h6 text-uppercase">Location :</div>
              <p className="mb-4">Anywhere in the world</p>
              <div><Button style="normal" text="Apply Now" /></div>
            </div>
            <div className="col-lg-3">
              {/* <img src="/images/illustrations/static/intern.svg" alt=""/> */}
            </div>
          </div>
        </div>
      </section>

      <section className="padded-section pt-5">
        <div className="container">
          <div className="row justify-content-between" data-fade-up>
            <div className="col-lg-6">
              <div className="h2">The job requirements</div>
            </div>
            <div className="col-lg-6">
              <ul>
                <li><p>Designing and delivering wireframes, user stories, user journeys, and mockups optimized for a wide range of devices and interfaces.</p></li>
                <li><p>Facilitating client's product vision by researching, conceiving, wire-framing, sketching, prototyping, and mocking up user experiences for digital products.</p></li>
                <li><p>Designing a final finished UI for Android, iOS, and web.</p></li>
                <li><p>User-centric design approach and rapidly testing and iterating your designs.</p></li>
                <li><p>Performing design QA and working closely with developers to ensure smooth implementation of the designs.</p></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="padded-section pt-0">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5" data-fade-up>
              <div className="h2">What you need to bring to the table</div>
            </div>
            <div className="col-lg-6">
              <ul>
                <li><p>Designing and delivering wireframes, user stories, user journeys, and mockups optimized for a wide range of devices and interfaces.</p></li>
                <li><p>Facilitating client's product vision by researching, conceiving, wire-framing, sketching, prototyping, and mocking up user experiences for digital products.</p></li>
                <li><p>Designing a final finished UI for Android, iOS, and web.</p></li>
                <li><p>User-centric design approach and rapidly testing and iterating your designs.</p></li>
                <li><p>Performing design QA and working closely with developers to ensure smooth implementation of the designs.</p></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="padded-section">
        <div className="container">
          <div className="h2 mb-100"><LetteringTitle text="Why you should join us" /></div>
          <div className="grid-3">
            <div data-fade-up>
              <div className="icon mb-4"><img src="/images/icons/team-formation.svg" alt="" /></div>
              <div className="h4 mb-4">Team Formation</div>
              <p>Be part of a larger creative community with the mothership in the beautiful hills of Panchgani. We will share freebies from our resources with you as well.</p>
            </div>
            <div data-fade-up>
              <div className="icon mb-4"><img src="/images/icons/hierarchy.svg" alt="" /></div>
              <div className="h4 mb-4">Hierarchy</div>
              <p>Network of Creative Thinkers is a design agency that partners with startups and corporates to.</p>
            </div>
            <div data-fade-up>
              <div className="icon mb-4"><img src="/images/icons/virtual-workspace.svg" alt="" /></div>
              <div className="h4 mb-4">Virtual Workspace</div>
              <p>Network of Creative Thinkers is a design agency that partners with startups and corporates to.</p>
            </div>
            <div data-fade-up>
              <div className="icon mb-4"><img src="/images/icons/feedback-sessions.svg" alt="" /></div>
              <div className="h4 mb-4">Feedback Sessions</div>
              <p>Network of Creative Thinkers is a design agency that partners with startups and corporates to.</p>
            </div>
            <div data-fade-up>
              <div className="icon mb-4"><img src="/images/icons/collaboration-partnership.svg" alt="" /></div>
              <div className="h4 mb-4">Collaboration / Partnership</div>
              <p>Network of Creative Thinkers is a design agency that partners with startups and corporates to.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How the process works */}
      <section className="padded-section">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-4">
              <div className="h2">Here's how the process works</div>
            </div>
            <div className="col-lg-7">
              <VerticalTimeline
                items={[
                  {
                    id: 1,
                    icon: 'join-process-1',
                    title: 'Apply to Join',
                    desc: "Network of Creative Thinkers is a design agency that partners with startups .Network of Creative Thinkers is a design "
                  },
                  {
                    id: 2,
                    icon: 'join-process-2',
                    title: 'Interview',
                    desc: "Network of Creative Thinkers is a design agency that partners with startups .Network of Creative Thinkers is a design "
                  },
                  {
                    id: 3,
                    icon: 'join-process-3',
                    title: 'Get accepteddd',
                    desc: "Network of Creative Thinkers is a design agency that partners with startups .Network of Creative Thinkers is a design "
                  },
                  {
                    id: 4,
                    icon: 'join-process-4',
                    title: 'Wait for a project',
                    desc: "Network of Creative Thinkers is a design agency that partners with startups .Network of Creative Thinkers is a design "
                  },
                  {
                    id: 5,
                    icon: 'join-process-5',
                    title: 'Matching criteria',
                    desc: "Network of Creative Thinkers is a design agency that partners with startups .Network of Creative Thinkers is a design "
                  },
                  {
                    id: 6,
                    icon: 'join-process-6',
                    title: 'Execute project',
                    desc: "Network of Creative Thinkers is a design agency that partners with startups .Network of Creative Thinkers is a design "
                  },
                  {
                    id: 7,
                    icon: 'join-process-7',
                    title: 'Execute project',
                    desc: "Network of Creative Thinkers is a design agency that partners with startups .Network of Creative Thinkers is a design "
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Network Inner Footer CTA */}
      <section className="padded-section bg-grey">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-5">
              <div className="h3 mb-2"><LetteringTitle text="Ready to be part of our network?" /></div>
              <p className="mb-5" data-fade-up>Are you creatively curious or curiously creative too? Join our network to work with us, grow with us and make wonderful things together.</p>
              <Link href="/join-us">
                <a>
                  <Button text="Apply Now" style="normal" />
                </a>
              </Link>
            </div>
            <div className="col-lg-5">
              <img src="/images/illustrations/static/join-the-network-footer.svg" alt="" />
            </div>
          </div>
        </div>
      </section>

    </Layout>
  )
}
