const Base = require('./base.js');
const fs = require('fs');
const path = require('path');
const rename = think.promisify(fs.rename, fs);

module.exports = class extends Base {
  async uploadAction() {
    const file = this.file('image');
    if (file) {
      const name = think.uuid();
      const suffix = file.type.split('/')[1];
      think.logger.debug(`name:${name},suffix:${suffix}`);
      const filepath = path.join(think.ROOT_PATH, `www/static/upload/${name}.${suffix}`);
      think.mkdir(path.dirname(filepath));
      await rename(file.path, filepath);
      this.success(`${name}.${suffix}`);
    }
  }
};
