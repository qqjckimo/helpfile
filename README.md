# helpfile

POC of the general helpfiles

# Local testing

## Test the result locally

1. Install VS Code Extension 'Live Server'

```
Name: Live Server
Id: ritwickdey.LiveServer
Description: Launch a development local Server with live reload feature for static & dynamic pages
Version: 5.7.9
Publisher: Ritwick Dey
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
```

1. Go to the project's root folder and click the "Go Live" in the VS Code tool bar. Please check the README in the Live Server description for more details.

1. The page should be able to open at the http://127.0.0.1:5500/

## Test the result in docker

Using docker + nginx to host the html

```bash
npm run test
```

Go to `http://localhost:8080` if the tes command run successfully.

# Before push

Run build command before push and release.

```bash
npm run build
```

Using followin command to run the built container

```bash
npm run build:up

```

Go to `http://localhost:8080` to test the build result.
