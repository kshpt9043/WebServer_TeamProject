const params = new URLSearchParams(window.location.search);
const gameId = params.get('id');
const game = games.find(g => g.id === gameId);

if (game) {
  document.getElementById('game-title').textContent = game.name;

  const gameImage = document.getElementById('game-image');
  gameImage.src = game.image;
  gameImage.onload = () => {
    gameImage.style.width = '300px';
    gameImage.style.height = 'auto';
  };

  document.getElementById('game-description').textContent = game.description;
  document.getElementById('game-price').textContent = `가격: ${game.price}원`;

  // 평점 예시
  const ratingContainer = document.getElementById('rating-stars');
  const rating = 4.2;
  let stars = '';
  for (let i = 0; i < 5; i++) {
    stars += i < Math.floor(rating) ? '⭐' : '☆';
  }
  ratingContainer.innerHTML = `<p>평점: ${stars} (${rating})</p>`;

  // 구매 → 장바구니에 추가
  document.getElementById('buy-button').textContent = `${game.price}원 장바구니에 담기`;
  document.getElementById('buy-button').onclick = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      window.location.href = 'LoginPage.html';
      return;
    }

    const cartKey = `cart_${currentUser}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');

    // 중복 체크 (id 기준)
    if (cart.some(item => item.id === game.id)) {
      alert("이미 장바구니에 담겨 있습니다.");
      return;
    }

    cart.push({ id: game.id, name: game.name, price: game.price });
    localStorage.setItem(cartKey, JSON.stringify(cart));

    alert(`"${game.name}"이(가) 장바구니에 추가되었습니다.`);
  };
} else {
  document.body.innerHTML = '<p>게임을 찾을 수 없습니다.</p>';
}
