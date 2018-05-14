const Base = require('./base.js');
const fs = require('fs');
const path = require('path');
const rename = think.promisify(fs.rename, fs);
const unlink = think.promisify(fs.unlink, fs);

module.exports = class extends Base {
  async uploadAction() {
    const file = this.file('image');
    const pageId = parseInt(this.post('pageId'));
    if (file) {
      const name = think.uuid();
      const suffix = file.type.split('/')[1];
      think.logger.debug(`name:${name},suffix:${suffix}`);
      const filepath = path.join(think.ROOT_PATH, `www/static/upload/${name}.${suffix}`);
      think.mkdir(path.dirname(filepath));
      await rename(file.path, filepath);

      const id = await this.model('Image').add({
        url: `${name}.${suffix}`,
        pageId
      });

      this.success({
        id, url: `${name}.${suffix}`, pageId
      });
    }
  }

  async delAction() {
    const id = parseInt(this.get('id'));
    const url = this.get('url');
    await unlink(path.join(think.ROOT_PATH, `www/static/upload/${url}`));
    await this.model('Image').where({id}).delete();
    this.success(null, '删除成功');
  }
};
