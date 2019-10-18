# Pouch Editor Demo

For Exchange.JS, Nov 7. 2019

## Prerequisites

- Node 8
- NPM 5
- CouchDB 16
- [Add CORS to CouchDB](https://www.npmjs.com/package/add-cors-to-couchdb)

## Setup

- git clone https://github.com/CAYdenberg/pouch-editor-demo.git
- cd pouch-editor-demo
- npm i
- cp .env.example .env

### Create a Database on mLab (this is for session storage)

- Go to mLab.com and sign in or create an account
- Click Create new to create a new database
- Pick any free combination of options
- Once the database is created, create a new user under the users tab
- Click Add database user. Choose a username and password and _note them down_.
- Copy the MongoDB URI from the top of the page (`mongodb://`) into the .env file under MONGO_URI. Then replace `<dbuser>` with your username and `<dbpassword>` with your password.

### How to get a Twitter API key

- Sign in at https://apps.twitter.com
- Click Create a new application
- Enter your application name, website and description
- For Callback URL: http://127.0.0.1:8080/auth/twitter/callback
- Go to Settings tab
- Check the box Allow this application to be used to Sign in with Twitter
- Click Update this Twitter's applications settings
- Copy and paste Consumer Key and Consumer Secret keys into .env file as TWITTER_KEY and TWITTER_SECRET

### Run it!

- npm start

### Any questions?

Email me casey@caydenberg.io
