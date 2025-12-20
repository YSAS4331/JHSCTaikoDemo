(async () => {
  const { $,$$ } = window.modules;
  const res = await fetch('./videos.json');
  const datas = await res.json();
  const getQueryParam = (urlStr, key) => {
    const url = new URL(urlStr);
    return url.searchParams.get(key);
  };
  const createList = v => {
    return `
      <div class="listItem">
        <a href="${v.url}" title="${v.title}" target="_blank" rel="noopener noreferrer"><img src="https://img.youtube.com/vi/${getQueryParam(v.url, 'v')}/maxresdefault.jpg" alt="サムネイル画像" style="width: 100%; height: auto; aspect-ratio: 16/9"></a>
        <label class="view">${v.viewCount}</label>
        <label class="like">${v.likeCount}</label>
      </div>
    `;
  };
  const appendList = (id, html) => {
    $(`#${id}`).innerHTML = html;
    $$(`#${id} > .listItem`).forEach(el => window.observer.observe(el));
  };

  const popular = [...datas].sort((a, b) => {
    const scoreA = a.likeCount * 100 + a.viewCount;
    const scoreB = b.likeCount * 100 + b.viewCount;
    return scoreB - scoreA;
  }).slice(0, 10);

  appendList('likeCount', popular.map(video => createList(video)).join(''));

  const newVideo = datas.slice(0, 10).map(video => createList(video)).join('');
  appendList('newVideo', newVideo);
})();
