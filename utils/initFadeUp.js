const initFadeUp = function() {
  gsap.utils.toArray('[data-fade-up]').forEach(item => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 95%'
      },
      opacity: 0,
      y: 40,
      duration: 0.6,
      delay: 0.1,
      ease: 'linear',
      force3D: true
    });
  });
}

export default initFadeUp