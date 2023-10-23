const d = document;

const $text = d.getElementById('text');
const $btnAccept = d.getElementById('accept');
const $chkType = d.getElementById('type-encrypt');
const $form = d.getElementById('form');

let valuechkType = $chkType.checked;

$chkType.addEventListener('change', () => {
  valuechkType = $chkType.checked;
  $chkType.checked = valuechkType;

  $btnAccept.textContent = valuechkType ? 'Descifrar' : 'Cifrar';
  $text.placeholder = valuechkType ? 'Texto cifrado' : 'Texto a cifrar';
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
  const results = d.querySelectorAll('.results');
  if (results) results.forEach((result) => result.remove());
};

const encode = async (data) => {
  const words = [
    'Hola',
    'Mundo',
    'virologia',
    'criptografia',
    'cifrado',
  ];

  const buildResults = (original, result) => `
    <div class="results">
      <div class="result-wrapper">
        <span class="subtitle">Texto original</span>
        <span class="result">${original}</span>
        <span class="subtitle">Cifrado en base 64</span>
        <span class="result">${result}</span>
      </div>
    </div>
    `;

  const separatorElement = () => {
    const separator = `
      <div class="results">
        <div class="result-wrapper">
          <span class="subtitle separator">MÁS EJEMPLOS</span>
        </div>
      </div>
    `;
    return separator;
  };

  const promises = words.map(async (word) => {
    const result = await fetchData('/encode', word);
    return result;
  });

  const resultPromises = await Promise.all(promises);

  const resultsMapped = resultPromises.reduce((acc, { result, original }) => {
    acc += buildResults(original, result);
    return acc;
  }, '');

  const fetchUser = await fetchData('/encode', data);
  const resultsUser = buildResults(data, fetchUser.result);
  clearResults();
  $form.insertAdjacentHTML('afterend', resultsUser + separatorElement() + resultsMapped);
};

const decode = async (data) => {
  const { result, original } = await fetchData('/decode', data);
  clearResults();
  const results = `
    <div class="results">
      <div class="result-wrapper">
        <span class="subtitle">Cadena original</span>
        <span class="result">${original}</span>
        <span class="subtitle">Descifrado en base 64</span>
        <span class="result">${result}</span>
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

  valuechkType ? decode(text) : encode(text);
});

$form.addEventListener('input', () => {
  const errors = d.querySelector('.errors');
  if (errors) errors.remove();
});
