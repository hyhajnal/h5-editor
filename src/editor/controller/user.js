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
    const { name } = await this.session('user');
    // 我发起的项目
    const ownProjects = await this.model('Project')
      .field('p.*')
      .alias('p').join({
        table: 'relation',
        join: 'left',
        as: 'r',
        on: ['id', 'otherId']
      }).where({
        'r.user': name,
        'r.role': 3
      }).select();

    // 我参与的项目
    const joinProjects = await this.model('Project')
      .field('p.*')
      .alias('p').join({
        table: 'relation',
        join: 'left',
        as: 'r',
        on: ['id', 'otherId']
      }).where({
        'r.user': name
      }).select();

    // 我收藏的项目
    const collectProjects = await this.model('Project')
      .field('p.*')
      .alias('p').join({
        table: 'collect',
        join: 'left',
        as: 'c',
        on: ['id', 'otherId']
      }).where({
        'c.user': name,
        'c.type': 0
      }).select();

    // 我收藏的模版
    const collectTempls = await this.model('Templ')
      .field('t.*')
      .alias('t').join({
        table: 'collect',
        join: 'left',
        as: 'c',
        on: ['id', 'otherId']
      }).where({
        'c.user': name,
        'c.type': 1
      }).select();

    // 我收藏的组件
    const collectComps = await this.model('Comp')
      .field('comp.*')
      .alias('comp').join({
        table: 'collect',
        join: 'left',
        as: 'c',
        on: ['id', 'otherId']
      }).where({
        'c.user': name,
        'c.type': 2
      }).select();

    // 我的模块
    const mods = await this.model('Module').where({ developer: name }).select();

    // 我的组件
    const comps = await this.model('Comp').where({ owner: name }).select();

    // 我的模版
    const templs = await this.model('Templ').where({ owner: name }).select();

    this.success({
      projects: [ownProjects, joinProjects, collectProjects],
      mods: [mods],
      comps: [comps, collectComps],
      templs: [templs, collectTempls]
    });
  }
};
