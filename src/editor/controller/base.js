module.exports = class extends think.Controller {
  async __before() {
    const method = this.method.toLowerCase();
    if (method === 'options') {
      this.setCorsHeader();
      this.status = 204;
      return false;
    }
    this.setCorsHeader();
  }
  setCorsHeader() {
    this.header('Access-Control-Allow-Origin', '*');
    this.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    this.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    this.header('Access-Control-Allow-Credentials', true);
  }
};
