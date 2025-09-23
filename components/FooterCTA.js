import Button from './Button';
import Link from 'next/link';

export default function FooterCTA() {
  return (
    <section className="footer-cta padded-section">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-8 mb-5 mb-lg-0 pr-lg-5">
            <div className="h3 text-white mb-6">"Well, now that we have seen each other," said the Unicorn, "if you'll believe in me, I'll believe in you. Is that a bargain?"</div>
            <Link href="/contact">
              <a><Button text="Get in Touch" style="alt" /></a>
            </Link>
          </div>
          <div className="col-9 col-lg-4 text-right">
            <img src="/images/illustrations/static/footer-cta-illustration.svg" alt="Alice in Wonderland Illustration"/>
          </div>
        </div>
      </div>
    </section>
  )
}
