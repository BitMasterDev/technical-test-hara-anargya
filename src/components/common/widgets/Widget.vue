<template>
  <div
    class="w-full max-w-full px-3 mb-6 md:w-1/2 sm:flex-none xl:mb-0 xl:w-1/3"
  >
    <div
      class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border shadow-sm border-widget"
    >
      <div class="flex flex-row items-center justify-between pe-4">
        <div class="p-4 text-left">
          <p
            class="block antialiased font-sans text-sm leading-normal font-normal text-status"
          >
            {{ status }}
          </p>
          <h4
            class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900"
          >
            {{ count }}
          </h4>
        </div>
        <div
          class="border border-widget rounded-xl overflow-hidden h-12 w-12 grid place-items-center text-2xl"
        >
          <ion-icon name="shuffle-outline"></ion-icon>
        </div>
      </div>

      <div
        class="flex items-center justify-between block-widget rounded-b-xl p-4"
      >
        <p
          class="text-sm font-normal leading-normal"
          :class="getClassForPercent(percent)"
        >
          {{ percent }} <span class="text-status text-[12px]">Last month</span>
        </p>

        <p class="text-[12px] text-link">View more</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: String,
    count: Number,
    percent: Number,
  },
  methods: {
    getClassForPercent(percent) {
      if (percent < 0) {
        return "text-danger";
      } else if (percent > 0) {
        return "text-success";
      } else {
        return "text-status";
      }
    },
  },
};
</script>

<style scoped>
.text-status {
  color: #727272;
}
.text-danger {
  color: #ee7c85;
}
.text-success {
  color: #4cbf93;
}
.border-widget {
  border-color: rgb(203 213 225);
}
.block-widget {
  background-color: #f9fafc;
}
.text-link {
  color: #6e6e6e;
}
</style>
