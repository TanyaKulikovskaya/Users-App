<template>
  <header class="header">
    <nav class="header__menu menu">
      <div class="menu__nav">
        <router-link :to="{ name: 'users' }" class="menu__link link">
          Users
        </router-link>
        <router-link :to="{ name: 'user-form' }" class="menu__link link">
          Add User
        </router-link>
      </div>
      <div class="menu__actions">
        <button class="menu__btn link" @click="logOut">Logout</button>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions({
      signOut: "auth/logout",
    }),
    logOut() {
      this.signOut();
    },
  },
};
</script>

<style lang="scss">
.header {
  height: 60px;
  padding: 0 40px;
  background-color: $white;
  .menu {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__nav {
      display: flex;
      a {
        color: inherit;
        &:hover {
          color: $indigo;
        }
      }
    }
    &__link {
      display: block;
      margin-right: 40px;
    }
    &__btn {
      background-color: transparent;
      color: $gray;
      border-color: $gray;
      border-style: solid;
      border-width: 1px;
      border-radius: 6px;
      padding: 4px 12px;
      &:hover {
        border-color: $blue;
        color: $blue;
      }
    }
    .link {
      font-size: 18px;
      line-height: 28px;
    }
    .router-link-exact-active {
      color: $blue;
    }
  }
}
@media screen and (max-width: 576px) {
  .header {
    padding: 0 16px;
  }
}
</style>
