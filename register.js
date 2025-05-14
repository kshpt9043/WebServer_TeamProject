function register() {
  const id = document.getElementById('register-id').value.trim();
  const pw = document.getElementById('register-pw').value.trim();

  if (!id || !pw) {
    alert("ID와 비밀번호를 모두 입력해주세요.");
    return;
  }

  // 기존 사용자 불러오기
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  // 중복 ID 확인
  if (users.some(user => user.id === id)) {
    alert("이미 존재하는 ID입니다.");
    return;
  }

  // 새 사용자 추가
  users.push({ id, password: pw });
  localStorage.setItem('users', JSON.stringify(users));

  alert("회원가입 완료! 로그인 페이지로 이동합니다.");
  window.location.href = 'LoginPage.html';
}
