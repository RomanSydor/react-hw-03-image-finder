const KEY = "34434336-8bdba9304198dafbdc01d9a2b";

function getImages(keyword, page) {
  const request = `https://pixabay.com/api/?q=${keyword}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(request).then((response) => {
    return response.json();
  });
}

const pixabayAPI = {
  getImages,
};

export default pixabayAPI;
