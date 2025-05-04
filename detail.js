const params = new URLSearchParams(window.location.search);
const gameId = params.get('id');

const game = games.find(g => g.id === gameId);

if (game) {
  
  document.getElementById('game-title').textContent = game.name;
  document.getElementById('game-image').src = game.image;
  const gameImage = document.getElementById('game-image');
  gameImage.onload = function() {
    gameImage.style.width = '300px';  // 너비를 500px로 설정
    gameImage.style.height = 'auto';  // 높이는 자동으로 설정
  };
  gameImage.src = game.image;  // 이미지를 로드한 후 크기 조정
    document.getElementById('game-description').textContent = game.description;
  } 
  else {
  document.body.innerHTML = '<p>게임을 찾을 수 없습니다.</p>';
}
