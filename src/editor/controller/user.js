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

  async indexAction() {
    const { id } = await this.session('user');
    // 我发起的项目
    const ownProjects = await this.model('Project')
      .alias('p').join({
        table: 'user',
        join: 'left',
        as: 'u',
        on: ['id', 'otherId']
      }).where({
        'u.userId': id,
        'u.role': 3,
        'u.type': 0
      }).select();

    // 我参与的项目
    const joinProjects = await this.model('Project')
      .alias('p').join({
        table: 'user',
        join: 'left',
        as: 'u',
        on: ['id', 'otherId']
      }).where({
        'u.userId': id,
        'u.type': 0
      }).select();

    // 我收藏的项目
    const collectProjects = await this.model('Project')
      .alias('p').join({
        table: 'user',
        join: 'left',
        as: 'c',
        on: ['id', 'otherId']
      }).where({
        'u.userId': id,
        'u.type': 0
      }).select();

    // 我收藏的模版
    const collectTempls = await this.model('Templ')
      .alias('t').join({
        table: 'user',
        join: 'left',
        as: 'c',
        on: ['id', 'otherId']
      }).where({
        'u.userId': id,
        'u.type': 0
      }).select();

    // 我收藏的组件
    const collectComps = await this.model('Comp')
      .alias('comp').join({
        table: 'user',
        join: 'left',
        as: 'c',
        on: ['id', 'otherId']
      }).where({
        'u.userId': id,
        'u.type': 0
      }).select();

    // 我的模块
    const mods = await this.model('Module').where({ owner: id }).select();

    // 我的组件
    const comps = await this.model('Comp').where({ owner: id }).select();

    // 我的模版
    const templs = await this.model('Templ').where({ owner: id }).select();

    this.success({
      projects: [ownProjects, joinProjects, collectProjects],
      mods,
      comps: [comps, collectComps],
      templs: [templs, collectTempls]
    });
  }
};
