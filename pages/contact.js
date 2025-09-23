import Head from 'next/head'
import LetteringTitle from '../components/LetteringTitle'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  return (
    <>
      <Head>
        <title>NOCT | Contact Us</title>
      </Head>

      <section className="padded-section">
        <div className="container">
          <div className="h1 mt-5 mt-lg-0"><LetteringTitle text="Let's get in touch" /></div>
          <div className="row justify-content-between">
            <div className="col-lg-7 mb-5 mb-lg-0">
              <ContactForm />
            </div>
            <div className="col-lg-4">
              <div className="mb-5">
                <p className="lg mb-4">Send a message and we’ll get back.</p>
                <a href="mailto:hello@noct.in" className="d-flex flex-row justify-content-start align-items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14"><path d="M1.714.215C.763.215 0 1.015 0 1.976v8.9c0 .96.763 1.768 1.714 1.768h14.57c.95 0 1.714-.807 1.714-1.768v-8.9c0-.96-.763-1.76-1.714-1.76H1.714zm0 .857h14.57a.85.85 0 0 1 .355.08L9.556 7.708c-.327.303-.764.303-1.092 0L1.366 1.152c.106-.048.225-.08.348-.08zm-.844.8L5.9 6.51.964 11.31c-.065-.13-.107-.274-.107-.435v-8.9c0-.04.01-.076.013-.114h0zm16.26.007c.004.036.013.07.013.107v8.9a.96.96 0 0 1-.1.429l-4.922-4.8 5.01-4.634zm-5.632 5.2l4.815 4.708H1.694l4.835-4.7 1.353 1.252c.636.587 1.62.588 2.257 0l1.36-1.26z"/></svg>
                  <p className="font-weight-bold ml-3">hello@noct.in <span className="font-weight-light">(Enquiries)</span></p>
                </a>
                <a href="mailto:join@noct.in" className="d-flex flex-row justify-content-start align-items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14"><path d="M1.714.215C.763.215 0 1.015 0 1.976v8.9c0 .96.763 1.768 1.714 1.768h14.57c.95 0 1.714-.807 1.714-1.768v-8.9c0-.96-.763-1.76-1.714-1.76H1.714zm0 .857h14.57a.85.85 0 0 1 .355.08L9.556 7.708c-.327.303-.764.303-1.092 0L1.366 1.152c.106-.048.225-.08.348-.08zm-.844.8L5.9 6.51.964 11.31c-.065-.13-.107-.274-.107-.435v-8.9c0-.04.01-.076.013-.114h0zm16.26.007c.004.036.013.07.013.107v8.9a.96.96 0 0 1-.1.429l-4.922-4.8 5.01-4.634zm-5.632 5.2l4.815 4.708H1.694l4.835-4.7 1.353 1.252c.636.587 1.62.588 2.257 0l1.36-1.26z"/></svg>
                  <p className="font-weight-bold ml-3">join@noct.in <span className="font-weight-light">(Careers)</span></p>
                </a>
                <a href="tel:+918007390859" className="d-flex flex-row justify-content-start align-items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M12.817 17.753C7.467 17.754 1.957 10.625.62 6.946a5.62 5.62 0 0 1 .976-5.609C2.343.5 3.247.11 4.013.29 5.8.72 6.715 4.884 6.88 5.715a.43.43 0 0 1-.101.369l-1.53 1.71c.304 2.102 3.65 4.467 5.262 5.41l1.62-1.653c.73-.744 2.3-.376 4.806 1.128.658.394.973 1.52.704 2.507-.208.763-1.09 2.542-4.776 2.568h-.044zm-9.2-16.65a2.07 2.07 0 0 0-1.391.804 4.75 4.75 0 0 0-.811 4.746c1.117 3.072 6.333 10.243 11.4 10.243h.04c2.988-.022 3.76-1.223 3.955-1.937a1.53 1.53 0 0 0-.318-1.546c-3.054-1.832-3.7-1.326-3.753-1.263h0l-1.85 1.89c-.135.138-.345.17-.513.075-.237-.13-5.798-3.235-6.004-6.44a.43.43 0 0 1 .109-.313l1.514-1.7c-.39-1.83-1.284-4.333-2.18-4.547a.81.81 0 0 0-.188-.021z"/></svg>
                  <p className="font-weight-bold ml-3">+91 8007390859</p>
                </a>
              </div>

              <div className="h6 text-uppercase font-weight-light mb-4">Our Addresses</div>
              <div className="mb-4">
                <div className="h5 mb-2">Panchgani</div>
                <p>
                  NOCT Studio, Ganesh Peth,<br/>
                  Panchgani, Maharashtra - 412805
                </p>
              </div>
              <div>
                <div className="h5 mb-2">Mumbai</div>
                <p>
                  Gokuldham Society,<br/>
                  Mumbai, Maharashtra - 400023
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
