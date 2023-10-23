<div align="center">
  <h1>🔐 Criptografía</h1>

  [Demo](https://criptografia-base64-aes.vercel.app/)

  ![Version](https://img.shields.io/github/package-json/v/marcode24/criptografia?style=popout&logo=npm)
  ![GitHub CI Workflow Status](https://img.shields.io/github/actions/workflow/status/marcode24/criptografia/linter.yml?branch=main&style=popout&logo=testcafe&label=linter)
  ![GitHub repo size](https://img.shields.io/github/repo-size/marcode24/criptografia?style=popout&logo=github&label=repo%20size)
  ![GitHub](https://img.shields.io/github/license/marcode24/criptografia?style=popout&logo=github&label=license)
  ![GitHub Repo stars](https://img.shields.io/github/stars/marcode24/criptografia?style=popout&logo=apachespark&color=yellow&logoColor=yellow)
  ![Github repo views](https://img.shields.io/github/search/marcode24/criptografia/criptografia?style=popout&logo=github&label=repo%20views)
  ![GitHub last commit](https://img.shields.io/github/last-commit/marcode24/criptografia?style=popout&logo=git&label=last%20commit)
</div>

## 📝 Tabla de contenidos

- [🔐 Criptografia](#criptografia)
  - [ 📝 Tabla de contenidos](#📝-tabla-de-contenidos)
  - [ 📖 Ejercicios de criptografía](#📖-ejercicios-de-criptografía)
    - [ 📖 Ejercicio 1](#📖-ejercicio-1)
    - [ 📖 Ejercicio 2](#📖-ejercicio-2)
  - [ ✅ Solución de los ejercicios](#✅-solución-de-los-ejercicios)
    - [ 🥇 Ejercicio 1](#🥇-ejercicio-1)
      - [Explicación](#explicación)
    - [ 🥇 Ejercicio 2](#🥇-ejercicio-2)
      - [Explicación](#explicación-1)
        - [Función encrypt](#función-encrypt)
        - [Función decrypt](#función-decrypt)

## 📖 Ejercicios de criptografía

### 📖 Ejercicio 1

Programa 1. Realizar un programa que en el cual sea capaz de cifrar la siguiente URL en base64

https://www.saes.upiicsa.ipn.mx/

después que le muestre al usuario, la opción de decifrar la misma url, probar el código por lo menos con 5 cadenas diferentes, incluir captura de pantalla de ejecución, se deberá mostrar el cifrado y el descifrado de las
cadenas

### 📖 Ejercicio 2

Programa 2. Con base en el programa anterior, utilizar un cifrado AES para cifrar la cadena ya cifrada con un cifrado base64, posteriormente descfirar la cadena, se puede notar que una misma cadena se le ha colocado un doble cifrado, esto con intención de agregarle más seguridad a nuestra información, ahora esta cadena con doble cifrado debe de regresar a la cadena original, incluir evidencia con código en ejecución y mandar los respectivos programas para su revisión

## ✅ Solución de los ejercicios

### 🥇 Ejercicio 1

```js
const Base64 = {
  encode: (data) => Buffer.from(data).toString('base64'),
  decode: (base64) => Buffer.from(base64, 'base64').toString(),
};
```

#### Explicación

Se crea un objeto llamado Base64 que tiene dos funciones, una para codificar y otra para decodificar. La función encode recibe un string y lo convierte a base64, la función decode recibe un string en base64 y lo convierte a string.

```js
const Base64 = {
  encode: (data) => Buffer.from(data).toString('base64'),
  decode: (base64) => Buffer.from(base64, 'base64').toString(),
};
```

`Buffer.from(data)` convierte el string a un buffer, el cual es un arreglo de bytes. `toString('base64')` convierte el buffer a base64.

Buffer funciona convirtiendo cada caracter del string a su valor en ascii, por ejemplo, el caracter 'a' tiene el valor 97 en ascii, el caracter 'b' tiene el valor 98 en ascii, etc. El valor ascii de cada caracter se convierte a binario, y se concatenan todos los binarios para formar un string de 8 bits. Por ejemplo, el caracter 'a' tiene el valor 97 en ascii, que en binario es 01100001, y el caracter 'b' tiene el valor 98 en ascii, que en binario es 01100010, entonces el string 'ab' se convierte a 0110000101100010.

toString('base64') convierte el string de 8 bits a base64. Base64 es un sistema de codificación que utiliza 64 caracteres para representar cualquier valor en binario. Los 64 caracteres son A-Z, a-z, 0-9, + y /.

En base64, cada caracter representa 6 bits, por lo que el string de 8 bits se divide en grupos de 6 bits, y cada grupo se convierte a un caracter de base64. Por ejemplo, el string 0110000101100010 se divide en 011000, 010110 y 0010, que se convierten a Y, W y I respectivamente, por lo que el string 'ab' se convierte a 'YWI=' en base64.


### 🥇 Ejercicio 2

```js
import crypto from 'crypto';
import Base64 from './base64.js';

const ALGORITHM = 'aes-256-cbc';
const KEY = crypto.randomBytes(32);
const IV = crypto.randomBytes(16);

const AES = {
  encrypt: (data) => {
    // Cifrado Base64
    const encoded = Base64.encode(data);

    // Cifrado AES
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), IV);
    let encrypted = cipher.update(encoded, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return { encoded, encrypted };
  },
  decrypt: (data) => {
    // Descifrado AES
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), IV);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    // Descifrado Base64
    const decoded = Base64.decode(decrypted);

    return { decrypted, decoded };
  },
};
```

#### Explicación

```js
import crypto from 'crypto';
```

Se importa el módulo crypto de Node.js, el cual contiene funciones para cifrar y descifrar información. El módulo crypto es un módulo nativo de Node.js, por lo que no es necesario instalarlo con npm.

```js
import Base64 from './base64.js';
```

Se importa el objeto Base64 del archivo base64.js. El archivo base64.js contiene un objeto llamado Base64 que tiene dos funciones, una para codificar y otra para decodificar. La función encode recibe un string y lo convierte a base64, la función decode recibe un string en base64 y lo convierte a string.

```js
const ALGORITHM = 'aes-256-cbc';
const KEY = crypto.randomBytes(32);
const IV = crypto.randomBytes(16);
```

Se definen tres constantes.

- ALGORITHM es el algoritmo de cifrado que se va a utilizar. El algoritmo aes-256-cbc utiliza el algoritmo AES con una llave de 256 bits y el modo de operación CBC. El modo de operación CBC es un modo de operación de cifrado por bloques, el cual divide el texto en bloques de 128 bits y los cifra uno por uno. El modo de operación CBC utiliza un vector de inicialización (IV) para cifrar el primer bloque, y el resultado de cifrar un bloque se utiliza para cifrar el siguiente bloque. El vector de inicialización se genera aleatoriamente y se utiliza para cifrar el primer bloque, pero no se cifra, por lo que se envía junto con el texto cifrado.

- KEY es la llave que se va a utilizar para cifrar y descifrar. La llave se genera aleatoriamente y tiene una longitud de 32 bytes, que es la longitud que se necesita para el algoritmo aes-256-cbc. Para este ejercicio se genera una llave aleatoria cada vez que se ejecuta el programa, pero en un programa real la llave se debe guardar en un lugar seguro y no se debe cambiar. Si se cambia la llave, no se va a poder descifrar la información que se cifró con la llave anterior.

- IV es el vector de inicialización que se va a utilizar para cifrar y descifrar. El vector de inicialización se genera aleatoriamente y tiene una longitud de 16 bytes, que es la longitud que se necesita para el algoritmo aes-256-cbc. Para este ejercicio se genera un vector de inicialización aleatorio cada vez que se ejecuta el programa, pero en un programa real el vector de inicialización se debe guardar en un lugar seguro y no se debe cambiar. Si se cambia el vector de inicialización, no se va a poder descifrar la información que se cifró con el vector de inicialización anterior.

`¿Por qué el algoritmo aes-256-cbc?`

El algoritmo aes-256-cbc es un algoritmo de cifrado simétrico, lo que significa que se utiliza la misma llave para cifrar y descifrar. El algoritmo aes-256-cbc es un algoritmo de cifrado muy seguro, ya que es muy difícil descifrar la información sin la llave. El algoritmo aes-256-cbc es un algoritmo de cifrado muy utilizado, por lo que es muy probable que el algoritmo aes-256-cbc esté implementado en el lenguaje de programación que se esté utilizando.

CBC es un modo de operación de cifrado por bloques, el cual divide el texto en bloques de 128 bits y los cifra uno por uno. El modo de operación CBC utiliza un vector de inicialización (IV) para cifrar el primer bloque, y el resultado de cifrar un bloque se utiliza para cifrar el siguiente bloque. El vector de inicialización se genera aleatoriamente y se utiliza para cifrar el primer bloque, pero no se cifra, por lo que se envía junto con el texto cifrado.

```js
const AES = {
  encrypt: (data) => { ... },
  decrypt: (data) => { ... },
};
```

Se crea un objeto llamado AES que tiene dos funciones, una para cifrar y otra para descifrar. La función encrypt recibe un string y lo cifra con base64 y aes-256-cbc, la función decrypt recibe un string cifrado con aes-256-cbc y lo descifra con base64 y aes-256-cbc.

##### Función encrypt

```js
const encoded = Base64.encode(data);
```

Se codifica el string con base64. Se reutiliza la función encode del objeto Base64 del archivo base64.js.

```js
const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), IV);
```

Se crea un objeto cipher con el algoritmo aes-256-cbc, la llave KEY y el vector de inicialización IV. El objeto cipher tiene dos funciones, update y final, las cuales se utilizan para cifrar el string. La función update recibe el string a cifrar, el formato del string original y el formato del string cifrado, y devuelve el string cifrado. La función final recibe el formato del string cifrado y devuelve el string cifrado.

```js
let encrypted = cipher.update(encoded, 'utf8', 'hex');
encrypted += cipher.final('hex');
```

Se cifra el string con el objeto cipher. Se utiliza la función update para cifrar el string codificado en base64, se especifica que el string original está en formato utf8 y que el string cifrado se debe devolver en formato hex. Se utiliza la función final para obtener el string cifrado en formato hex y se concatena con el string cifrado que se obtuvo con la función update.

```js
return { encoded, encrypted };
```

Se devuelve un objeto con el string codificado en base64 y el string cifrado con base64 y aes-256-cbc.

##### Función decrypt

```js
const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), IV);
```

Se crea un objeto decipher con el algoritmo aes-256-cbc, la llave KEY y el vector de inicialización IV. El objeto decipher tiene dos funciones, update y final, las cuales se utilizan para descifrar el string. La función update recibe el string a descifrar, el formato del string original y el formato del string descifrado, y devuelve el string descifrado. La función final recibe el formato del string descifrado y devuelve el string descifrado.

```js
let decrypted = decipher.update(data, 'hex', 'utf8');
decrypted += decipher.final('utf8');
```

Se descifra el string con el objeto decipher. Se utiliza la función update para descifrar el string cifrado, se especifica que el string original está en formato hex y que el string descifrado se debe devolver en formato utf8. Se utiliza la función final para obtener el string descifrado en formato utf8 y se concatena con el string descifrado que se obtuvo con la función update.

```js
const decoded = Base64.decode(decrypted);
```

Se decodifica el string descifrado con base64. Se reutiliza la función decode del objeto Base64 del archivo base64.js.

```js
return { decrypted, decoded };
```

Se devuelve un objeto con el string descifrado con base64 y el string decodificado con base64.
