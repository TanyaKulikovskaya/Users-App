<template>
  <main class="container">
    <div class="form-wrapper">
      <h1 class="form-wrapper__title">Welcome back!</h1>
      <form class="form" @submit.prevent="logIn">
        <div class="form__fields">
          <div class="form-field">
            <label for="username" class="form__label">Username</label>
            <input
              id="username"
              type="text"
              v-model="username"
              class="form__input"
              @blur="v$.username.$touch"
            />
            <span v-if="v$.username.$error" class="error form__error">
              Username field is required.
            </span>
          </div>
          <div class="form-field">
            <label for="password" class="form__label">Password</label>
            <input
              id="password"
              type="password"
              v-model="password"
              class="form__input"
              @blur="v$.password.$touch"
            />
            <span v-if="v$.password.$error" class="error form__error">
              Password field is required.
            </span>
          </div>
        </div>
        <div class="form-field">
          <button
            type="submit"
            class="btn form__btn"
            :disabled="v$.$errors.length"
          >
            Login
          </button>
          <span v-show="errorMsg" class="error form__error">{{
            errorMsg
          }}</span>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      username: "",
      password: "",
    };
  },
  validations() {
    return {
      username: { required },
      password: { required },
    };
  },
  computed: {
    ...mapGetters({
      errorMsg: "auth/errorMessage",
    }),
  },
  methods: {
    ...mapActions({
      signIn: "auth/login",
    }),
    async logIn() {
      const result = await this.v$.$validate();
      if (!result) {
        return;
      }
      const data = {
        username: this.username,
        password: this.password,
      };
      this.signIn(data);
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
      display: block;
      width: 100%;
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
    &__error {
      display: block;
      width: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
      font-size: 14px;
      line-height: 24px;
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
      &:disabled {
        background-color: transparent;
        color: $dark;
        border-color: $dark;
        pointer-events: none;
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
