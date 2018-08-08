const config = require('./config')
const express = require('express')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const apicache = require('apicache')
const Instagram = require('node-instagram').default

const instagram = new Instagram(config.instagram)
const adapter = new FileSync(config.dbFile)
const db = low(adapter)

db.defaults({config: {}, user: {}}).write()

express()
  .use((req, res, next) => {
    req.accessToken = db.get('config').value().accessToken
    if (req.url.match(/^\/auth/) || req.accessToken) {
      return next()
    }
    res.redirect('/auth/instagram')
  })
  .get('/auth/instagram', (req, res) => {
    const options = {
      scope: ['basic', 'likes']
    }
    res.redirect(instagram.getAuthorizationUrl(config.redirectUri, options))
  })
  .get('/auth/instagram/callback', async (req, res) => {
    try {
      const code = req.query.code
      const data = await instagram.authorizeUser(code, config.redirectUri)
      db.set('config.accessToken', data.access_token).write()
      db.set('user', data.user).write()
      res.redirect('/')
    } catch (err) {
      res.json(err)
    }
  })
  .get('/posts', apicache.middleware('1 minute'), async (req, res, next) => {
    try {
      const options = {
        count: config.numberPerPage,
        max_id: req.query.p,
        access_token: req.accessToken
      }
      const posts = await instagram.get('users/self/media/recent', options)
      delete posts.pagination.next_url
      posts.data = posts.data
        .filter(post => {
          if (!config.hashtag) return true
          return post.tags.includes(config.hashtag.replace('#', ''))
        })
        .map(post => {
          return {
            id: post.id,
            images: post.images,
            caption: post.caption,
            tags: post.tags,
            type: post.type,
            link: post.link
          }
        })
      res.json(posts)
    } catch (e) {
      next(e)
    }
  })
  .use(express.static('public'))
  .listen(config.port, () => {
    console.log('App listning on port :' + config.port)
  })
