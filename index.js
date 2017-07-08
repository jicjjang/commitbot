const request = require('request');
const dateFormat = require('dateformat');

module.exports = {
  _cDate: new Date(),
  _cYear: dateFormat(this._cDate, "yyyy"),
  _cMonth: dateFormat(this._cDate, "mm"),
  _cDay: dateFormat(this._cDate, "dd"),
  getUserRepos: function (id, cb) {
    request({
      uri: 'https://api.github.com/users/' + id + '/repos',
      method: 'GET',
      headers: {
        'User-Agent': 'request'
      }
    }, 'https://api.github.com/users/' + id + '/repos', (err, res, body) => {
      if (!err && res.statusCode == 200) {
        cb(JSON.parse(body));
      } else {
        console.log(err);
      }
    })
  },
  checkTodayCommit: function (id, cb) {
    this.getUserRepos(id, (res) => {
      res.map((repo) => {
        const rDate = repo.pushed_at;
        const rYear = dateFormat(rDate, "yyyy");
        const rMonth = dateFormat(rDate, "mm");
        const rDay = dateFormat(rDate, "dd");
        // const rHour = dateFormat(rDate, "HH");

        if (this._cYear === rYear && this._cMonth === rMonth && this._cDay === rDay) {
          cb(true);
        }
        // console.log(dateFormat(rDate, "yyyy-mm-dd HH:MM:ss"));
      })
      cb(false);
      // console.log(dateFormat(this._cDate, "yyyy-mm-dd'T'hh:MM:ss"));
    })
  }
};
