# React Jack

This is a Blackjack game written with React and Redux.

I am using this project to learn more about Redux. I have been enjoying React but want to get better at mutating my Redux state and discover some best practices.

It was built on `create-react-app` so any of the typical CRA commands should work.

I have also begun experimenting with Docker and some DevOps tools (Jenkins and Netlify) and am using this application as a testing ground.


## To Run Locally:

### 1. Clone the Repo

### 2. Install NPM Packages

```
yarn install
```

or

```
npm install
```

### 3. Run Locally in Development Environment

```
yarn start
```

or

```
npm run start
```

## To Build and Run in Docker Container (Dev)

```

docker build -t react-jack:dev .
 
docker run -itd --rm  -v ${PWD}:/app -v /app/node_modules  -p 3001:3000 -e CHOKIDAR_USEPOLLING=true react-jack:dev
```

The `CHOKIDAR_USEPOLLING` will allow hot-reloading to work just like if the project was run locally.


## To Build and Run in Docker Container (Prod)

```
 docker build -f Dockerfile.prod -t react-jack:prod .
 
 docker run -it --rm -p 1337:80 react-jack:prod
```
