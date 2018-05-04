const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  async addAction() {
    const comp = this.post('data');
    comp.config = JSON.stringify(comp.content);
    const page = parseInt(this.post('page'));
    try {
      await this.model('Comp').add(comp);
      const list = await this.model('Comp')
        .where().order('created DESC')
        .page(page, 11).select();
      const total = await this.model('Comp').count('id');
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