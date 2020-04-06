(function() {
  let carousel = document.querySelector('.carousel__wrapper');
  let slides = document.querySelectorAll('.slides__item');
  let pauseBtn = document.querySelector('#pause');
  let prevBtn = document.querySelector('#previous');
  let nextBtn = document.querySelector('#next');
  let controls = document.querySelector('.controls');
  let indicatorsContainer = document.querySelector('.indicators');
  let indicators = document.querySelectorAll('.indicators__item');

  let currentSlide = 0;
  let interval = 3000;
  let isPlaying = true;
  let slidesLength = slides.length;
  let swipeStartX = null;
  let swipeEndX = null;
  let timerID = null;

  const LEFT_ARROW = 'ArrowLeft';
  const RIGHT_ARROW = 'ArrowRight';
  const SPACE = ' ';

  let goToSlide = (n) => {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + slidesLength) % slidesLength;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
  };

  let goToNextSlide = () => {
    goToSlide(currentSlide + 1);
  };

  let goToPrevSlide = () => {
    goToSlide(currentSlide - 1);
  };

  let pause = () => {
    if (isPlaying) { 
      pauseBtn.innerHTML = 'Play';
      isPlaying = !isPlaying;
      clearInterval(timerID);
    }
  };

  let play = () => {
    pauseBtn.innerHTML = 'Pause';
    isPlaying = isPlaying;
    timerID = setInterval(goToNextSlide, interval);
  };

  let clickPause = () => isPlaying ? pause() : play();

  let clickNext = () => {
    pause();
    goToNextSlide();
  };

  let clickPrev = () => {
    pause();
    goToPrevSlide();
  };

  let clickIndicatorBtn = (e) => {
    let target = e.target;
    if (+target.classList.contains('indicators__item')) {
      pause();
      goToSlide(+target.getAttribute('data-slide-to'));
    }
  };

  let pressKey = (e) => {
    if (e.key === LEFT_ARROW) clickPrev();
    if (e.key === RIGHT_ARROW) clickNext();
    if (e.key === SPACE) clickPause();
  };

  let swipeStart = (e) => {
    swipeStartX = e.changedTouches[0].pageX;
  };

  let swipeEnd = (e) => {
    swipeEndX = e.changedTouches[0].pageX;
    swipeStartX - swipeEndX > 100 && clickNext();
    swipeStartX - swipeEndX < -100 && clickPrev();
  };

  let setListeners = () => {
    pauseBtn.addEventListener('click', clickPause);
    nextBtn.addEventListener('click', clickNext);
    prevBtn.addEventListener('click', clickPrev);
    indicatorsContainer.addEventListener('click', clickIndicatorBtn);
    document.addEventListener('keydown', pressKey);
    carousel.addEventListener('touchstart', swipeStart);
    carousel.addEventListener('touchend', swipeEnd);
  };

  let init = () => {
    controls.style.display = 'flex';
    indicatorsContainer.style.display = 'flex';
    setListeners();
    timerID = setInterval(goToNextSlide, interval);
  };

  init();
}());
