const DOCUMENT = document.body.innerHTML;

const SALT = 'A9f!zQ7#Lm2@xYp$R4tVwZ8&';
const HASH = 'ec97fc44751308d53b5236bfd9b6875b2ef145f672a866c9b21974e9dc468e30';

async function makeHash(password, salt) {
  const buf = new TextEncoder().encode(password + salt);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
              .map(b => b.toString(16).padStart(2, "0"))
              .join("");
}

async function checkPw() {
  const vl = document.getElementById("pw").value;
  const has = await makeHash(vl, SALT);

  if (has === HASH) {
    document.body.innerHTML = DOCUMENT;
  } else {
    alert("パスワードが違います！");
  }
}

document.body.innerHTML = `
  <p>パスワードを入力してください</p>
  <input type="text" id="pw" placeholder="password">
  <button onclick="checkPw()">送信</button>
`;
document.title = 'パスワードを入力';
