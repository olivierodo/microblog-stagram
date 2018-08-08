const path = require('path')

module.exports = {
  dbFile: path.resolve(__dirname, 'db.json'),
  port: process.env.PORT || 8080,
  redirectUri: (process.env.HOST || '') + '/auth/instagram/callback',
  instagram: {
    clientId: process.env.INSTA_CLIENT_ID,
    clientSecret: process.env.INSTA_CLIENT_SECRET
  },
  hashtag: process.env.HASHTAG,
  numberPerPage: process.env.NUMBER_PER_PAGE
}
