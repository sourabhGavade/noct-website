import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import urlFor from "../utils/urlFor";

export default function Navigation({ awards }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [active, setActive] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      document
        .querySelector(".navbar-active")
        .classList.remove("work", "services", "about", "process");
      router.pathname === "/work"
        ? document.querySelector(".navbar-active").classList.add("work")
        : "";
      router.pathname === "/services"
        ? document.querySelector(".navbar-active").classList.add("services")
        : "";
      router.pathname === "/about"
        ? document.querySelector(".navbar-active").classList.add("about")
        : "";
      router.pathname === "/process/ux" ||
      router.pathname === "/process/branding"
        ? document.querySelector(".navbar-active").classList.add("process")
        : "";
    }, 500);
    initScrollDirection();
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

        if (st < 400) {
          document.querySelector(".navbar").style.backgroundColor =
            "transparent";
        } else {
          document.querySelector(".navbar").style.backgroundColor = "#FCFCFC";
        }
      },
      false
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
    document.querySelector(".navbar-active").classList.remove("animate");
    if (active === page) {
      return;
    }
    switch (page) {
      case "work":
        document
          .querySelector(".navbar-active")
          .classList.remove("services", "work", "about", "process");
        document
          .querySelector(".navbar-active")
          .classList.add("animate", "work");
        setActive("work");
        break;
      case "services":
        document
          .querySelector(".navbar-active")
          .classList.remove("services", "work", "about", "process");
        document
          .querySelector(".navbar-active")
          .classList.add("animate", "services");
        setActive("services");
        break;
      case "about":
        document
          .querySelector(".navbar-active")
          .classList.remove("services", "work", "about", "process");
        document
          .querySelector(".navbar-active")
          .classList.add("animate", "about");
        setActive("about");
        break;
      case "process":
        document
          .querySelector(".navbar-active")
          .classList.remove("services", "work", "about", "process");
        document
          .querySelector(".navbar-active")
          .classList.add("animate", "process");
        setActive("process");
        break;
      default:
        break;
    }
  };

  const navbarReset = () => {
    switch (router.pathname) {
      case "/work":
        document
          .querySelector(".navbar-active")
          .classList.remove("animate", "services", "work", "about", "process");
        document.querySelector(".navbar-active").classList.add("work");
        break;
      case "/services":
        document
          .querySelector(".navbar-active")
          .classList.remove("animate", "services", "work", "about", "process");
        document.querySelector(".navbar-active").classList.add("services");
        break;
      case "/about":
        document
          .querySelector(".navbar-active")
          .classList.remove("animate", "services", "work", "about", "process");
        document.querySelector(".navbar-active").classList.add("about");
        break;
      case "/process/branding":
        document
          .querySelector(".navbar-active")
          .classList.remove("animate", "services", "work", "about", "process");
        document.querySelector(".navbar-active").classList.add("process");
        break;
      case "/process/ux":
        document
          .querySelector(".navbar-active")
          .classList.remove("animate", "services", "work", "about", "process");
        document.querySelector(".navbar-active").classList.add("process");
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className="navbar show">
        <div className="h-100 flex-center">
          <div className="w-100 h-100 d-flex flex-row justify-content-between align-items-center">
            <div className="nav-logo">
              <Link href="/">
                <a>
                  <svg
                    width={80}
                    height={30}
                    viewBox="0 0 80 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_48_4966)">
                      <path
                        d="M27.0459 23.7807C25.2395 23.7807 23.2324 23.2789 21.8776 21.3721C17.3616 14.849 24.6374 8.72731 30.0064 4.26147C30.458 3.86005 30.8594 3.55898 31.311 3.15756C32.6157 1.95329 33.7698 1.2508 34.8235 0.999908C36.2285 0.899552 37.2822 1.40133 38.0851 2.40489C39.5904 4.31165 39.5904 7.6234 39.0384 9.32945C38.8377 9.98176 38.637 10.7344 38.4865 11.3867C37.0815 16.3544 35.6765 21.4725 30.2071 23.3793C29.2036 23.58 28.1498 23.7807 27.0459 23.7807ZM35.0744 1.20062C34.974 1.20062 34.8737 1.20062 34.7733 1.20062C33.7698 1.45151 32.6157 2.154 31.3612 3.30809C30.9598 3.65934 30.5584 4.01058 30.1068 4.41201C24.8381 8.87784 17.6125 14.9494 22.0281 21.2718C24.1356 24.1821 27.9491 23.7305 30.0064 23.1284C35.3253 21.2718 36.7303 16.2038 38.1352 11.2864C38.3359 10.6341 38.5367 9.8814 38.6872 9.22909C39.189 7.57322 39.2392 4.36183 37.784 2.50525C37.1317 1.65222 36.2285 1.20062 35.0744 1.20062Z"
                        fill="#222323"
                      />
                      <path
                        d="M27.4473 20.5693C26.2431 20.5693 25.0388 20.0174 24.1858 19.0138C23.3327 18.0604 22.9815 16.8562 23.2826 15.8024C23.9851 12.29 27.347 10.1825 30.0566 8.47644L30.3577 8.27573C30.4078 8.22555 30.458 8.17537 30.5082 8.17537C30.9096 7.82413 31.311 7.62341 31.8128 7.37252C32.3648 7.07146 33.0673 7.02128 33.6694 7.22199C33.8701 7.27217 34.0708 7.37252 34.2214 7.47288C35.0744 7.97466 35.6263 8.82768 35.6263 9.78106C35.6765 12.3401 35.0744 14.9996 33.8701 16.9063C32.4149 19.1643 30.3577 20.469 27.7986 20.5693C27.6982 20.5693 27.5979 20.5693 27.4473 20.5693ZM30.6587 8.3259C30.6085 8.37608 30.5584 8.42626 30.458 8.47644L30.1569 8.67715C27.4975 10.333 24.1356 12.4405 23.4833 15.8526C23.2324 16.8562 23.5335 17.9601 24.3363 18.8633C25.2395 19.917 26.5441 20.469 27.7986 20.3686C31.6121 20.1177 35.6263 16.7558 35.4256 9.78106C35.4256 8.87786 34.9238 8.07501 34.121 7.62341C33.9203 7.52306 33.7196 7.4227 33.569 7.37252C33.0171 7.17181 32.3648 7.22199 31.863 7.52306C31.4616 7.77395 31.0601 8.02484 30.6587 8.3259Z"
                        fill="#222323"
                      />
                      <path
                        d="M28.0495 18.3114C27.1965 18.3114 26.3434 18.0605 25.942 17.659C24.8883 16.5049 25.1392 15.2003 26.6947 13.6448C29.3541 10.9854 31.4114 9.78111 32.4651 10.2829C33.0673 10.6341 33.268 11.5373 32.9669 12.842C32.5153 14.7487 31.4616 16.4548 30.0064 17.7594C29.605 18.1608 28.8523 18.3114 28.0495 18.3114ZM31.9132 10.3832C30.8594 10.3832 29.053 11.5875 26.8452 13.7953C24.6374 15.953 25.7413 17.1573 26.0925 17.5085C26.7448 18.211 29.0029 18.3114 29.9061 17.659C31.4114 16.4046 32.415 14.7487 32.8164 12.8921C33.0673 11.6879 32.9167 10.7847 32.3648 10.5338C32.2644 10.4334 32.1139 10.3832 31.9132 10.3832Z"
                        fill="#222323"
                      />
                      <path
                        d="M39.9918 20.5691C39.9918 15.4509 43.7552 11.9385 48.5221 11.9385C51.0811 11.8883 53.3893 13.1427 54.8445 15.2502L53.1384 16.2036C52.0847 14.6982 50.3787 13.795 48.5723 13.795C44.9594 13.795 42.1495 16.5548 42.1495 20.5189C42.1495 24.4829 44.9093 27.2427 48.5723 27.2427C50.3787 27.2427 52.1349 26.3395 53.1384 24.8342L54.8445 25.7876C53.4395 27.895 51.0811 29.1495 48.5221 29.0993C43.705 29.1495 39.9918 25.637 39.9918 20.5691Z"
                        fill="#222323"
                      />
                      <path
                        d="M11.7416 28.8486L2.0573 15.6017V28.8486H0V12.2397H2.10747L11.6915 25.1857V12.2397H13.7488V28.8486H11.7416Z"
                        fill="#222323"
                      />
                      <path
                        d="M63.0737 28.8486V14.0963H57.805V12.2397H70.3997V14.0963H65.131V28.8988L63.0737 28.8486Z"
                        fill="#222323"
                      />
                      <path
                        d="M19.4189 20.5691C19.4189 15.7018 22.7808 11.9385 27.648 11.9385C32.5153 11.9385 35.9274 15.6516 35.9274 20.5691C35.9274 25.4865 32.5655 29.1997 27.648 29.1997C22.7306 29.1997 19.4189 25.4363 19.4189 20.5691ZM33.7697 20.5691C33.7697 16.7054 31.3612 13.8452 27.648 13.8452C23.9349 13.8452 21.5765 16.7054 21.5765 20.5691C21.5765 24.4328 23.985 27.2929 27.6982 27.2929C31.4114 27.2929 33.8199 24.3826 33.7697 20.5691Z"
                        fill="#222323"
                      />
                      <path
                        d="M75.6683 11.5877C73.6612 11.5877 72.0053 9.93183 72.0053 7.92471C72.0053 5.91759 73.6612 4.26172 75.6683 4.26172C77.6754 4.26172 79.3313 5.91759 79.3313 7.92471C79.3313 9.93183 77.6754 11.5877 75.6683 11.5877ZM75.6683 5.01439C74.0626 5.01439 72.758 6.31901 72.758 7.92471C72.758 9.5304 74.0626 10.835 75.6683 10.835C77.274 10.835 78.5786 9.5304 78.5786 7.92471C78.5786 6.31901 77.274 5.01439 75.6683 5.01439Z"
                        fill="#222323"
                      />
                      <path
                        d="M75.4676 7.62365C75.6683 7.62365 75.8188 7.57347 75.9192 7.52329C76.0195 7.47311 76.0697 7.32258 76.0697 7.12187C76.0697 6.97133 76.0195 6.8208 75.9192 6.77062C75.8188 6.72044 75.6683 6.67026 75.4676 6.67026H75.0662V7.67382H75.4676M75.016 8.32614V9.7813H74.0124V5.96777H75.5178C76.0195 5.96777 76.3708 6.06813 76.6217 6.21866C76.8726 6.3692 76.9729 6.67026 76.9729 7.02151C76.9729 7.2724 76.9227 7.47311 76.7722 7.62365C76.6719 7.77418 76.4711 7.92471 76.2202 7.97489C76.3708 8.02507 76.4711 8.07525 76.5715 8.1756C76.6719 8.27596 76.7722 8.42649 76.8726 8.67738L77.4245 9.7813H76.3708L75.9192 8.82792C75.8188 8.6272 75.7185 8.52685 75.6181 8.42649C75.5178 8.37631 75.3672 8.32614 75.2167 8.32614H75.016Z"
                        fill="#222323"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_48_4966">
                        <rect
                          width="79.3313"
                          height="28.2"
                          fill="white"
                          transform="translate(0 1)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
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
                <Link href="/process/ux">
                  <a
                    className={`navbar-link ${
                      router.pathname === "/process/ux" ||
                      router.pathname === "/process/branding"
                        ? "font-weight-bold"
                        : ""
                    }`}
                    onMouseEnter={() => navbarHover("process")}
                    onMouseLeave={() => navbarReset()}
                  >
                    Process
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
          <div
            className={`fs-nav-inner ${
              router.pathname === "/process/ux" ||
              router.pathname === "/process/branding"
                ? "active"
                : ""
            }`}
          >
            <div className="fs-nav-gooey" />
            <Link href="/process/ux">
              <a className="fs-nav-link">Process</a>
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
        {/* {awards && (
          <div className="awards-slider-container">
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
        )} */}
        <div className="fs-nav-footer">
          <div className="fs-nav-award">
            <img
              className="mr-2"
              src="/images/icons/award.svg"
              alt="Award Icon"
            />
            <div className="h6 mb-0">
              India’s Best Brand Design Studio
              <br />
              <span className="font-weight-light">IBDA 2022</span>
            </div>
          </div>
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
          transition: transform 0.3s, opacity 0.15s;
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

        .navbar-active.work {
          transform: translate3D(43px, 0, 0);
        }

        .navbar-active.services {
          transform: translate3D(152px, 0, 0);
        }

        .navbar-active.about {
          transform: translate3D(269px, 0, 0);
        }

        .navbar-active.process {
          transform: translate3D(380px, 0, 0);
        }

        .fs-nav-award img {
          width: 70px;
        }
      `}</style>
    </>
  );
}
