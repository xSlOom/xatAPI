#Xat API

<p>So I decided to create something like a "module" for NODEJS where it has some functions that you can use. If the document isn't enough for you, feel free to open an issue and i'll explain you more about.</p>
<p>More functions will come later! If you have any ideas of functions related to Xat, feel free to tell me them.</p>

<h1>What does it has?</h1>

<p>Here are the available functions from this "module" :</p>

<ul>
    <li>Get a Xat Regname via ID</li>
    <li>Get a Xat ID via Regname</li>
    <li>Get a chat informations</li>
</ul>

<h1>How to use it?</h1>
First, you will have to install all needed modules to have it working but before you need to have <a href="https://nodejs.org/en/">NodeJS</a> and <a href="https://www.npmjs.com/">NPM</a> installed on your computer.
```
npm install
```
After that, you will have to include the module named "xat.js" on the beginning of your file like that:
```
var xat = require('xatlib');
```

If for example, you want to use the function "getID", your code should look like that: 
```
var xat = require('xatlib');

xat.getID('xSlOom', function(response) {
    console.log(response);
});
```
If you want to see if it works, just run the cmd : 
```
node YourFileName.js
```
The output of this example must be "10000070".

<h1>How to use other functions?</h1>
Well, on my previous comment, i'm using the object "xat", which is the object to call each functions from xat.js.
You just have to call again "xat" + the function name.
```
Example : 
xat.FunctionName(your arg, function(response) {
    // show the response from the function
});
```
<h1>Questions</h1>
"The module doesn't work." - Follow an example an try again. (Module has been tested several times and it works.)
<h1>Credits</h1>
<ul>
    <li><a href="http://xat.com/">Xat.com</a> - for their API.</li>
</ul>

<h1>Updates:</h1>
<p>Last update: 02/13/2017</p>
