import { useEffect, useState } from 'react'
import Head from "next/head";
import LetteringTitle from '../components/LetteringTitle'
import ButtonLink from '../components/ButtonLink'
import WorkItem from '../components/WorkItem'
import FooterCTA from '../components/FooterCTA'
import sanityClient from '../client'
import urlFor from '../utils/urlFor'
import useWindowSize from '../utils/useWindowSize'

export async function getStaticProps() {
  const projects = await sanityClient.fetch(`*[_type=="projects"] | order(priority asc) {_id, projectTitle, slug, projectFilters, projectCaption, previewImage, previewImageBg}`)

  return {
      revalidate: 60,
      props: {
          projects
      },
  }
}

export default function Work({ projects }) {
  const [filter, setFilter] = useState('all')
  const [transform, setTransform] = useState(0)
  const [projectsShown, setProjectsShown] = useState(projects)

  const windowSize = useWindowSize()

  useEffect(() => {
    initNav()
    document.querySelector('.navbar-active').classList.add('active-page')

    return () => {
      document.querySelector('.navbar-active').classList.remove('active-page')
    }
  }, [filter])

  const initNav = () => {
    const active = document.querySelector('.work-nav-item.active')
    setTransform(active.offsetLeft + ((active.getBoundingClientRect().width / 2)) - 7)
  }

  const filterProjects = (filter) => {
    document.querySelector('.work-nav-active').classList.add('is-animating')
    gsap.to('.work-grid', { opacity: 0, y: 20, duration: 0.5});
    setFilter(filter)
    setTimeout(() => {
      if (filter === 'all') {
        setProjectsShown(projects)
        gsap.to('.work-grid', { opacity: 1, y: 0, duration: 0.5});
        setTimeout(() => document.querySelector('.work-nav-active').classList.remove('is-animating'), 300)
      } else {
        setProjectsShown(projects.filter(project => project.projectFilters.includes(filter)))
        gsap.to('.work-grid', { opacity: 1, y: 0, duration: 0.5});
        setTimeout(() => document.querySelector('.work-nav-active').classList.remove('is-animating'), 300)
      }
    }, 500)
  }

  return (
    <>
      <Head>
        <title>NOCT | Work</title>
      </Head>

      <section className="work-intro-text text-center">
        <div className="h1 text-center px-5 mb-4"><LetteringTitle text="Work we've loved doing" /></div>
      </section>

      <nav className="work-nav d-block">
        <div className="work-nav-inner">
          <a onClick={() => filterProjects('all')}><span className={`work-nav-item ${filter === 'all' ? 'active' : ''}`}>All</span></a>
          <a onClick={() => filterProjects('web')}><span className={`work-nav-item ${filter === 'web' ? 'active' : ''}`}>Web</span></a>
          <a onClick={() => filterProjects('mobile')}><span className={`work-nav-item ${filter === 'mobile' ? 'active' : ''}`}>Mobile</span></a>
          <a onClick={() => filterProjects('branding')}><span className={`work-nav-item ${filter === 'branding' ? 'active' : ''}`}>Branding</span></a>
          <a onClick={() => filterProjects('packaging')}><span className={`work-nav-item ${filter === 'packaging' ? 'active' : ''}`}>Packaging</span></a>
          <a onClick={() => filterProjects('video')}><span className={`work-nav-item ${filter === 'video' ? 'active' : ''}`}>Video</span></a>
        </div>
        <div className="work-nav-active-container">
          <div className="work-nav-active" style={{transform: `translateX(${transform}px)`}} />
        </div>
      </nav>

      <section className="padded-section">
        <div className="container">
          <div className="work-grid">
            {
              projectsShown.map(project => (
                <WorkItem
                  uid={project._id}
                  url={`/work/${project.slug.current}`}
                  img={urlFor(project.previewImage).url()}
                  imgBg={project.previewImageBg}
                  title={project.projectTitle}
                  desc={project.projectCaption}
                />
              ))
            }
            <div className="work-item work-item-sm work-item-see-all">
              <div className="work-item-see-all-inner">
                <div className="work-title mt-0 mb-5 pr-5">
                  Want to see more? Check out our decks to view some additional projects.
                  <br/><br/>
                </div>
                <div className="mb-3"><a href="https://docs.google.com/presentation/d/1AzlmQZXqEUUaeGsTV_jNcOPuD8eHBCAmubOCJPCFoLk/present#slide=id.p" target="_blank"><ButtonLink text="View UX Deck" /></a></div>
                <div><a href="https://docs.google.com/presentation/d/1Cf6iFFAZ4CBQ68YBI5nROKhiI8l5GPB52IkPbvDay64/present?slide=id.g4751c84df1_0_36" target="_blank"><ButtonLink text="View Branding Deck" /></a></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterCTA />

      <style jsx>{`
      
        .work-intro-text {
          padding: 180px 0 80px;
        }

        .work-nav {
          position: relative;
        }

        .work-nav-inner {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .work-nav-active-container {
          position: absolute;
          width: 100%;
          bottom: -14px;
        }

        .work-nav-active {
          width: 14px;
          height: 14px;
          background-image: url('/images/gooey-sprite-horizontal.png');
          background-position:  0% 50%;
          background-size: cover;
          transition: transform 0.6s cubic-bezier(0.23,1,0.32,1);
        }

        .work-nav-active.is-animating {
          animation: sprite 0.9s linear steps(6) forwards;
        }
        
        @keyframes sprite {
          100% { background-position: 100% 50%; }
        }

        .work-nav-item {
          cursor: pointer;
          margin: 0 35px;
          font-family: 'Lato';
          font-size: 14px;
          letter-spacing: 1.57px;
          line-height: 18px;
          text-transform: uppercase;
          color: var(--text);
          opacity: 0.6;
          transition: 0.3s ease;
        }

        .work-nav-item:hover,
        .work-nav-item.active {
          opacity: 1;
        }

        .custom-select {
          font-family: 'Lato';
          font-weight: bold;
          font-size: 14px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          border: none;
          width: max-content;
        }

        @media screen and (max-width: 768px) {
          .work-intro-text {
            padding: 180px 0 80px;
          }

          .work-nav {
            width: 100vw;
            overflow-x: auto;
            padding-bottom: 20px;
            clip-path: inset(0 0 20px 0);
          }

          .work-nav-inner {
            justify-content: flex-start;
            padding: 15px 0;
            padding-left: calc(50vw - 45px);
          }

          .work-nav-inner a:last-child .work-nav-item {
            margin-right: calc(50vw - 45px);
          }

          .work-nav-item {
            margin: 0 28px;
          }

          .work-nav-active-container {
            bottom: 20px;
          }
        }
      
      `}</style>
    </>
  )
}
