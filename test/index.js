const commitbot = require('../index');

commitbot.getUserRepos('jicjjang', (res) => {
  // console.log(res[0]);
});

(function (commitbot) {
  const arr = ['jicjjang', 'wan2land'];

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
  });
})(commitbot);
