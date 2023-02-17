<template>
  <the-header />
  <main class="container">
    <input
      type="text"
      placeholder="Search by username"
      v-model="searchValue"
      class="users__input"
    />
    <EasyDataTable
      v-if="users.length > 0"
      :headers="headers"
      :items="users"
      :sort-by="sortBy"
      :sort-type="sortType"
      :search-field="searchField"
      :search-value="searchValue"
      body-text-direction="center"
      hide-footer
      alternating
    />
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
      { text: "ACTIVE", value: "is_active" },
      { text: "LAST LOGIN", value: "last_login" },
      { text: "SUPER USER", value: "is_superuser" },
    ]);
    const { users, load } = getUsers();
    load();
    return { headers, users, sortBy, sortType, searchField, searchValue };
  },
};
</script>

<style lang="scss" scoped>
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
