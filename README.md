# Microblog-Stagram - Build a MicroBlog backed by Instagram

**Microblog-Stagram is a developer tool for building microblogs easily by using the capability of instagram**

You need to build a simple blog, and you feel wordpress is too much ? I'm agree with you that why i came with simple idea to use Instagram as a backend.

### Instagram as a backend ?

Yes instagram offers :

* (not too bad) Apis
* Various content type (image, caroussel, gif, video)
* Illimited storage ^^
* Quality of services

# Install Microblog-Stagram in 3 simple steps.

Microblog-Stagram is a Node.js module, it works with Node and npm.

## 1. Create your instagram API client app

Connect to the [instagram developer website](https://www.instagram.com/developer/clients/manage/) And register a new client to get your **client id** and **client secret**.

During the registrationn add 2 *vValid redirect URIs:* as **http://localhost/auth/instagram/callback** to test on your computer and **http://example.com/auth/instagram/callback** for your final website (example.com)


## 2. Setup your environment

### **Command Line Interface**

The best way to get started locally with Microblog-stagram is by installing through npm.

```
$ npm install
```

Then you need to setup the environment variables

```
$ cp .env.example .env
```

Edit the file `.env` and replace the values :

* `HOST` : The url of your website (ex : http://example.com)
* `INSTA_CLIENT_ID` : The instagram client ID just created from the instagram developer portal on step 1
* `INSTA_CLIENT_SECRET` : The instagram client SECRET just created from the instagram developer portal on step 1

* `HASHTAG` : Specify a hashtag if you just want to display some specific post on your microblog (ex : #blogstagram)
* `NUMBER_PER_PAGE` : The number of post to load on each page


## 3. Link to your instagram account

At the first start the app will need to be link to your instagram account.
From the command line interface run :

```
$ npm start
```

Then on your browser, visit your local url :

*http://localhost/*

You will be redirected to the instagram oauth page. Accept the permission and Voila !

Your acount is linked now you can see all your post from your new microblog page.


#### Development

To run the app on development just run : 

```
$ npm run start:dev
```


### Contributing

We actively welcome pull requests.
