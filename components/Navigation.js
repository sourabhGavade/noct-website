import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import urlFor from "../utils/urlFor";

const getActiveNavPage = (pathname) => {
  if (pathname === "/work") return "work";
  if (pathname === "/services") return "services";
  if (pathname === "/industries" || pathname.startsWith("/industries/"))
    return "industries";
  if (pathname === "/about") return "about";
  if (pathname === "/clients") return "clients";
  return "";
};

const positionNavDot = (page) => {
  const links = document.querySelector(".navbar-links");
  const activeEl = document.querySelector(".navbar-active");
  if (!links || !activeEl || !page) return;

  const link = Array.from(links.querySelectorAll(".navbar-link")).find((el) => {
    const href = el.getAttribute("href") || "";
    if (page === "work") return href === "/work";
    if (page === "services") return href === "/services";
    if (page === "industries") return href.startsWith("/industries");
    if (page === "about") return href === "/about";
    if (page === "clients") return href === "/clients";
    return false;
  });
  if (!link) return;

  const linksRect = links.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  const x =
    linkRect.left -
    linksRect.left +
    linkRect.width / 2 -
    activeEl.offsetWidth / 2;
  activeEl.style.transform = `translate3D(${x}px, 0, 0)`;
};

const clearNavActive = () => {
  const el = document.querySelector(".navbar-active");
  if (!el) return;
  el.classList.remove(
    "animate",
    "work",
    "services",
    "industries",
    "about",
    "clients",
  );
};

export default function Navigation({ awards }) {
  const [active, setActive] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      clearNavActive();
      const page = getActiveNavPage(router.pathname);
      const activeEl = document.querySelector(".navbar-active");
      if (page && activeEl) {
        activeEl.classList.add(page);
        positionNavDot(page);
      }
    }, 500);
    initScrollDirection();
    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    const awardsInterval = setInterval(() => {
      if (activeIndex < awards.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else {
        setActiveIndex(0);
      }
    }, 5000);

    return () => clearInterval(awardsInterval);
  }, [activeIndex]);

  const initScrollDirection = () => {
    var lastScrollTop = 0;
    window.addEventListener(
      "scroll",
      function () {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
          setTimeout(() => {
            document.querySelector("body").classList.remove("scrolling-up");
            document.querySelector("body").classList.add("scrolling-down");
          }, 100);
        } else {
          setTimeout(() => {
            document.querySelector("body").classList.remove("scrolling-down");
            document.querySelector("body").classList.add("scrolling-up");
          }, 100);
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

        const navbar = document.querySelector(".navbar");
        if (!navbar) return;

        // Dark pages keep a transparent navbar so it never flashes white on scroll-up
        const path = window.location.pathname;
        const isDarkNavbarPage =
          document.body.classList.contains("industries-page") ||
          path === "/industries" ||
          path.startsWith("/industries/");

        if (st < 400 || isDarkNavbarPage) {
          navbar.style.backgroundColor = "transparent";
        } else {
          navbar.style.backgroundColor = "#FCFCFC";
        }
      },
      false,
    );
  };

  const showMenu = () => {
    TweenMax.to(".menu-icon-bg", {
      duration: 0.6,
      width: 4200,
      height: 4200,
      ease: "linear",
    });
    document.querySelector(".menu-icon").classList.add("open");
    setTimeout(() => {
      document.querySelector(".fs-nav").classList.add("open");
    }, 300);
  };

  const closeMenu = () => {
    gsap.to(".menu-icon-bg", {
      duration: 0.4,
      width: 0,
      height: 0,
      ease: "linear",
    });
    document.querySelector(".menu-icon").classList.remove("open");
    document.querySelector(".fs-nav").classList.remove("open");
  };

  const isTouchEnabled = () => {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  };

  const iconMouseEnter = () => {
    if (!isTouchEnabled()) {
      TweenMax.to(".menu-icon-bg", { duration: 0.4, width: 42, height: 42 });
    }
  };

  const iconMouseLeave = () => {
    if (!isTouchEnabled()) {
      if (document.querySelector(".fs-nav").classList.contains("open")) {
        return;
      } else {
        TweenMax.to(".menu-icon-bg", 0.3, { width: 0, height: 0 });
      }
    }
  };

  const navbarHover = (page) => {
    const activeEl = document.querySelector(".navbar-active");
    if (!activeEl) return;
    activeEl.classList.remove("animate");
    if (active === page) {
      return;
    }
    clearNavActive();
    activeEl.classList.add("animate", page);
    positionNavDot(page);
    setActive(page);
  };

  const navbarReset = () => {
    clearNavActive();
    const activeEl = document.querySelector(".navbar-active");
    if (!activeEl) return;
    const page = getActiveNavPage(router.pathname);
    if (page) {
      activeEl.classList.add(page);
      positionNavDot(page);
    } else {
      activeEl.style.transform = "translate3D(0, 0, 0)";
    }
  };

  const isIndustriesPage =
    router.pathname === "/industries" ||
    router.pathname.startsWith("/industries/");

  return (
    <>
      {/* Navbar */}
      <div className="navbar show">
        <div className="h-100 flex-center">
          <div className="w-100 h-100 d-flex flex-row justify-content-between align-items-center">
            <div className="nav-logo">
              <Link href="/">
                <a>
                  <img
                    id="navLogoSVG"
                    src={
                      isIndustriesPage
                        ? "/icons/noct-dark-logo.svg"
                        : "/icons/noct-light-logo.svg"
                    }
                    alt="NOCT"
                    width={80}
                    height={22}
                  />
                </a>
              </Link>
            </div>
            <div className="navbar-right d-flex flex-row align-items-center">
              <div className="navbar-links position-relative">
                <div className="navbar-active-container">
                  <div className="navbar-active" />
                </div>
                <Link href="/work">
                  <a
                    className={`navbar-link ${
                      router.pathname === "/work" ? "font-weight-bold" : ""
                    }`}
                    onMouseEnter={() => navbarHover("work")}
                    onMouseLeave={() => navbarReset()}
                  >
                    Work
                  </a>
                </Link>
                <Link href="/services">
                  <a
                    className={`navbar-link ${
                      router.pathname === "/services" ? "font-weight-bold" : ""
                    }`}
                    onMouseEnter={() => navbarHover("services")}
                    onMouseLeave={() => navbarReset()}
                  >
                    Services
                  </a>
                </Link>
                {/* <Link href="/industries">
                  <a
                    className={`navbar-link ${
                      router.pathname === "/industries" ||
                      router.pathname.startsWith("/industries/")
                        ? "font-weight-bold"
                        : ""
                    }`}
                    onMouseEnter={() => navbarHover("industries")}
                    onMouseLeave={() => navbarReset()}
                  >
                    Industries
                  </a>
                </Link>
                <Link href="/clients">
                  <a
                    className={`navbar-link ${
                      router.pathname === "/clients" ? "font-weight-bold" : ""
                    }`}
                    onMouseEnter={() => navbarHover("clients")}
                    onMouseLeave={() => navbarReset()}
                  >
                    Clients
                  </a>
                </Link> */}
                <Link href="/about">
                  <a
                    className={`navbar-link ${
                      router.pathname === "/about" ? "font-weight-bold" : ""
                    }`}
                    onMouseEnter={() => navbarHover("about")}
                    onMouseLeave={() => navbarReset()}
                  >
                    About
                  </a>
                </Link>
              </div>
              <div className="navbar-menu-icon">
                <a>
                  <div
                    className="menu-icon"
                    onClick={() => showMenu()}
                    onMouseEnter={() => iconMouseEnter()}
                    onMouseLeave={() => iconMouseLeave()}
                  >
                    <div className="menu-icon-top" />
                    <div className="menu-icon-bottom" />
                    <span className="menu-icon-bg" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Nav
       ******************************************************************************************************/}

      <div className="fs-nav">
        <div className="fs-nav-close" onClick={() => closeMenu()}>
          &times;
        </div>

        {/* Primary Nav */}
        <div className="fs-nav-main">
          <div
            className={`fs-nav-inner ${
              router.pathname === "/" ? "active" : ""
            }`}
          >
            <div className="fs-nav-gooey" />
            <Link href="/">
              <a className="fs-nav-link">Home</a>
            </Link>
          </div>
          <div
            className={`fs-nav-inner ${
              router.pathname === "/work" ? "active" : ""
            }`}
          >
            <div className="fs-nav-gooey" />
            <Link href="/work">
              <a className="fs-nav-link">Work</a>
            </Link>
          </div>
          <div
            className={`fs-nav-inner ${
              router.pathname === "/services" ? "active" : ""
            }`}
          >
            <div className="fs-nav-gooey" />
            <Link href="/services">
              <a className="fs-nav-link">Services</a>
            </Link>
          </div>
          {/* <div
            className={`fs-nav-inner ${
              router.pathname === "/industries" ||
              router.pathname.startsWith("/industries/")
                ? "active"
                : ""
            }`}
          >
            <div className="fs-nav-gooey" />
            <Link href="/industries">
              <a className="fs-nav-link">Industries</a>
            </Link>
          </div>
          <div
            className={`fs-nav-inner ${
              router.pathname === "/clients" ? "active" : ""
            }`}
          >
            <div className="fs-nav-gooey" />
            <Link href="/clients">
              <a className="fs-nav-link">Clients</a>
            </Link>
          </div> */}
          <div
            className={`fs-nav-inner ${
              router.pathname === "/about" ? "active" : ""
            }`}
          >
            <div className="fs-nav-gooey" />
            <Link href="/about">
              <a className="fs-nav-link">About</a>
            </Link>
          </div>
        </div>

        {/* Secondary Nav */}
        <div className="fs-nav-secondary">
          <div
            className={`fs-nav-inner ${
              router.pathname === "/design-facilitation" ? "active" : ""
            }`}
          >
            <div className="fs-nav-gooey fs-nav-gooey__secondary" />
            <Link href="/design-facilitation">
              <a className="fs-nav-link secondary">Design Facilitation</a>
            </Link>
          </div>
          <div className={`fs-nav-inner`}>
            <div className="fs-nav-gooey fs-nav-gooey__secondary" />
            <a
              href="https://www.tada.school/"
              target="_blank"
              rel="noreferrer"
              className="fs-nav-link secondary"
            >
              Learn with NOCT
              <span className="badge badge-pill badge-secondary">NEW</span>
            </a>
          </div>
          <div
            className={`fs-nav-inner ${
              router.pathname === "/join-us" ? "active" : ""
            }`}
          >
            <div className="fs-nav-gooey fs-nav-gooey__secondary" />
            <Link href="/join-us">
              <a className="fs-nav-link secondary">Join Us</a>
            </Link>
          </div>
          <div
            className={`fs-nav-inner ${
              router.pathname === "/contact" ? "active" : ""
            }`}
          >
            <div className="fs-nav-gooey fs-nav-gooey__secondary" />
            <Link href="/contact">
              <a className="fs-nav-link secondary">Contact</a>
            </Link>
          </div>
        </div>

        <div className="fs-nav-footer">
          {awards && (
            <div className="awards-slider-container fs-nav-award">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className={index === activeIndex ? "slide active" : "slide"}
                  style={{
                    transform:
                      index === activeIndex
                        ? "translateY(0)"
                        : "translateY(20px)",
                    opacity: index === activeIndex ? 1 : 0,
                    transition:
                      "transform 0.6s ease-in-out, opacity 0.6s ease-in-out",
                  }}
                >
                  <img src={urlFor(award).url()} alt="" className="invert" />
                </div>
              ))}
            </div>
          )}

          <div className="fs-nav-social">
            <a
              className="footer-link-social instagram"
              href="https://www.instagram.com/noctindia"
              target="_blank"
            >
              Instagram
            </a>
            <a
              className="footer-link-social facebook"
              href="https://www.facebook.com/noctindia"
              target="_blank"
            >
              Facebook
            </a>
            <a
              className="footer-link-social linkedin"
              href="https://www.linkedin.com/company/noctindia/"
              target="_blank"
            >
              Linkedin
            </a>
            <a
              className="footer-link-social dribbble"
              href="https://dribbble.com/noctindia"
              target="_blank"
            >
              Dribbble
            </a>
            <a
              className="footer-link-social behance"
              href="https://www.behance.net/noctdesign?tracking_source=search_projects_recommended%7CBAz"
              target="_blank"
            >
              Behance
            </a>
            <a
              className="footer-link-social medium"
              href="https://medium.com/@noctindia"
              target="_blank"
            >
              Medium
            </a>
            <a
              className="footer-link-social vimeo"
              href="https://vimeo.com/user22306325"
              target="_blank"
            >
              Vimeo
            </a>
          </div>
        </div>
        <div className="hero-fixed-banner fs-nav-fixed-banner">
          Network of Creative Thinkers
        </div>
      </div>

      <style jsx>{`
        .navbar-active-container {
          pointer-events: none;
          position: absolute;
          width: 100%;
          bottom: -6px;
        }

        .navbar-active {
          width: 14px;
          height: 14px;
          background: url("/images/gooey-sprite-horizontal.png") 0% 50%;
          background-size: cover;
          transform: translate3D(0, 0, 0);
          transition:
            transform 0.3s,
            opacity 0.15s;
          opacity: 0;
        }

        .navbar-links:hover .navbar-active {
          opacity: 1;
        }

        .navbar-active.active-page {
          opacity: 1;
        }

        .navbar-active.animate {
          animation: sprite 0.3s steps(6) forwards;
        }

        @keyframes sprite {
          100% {
            background-position: 100% 50%;
          }
        }

        .fs-nav-award img {
          width: 280px;
        }
      `}</style>
    </>
  );
}
