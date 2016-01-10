
****HOW TO CREATE NODE JS COMMAND LINE UTILITY****
1:Step
Make directory and initialize node app
$ mkdir cliapp
$ cd cliapp
/cliapp$ npm init     //produce package.json, which describes app properties

2: Step
Add two important fields to package.json which describes CLI app.
"preferGlobal": true,  //this app should be installed global
"bin":{
	"cliapp":"./cliapp.js"    //point to executable file which links to command "cliapp"
}

3:step
Create executable file
create a file name cliapp.js in app  directory
since it is CLI app first line must be
#!/usr/bin/env node

console.log("mambo Dunia");  //to test app

4:Step
Link app to npm so that can run locally
/cliapp$ sudo npm link

NB:
Now you should be able to run app locally with command "cliapp"