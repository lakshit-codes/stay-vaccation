try {
  const path = require.resolve('tailwindcss', { paths: [process.cwd()] });
  console.log('Resolved tailwindcss at:', path);
} catch (e) {
  console.error('Failed to resolve tailwindcss');
  console.error(e);
}
