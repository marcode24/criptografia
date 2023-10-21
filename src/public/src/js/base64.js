const d = document;

const $text = d.getElementById('text');
const $btnAccept = d.getElementById('accept');
const $chkType = d.getElementById('type-encrypt');

const $resultsContainer = d.querySelector('.results');

let valuechkType = $chkType.checked;

$chkType.addEventListener('change', () => {
  valuechkType = $chkType.checked;
  $chkType.checked = valuechkType;

  $btnAccept.textContent = valuechkType ? 'Descifrar' : 'Cifrar';
  $text.placeholder = valuechkType ? 'Texto cifrado' : 'Texto a cifrar';
});

$btnAccept.addEventListener('click', () => {
  const text = $text.value.trim().replace(/\s+/g, ' ');

  if (!text || text.length === 0) {
    alert('Debes ingresar un texto');
    return;
  }

  valuechkType ? decode(text) : encode(text);
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

const encode = async (data) => {
  const words = [
    'Hola',
    'Mundo',
    'virologia',
    'criptografia',
    'cifrado',
  ];

  const buildResults = (original, result) => {
    return `
    <div class="result-wrapper">
      <span class="subtitle">Texto original</span>
      <span class="result">${original}</span>
      <span class="subtitle">Cifrado en base 64</span>
      <span class="result">${result}</span>
    </div>
    `;
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
  $resultsContainer.innerHTML = resultsUser + resultsMapped;
};

const decode = async (data) => {
  const { result, original } = await fetchData('/decode', data);
  const results = `
    <div class="result-wrapper">
      <span class="subtitle">Cadena original</span>
      <span class="result">${original}</span>
      <span class="subtitle">Descifrado en base 64</span>
      <span class="result">${result}</span>
    </div>
  `;
  $resultsContainer.innerHTML = results;
};
