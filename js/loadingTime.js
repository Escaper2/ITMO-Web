(() => {
  const loadingTimeElement = document.querySelector(".footer__loadTime");
  window.addEventListener("load", () => {
    const pageEnd = performance.mark("pageEnd");
    const loadTime = pageEnd.startTime / 1000;
    loadingTimeElement.innerHTML += `Loading time: ${loadTime}sec.`;
  });
})();
