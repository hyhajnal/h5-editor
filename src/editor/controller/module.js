const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  async addAction() {
    const { name } = await this.session('user');
    const moduleNew = this.post('module');
    const page = parseInt(this.post('page'));
    try {
      await this.model('Module').add({...moduleNew, owner: name});
      const list = await this.model('Module')
        .where().order('created DESC')
        .page(page, 11).select();
      const total = await this.model('Module').count('id');
      this.success({ list, total }, '新建成功');
    } catch (e) {
      think.logger.error(e);
      this.fail('新建失败');
    }
  }

  async detailAction() {
    const id = parseInt(this.get('id'));
    const mod = await this.model('Module').where({id}).find();
    this.success(mod);
  }

  async delAction() {

  }

  async editAction() {
    const moduleEdit = this.post();
    try {
      await this.model('Module').where({id: moduleEdit.id})
        .update(moduleEdit);
      this.success(null, '新建成功');
    } catch (e) {
      think.logger.error(e);
      this.fail('新建失败');
    }
  }
};
