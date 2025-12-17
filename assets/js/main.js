const $ = (s,r=document) => r.querySelector(s);

const search = $('#search');
const searchBar = $('#searchBar');

search.addEventListener('focus', () => {
  searchBar.classList.add('active');
});

search.addEventListener('blur', () => {
  searchBar.classList.remove('active');
});
