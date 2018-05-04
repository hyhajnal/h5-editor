const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  async addAction() {
    const pageNew = this.post('data');
    const page = parseInt(this.post('page'));
    const projectId = pageNew.projectId;
    try {
      await this.model('Page').add({...pageNew, background: '#fff'});
      const list = await this.model('Page')
        .where({projectId}).order('created DESC')
        .page(page, 11).select();
      const total = await this.model('Page').where({projectId}).count('id');
      this.success({ list, total }, '新建成功');
    } catch (e) {
      think.logger.error(e);
      this.fail('新建失败');
    }
  }

  async detailAction() {
    const id = parseInt(this.get('id'));
    const page = await this.model('Page').where({id}).find();
    const mods = await this.model('Module')
      .where({pageId: id}).select();
    const templs = await this.model('Templ')
      .alias('t').join({
        table: 'ResourceUse',
        join: 'left',
        as: 'r',
        on: ['id', 'resourceId']
      }).where({
        'r.pageId': id,
        'r.type': 2
      }).select();

    const components = await this.model('Comp')
      .alias('c').join({
        table: 'ResourceUse',
        join: 'left',
        as: 'r',
        on: ['id', 'resourceId']
      }).where({
        'r.pageId': id,
        'r.type': 1
      }).select();
    this.success({...page, modules: mods, templs, components});
  }

  async delAction() {

  }

  // 为页面添加资源
  async addResourceAction() {
    const { pageId, resourceId, type } = this.get();
    const record = await this.model('ResourceUse').where({
      resourceId,
      pageId,
      type
    }).find();
    if (record.id) {
      return this.fail('该模块已被添加！');
    } else {
      await this.model('ResourceUse').add({
        resourceId,
        pageId,
        type
      });
      const modelName = type === 1 ? 'Comp' : 'Templ';
      await this.model(modelName).where({id: resourceId}).increment('useCount', 1);
      this.success('添加成功');
    }
  }

  // 为页面移除资源
  async removeResourceAction() {
    const { pageId, resourceId, type } = this.get();
    await this.model('ResourceUse').where({
      resourceId,
      pageId,
      type
    }).delete();
    const modelName = type === 1 ? 'Comp' : 'Templ';
    await this.model(modelName).where({id: resourceId}).decrement('useCount', 1);
    this.success('移除成功');
  }

  async editAction() {
    const pageEdit = this.post();
    try {
      await this.model('Page').where({id: pageEdit.id})
        .update(pageEdit);
      this.success(null, '新建成功');
    } catch (e) {
      think.logger.error(e);
      this.fail('新建失败');
    }
  }
};
