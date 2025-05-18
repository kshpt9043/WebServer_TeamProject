
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

  // 평점 표시 (모든 사용자 평균)
  const allRatings = [];
  for (let key in localStorage) {
    if (key.startsWith('ratings_')) {
      try {
        const userRatings = JSON.parse(localStorage.getItem(key));
        if (userRatings && userRatings[gameId]) {
          allRatings.push(userRatings[gameId]);
        }
      } catch (e) {}
    }
  }

  const ratingContainer = document.getElementById('rating-stars');
  if (allRatings.length > 0) {
    const avg = allRatings.reduce((a, b) => a + b, 0) / allRatings.length;
    const fullStars = Math.round(avg);
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += i <= fullStars ? '★' : '☆';
    }
    ratingContainer.innerHTML = `<p>평점: ${stars} (${avg.toFixed(1)}점)</p>`;
  } else {
    ratingContainer.innerHTML = `<p>아직 평점이 없습니다.</p>`;
  }

  // 구매 버튼
  document.getElementById('buy-button').textContent = `${game.price}원 장바구니에 담기`;
  document.getElementById('buy-button').onclick = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      window.location.href = "LoginPage.html";
      return;
    }

    const cartKey = `cart_${currentUser}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');

    if (cart.some(item => item.id === game.id)) {
      alert("이미 장바구니에 담겨 있습니다.");
      return;
    }

    cart.push({ id: game.id, name: game.name, price: game.price, image: game.image });
    localStorage.setItem(cartKey, JSON.stringify(cart));

    alert(`"${game.name}"이(가) 장바구니에 추가되었습니다.`);
  };
} else {
  document.body.innerHTML = '<p>게임을 찾을 수 없습니다.</p>';
}
