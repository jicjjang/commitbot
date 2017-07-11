const rp = require('request-promise');
const dateFormat = require('dateformat');

module.exports = {
  getUserRepos: function (id) {
    return rp({
      uri: 'https://api.github.com/users/' + id + '/repos',
      method: 'GET',
      headers: {
        'User-Agent': 'Request-Promise',
        'Cache-Control': 'max-age=0, private, must-revalidate'
      }
    }).then(res => {
      return JSON.parse(res);
    }).catch(err => {
      return null;
    });
  },
  checkTodayCommit: function (id) {
    let status = false;
    return this.getUserRepos(id).then(res => {
      res.map((repo) => {
        const rDate = repo.pushed_at;
        const today = new Date();
        
        if (dateFormat(today, 'yyyy') === dateFormat(rDate, 'yyyy')
          && dateFormat(today, 'mm') === dateFormat(rDate, 'mm')
          && dateFormat(today, 'dd') === dateFormat(rDate, 'dd')) {
          status = true;
        }
      });
      return status;
    });
  }
};
