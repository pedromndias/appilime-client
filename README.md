# appilime

## [See the App!](https://appilime.netlify.app/)

![App Logo](https://github.com/pedromndias/appilime-client/blob/main/src/assets/logo-with-name-02.png)

## Description

Productivity app with focus environment and task features like To-Dos List, Expenses tracker, Timer, Weather based on location, BTC and ETH crypto prices and a game. Depending on your mood, you can change the theme and all the app will show a different style and the music playlist will also change accordingly.

#### [Client Repo here](https://github.com/pedromndias/appilime-client)
#### [Server Repo here](https://github.com/pedromndias/appilime-server)

## Backlog Functionalities

In the future I would like to add a calculator and connect the Spotify API so the music playlist comes from there and not Youtube.

## Technologies used

HTML, CSS, Javascript, React, axios, React Context, Services, React Router, leaflet, iframe, React Player, React Spinners and React Hooks like useState, useEffect, useContext, useRef.

# Client Structure

## User Stories

**NOTE -**  List here all the actions a user can do in the app. Example:

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a message that something went wrong
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **main** - As a logged in user I can see different task features like live crypto prices, live weather information, a timer and a side bar with more functionalities
- **lists** - As a user I want to see all the To-Dos lists, see details about a list, create, edit and delete, add a new To-Do, check a To-Do and remove all the To-Dos that are done.
- **expenses** - As a user I want to add expenses to the expenses tracker, see details, edit and delete, and check them all in the map on the tracker (when creating or editing the user can add the location)
- **themes** - As a user I can change the app theme (styles) depending on my mood
- **music** - As a user I can listen to a playlist based on my mood
- **game** - As a user I can play a fun motorcycle game
- **profile** - As a user I can check my profile, update the profile picture and edit my username
- **timer** - As a user I can set a timer that will go from any minute/second until zero


## Client Routes



## React Router Routes (React App)
| Path                      | Page            | Components        | Permissions              | Behavior                                                      |
| ------------------------- | ----------------| ----------------  | ------------------------ | ------------------------------------------------------------  |
| `/`                       | Home            |                   | public                   | Home page                                                     |
| `/signup`                 | Signup          |                   | anon only `<IsAnon>`     | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | Login           |                   | anon only `<IsAnon>`     | Login form, link to signup, navigate to homepage after login  |
| `/profile`                | Profile         | EditProfile       | user only `<IsPrivate>`  | Navigate to homepage after logout, expire session             |
| `/main`                   | Main        | Sidebar, CryptoPrices, Timer, Weather | user only `<IsPrivate>`  | Shows all the main features of the app            |
| `/lists`             | TodoList       | Sidebar, SingleTodoList    | user only `<IsPrivate>`  | Shows all the To-Dos List                                    |
| `/lists/create`       | TodoListAddForm   | Sidebar          | user only `<IsPrivate>`  | Create a new To-Do List                                    |
| `/lists/:todoListId`       | TodoListDetails   | Sidebar          | user only `<IsPrivate>`  | See details about a To-Do List, edit and delete it. Create a new To-Do, check To-Do and remove the ones that are checked     |
| `/expenses`       | Expenses   | Sidebar, MapContainer    | user only `<IsPrivate>`  | Shows all the expenses (including map view)     |
| `/expenses/create`       | ExpensesAddNew   | Sidebar    | user only `<IsPrivate>`  | Create new Expense     |
| `/expenses/:expenseId`       | ExpensesDetails   | Sidebar, MapContainer    | user only `<IsPrivate>`  | Delete or edit an Expense    |
| `/timer`       | Timer   |     | user only `<IsPrivate>`  | Timer feature    |
| `/game`       | Game   |     | user only `<IsPrivate>`  | Game feature    |
| `/music`       | Music   |     | user only `<IsPrivate>`  | Music feature    |
| `/error`       | Error   |     | user only `<IsPrivate>`  | Shows error message   |
| `/*`       | NotFound   |     | user only `<IsPrivate>`  | Shows "Not Found" message    |

## Other Components

- Navbar
- Footer
- Sidebar
- SingleTodoList
- Weather
- CryptoPrices


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.verify()

- Main Service
  - main.getUserMood()
  - main.editUserMood(mood)

- Profile Service
  - profile.getUser()
  - profile.editUsername(username)
  - profile.editProfilePic(imageUrl)

- Upload Service
  - upload.uploadService(imageFile)

- Expenses Service
  - expenses()
  - expenses.create(newExpense)
  - expenses.details(expenseId)
  - expenses.delete(expenseId)
  - expenses.edit(expenseId, updatedExpense)
  - expenses.deleteAll()

- Todo List Service
  - todolists()
  - todolists.create(name)
  - todolists.details(todoListId)
  - todolists.delete(todoListId)
  - todolists.edit(todoListId, name)
  - todolists.getAllTodos(todoListId)
  - todolists.changeIsChecked(todoId, isChecked)
  - todolists.deleteIsChecked(todoListId)
  - todolists.createSingleTodo(todoListId, name)

  
- External API
  - Nominatim Openstreetmap
  - Binance
  - Open-Meteo
  
## Context

- auth.context
- theme.context
  
## Usage

If you want to run these files locally, you can download them, `cd into your project directory`, then run `npm install` to install the dependencies and finally `npm start`. Don't forget to also run the server repository (https://github.com/pedromndias/appilime-server)!

## Links

### Project

[Repository Link Client](https://github.com/pedromndias/appilime-client)

[Repository Link Server](https://github.com/pedromndias/appilime-server)

[Deploy Link](https://appilime.netlify.app/)

### Trello

[Link to your trello board](https://trello.com/b/ML2qaUGw/project-3)

### Slides

[Slides Link](www.your-slides-url-here.com)