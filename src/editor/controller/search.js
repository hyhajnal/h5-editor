const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  async modulesAction() {
    const page = parseInt(this.get('page'));
    const list = await this.model('Module')
      .where().order('created DESC')
      .page(page, 11).select();
    const total = await this.model('Module').count('id');
    this.success({
      list, total
    });
  }

  async projectsAction() {
    const page = parseInt(this.get('page'));
    const { tag, keyword, sort } = this.get();
    let params = {};
    if (tag !== '全部') {
      params = { tag };
    }
    if (keyword && keyword.charCodeAt() !== 39) {
      params = { ...params, name: ['like', `%${keyword}%`] };
    }
    think.logger.debug(params);
    const list = await this.model('Project')
      .where(params).order(`${sort} DESC`)
      .page(page, 11).select();
    const total = await this.model('Project').where(params).count('id');
    this.success({
      list, total
    });
  }

  async pagesAction() {
    const page = parseInt(this.get('page'));
    const list = await this.model('Page')
      .where().order('created DESC')
      .page(page, 11).select();
    const total = await this.model('Page').count('id');
    this.success({
      list, total
    });
  }

  async compsAction() {
    const page = parseInt(this.get('page'));
    const { tag, keyword, sort } = this.get();
    let params = {};
    if (tag !== '全部') {
      params = { tag };
    }
    if (keyword && keyword.charCodeAt() !== 39) {
      params = { ...params, name: ['like', `%${keyword}%`] };
    }
    const list = await this.model('Comp')
      .where(params).order(`${sort} DESC`)
      .page(page, 11).select();
    const total = await this.model('Comp').where(params).count('id');
    this.success({
      list, total
    });
  }

  async templsAction() {
    const page = parseInt(this.get('page'));
    const { tag, keyword, sort } = this.get();
    let params = {};
    if (tag !== '全部') {
      params = { tag };
    }
    if (keyword && keyword.charCodeAt() !== 39) {
      params = { ...params, name: ['like', `%${keyword}%`] };
    }
    const list = await this.model('Templ')
      .where(params).order(`${sort} DESC`)
      .page(page, 11).select();
    const total = await this.model('Templ').where(params).count('id');
    this.success({
      list, total
    });
  }
};
