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
      table-class-name="customize-table"
      body-text-direction="center"
      alternating
    >
      <template #item-is_active="user">
        {{ user.is_active ? "active" : "inactive" }}
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

import { ref } from "vue";

const sortBy = "id";
const sortType = "asc";

export default {
  components: {
    TheHeader,
  },
  setup() {
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
    return { headers, users, sortBy, sortType, searchField, searchValue };
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
</style>
