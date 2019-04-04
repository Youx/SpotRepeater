# SpotRepeater

This webapp allows you to repeat part of a song played in Spotify.

I developped this to help me write music sheets from songs I like.

## Getting started

You will need [node](https://nodejs.org) installed on your system, to run the authentication server, and to build the webapp.

### Installing dependencies

```
npm install
```

Should take a while as npm packages will pull half the universe.

### Building the app

```
npm run-script build-debug
# or
npm run-script build-prod
```

### Running the app

Move server-config.example.js to server-config.js, and fill it with your spotify application credentials.

Run the server

```
node server.js
```

Then connect to the [local page](http://localhost:8888/)

## Authors

Hugo Camboulive, (mostly a) C developper in France