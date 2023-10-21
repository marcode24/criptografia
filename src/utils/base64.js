const Base64 = {
  encode: (data) => Buffer.from(data).toString('base64'),
  decode: (base64) => Buffer.from(base64, 'base64').toString(),
};

export default Base64;