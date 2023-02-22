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
              v-model.trim="username"
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
              v-model.trim="password"
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
          <span v-show="errorMsg" class="error form__error">
            {{ errorMsg }}
        </span>
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
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
