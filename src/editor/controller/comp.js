const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  async addAction() {
    const { name } = await this.session('user');
    const comp = this.post('data');
    const page = parseInt(this.post('page'));
    try {
      await this.model('Comp').add({...comp, owner: name});
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
    const id = parseInt(this.get('id'));
    await this.model('Comp').where({id}).delete();
    await this.model('ResourceUse').where({
      resourceId: id,
      type: 1
    }).delete();
    this.success(null, '删除成功');
  }

  async editAction() {
    const comp = this.post('data');
    const id = parseInt(this.post('id'));
    try {
      await this.model('Comp').where({id}).update(comp);
      this.success({ id, ...comp }, '新建成功');
    } catch (e) {
      think.logger.error(e);
      this.fail('新建失败');
    }
  }
};
