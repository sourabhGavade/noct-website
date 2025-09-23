import useWindowSize from '../../utils/useWindowSize'

export default function ProblemSolution({ data }) {
    const windowSize = useWindowSize()
    let { title, problem, solution, marginBottom, marginBottomMobile } = data
    marginBottomMobile = marginBottomMobile ? marginBottomMobile : marginBottom/2
    return (
        <>
            <section className="project-section" style={{ marginBottom: `${windowSize.width > 769 ? marginBottom : marginBottomMobile}px`}}>
                <div className="container">
                    <div className="project-intro-inner">
                        <h3 className="mb-5">{title}</h3>
                        <div className="project-split-grid">
                            <div>
                                <div className="h6 text-uppercase problem mb-3">Problem</div>
                                <p>{problem}</p>
                            </div>
                            <div>
                                <div className="h6 text-uppercase solution mb-3">Solution</div>
                                <p>{solution}</p>
                            </div>
                        </div>
                    </div>
                </div>  
            </section>
            <style jsx>{`

                .problem {
                    color: #E39090;
                }

                .solution {
                    color: #59A381;
                }

                @media screen and (max-width: 769px) {
                    .project-split-grid {
                        grid-template-columns: 1fr;
                    }
                }

            `}</style>
        </>
    )
}
