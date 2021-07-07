const filterUpdates = (updates, ...allowedUpdates) => {
  const x = {};

  Object.keys(updates).forEach(el => {
    if (allowedUpdates.includes(el)) {
      x[el] = updates[el]
    }
  })

  return x;
}

module.exports = filterUpdates;