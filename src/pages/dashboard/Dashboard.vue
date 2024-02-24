<template>
  <div>
    <div class="flex flex-wrap -mx-3 mb-5">
      <Widget
        v-for="item in widget_data"
        :key="item.id"
        :status="item.status"
        :count="item.count"
        :percent="item.percent"
      />
    </div>

    <div class="overflow-x-auto">
      <table
        v-if="users.length > 0"
        class="min-w-full divide-y divide-gray-200"
      >
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              User
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date of Birth
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Job
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Country
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap text-[12px]">
              {{ user.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-[12px] flex gap-2">
              <img
                class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                :src="user.profile_picture"
                :alt="user.first_name"
              />
              <p class="m-0">{{ user.first_name }} {{ user.last_name }}</p>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-[12px]">
              {{ formatDate(user.date_of_birth) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-[12px]">
              {{ user.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-[12px]">
              {{ user.job }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-[12px]">
              {{ user.country }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-[12px] text-right text-sm font-medium gap-2"
            >
              <button
                class="text-slate-600 hover:text-slate-900 shadow-md px-3 py-1 rounded-md text-[12px]"
              >
                Select
              </button>
              <button
                @click="openModal(user)"
                class="text-slate-600 hover:text-slate-900 shadow-md px-3 py-1 rounded-md text-[12px]"
              >
                View Detail
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>Loading...</div>
    </div>
    <Modal :is-active="modalActive" @close="closeModal">
      <div class="flex flex-row items-start justify-between">
        <div class="flex items-center gap-2 mb-4">
          <img
            class="inline-block h-20 w-20 rounded-full ring-2 ring-white"
            :src="selectUser.profile_picture"
            :alt="selectUser.first_name"
          />
          <div class="block text-left">
            <h4 class="mb-0 text-[16px] font-semibold text-dark">
              {{ selectUser.first_name }} {{ selectUser.last_name }}
            </h4>
            <p class="m-0 text-[14px] font-regular text-dark">
              {{ selectUser.email }}
            </p>
            <p class="m-0 text-[14px] font-regular text-dark">
              {{ selectUser.phone }}
            </p>
          </div>
        </div>
        <button class="text-[20px] font-semibold text-red" @click="closeModal">
          x
        </button>
      </div>
      <ul>
        <li class="text-[14px]">
          Date of Birth:
          <strong>{{ formatDate(selectUser.date_of_birth) }}</strong>
        </li>
        <li class="text-[14px]">
          Gender:
          <strong>{{ selectUser.gender }}</strong>
        </li>
        <li class="text-[14px]">
          Job:
          <strong>{{ selectUser.job }}</strong>
        </li>
        <li class="text-[14px]">
          Country:
          <strong>{{ selectUser.country }}</strong>
        </li>
        <li class="text-[14px]">
          State:
          <strong>{{ selectUser.state }}</strong>
        </li>
        <li class="text-[14px]">
          Street:
          <strong>{{ selectUser.street }}</strong>
        </li>
      </ul>
    </Modal>
  </div>
</template>

<script>
import Widget from "../../components/common/widgets/Widget.vue";
import Modal from "../../components/common/modal/Modal.vue";
import axios from "axios";

export default {
  components: { Widget, Modal },
  data() {
    return {
      widget_data: [
        { id: 1, status: "pending", count: 2.4803, percent: 2.15 },
        { id: 2, status: "paid", count: 84.31, percent: -1.1 },
        { id: 3, status: "rejected", count: 12.155, percent: 2.15 },
      ],
      users: [],
      selectUser: null,
      modalActive: false,
    };
  },
  async created() {
    try {
      const response = await axios.get(
        "https://api.slingacademy.com/v1/sample-data/users"
      );
      this.users = response.data.users;
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    openModal(user) {
      this.modalActive = true;
      this.selectUser = user;
    },
    closeModal() {
      this.modalActive = false;
      this.selectUser = null;
    },
  },
};
</script>
<style scoped></style>
