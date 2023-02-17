import { ref } from "vue";
import Users from "../api/Users";

const getUsers = () => {
  const users = ref([]);

  const load = async () => {
    const response = await Users.fetchUsers();
    users.value = response;
  };
  return { users, load };
};

export default getUsers;
