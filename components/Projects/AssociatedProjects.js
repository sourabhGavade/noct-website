import Link from "next/link";
import urlFor from "../../utils/urlFor";
import Button from "../Button";
import useWindowSize from "../../utils/useWindowSize";

export default function AssociatedProjects({ data }) {
  const windowSize = useWindowSize();
  let { introPara, projects, marginBottom, marginBottomMobile } = data;
  marginBottomMobile = marginBottomMobile
    ? marginBottomMobile
    : marginBottom / 2;
  return (
    <section
      className="project-section"
      style={{
        marginBottom: `${
          windowSize.width > 769 ? marginBottom : marginBottomMobile
        }px`,
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-lg-10 col-xl-8">
            <div className="h2 mb-3">Associated Projects</div>
            <p className="mb-6">{introPara}</p>
            {projects.map((project, index) => (
              <div
                className="associated-project project-split-grid mb-6"
                key={project._key}
              >
                <div className={`${index % 2 === 0 ? "order-md-2" : ""}`}>
                  <img src={urlFor(project.image).url()} alt={project.title} />
                </div>
                <div>
                  <div className="h4 mb-2">{project.title}</div>
                  <p className="mb-4">{project.description}</p>
                  <Link href={`/work/${project.slug}`}>
                    <a>
                      <Button text="View Project" />
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
