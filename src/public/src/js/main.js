const d = document;

const $text = d.getElementById('text');
const $btnAccept = d.getElementById('accept');
const $chkType = d.getElementById('type-encrypt');
const $form = d.getElementById('form');

let valuechkType = $chkType.checked;

$chkType.addEventListener('change', () => {
  valuechkType = $chkType.checked;
  $chkType.checked = valuechkType;

  $btnAccept.textContent = valuechkType ? 'Desencriptar' : 'Encriptar';
  $text.placeholder = valuechkType ? 'Texto encriptado' : 'Texto a encriptar';
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

const clearResults = () => {
  const results = d.querySelector('.results');
  if (results) results.remove();
};

const encrypt = async (data) => {
  const result = await fetchData('/encrypt', data);
  clearResults();
  const { encoded, encrypted } = result;
  const results = `
    <div class="results">
      <div class="result-wrapper">
        <span class="subtitle">Texto original</span>
        <span class="result">${data}</span>
        <span class="subtitle">Cifrado en base 64</span>
        <span class="result">${encoded}</span>
        <span class="subtitle">Cifrado en AES</span>
        <span class="result">${encrypted}</span>
      </div>
    </div>
  `;
  $form.insertAdjacentHTML('afterend', results);
};

const decrypt = async (data) => {
  const result = await fetchData('/decrypt', data);
  clearResults();
  const { decrypted, decoded } = result;
  const results = `
    <div class="results">
      <div class="result-wrapper">
        <span class="subtitle">Cadena original</span>
        <span class="result">${data}</span>
        <span class="subtitle">Descifrado en AES</span>
        <span class="result">${decrypted}</span>
        <span class="subtitle">Descifrado en base 64</span>
        <span class="result">${decoded}</span>
      </div>
    </div>
  `;
  $form.insertAdjacentHTML('afterend', results);
};

const showErrorMeessage = (message) => {
  const errors = `
    <div class="errors">
      <span class="error">${message}</span>
    </div>
  `;
  $text.insertAdjacentHTML('afterend', errors);
};

const clearErrors = () => {
  const errors = d.querySelector('.errors');
  if (errors) errors.remove();
};

$form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = $text.value.trim().replace(/\s+/g, ' ');

  if (!text || text.length === 0) {
    clearErrors();
    showErrorMeessage('* Debes ingresar un texto');
    return;
  }

  valuechkType ? decrypt(text) : encrypt(text);
});

$form.addEventListener('input', () => {
  const errors = d.querySelector('.errors');
  if (errors) errors.remove();
});
