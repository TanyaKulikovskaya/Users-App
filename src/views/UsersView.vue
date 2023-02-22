<template>
  <the-header />
  <main v-if="users.length > 0" class="container">
    <input
      type="text"
      placeholder="Search by username"
      v-model="searchValue"
      class="users__input"
    />
    <EasyDataTable
      :headers="headers"
      :items="users"
      :sort-by="sortBy"
      :sort-type="sortType"
      :search-field="searchField"
      :search-value="searchValue"
      :rows-per-page="10"
      :loading="loading"
      table-class-name="customize-table"
      body-text-direction="center"
      alternating
    >
      <template #item-is_active="user">
        <button
          class="users-row__btn"
          :class="user.is_active ? 'active' : 'blocked'"
          @click="toggleUserStatus(user)"
        >
          {{ user.is_active ? "active" : "blocked" }}
        </button>
      </template>
      <template #item-last_login="user">
        {{ user.last_login ? "user.last_login" : "-" }}
      </template>
      <template #item-is_superuser="user">
        {{ user.is_superuser ? "superuser" : "user" }}
      </template>
    </EasyDataTable>
  </main>
</template>

<script>
import TheHeader from "../components/TheHeader.vue";
import getUsers from "../composables/getUsers";
import Users from "../api/Users";

import { ref } from "vue";

const sortBy = "id";
const sortType = "asc";

export default {
  components: {
    TheHeader,
  },
  setup() {
    const loading = ref(false);
    const searchField = ref("username");
    const searchValue = ref("");
    const headers = ref([
      { text: "User ID", value: "id", sortable: true },
      { text: "USERNAME", value: "username" },
      { text: "FIRST NAME", value: "first_name" },
      { text: "LAST NAME", value: "last_name" },
      { text: "STATUS", value: "is_active" },
      { text: "LAST LOGIN", value: "last_login" },
      { text: "ROLE", value: "is_superuser" },
    ]);
    const { users, load } = getUsers();
    load();
    const toggleUserStatus = async (user) => {
      loading.value = true;
      try {
        const data = {
          isActive: !user.is_active,
        };
        const updatedUser = await Users.updateUserStatus(user.id, data);
        users.value = users.value.map((item) =>
          item.id === user.id ? { ...updatedUser } : item
        );
      } catch (err) {
        console.log(err);
      } finally {
        loading.value = false;
      }
    };
    return {
      loading,
      headers,
      users,
      sortBy,
      sortType,
      searchField,
      searchValue,
      toggleUserStatus,
    };
  },
};
</script>

<style lang="scss" scoped>
.customize-table {
  --easy-table-header-font-color: #272727;
  --easy-table-footer-background-color: #78858b;
  --easy-table-footer-font-color: #eaeaea;
}
.container {
  padding-top: 20px;
  padding-bottom: 20px;
  height: calc(100vh - 60px);
}
.users__input {
  display: block;
  max-width: 220px;
  height: 32px;
  padding: 4px 8px;
  font-size: 14px;
  line-height: 26px;
  border-color: $gray;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  color: $dark;
  margin-bottom: 12px;
  &:focus {
    border: 1px solid $blue;
  }
}

.users-row__btn {
  padding: 2px 8px;
  min-width: 80px;
  border: none;
  &.active {
    background-color: $indigo;
    color: $cian;
    &:hover {
      background-color: $blue;
    }
  }
  &.blocked {
    background-color: $red;
    color: $white;
    &:hover {
      background-color: $ruby;
    }
  }
}
</style>
