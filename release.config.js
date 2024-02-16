module.exports = {
    branches: ['main', 'develop'],
    preset: 'conventionalcommits',
    ci: true,
    repositoryUrl: 'https://github.com/JaviFdez7/ISPP-G1-Talent',
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      '@semantic-release/github'
    ]
  };
  