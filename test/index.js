const gitbot = require('../index');

gitbot.getUserRepos('jicjjang', (res) => {
  // console.log(res[0]);
});

gitbot.checkTodayCommit('jicjjang', (res) => {
  // console.log(res);
});
