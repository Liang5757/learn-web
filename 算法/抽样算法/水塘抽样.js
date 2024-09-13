function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function reservoir_sampling(data, k) {
  const reservoir = [];
  for (let i = 0; i < k; i++) {
    reservoir.push(data[i]);
  }

  for (let i = k; i < data.length; i++) {
    const j = getRandomInt(i);
    if (j < k) {
      reservoir[j] = data[i];
    }
  }

  return reservoir;
}
