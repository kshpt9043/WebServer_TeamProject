// 로그인 상태 확인 및 우측 상단 표시 교체
const currentUser = localStorage.getItem('currentUser');
const headerRight = document.querySelector('.header-right');

if (currentUser && headerRight) {
  const loginBtn = document.getElementById('login-button');
  if (loginBtn) loginBtn.remove();

  const userSpan = document.createElement('span');
  userSpan.style.marginRight = '12px';

  const logoutBtn = document.createElement('button');
  logoutBtn.textContent = '로그아웃';
  logoutBtn.style.backgroundColor = '#ff6b00';
  logoutBtn.style.color = 'white';
  logoutBtn.style.border = 'none';
  logoutBtn.style.padding = '6px 12px';
  logoutBtn.style.borderRadius = '6px';
  logoutBtn.style.cursor = 'pointer';

  logoutBtn.onclick = () => {
    localStorage.removeItem('currentUser');
    alert("로그아웃 되었습니다.");
    window.location.href = 'LoginPage.html';
  };

  headerRight.appendChild(userSpan);
  headerRight.appendChild(logoutBtn);
}
