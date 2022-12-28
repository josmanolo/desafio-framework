const getRandomNumbers = (cant) => {
  let qtyRandomNumbers = {};

  const addNumber = (nro) => {
    typeof qtyRandomNumbers[nro] === 'undefined'
      ? (qtyRandomNumbers[nro] = 1)
      : (qtyRandomNumbers[nro] = qtyRandomNumbers[nro] + 1);
  };

  for (let i = 0; i < cant; i++) {
    addNumber(Math.ceil(Math.random() * 1000));
  }
  return qtyRandomNumbers;
};

process.on('message', (cant) => {
  const numbers = getRandomNumbers(cant);
  process.send(numbers);
});
