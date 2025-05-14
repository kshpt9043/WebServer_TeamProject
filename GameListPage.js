const genres = [
  '액션', 'RPG', '어드벤처', '전략', '퍼즐', '스포츠', '시뮬레이션', '휴먼',
  '판타지', '호러', 'SF', '격투', '레이싱', '협동', '싱글', '멀티', '카드', '디펜스', '탑다운', '탑뷰'
];

const params = new URLSearchParams(window.location.search);
const initialCategory = params.get('category'); // URL에서 category 추출

const discountCheckbox = document.getElementById('discountFilter');
const genreFilterGroup = document.getElementById('genreFilterGroup');
const minPriceSlider = document.getElementById('minPrice');
const maxPriceSlider = document.getElementById('maxPrice');
const minPriceLabel = document.getElementById('minPriceLabel');
const maxPriceLabel = document.getElementById('maxPriceLabel');
const gameListContainer = document.getElementById('gameList');
const categoryTitle = document.getElementById('category-title');

// 장르 체크박스 생성
genres.forEach(genre => {
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.value = genre;

  // ✅ 초기 선택된 category 값 체크
  if (genre === initialCategory) checkbox.checked = true;

  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(' ' + genre));
  genreFilterGroup.appendChild(label);
});

function renderGameCards(gamesToRender) {
  gameListContainer.innerHTML = '';
  if (gamesToRender.length === 0) {
    gameListContainer.innerHTML = `<p>해당 조건의 게임이 없습니다.</p>`;
    return;
  }

  gamesToRender.forEach(game => {
    const card = document.createElement('a');
    card.className = 'game-card';
    card.href = game.link;
    card.innerHTML = `
      <img src="${game.image}" alt="${game.name}" class="game-image">
      <h3 class="game-title">${game.name}</h3>
      <p class="game-description">${game.price}</p>
    `;
    gameListContainer.appendChild(card);
  });
}

function applyFilters() {
  let filtered = [...games];

  // 할인 필터
  if (discountCheckbox.checked) {
    filtered = filtered.filter(g => g.discount === true);
  }

  // 장르 필터
  const selectedGenres = [...genreFilterGroup.querySelectorAll('input[type="checkbox"]:checked')]
    .map(cb => cb.value);
  if (selectedGenres.length > 0) {
    filtered = filtered.filter(g => selectedGenres.includes(g.genre));
  }

  // 가격 필터
  const min = parseInt(minPriceSlider.value);
  const max = parseInt(maxPriceSlider.value);
  filtered = filtered.filter(g => {
    const price = parseInt(g.price.replace(/[^\d]/g, ""));
    return price >= min && price <= max;
  });

  categoryTitle.textContent = selectedGenres.length > 0
    ? `선택된 장르: ${selectedGenres.join(', ')}`
    : '전체 게임 목록';

  renderGameCards(filtered);
}

// 이벤트
minPriceSlider.addEventListener('input', () => {
  minPriceLabel.textContent = `최소: ${minPriceSlider.value}원`;
  applyFilters();
});
maxPriceSlider.addEventListener('input', () => {
  maxPriceLabel.textContent = `최대: ${maxPriceSlider.value}원`;
  applyFilters();
});
discountCheckbox.addEventListener('change', applyFilters);
genreFilterGroup.addEventListener('change', applyFilters);

// 최초 렌더링
applyFilters();
