export default function ScrollDownCTA() {
    const handleClick = () => {
        window.scrollTo({
            top: window.innerHeight - 100,
            behavior: 'smooth'
        })
    }

    return (
        <div className="scroll-down-icon" onClick={handleClick}>
          <svg width="14px" height="8px" viewBox="0 0 14 8" version="1.1">
            <g id="Home-Page" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round">
              <g id="iconColor" transform="translate(-713.000000, -819.000000)" strokeWidth="2">
                <g id="ic_Scroll" transform="translate(714.000000, 820.000000)">
                  <path d="M0,0 L5.85857864,5.85857864 C5.9366835,5.9366835 6.0633165,5.9366835 6.14142136,5.85857864 L12,0 L12,0" id="Path-2"></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
    )
}