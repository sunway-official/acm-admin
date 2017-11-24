export const toBase64Async = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result.replace(/^data:image\/\w+;base64,/, ''));
    };
    reader.onerror = error => {
      reject(error);
    };
  });
};

export default {
  toBase64Async,
};
