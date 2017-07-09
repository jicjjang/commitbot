# commitbot
Github commitbot for dooray messenger in NHN

# Install
~~~bash
$ npm install --save commitbot
# or
$ git clone https://github.com/jicjjang/commitbot
$ npm install
~~~

# Usage

~~~javascript
const commitbot = require('commitbot');

/**
 * @param commitbot
 */
 (function (commitbot) {
   const arr = ['jicjjang', 'blahblah'];

   let result = {};
   Promise.all(
     arr.map((id) => {
       return commitbot.checkTodayCommit(id).then(res => {
         result[id] = res;
       })
     })
   ).then(() => {
     console.log(result);
     return result;
     // Something to everythings.
   });
 })(commitbot);
~~~

You should be reference this

~~~bash
$ npm test
~~~
