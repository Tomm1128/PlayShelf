# PlayShelf - Board Game Review App

This project was a Ruby project focused on using Sinatra and Active record to manage the backend. The frontend was done using react. The focus of the project was on the backend.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Overview](#overview)

## Installation

To get started with setting up the project, cd into the backend folder and run the following commands in order: 

```sh
bundle install
```

```sh
bundle exec rake db:migrate
bundle exec rake db:seed
```
Now cd out of backend back to root and cd into the frontend. Then run the following commands in order:

```sh
npm install
```

## Setup

Now that the backend and fronend should have everything installed. You will need to open two tabs in your terminal. In the one tab, you need to start the backend server now that the tables and see data are created. Cd back into the backend folder and run this command:

```sh
bundle exec rake server
```

Now that that is running, switch to the other tab in your terminal and cd into the frontend folder, then run 

```sh
npm start
```

This should auomatically open the app on your most recent used browser or your default browser.

## Overview

On page load, Playshelf will show you a login screen. You can use one of the users in the database or feel free to create your own user using the sign up link. You should now stay signed in and the app should track the user across each page. Now that you are signed in, you can now use the features PlayShelf has:

### Features include:

- Add a reviews to board games
- Edit your reviews
- Delete your reviews
- View Profile page, display username and board games in collection
  - Can start your own collection and add board games to it
