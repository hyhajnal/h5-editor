<template>
  <div class="login-reg-wrap">
    <div class="login-box">
      <h1> H5 Editor </h1>
      <form action="https://httpbin.org/post" method="POST" class="form login">

        <div class="form-field">
          <i class="iconfont icon-user"></i>
          <input id="login__username" type="text" name="username" class="form__input" placeholder="用户名" required>
        </div>

        <div class="form-field">
          <i class="iconfont icon-password"></i>
          <input id="login__password" type="password" name="password" class="form__input" placeholder="密码" required>
        </div>

        <el-button type="danger" class="submit">登录</el-button>

      </form>
      <p class="text--center">还没有账号? <a href="#">马上注册</a></p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">


.login-reg-wrap {
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #2c3338;
  color: #606468;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-size: 0.875rem;
  font-weight: 400;
  height: 100%;
  line-height: 1.5;
  margin: 0;
  min-height: 100vh;
}

h1 {
  text-align: center;
  color: $themeColor;
  margin: 20px;
}


.login-box {
  margin: auto;
  width: 400px;
  background: #fff;
  padding: 20px 40px;
  box-shadow: 0 1px 3px rgba(26,26,26,.1);
  border-radius: 4px;
}



.iconfont {
  display: inline-block;
  color: #606468;
  font-size: 16px;
  padding: 8px;
}

.submit {
  width: 100%;
  margin-bottom: 20px;
}


a {
  color: $themeColor;
  outline: 0;
  text-decoration: none;
}



input {
  background-image: none;
  border: 0;
  outline: 0;
  color: #606468;
  transition: background-color 0.3s;
}

input[type='submit'] {
  cursor: pointer;
}

.form input[type='password'],
.form input[type='text'],
.form input[type='submit'] {
  width: 100%;
}

.form-field {
  display: flex;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form__input {
  flex: 1;
}


.login {
  color: #eee;
}

.login label,
.login input[type='text'],
.login input[type='password'],
.login input[type='submit'] {
  border-radius: 2px;
  padding: 10 10px 10px 5px;
}

.login input[type='password'],
.login input[type='text'] {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}


/* modules/text.css */

p {
  margin-bottom: 24px;
}

.text--center {
  text-align: center;
}
</style>
