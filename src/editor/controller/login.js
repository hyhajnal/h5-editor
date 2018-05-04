const Base = require('./base.js');

module.exports = class extends Base {
  async loginAction() {
    const { name, psd } = this.post('user');
    const user = await this.model('User')
      .where({name, psd}).find();
    think.logger.info(user);
    if (user.id) {
      await this.session('user', user);
      return this.success(user);
    } else {
      return this.fail('用户不存在或密码错误');
    }
  }

  async registerAction() {
    const user = this.post('user');
    const u = await this.model('User')
      .where({name: user.name}).find();
    if (u.id) {
      this.fail('用户昵称已存在，请重新填写！');
    } else {
      const userId = await this.model('User').add(user);
      const nUser = await this.model(' User').where({id: userId}).find();
      this.success(nUser);
    }
  }

  async logoutAction() {
    await this.session(null);
    this.success('退出成功！');
  }
};
