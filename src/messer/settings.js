const fs = require("fs");

const DEFAULT_SETTINGS = {
  SHOW_TYPING: false,
  SHOW_READ: false,
};

let _settings = undefined;
module.exports = {
  list() {
    if (_settings) return _settings;

    try {
      _settings = JSON.parse(fs.readFileSync(process.env.SETTINGS_FILEPATH));
    } catch (e) {
      _settings = DEFAULT_SETTINGS;
    }

    return _settings;
  },
  get(key) {
    const _list = this.list();
    const val = _list[key];

    return val;
  },
  set(key, value) {
    return new Promise((resolve, reject) => {
      const _list = this.list();
      _list[key] = value;

      return fs.writeFile(
        process.env.SETTINGS_FILEPATH,
        JSON.stringify(_list),
        err => {
          if (err) return reject(err);

          _settings = _list;
          return resolve(_settings);
        },
      );
    });
  },
};
