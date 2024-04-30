# Solution to the frontend challenge for DigitalService
by Manuel Minniti

## Approach
I am going to document my approach here for a better insight into my decision making.

I will use English as the preferred language, since the challenge text is also written in English, likely in order to provide more accessibility.

Comments in the code will provide more in-depth explanations where applicable.

___

## Task

Create a small web application that provides a dashboard showing how many data sets each federal ministry has made available on GovData. The dashboard should provide the possibility to filter the currently shown result set. It should be easy to tell from the dashboard which ministries have provided the most data.

Data for the dashboard is going to be provided by a backend in the future, but such an API is not in place yet (imagine your colleagues are working on it). Provided already is an exemplary JSON file that resembles a response from the planned API.

Use a non-proprietary tech stack of your choice and explain in a readme how to run your solution. Please use version control (git is preferred).

---

## Prerequisites
The target audience will likely be the frontend team of DigitalService to evaluate my approach to a technical frontend challenge. The task seems to be very close to an actual business case (perhaps service.justiz.de or something similar?). In the future the target audience may include ordinary citizens as well – so I'll try to cater to both. I will use German in the UI, although an actual app will likely be multilingual.

**Target audience: DigitalService Frontend Team, German citizens**

I am going with some _sensible defaults_ instead of writing some library functions and UI myself. For this I will use [create-react-app](https://create-react-app.dev/), since it is open source and provides some great boilerplate and options.
I will also use Typescript which will be a good refresher course and I assume DigitalService is likely invested to some degree in the use of Typescript.
Linting goes hand-in-hand with Typescript so that will be a handy tool and also to keep the code clean and readable.
Since most (or all) of the code by DigitalService is open source, I will also make use of their [Style Guide](https://digitalservicebund.github.io/angie/) and [Dictionary](https://github.com/digitalservicebund/style-dictionary).

**Sensible defaults: create-react-app, Typescript, Linting, DigitalService Style Guide and Dictionary**

The data will be provided via a very simple (NoSQL) backend/REST API using the [json-server](https://www.npmjs.com/package/json-server) package, just so we can mimic a real server in the wild.

**Backend/API: json-server**

## Log

Okay, let's roll 🚀! Let's initialize the project by creating a new public Github repo and clone it to my local machine.

- Create a new folder for the challenge:
```
mkdir ~/digitalservice-frontend-challenge && cd ~/digitalservice-frontend-challenge && git clone git@github.com:manuel-minniti/digitalservice-frontend-challenge-solution.git .
```
- Run the create-react-app script with
```
npx create-react-app . --template typescript
```
- The CLI is telling us that:
> You are running `create-react-app` 4.0.3, which is behind the latest release (5.0.0).
> We no longer support global installation of Create React App
- So we need to install a newer nodeJS version to get a fresh version of npx I think.
- Upgrading nodeJS to use the latest LTS version, via `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.2/install.sh | bash` and then `nvm install --lts`
- ~~Now we can use `npx create-react-app . --template typescript`~~
- Small change of plans: we are going to use yarn as our package manager instead of npm since it is [a lot faster than npm](https://www.copycat.dev/blog/yarn-vs-npm/#:~:text=Yarn%20vs%20npm%20Speed%3A,speeds%20up%20the%20installation%20process.).
- Install create-react-app via yarn:
```
yarn create react-app . --template typescript
```
- Add the `DECISION_LOG.md` file to the project.
- Let's install json-server with
```
yarn add json-server -D
```
- Since the Angie design system and the style dictionary make use of Tailwind, we will install it as well following these [instructions](https://tailwindcss.com/docs/guides/create-react-app). I haven't used Tailwind before so this will be a great exercise. 
```
yarn add -D tailwindcss
```
- Install the [Angie design system](https://github.com/digitalservicebund/angie) and the [style dictionary](https://github.com/digitalservicebund/style-dictionary).
```
yarn add @digitalservice4germany/style-dictionary @digitalservice4germany/angie
```
- Let's follow the guidelines to use those two packages in our project.
- Great, this is a good time to run our project as a sanity check via `yarn start` and make our first commit!
```
yarn start
```
- We're greeted by the React logo and everything looks nice and boring (still!).
- Now that we have a basic project we can initialize our data and the backend.
- Let's create a directory for the JSON database
```
mkdir db && touch db/db.json
```
- Now let's put our data (backend-response.json) from the challenge into the JSON file and also add a "pseudo-column" called `departments` where we list all items. Our `db.json` now looks like this:
```
{
    "departments": [
        {
          "department": "Statistisches Bundesamt",
          "description": "Statistisches Bundesamt",
          "datasets": 2372
        },
        (...)
    ]
}
```
- We have to adjust the `start` script in the `package.json` to start the json-server first and then run the React app. By default json-server will run on port 3000, the same as the React app by default. To prevent a clash we simply start the json-server on port 3004.
```
"start": "json-server --watch db/db.json --port 3004 & react-scripts start"
```
- To avoid zombie processes, we will install the [concurrently](https://www.npmjs.com/package/concurrently) package which handles multiple processes.
`yarn add concurrently -D`
- Probably best to create separate npm scripts for starting the DB and the React app separately (and add some colors):
```
"start:frontend": "react-scripts start",
"start:backend": "json-server --watch db/db.json --port 3004",
"start": "concurrently -n \"BACKEND,FRONTEND\" -c \"red,blue\" -p \"[{name}]\" \"npm run start:backend\" \"npm run start:frontend\"",
```
- I am getting some annoying "Something is already running on port 3000." errors so let's use a `.env` file where we can set the ports (which is probably useful for others).
```
REACT_APP_DB_PORT=3004
PORT=3001
```
- Our start scripts become:
```
"start:frontend": "react-scripts start",
"start:backend": "source .env && json-server --watch db/db.json --port $REACT_APP_DB_PORT",
```
- Now let's use linting and formatting defaults from the [typescript-vite-application-template](https://github.com/digitalservicebund/typescript-vite-application-template) and install required dependencies. We'll need the `.prettierrc` and `eslintrc.cjs` and we'll add the linting and formatting NPM scripts (but only for the `./src` directory).
```
yarn add eslint@^8.57.0 prettier eslint-config-prettier eslint-plugin-prettier typescript-eslint -D
```
- Cool, we got the data on http://localhost:3004/departments and now we can start creating our UI. Since we only need a dashboard, no routing is required.
```
mkdir -p src/pages/dashboard && touch src/pages/dashboard/index.tsx
```
- Let's use react-query to fetch our data since it provides some handy utilities.
```
yarn add @tanstack/react-query
```
- Let's also use react-error-boundary for catching errors.
```
yarn add react-error-boundary
```
- Okay, we have created the dashboard page and required components and added a visualisation for the number of datasets and also a filter select to choose a specific department.
- The app is also throwing a random error every now and then to test the error boundary.
- Let's add some tests and I think we can wrap this up.
- Mocking react-query seems to be a bit of a pain. I think going forward I'd remove this library and simply implement a custom data fetching logic.

## Wrapping up
- For the future I'd like to improve on the types and interfaces used in the project
- Also, a tighter integration with the Angie design system would be great
- Separating presentational components from logic would be a good idea
- A more opinionated folder structure (perhaps on a per-feature basis? MVC?)
- Get rid of react-query and write more tests (especially for data fetching)