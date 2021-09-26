# Number Muncher

This is an attempt to remake the original 
[MECC DOS Number Munchers (Version 1.1)](http://mecc.co/mathematics/number-munchers---a-170/).
An online emulator can be 
[found here](https://playold.games/play-game/number-munchers/play/), which is
where images/gameplay/etc. was gathered and backwards engineered. You can play a 
deployed version of this game 
[hosted on GitHub](https://msaperst.github.io/number-munchers/)

## Development
This project was bootstrapped with 
[Create React App](https://github.com/facebook/create-react-app).

### Available Scripts
In the project directory, you can run:
#### `npm ci`
to install. alternatively, to clean the project before install
#### `npm install`
To run and launch the application:
#### `npm start`
This will launch the app in your browser, or you can open
[http://localhost:3000](http://localhost:3000) to view it in your browser

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Note: you can also run `npm run test:ci` in order to run the 
tests without watch mode

#### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run deploy`

Deploys the application to our GitHub server. This is 
automatically run when code is merged into `main`

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, 
you can `eject` at any time. This command will remove the single build 
dependency from your project.

Instead, it will copy all the configuration files and the transitive 
dependencies (webpack, Babel, ESLint, etc) right into your project so you have 
full control over them. All of the commands except `eject` will still work, 
but they will point to the copied scripts so you can tweak them. At this point
you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for 
small and middle deployments, and you shouldn’t feel obligated to use this 
feature. However we understand that this tool wouldn’t be useful if you 
couldn’t customize it when you are ready for it.

## Testing
Functional tests exist, and can be run using the
#### `npm run selenium`
command. These will execute Selenium tests on the application deployed on 
localhost. Alternatively, a different address can be provided to test on another
environment. For example, to test in prod:
#### ` APP=https://msaperst.github.io/number-munchers/ npm run selenium`