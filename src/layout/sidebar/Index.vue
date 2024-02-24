<script setup></script>

<template>
  <aside class="sidebar bg-white t-0 l-0 border-e-[1px]">
    <div class="w-full h-[60px] flex items-center px-[1.5rem] mb-3">
      <router-link
        :to="{ name: 'Dashboard' }"
        class="font-semibold text-[1.5rem]"
        >heylink.</router-link
      >
    </div>
    <ul class="px-[1.5rem] block m-0">
      <li class="w-full">
        <router-link
          active-class="active"
          :to="{ name: 'Dashboard' }"
          class="sidebar-link flex items-center w-full gap-2"
        >
          <ion-icon name="home-outline"></ion-icon>
          Dashboard
        </router-link>
      </li>
      <li class="w-full">
        <router-link
          active-class="active"
          :to="{ name: 'Overview' }"
          class="sidebar-link flex items-center w-full gap-2"
        >
          <ion-icon name="analytics-outline"></ion-icon>
          Overview
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<style></style>
