const Base = require('./base.js');

module.exports = class extends Base {
  async __before() {
    // 检测是否登录
    const user = await this.session('user');
    think.logger.debug(user);
    if (!user) {
      this.status = 403;
      return false;
    }
  }

  indexAction() {
    return this.display();
  }

  async addAction() {
    const project = this.post('data');
    const page = parseInt(this.post('page'));
    const { name } = await this.session('user');
    try {
      const projectId = await this.model('Project').add({
        ...project,
        ownerName: name
      });
      await this.model('Relation').add({
        user: name,
        otherId: projectId,
        role: 3
      });
      const list = await this.model('Project')
        .where().order('created DESC')
        .page(page, 11).select();
      const total = await this.model('Project').count('id');
      this.success({ list, total }, '新建成功');
    } catch (e) {
      think.logger.error(e);
      this.fail('新建失败');
    }
  }

  async detailAction() {
    const id = parseInt(this.get('id'));
    const page = parseInt(this.get('page'));
    const project = await this.model('Project').where({id}).find();
    const list = await this.model('Page')
      .where({projectId: id})
      .order('created DESC')
      .page(page, 11).select();
    const total = await this.model('Page').where({projectId: id}).count('id');
    this.success({
      project, list, total
    });
  }

  /**
   * 获取该project的pages列表
   */
  async getPagesAction() {
    const id = parseInt(this.get('id'));
    const list = await this.model('Page')
      .where({projectId: id})
      .order('created DESC').select();
    this.success(list);
  }
};
