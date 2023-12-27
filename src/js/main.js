import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../css/styles.css';
import '../css/reset.css';

const input = document.querySelector('.custom-input');
const btn = document.querySelector('.custom-button');
const galleryContainer = document.querySelector('.gallery-container');
const loadingOverlay = document.querySelector('.loading-overlay');
const API_KEY = '41491807-1b535ad0388c573d86abaf339';

const getBaseUrl = () => {
  const url = new URL('https://pixabay.com/api/');
  url.searchParams.append('key', API_KEY);
  return url;
};

function searchPixabay() {
  const searchTerm = input.value.trim();

  galleryContainer.innerHTML = '';
  loadingOverlay.style.display = 'flex';

  if (searchTerm === '') {
    iziToast.error({
      title: 'Something wrong',
      message: 'Please enter a search term.',
      position: 'topRight',
      progressBarColor: 'rgb(255, 0, 0)',
    });
    loadingOverlay.style.display = 'none';
    return;
  }

  const apiUrl = getBaseUrl();
  apiUrl.searchParams.append('q', searchTerm);
  apiUrl.searchParams.append('image_type', 'photo');
  apiUrl.searchParams.append('orientation', 'horizontal');
  apiUrl.searchParams.append('safesearch', 'true');

  fetch(apiUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Network response not ok`);
      }
    })
    .then(images => {
      loadingOverlay.style.display = 'none';

      if (images.hits && images.hits.length > 0) {
        input.value = '';
        galleryMarkup(images.hits);
      } else {
        iziToast.info({
          title: 'Something wrong',
          message:
            'Sorry, there are no images matching your search query. Please try again.',
          position: 'topRight',
          progressBarColor: 'rgb(255, 0, 0)',
        });
      }
    })
    .catch(error => {
      loadingOverlay.style.display = 'none';
      iziToast.error({
        title: 'Something wrong',
        message: 'Sorry, there was an error. Please try again.',
        position: 'topRight',
        progressBarColor: 'rgb(255, 0, 0)',
      });
    });
}

btn.addEventListener('click', searchPixabay);

// IMAGES HTML

function galleryMarkup(arr) {
  const markup = arr
    .map(
      image => `
        <a href="${image.largeImageURL}" class="image-card">
          <img src="${image.webformatURL}" alt="${image.tags}">
          <div class="image-info">
            <p>Likes: ${image.likes}</p>
            <p>Views: ${image.views}</p>
            <p>Comments: ${image.comments}</p>
            <p>Downloads: ${image.downloads}</p>
          </div>
        </a>
      `
    )
    .join('');

  galleryContainer.innerHTML = markup;
  const lightbox = new SimpleLightbox('.gallery-container a', {
    captionsData: 'alt',
    captionsDelay: 250,
  });
  lightbox.refresh();
}
