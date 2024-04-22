module.exports = {
  '*.{ts,tsx}': ['eslint'],
  '**/*.ts?(x)': () => 'yarn check-types',
  '*.{json,yaml}': ['prettier -c'],
};
