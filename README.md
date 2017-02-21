#Xat API

<p>So I decided to create something like a "module" for NODEJS where it has some functions that you can use. If the document isn't enough for you, feel free to open an issue and i'll explain you more about.</p>
<p>More functions will come later! If you have any ideas of functions related to Xat, feel free to tell me them.</p>

<h1>What does it has?</h1>

<p>Here are the available functions from this "module" :</p>

<ul>
    <li>Get a Xat Regname via ID</li>
    <li>Get a Xat ID via Regname</li>
    <li>Get a chat informations</li>
    <li>Get new power informations</li>
    <li>Get chat connection informations (for bots or more)</li>
    <li>Get new user informations (userid, k1, k2 from auser3.php)</li>
</ul>

<h1>How to use it?</h1>
First, you will have to install all needed modules to have it working but before you need to have <a href="https://nodejs.org/en/">NodeJS</a> and <a href="https://www.npmjs.com/">NPM</a> installed on your computer.
```
npm install
```
After that, you will have to include the module named "xatlib" on the beginning of your file like that:
```
var xat = require('xatapi');
```

If for example, you want to use the function "getID", your code should look like that: 
```
var xat = require('xatapi');

xat.getID('xSlOom', (err, res) => {
    if (err !== null) {
        console.log("error! : " + err);
    } else {
        console.log(res);
    }    
});
```
If you want to see if it works, just run the cmd : 
```
node YourFileName.js
```
The output of this example must be "10000070".

<h1>How to use other functions?</h1>
Well, on my previous comment, i'm using the object "xat", which is the object to call each functions from xatlib.
You just have to call again "xat" + the function name.
```
Example : 
xat.FunctionName(your arg, (err, res) => {
    // show the response from the function
});
```
If 'err' (variable for error) is null, it will show a result (res), otherwise it's an error.
<h1>Questions</h1>
"The module doesn't work." - Follow and example an try again. (Module has been tested several times and it works.)<br /><br />
Otherwise, open a new issue.
<h1>Credits</h1>
<ul>
    <li><a href="http://xat.com/">Xat.com</a> - for their API. (Otherwise, this library wouldn't exist.)</li>
    <li><a href="https://github.com/Huumanoid">Huumanoid</a> - For his help.
</ul>

<h1>Updates:</h1>
<p>You are now able to use it according to some feedbacks, it should working fine.</p>
<p>Last update: 02/20/2017</p>
