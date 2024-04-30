# digitalservice-frontend-challenge-solution
Solution for the frontend challenge for DigitalService by Manuel Minniti.

For a more detailed report please have a look at the **./DECISION_LOG.md** file.

## Installation

```
git clone https://github.com/manuel-minniti/digitalservice-frontend-challenge-solution.git digitalservice-frontend-challenge-solution-manuel-minniti
cd digitalservice-frontend-challenge-solution-manuel-minniti
yarn install --production=false
yarn start
```

If `yarn start` fails to start, you can manually start the backend and frontend with the following commands:

```
yarn start:backend
```

and in a separate terminal:

```
yarn start:frontend
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Also starts the json-server.

You can adjust environment variables in the .env file.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn lint:check`

Runs the linter to check for any issues.

### `yarn lint:fix`

Runs the linter and fixes any issues.

### `yarn format:check`

Runs the formatter to check for any issues.

### `yarn format:fix`

Runs the formatter and fixes any issues.

### `yarn style:check`

Runs the formatter and linter to check for any issues.

### `yarn style:fix`

Runs the formatter and linter and fixes any issues.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).