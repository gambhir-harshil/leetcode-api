## Roadmap

### UI

-  **Login and Regsiter pages**
    - [ ] Design the UI
-  **Home Page**
    - [ ]  Home Page with all the stats of the user.
    - [ ]  A sidebar component of leaderboard.
    - [ ]  A chart showing the trends of the number of submissions made by the user in the past 10 days.
    - [ ]  Navbar having the links for Practice and Leaderboard section. (Navbar would be same throughout the application)
- **Leader Board**
    - [ ]  A leaderboard table with with just the rank and number of easy, medium, hard questions and a heatgraph for 10 days
    - [ ]  Rest of the user stats will be available on the user-stats page (home page for now)
- **Game UI**
    - [ ]  The UI with levels and popups linked to docs
    - [ ]  UI for each level
- ************Level UI************
    - [ ]  A sidebar component showing Friend’s progress (not discussed yet, could be scrapped)
    - [ ]  Related topics to the question.
    - [ ]  Best Time and space complexity for the problem.
- [ ]  **Admin panel**
- [ ]  Mobile Design

### Frontend

- [ ]  User Auth
- ****************Homepage****************
    - [ ]  Make a request to leetcode api and fetch the user stats
    - [ ]  Display the user stats on the home page
    - [ ]  Display the ranking of the users in the leaderboard component
    - [ ]  Integrate chartJs to show the trend of the submissions
- [ ]  ********************************************************Implement the leaderboard UI********************************************************
- ****************Game UI****************
    - [ ]  ******************************************Implement the game UI******************************************
    - [ ]  Track and Display user’s progress.
- [ ]  Implement the Level UI
- [ ]  Implement the Admin Panel
- [ ]  Responsive

### Backend

- **Setup the Database**
    - [ ]  Collection of username, email, password
    - [ ]  Collection of user’s progress
- [ ]  User Auth
- [ ]  Create API endpoints to fetch leetcode user data
- [ ]  Implement CRUD operations