<script setup>
import { ref, computed } from "vue";
import cityData from "../../assets/js/city.js";
import provinceData from "../../assets/js/province.js";

const cities = cityData;
const provinces = provinceData;
const itemsPerPage = 10;
const currentPage = ref(1);
const selectedProvince = ref("all");
const sortBy = ref("");
const sortOrder = ref("asc");

const filteredCities = computed(() => {
  if (selectedProvince.value === "all") {
    return cities;
  } else {
    return cities.filter((city) => city.provinsi_id === selectedProvince.value);
  }
});

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() =>
  Math.min(startIndex.value + itemsPerPage, filteredCities.value.length)
);

const displayedCities = computed(() => {
  let sortedCities = [...filteredCities.value];
  if (sortBy.value) {
    sortedCities.sort((a, b) => {
      if (sortOrder.value === "asc") {
        return a[sortBy.value] > b[sortBy.value] ? 1 : -1;
      } else {
        return a[sortBy.value] < b[sortBy.value] ? 1 : -1;
      }
    });
  }
  return sortedCities.slice(startIndex.value, endIndex.value);
});

const changePage = (page) => {
  currentPage.value = page;
};

const getProvinceName = computed(() => {
  return displayedCities.value.map((city) => {
    const province = provinces.find(
      (province) => province.id === city.provinsi_id
    );
    return province ? province.name : "";
  });
});

const toggleSortOrder = (column) => {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = column;
    sortOrder.value = "asc";
  }
};
</script>

<template>
  <div>
    <select
      name="filter_province"
      id="filter_province"
      class="form-select mb-4 text-[13px]"
      v-model="selectedProvince"
    >
      <option value="all" selected>Semua</option>
      <option
        v-for="province in provinces"
        :key="province.id"
        :value="province.id"
      >
        {{ province.name }}
      </option>
    </select>

    <table
      v-if="filteredCities.length > 0"
      class="min-w-full divide-y divide-gray-200"
    >
      <th
        scope="col"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
        @click="toggleSortOrder('id')"
      >
        <div class="flex items-center justify-between">
          City ID
          <ion-icon name="swap-vertical-outline"></ion-icon>
        </div>
      </th>
      <th
        scope="col"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
        @click="toggleSortOrder('name')"
      >
        <div class="flex items-center justify-between">
          City Name
          <ion-icon name="swap-vertical-outline"></ion-icon>
        </div>
      </th>
      <th
        scope="col"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
        @click="toggleSortOrder('provinsi_id')"
      >
        <div class="flex items-center justify-between">
          Province ID
          <ion-icon name="swap-vertical-outline"></ion-icon>
        </div>
      </th>
      <th
        scope="col"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
        @click="toggleSortOrder('provinceName')"
      >
        <div class="flex items-center justify-between">
          Province Name
          <ion-icon name="swap-vertical-outline"></ion-icon>
        </div>
      </th>

      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(city, index) in displayedCities" :key="city.id">
          <td class="px-6 py-4 whitespace-nowrap text-[13px]">{{ city.id }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-[13px]">
            {{ city.name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-[13px]">
            {{ city.provinsi_id }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-[13px]">
            {{ getProvinceName[index] }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="text-gray-500 text-center">Data not found</p>

    <nav
      v-if="filteredCities.length > 0"
      class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{ startIndex + 1 }}</span> to
            <span class="font-medium">{{ endIndex }}</span> of
            <span class="font-medium">{{ filteredCities.length }}</span> results
          </p>
        </div>
        <div>
          <nav
            class="inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              :class="{ 'opacity-50': currentPage === 1 }"
            >
              Previous
            </button>

            <template
              v-if="Math.ceil(filteredCities.length / itemsPerPage) <= 5"
            >
              <button
                v-for="page in Math.ceil(filteredCities.length / itemsPerPage)"
                :key="page"
                @click="changePage(page)"
                :class="{ 'bg-indigo-50': currentPage === page }"
                class="relative inline-flex items-center border-t border-b border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {{ page }}
              </button>
            </template>
            <template v-else>
              <template v-if="currentPage <= 3">
                <button
                  v-for="pageNumber in 5"
                  :key="pageNumber"
                  @click="changePage(pageNumber)"
                  :class="{ 'bg-indigo-50': currentPage === pageNumber }"
                  class="relative inline-flex items-center border-t border-b border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {{ pageNumber }}
                </button>
                <span
                  class="relative inline-flex items-center border-t border-b border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                  >...</span
                >
              </template>
              <template
                v-else-if="
                  currentPage >=
                  Math.ceil(filteredCities.length / itemsPerPage) - 2
                "
              >
                <span
                  class="relative inline-flex items-center border-t border-b border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                  >...</span
                >
                <button
                  v-for="pageNumber in 5"
                  :key="
                    Math.ceil(filteredCities.length / itemsPerPage) -
                    5 +
                    pageNumber
                  "
                  @click="
                    changePage(
                      Math.ceil(filteredCities.length / itemsPerPage) -
                        5 +
                        pageNumber
                    )
                  "
                  :class="{
                    'bg-indigo-50':
                      currentPage ===
                      Math.ceil(filteredCities.length / itemsPerPage) -
                        5 +
                        pageNumber,
                  }"
                  class="relative inline-flex items-center border-t border-b border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {{
                    Math.ceil(filteredCities.length / itemsPerPage) -
                    5 +
                    pageNumber
                  }}
                </button>
              </template>
              <template v-else>
                <span
                  class="relative inline-flex items-center border-t border-b border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                  >...</span
                >
                <button
                  v-for="pageNumber in 3"
                  :key="currentPage - 1 + pageNumber"
                  @click="changePage(currentPage - 1 + pageNumber)"
                  :class="{
                    'bg-indigo-50':
                      currentPage === currentPage - 1 + pageNumber,
                  }"
                  class="relative inline-flex items-center border-t border-b border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {{ currentPage - 1 + pageNumber }}
                </button>
                <span
                  class="relative inline-flex items-center border-t border-b border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                  >...</span
                >
              </template>
            </template>

            <button
              @click="changePage(currentPage + 1)"
              :disabled="
                currentPage === Math.ceil(filteredCities.length / itemsPerPage)
              "
              class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              :class="{
                'opacity-50':
                  currentPage ===
                  Math.ceil(filteredCities.length / itemsPerPage),
              }"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped></style>
