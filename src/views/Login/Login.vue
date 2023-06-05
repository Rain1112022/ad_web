<template>
  <div class="login-container">
    <div class="login-box">
      <div class="title-container">
        <h3 class="title">{{ title }}</h3>
      </div>
      <el-form
        ref="accountLoginForm"
        :model="accountForm"
        :rules="accountFormRules"
        :inline-message="true"
      >
        <el-form-item prop="username">
          <el-input
            v-model="accountForm.username"
            placeholder="请输入用户名"
            autocomplete="on"
            type="text"
            tabindex="1"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="accountForm.password"
            placeholder="请输入密码"
            autocomplete="on"
            show-password
            clearable
            @keyup.enter="onLogin"
            name="password"
            tabindex="2"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">记住密码</el-checkbox>
        </el-form-item>
      </el-form>

      <el-button
        :loading="loading"
        type="primary"
        @click="onLogin"
        style="width: 100%; margin-bottom: 30px; letter-spacing: 10px"
        @keyup.enter="onLogin"
        >登 录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
const router = useRouter();
const userStore = useUserStore();
const title = ref('RK平台管理系统');
const loading = ref(false);
const checked = ref(false);
const accountLoginForm = ref();

const accountFormRules = {
  username: [{ required: true, trigger: 'blur', message: '请填写用户名' }],
  password: [{ required: true, trigger: 'change', message: '请填写密码' }],
};
const accountForm = reactive({
  username: 'admin',
  password: '111111',
});

onMounted(() => {
  accountForm.username = localStorage.getItem('username')
    ? localStorage.getItem('username')
    : 'admin';
  accountForm.password = localStorage.getItem('password')
    ? localStorage.getItem('password')
    : '111111';
});

function onLogin() {
  if (!accountLoginForm?.value) return;
  accountLoginForm.value.validate((valid: boolean) => {
    if (valid) {
      if (checked.value) {
        localStorage.setItem('username', accountForm.username);
        localStorage.setItem('password', accountForm.password);
      } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }
      userStore.login(accountForm).then(() => {
        router.push('/');
      });
    }
  });
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
$defaultColor: #a5a5a5;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-box {
    width: 420px;
    max-width: 100%;
    padding: 20px;
    // margin: 0 auto;
    overflow: hidden;
    border: 1px solid transparent;
    border-radius: 15px;
    box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.1);
  }

  .title-container {
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.el-dialog__footer {
  text-align: center;
}
</style>
