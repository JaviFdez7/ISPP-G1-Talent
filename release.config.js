module.exports = {
    branches: ['main'], // Especifica tu rama de lanzamiento aquí, por ejemplo, 'main' o 'master'
    preset: 'conventionalcommits',
    ci: true,
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      '@semantic-release/github'
    ]
  };
  