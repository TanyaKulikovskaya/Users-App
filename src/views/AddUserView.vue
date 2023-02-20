<template>
  <the-header />
  <main class="container">
    <div class="form-wrapper">
      <h1 class="form-wrapper__title">New user</h1>
      <form class="form" @submit.prevent="addUser">
        <div class="form__fields">
          <div class="form-field">
            <label for="firstName" class="form__label">First name</label>
            <input
              id="firstName"
              type="text"
              v-model.trim="form.firstName"
              class="form__input"
              @blur="v$.firstName.$touch"
            />
            <p class="error form__error">
              <span v-for="error of v$.firstName.$errors" :key="error.$uid">
                {{ error.$message }}
              </span>
            </p>
          </div>
          <div class="form-field">
            <label for="lastName" class="form__label">Last name</label>
            <input
              id="lastName"
              type="text"
              v-model.trim="form.lastName"
              class="form__input"
              @blur="v$.lastName.$touch"
            />
            <p class="error form__error">
              <span v-for="error of v$.lastName.$errors" :key="error.$uid">
                {{ error.$message }}
              </span>
            </p>
          </div>
          <div class="form-field">
            <label for="userName" class="form__label">Username</label>
            <input
              id="userName"
              type="text"
              v-model.trim="form.userName"
              class="form__input"
              @blur="v$.userName.$touch"
            />
            <p class="error form__error">
              <span v-for="error of v$.userName.$errors" :key="error.$uid">
                {{ error.$message }}
              </span>
            </p>
          </div>
          <div class="form-field">
            <label for="pass" class="form__label">Password</label>
            <input
              id="pass"
              type="text"
              v-model.trim="form.pass"
              class="form__input"
              @blur="v$.pass.$touch"
            />
            <p class="error form__error">
              <span v-for="error of v$.pass.$errors" :key="error.$uid">
                {{ error.$message }}
              </span>
            </p>
          </div>
          <div class="form-field form-field--row">
            <input id="status" type="checkbox" v-model="form.isActive" />
            <label for="status" class="form__label">Active</label>
          </div>
        </div>
        <div class="form-field">
          <button
            type="submit"
            class="btn form__btn"
            :disabled="v$.$errors.length"
          >
            Create
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
import TheHeader from "../components/TheHeader.vue";
import { ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
import Users from "../api/Users";

export default {
  components: {
    TheHeader,
  },
  setup() {
    const form = reactive({
      firstName: "",
      lastName: "",
      userName: "",
      pass: "",
      isActive: false,
    });
    const textInputLength = ref(150);
    const passInputLength = ref(128);
    const rules = computed(() => ({
      firstName: {
        maxLength: maxLength(textInputLength.value),
      },
      lastName: {
        maxLength: maxLength(textInputLength.value),
      },
      userName: {
        required,
        maxLength: maxLength(textInputLength.value),
      },
      pass: {
        required,
        maxLength: maxLength(passInputLength.value),
      },
    }));

    const v$ = useVuelidate(rules, form);
    const router = useRouter();
    const errorMsg = ref("");
    const addUser = async () => {
      try {
        const data = {
          userName: form.userName,
          firstName: form.firstName,
          lastName: form.lastName,
          pass: form.pass,
          isActive: form.isActive,
        };
        await Users.createUser(data);
        router.push({ name: "users" });
      } catch {
        errorMsg.value = "Sorry, something went wrong.";
      }
    };

    return { form, v$, addUser, errorMsg };
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
