# conectar

#Deployment

> > ` Heroku login` - this is a command
> > #By sending the above command in the same folder in terminal (CLI) you will be asked for login in web browser
>
> > Create a build script
> > ` "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"`
>
> > Then in CLI/terminal send the below command - This will create a app inside heroku app.
> > `heroku create`
> > Go to the dashboad of heroku web application
> > Click on deploy option
> > Copy the command under the `create a new git repository` i.e. heroku git:remote -a dry-lowlands-19069
> > Then send a command as `git push heroku master ` - this command will push all the repository to the server and it runs the `heroku-postbuild` command itself automatically

Sending the command `heroku open` will open the url in browser
