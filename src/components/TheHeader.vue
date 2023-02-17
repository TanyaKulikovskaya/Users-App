<template>
  <header class="header">
    <nav class="header__menu menu">
      <div class="menu__nav">
        <router-link :to="{ name: 'users' }">
          <span class="menu__link link">Users</span>
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
    &__link {
      display: block;
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
      span {
        position: relative;
      }
      span::after {
        content: "";
        display: block;
        position: absolute;
        bottom: -16px;
        left: 0;
        height: 2px;
        width: 100%;
        background-color: $blue;
      }
    }
  }
}
@media screen and (max-width: 576px) {
  .header {
    padding: 0 16px;
  }
}
</style>
