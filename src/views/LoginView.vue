<template>
  <main class="container">
    <div class="form-wrapper">
      <h1 class="form-wrapper__title">Welcome back!</h1>
      <form class="form" @submit.prevent="logIn">
        <div class="form__fields">
          <div class="form-field">
            <label for="username" class="form__label">E-mail</label>
            <input
              id="username"
              type="text"
              v-model="username"
              class="form__input"
            />
          </div>
          <div class="form-field">
            <label for="password" class="form__label">Password</label>
            <input
              id="password"
              type="password"
              v-model="password"
              class="form__input"
            />
          </div>
        </div>
        <button type="submit" class="btn form__btn">Login</button>
      </form>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions({
      signIn: "auth/login",
    }),
    logIn() {
      const data = {
        username: this.username,
        password: this.password,
      };
      this.signIn(data);
      this.resetForm();
    },
    resetForm() {
      this.username = "";
      this.password = "";
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  height: 100vh;
}
.form-wrapper {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 510px;
  width: 100%;
  background-color: $white;
  border-radius: $radius;
  padding: 40px 0 60px;
  &__title {
    font-weight: 500;
    font-size: 22px;
    line-height: 28px;
    margin-bottom: 20px;
  }
  .form {
    max-width: 334px;
    margin: 0 auto;
    &__fields {
      margin-bottom: 16px;
    }
    .form-field {
      position: relative;
      padding-bottom: 24px;
    }
    &__label {
      font-size: 16px;
      line-height: 22px;
      text-align: left;
      padding-left: 6px;
      color: $gray;
    }
    &__input {
      height: 48px;
      padding: 12px 15px;
      font-size: 20px;
      line-height: 24px;
      border-color: $gray;
      border-style: solid;
      border-width: 1px;
      border-radius: $radius;
      color: $dark;
      &:focus {
        border-color: $blue;
      }
    }
    &__btn {
      min-width: 176px;
      border-radius: $radius;
      border-color: $blue;
      border-style: solid;
      border-width: 1px;
      background-color: $cian;
      color: $blue;
      &:hover {
        background-color: $blue;
        color: $white;
      }
    }
  }
}
@media screen and (max-width: 576px) {
  .form-wrapper {
    max-width: 90%;
    .form {
      max-width: 100%;
      padding-left: 12px;
      padding-right: 12px;
    }
  }
}
</style>
