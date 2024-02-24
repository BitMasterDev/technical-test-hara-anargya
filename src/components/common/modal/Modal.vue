<template>
  <transition name="modal-fade">
    <div
      class="modal fixed top-0 left-0 w-full h-screen z-[9999]"
      v-if="isActive"
    >
      <div
        class="modal-dialog flex items-center justify-center mx-auto p-[1rem] w-full h-full"
      >
        <div class="modal-content w-full max-w-[567px] bg-white rounded-lg p-4">
          <div class="box">
            <slot></slot>
          </div>
          <!-- <button
            class="modal-close is-large"
            aria-label="close"
            @click="close"
          >
            close
          </button> -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s;
}
.modal-fade-enter, .modal-fade-leave-to /* .modal-fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
.modal-dialog {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
}
</style>
