const rp = require('request-promise');
const dateFormat = require('dateformat');

module.exports = {
  _cDate: new Date(),
  _cYear: dateFormat(this._cDate, "yyyy"),
  _cMonth: dateFormat(this._cDate, "mm"),
  _cDay: dateFormat(this._cDate, "dd"),
  getUserRepos: function (id) {
    return rp({
      uri: 'https://api.github.com/users/' + id + '/repos',
      method: 'GET',
      headers: {
        'User-Agent': 'Request-Promise'
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
        const rYear = dateFormat(rDate, "yyyy");
        const rMonth = dateFormat(rDate, "mm");
        const rDay = dateFormat(rDate, "dd");
        // const rHour = dateFormat(rDate, "HH");

        if (this._cYear === rYear && this._cMonth === rMonth && this._cDay === rDay) {
          status = !status;
        }
      });
      return status;
    });
  }
};
