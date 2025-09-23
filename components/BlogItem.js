import ButtonLink from "./ButtonLink";

export default function BlogItem({title, link, date, readTime}) {
    return (
        <a className="blog-item" href={link} target="_blank">
            <div className="blog-item__tag">{date}</div>
            <div className="blog-item__main">
                <div className="blog-item__title">{title}</div>
                <div className="blog-item__time">{readTime} min read</div>
                <div className="blog-item__cta-mobile d-block d-lg-none mt-3">
                    <ButtonLink text="Read" />
                </div>
            </div>
            <div className="blog-item__cta">
                <span className="h6 text-uppercase font-weight-normal">Read ―</span>
            </div>
        </a>
    )
}