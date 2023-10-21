const d = document;

const $text = d.getElementById('text');
const $btnAccept = d.getElementById('accept');
const $chkType = d.getElementById('type-encrypt');

const $resultsContainer = d.querySelector('.results');

let valuechkType = $chkType.checked;

$chkType.addEventListener('change', () => {
  valuechkType = $chkType.checked;
  $chkType.checked = valuechkType;

  $btnAccept.textContent = valuechkType ? 'Desencriptar' : 'Encriptar';
  $text.placeholder = valuechkType ? 'Texto encriptado' : 'Texto a encriptar';
});

$btnAccept.addEventListener('click', () => {
  const text = $text.value.trim().replace(/\s+/g, ' ');

  if (!text || text.length === 0) {
    alert('Debes ingresar un texto');
    return;
  }

  valuechkType ? decrypt(text) : encrypt(text);
});

const fetchData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `data=${data}`,
  });
  const result = await response.json();
  return result;
};

const encrypt = async (data) => {
  const result = await fetchData('/encrypt', data);
  const { encoded, encrypted } = result;
  const results = `
    <div class="result-wrapper">
      <span class="subtitle">Texto original</span>
      <span class="result">${data}</span>
      <span class="subtitle">Cifrado en base 64</span>
      <span class="result">${encoded}</span>
      <span class="subtitle">Cifrado en AES</span>
      <span class="result">${encrypted}</span>
    </div>
  `
  $resultsContainer.innerHTML = results;
};

const decrypt = async (data) => {
  const result = await fetchData('/decrypt', data);
  const { decrypted, decoded } = result;
  const results = `
    <div class="result-wrapper">
      <span class="subtitle">Cadena original</span>
      <span class="result">${data}</span>
      <span class="subtitle">Descifrado en AES</span>
      <span class="result">${decrypted}</span>
      <span class="subtitle">Descifrado en base 64</span>
      <span class="result">${decoded}</span>
    </div>
  `;
  $resultsContainer.innerHTML = results;
};