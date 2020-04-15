let container = document.querySelector('.container');
let slides = document.querySelectorAll('.slides__item');
let pauseBtn = document.querySelector('#pause');
let nextBtn = document.querySelector('#next');
let prevBtn = document.querySelector('#previous');

let controls = document.querySelector('.controls__item');

let indicatorsContainer = document.querySelector('.indicators');
let indicators = document.querySelectorAll('.indicators__item');

let currentSlide = 0;
let isPlaying = true;
let interval = 2000;
let slidesLength = slides.length; 

let swipeStartX = null;
let swipeEndX = null;
let timerID = null;


const SPACE = ' ';
const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';


controls.style.display = 'flex';
indicatorsContainer.style.display = 'flex';

let goToSlide = (n) => {
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
  currentSlide = (n + slidesLength) % slidesLength;
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
};

let gotoNextSlide = () => {
  goToSlide(currentSlide + 1);
};
  
let gotoPrevSlide = () => {
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
  isPlaying = true;
  timerID = setInterval(gotoNextSlide, interval);
};

let clickPause = () => isPlaying ? pause() : play();

let clickNext = () => {
  pause();
  gotoNextSlide();
};

let clickPrev = () => {
  pause();
  gotoPrevSlide();
};

let clickIndicatorBtn = (e) => {
  let target = e.target;
    if (target.classList.contains('indicators__item')) {
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
  swipeStartX - swipeEndX < 100 && clickPrev();
  swipeStartX - swipeEndX > -100 && clickNext();
};



pauseBtn.addEventListener('click', clickPause);
nextBtn.addEventListener('click', clickNext);
prevBtn.addEventListener('click',clickPrev);

indicatorsContainer.addEventListener('click', clickIndicatorBtn);
document.addEventListener('keydown', pressKey);

container.addEventListener('touchstart', swipeStart);
container.addEventListener('touchend', swipeEnd);

timerID = setInterval(gotoNextSlide, interval);
