import { useEffect, useState } from "react"
import load from "load-asset"

export default function Preloader({ assets }) {
	const [loadPercent, setLoadPercent] = useState(0)

	useEffect(() => {
		initMorphSVG()
		loadAssets()
	}, [])

	const loadAssets = async () => {
		await load.all(assets, handleProgress)
	}

	const handleProgress = (e) => {
		setLoadPercent(Math.round(e.progress * 100))
		e.progress === 1 ? document.querySelector('.preloader-container').style.display = 'none' : ''
	}

	const countToNumber = (id, start, end, duration) => {
		if (process.browser) {
			let range = end - start;
			let current = start;
			let increment = end > start ? 1 : -1;
			let stepTime = Math.abs(Math.floor(duration / range));
			let obj = document.getElementById(id);
			let timer = setInterval(function () {
				current += increment;
				obj ? obj.innerHTML = current : ''
				if (current == end) {
					clearInterval(timer);
				}
			}, stepTime);
		}
	}

	const initMorphSVG = () => {
		const tl = new gsap.timeline()
		tl.to(".preloader-container svg", { y: 0, ease: 'Power1.easeIn', duration: 0.5 })
		tl.to("#path1", { morphSVG: { shape: "#path3" }, duration: 0.8, ease: 'Power1.easeInOut' })
		// tl.to("#path1", { morphSVG: { shape: "#path3" }, duration: 0.6, ease: 'linear' })
		tl.to("#path1", { morphSVG: { shape: "#path4" }, duration: 0.5, ease: 'Power1.easeOut' })
	}

	return (
		<div className="preloader-container">
			<svg viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path id="path1" d="M252 866.5C188 866.5 186.5 833 126.5 836.5C66.5 840 62.5 861 31.5 871C0.5 881 -1.5 896.5 -1.5 896.5V906H1441.5C1441.5 906 1400 839.5 1382.5 825C1365 810.5 1296.5 775.5 1203 775C1109.5 774.5 1046.5 840 952.5 821.5C858.5 803 840 728.5 758 732C676 735.5 616 791.5 534 796.5C452 801.5 421 739 363.5 775C306 811 316 866.5 252 866.5Z" fill="#1A1A1A" />
				<path id="path2" d="M233.338 779.414C166.854 779.414 165.296 672.057 102.967 683.274C40.6389 694.49 36.4837 761.789 4.28066 793.836C-27.9224 825.883 -30 875.555 -30 875.555V906H1469C1469 906 1425.89 692.887 1407.71 646.419C1389.53 599.951 1318.37 487.787 1221.24 486.184C1124.12 484.582 1058.67 694.49 961.023 635.203C863.375 575.916 844.157 337.166 758.975 348.382C673.792 359.599 611.464 539.062 526.282 555.086C441.099 571.109 408.896 370.815 349.165 486.184C289.433 601.554 299.822 779.414 233.338 779.414Z" fill="#1A1A1A" />
				<path id="path3" d="M54.5 373.5C-11.9837 373.5 1.82848 543.869 -60.5 555.085C-122.828 566.302 -82.297 728.453 -114.5 760.5C-146.703 792.547 -30 875.555 -30 875.555V906H1469C1469 906 1487.18 578.968 1469 532.5C1450.82 486.032 1454.13 246.602 1357 245C1259.87 243.398 1345.15 152.787 1247.5 93.5C1149.85 34.2131 1094.68 -40.7164 1009.5 -29.5C924.318 -18.2836 844.157 98.4765 758.975 114.5C673.792 130.523 403.731 71.6309 344 187C284.269 302.369 120.984 373.5 54.5 373.5Z" fill="#1A1A1A" />
				<path id="path4" d="M-103 49C-169.484 49 1.82848 543.869 -60.5 555.085C-122.828 566.302 -82.297 728.453 -114.5 760.5C-146.703 792.547 -30 875.556 -30 875.556V906.001H1469C1469 906.001 1487.18 578.968 1469 532.5C1450.82 486.031 1599.63 119.602 1502.5 118C1405.37 116.398 1498.65 -79.7131 1401 -139C1303.35 -198.287 1094.68 -40.7165 1009.5 -29.5C924.318 -18.2836 876.182 -203.023 791 -187C705.818 -170.977 146.731 -277.369 87 -162C27.2685 -46.6308 -36.5163 49 -103 49Z" fill="#1A1A1A" />
			</svg>
			<h4 id="percent" className="preloader-percent">{loadPercent}</h4>

			<style jsx={true}>{`

				#path2, #path3, #path4 {
						opacity: 0;
				}
		
				.preloader-container {
						z-index: 10;
						position: fixed;
						top: 0;
						left: 0;
						width: 100vw;
						height: 100vh;
				}

				.preloader-percent {
						position: absolute;
						bottom: 10%;
						left: 50%;
						transform: translate(-50%, -50%);
						color: #fff;
				}

				.preloader-container svg {
						transform: translateY(100%) scale(1.2);
						width: 100%;
						height: 100%;
						position: absolute;
						bottom: 0;
						left: 0;
				}
		
		`}</style>
		</div>
	)
}
