module.exports = {
  // this will check Typescript files
  '**/*.(ts|tsx)': () => 'tsc --skipLibCheck --noEmit',

  // This will lint and format TypeScript and JavaScript files
  '**/*.(ts|tsx|js|jsx)': ['prettier --write', 'eslint --fix'],

  // this will Format MarkDown and JSON
  '**/*.(md|json)': 'prettier --write',
};
