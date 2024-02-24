<template>
  <Sidebar />
  <div class="layout-wrapper" id="layout-view">
    <Header />
    <main class="pt-[1rem] container px-[1rem]">
      <router-view />
    </main>
  </div>
</template>

<script>
import Sidebar from "./sidebar/Index.vue";
import Header from "./header/Index.vue";
export default {
  components: { Sidebar, Header },
};
</script>

<style scoped></style>
