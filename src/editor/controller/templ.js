const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  // 新建模版
  async addAction() {
    const templ = this.post();
    const { name } = await this.session('user');
    const templId = await this.model('Templ').add({...templ, useCount: 1, owner: name});
    const newTempl = await this.model('Templ')
      .where({id: templId}).find();
    await this.model('ResourceUse').add({
      resourceId: templId,
      pageId: templ.pageId,
      type: 2
    });
    this.success(newTempl);
  }
};
