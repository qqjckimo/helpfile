# helpfile

A general helpfiles page

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

1. Changing the `cwd` to the project's root folder and click the `Go Live` in the VS Code tool bar. Please check the README in the Live Server description for more details.

1. The `index.html` should be able to view at the `http://127.0.0.1:5500/`.

1. Add the `cshid` in to the qurey string to preview the result, for instance: `http://127.0.0.1:5500/?cshid={{cshidValue}}`. Get the workable `cshid` value from source code.

1. Run build command to preview the production version, go to `http://127.0.0.1:5500/docs/` to preview the result.

   ```bash
   npm run build
   ```

   \*\* This command automatically increase the version number at the patch field. This project honor the sematic version naming, which is {{major}}.{{minor}}.{{patch}}.

## Test the result in docker

Using docker + nginx to host the html

1. Build docker image

   ```bash
   npm run build:nDocker
   ```

1. Test the build result

   ```bash
   npm run test
   ```

The `index.html` should be able to view at `http://localhost:8080` if the test command run successfully.

# Before push and release

!! Run build command before push and release.

```bash
npm run build
```

Using the following command to run the built container and preview the build result

```bash
npm run build:up
```

The production version of `index.html` should be able to view `http://localhost:8080` to test the build result.
