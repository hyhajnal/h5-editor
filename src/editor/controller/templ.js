const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  // 新建模版
  async addAction() {
    const templ = this.post();
    const id = await this.model('Templ').add({...templ, useCount: 1});
    const newTempl = await this.model('Templ')
      .where({id}).find();
    await this.model('ResourceUse').add({
      resourceId: id,
      pageId: templ.pageId,
      type: 2
    });
    this.success(newTempl);
  }
};
