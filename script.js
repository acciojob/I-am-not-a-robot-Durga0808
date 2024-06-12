//your code here
document.addEventListener('DOMContentLoaded', () => {
  const imageContainer = document.getElementById('imageContainer');
  const resetButton = document.getElementById('reset');
  const verifyButton = document.getElementById('verify');
  const para = document.getElementById('para');
  const h = document.getElementById('h');

  const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
  let images = [...imageClasses, getRandomItem(imageClasses)];
  images = shuffleArray(images);

  let firstSelected = null;
  let secondSelected = null;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function createImages() {
    images.forEach((imgClass, index) => {
      const img = document.createElement('img');
      img.classList.add(imgClass);
      img.dataset.index = index;
      img.addEventListener('click', onImageClick);
      imageContainer.appendChild(img);
    });
  }

  function onImageClick(event) {
    const img = event.target;
    if (!firstSelected) {
      firstSelected = img;
      img.classList.add('selected');
      resetButton.classList.remove('hidden');
    } else if (!secondSelected && img !== firstSelected) {
      secondSelected = img;
      img.classList.add('selected');
      verifyButton.classList.remove('hidden');
    }
  }

  resetButton.addEventListener('click', () => {
    resetState();
  });

  verifyButton.addEventListener('click', () => {
    verifySelection();
  });

  function resetState() {
    firstSelected = null;
    secondSelected = null;
    resetButton.classList.add('hidden');
    verifyButton.classList.add('hidden');
    para.innerHTML = '';
    h.innerHTML = 'Please click on the identical tiles to verify that you are not a robot.';
    const selectedImages = document.querySelectorAll('.selected');
    selectedImages.forEach(img => img.classList.remove('selected'));
  }

  function verifySelection() {
    if (firstSelected && secondSelected) {
      if (firstSelected.className === secondSelected.className) {
        para.innerHTML = 'You are a human. Congratulations!';
      } else {
        para.innerHTML = "We can't verify you as a human. You selected the non-identical tiles.";
      }
    }
    verifyButton.classList.add('hidden');
  }

  createImages();
});
