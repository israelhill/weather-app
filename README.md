Note: 
    To actually see emails sent, if you have a gmail account, you can pass your email and 
    password as env variables. These variables will be used in weather-app/server/mailer.js
    to send emails. You will need to enable 'Less Secure Apps' on your gmail account by visiting:
    https://myaccount.google.com/lesssecureapps and granting access.

    I also left my openweatherapi API Key as a hard coded value (Edit: removed hardcoded value since emailing executables is blocked by gmail and I have to post the code on github) so that you do not have to request a new key. If you do decide to request your own key, you can pass it as an env variable: API_KEY=your_key when starting the express server (Provided Matt with key). With a little more work, these env variables could be stored in a .env file, but since there are only at max 4, I decided this was not neccessary.


# INSTALLATION
Install Node dependencies:
    1. Install NodeJS (v7+). Many ways to do this: download online, instlal using homebrew, etc
    2. $ cd weather-app && npm i
    3. $ cd weather-app/client && npm i

Install DB dependencies:
    1. Install and start mysql (many ways to do this):
        $ brew update
        $ brew isntall mysql
        $ brew services start mysql
    2. Install knex (handles db migrations) globally
        $ npm i knex -g

Create database:
    First, you may want to change the root password to 'root' so you can pass
    one less env var to the npm run server command.
    Run the mysql CLI and switch to mysql db.
        $ mysql -u root -p
            > use mysql;
            > SET PASSWORD FOR 'root'@'localhost' = PASSWORD('root');
            > FLUSH PRIVILEGES;
            > quit;
    Log back into the mysql CLI and create the weather app database:
        $ mysql -u root -p root
            > CREATE DATABASE WeatherApp;
            > USE WeatherApp;
            > quit;
    We will use Knex to create the database table for us. I created a migrations file located at
    weather-app/server/migrations. To create the Subscription table, run:
        $ cd server && knex migrate:latest;


Now that all dependencies are installed and the database has been created, we can run the app.


# RUN
To run the application you need to start 2 servers:
    1. the local dev server to serve the the web page
    2. the local express server that hosts the REST endpoints and talks to the database.

    Note: in a prod env, we could use npm run build to bundle the app into minified files and have the static files served from our express server on the standard http port 80.


    1. From ./weather-app:
        $ npm run client
    2. In a new terminal tab, from ./weather-app:
        $ EMAIL=<email> EMAIL_PSWD=<email_pswd> API_KEY=<api_key> npm run server

        If you created your db using a password other than 'root', you will need to pass
        a third env variable to this command called DB_PSWD.


#RUN NEWSLETTER JOB
To run the newletter job -- from /weahter-app:
    $ EMAIL=email EMAIL_PSWD=email_pswd API_KEY=api_key npm run job


