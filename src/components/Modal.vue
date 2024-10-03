<template>
  <Teleport to="body">
    <Transition>
      <div
        v-if="showModal"
        class="bg-black/30 cursor-pointer fixed inset-0 flex items-center justify-center z-[80]"
        @click="close"
      >
        <div
          class="bg-white overflow-auto max-h-[90vh] rounded-xl max-w-sm lg:max-w-[670px] m-auto absolute w-full z-20 space-y-[21px] p-6 flex flex-col"
          @click.stop
        >
          <div class="flex items-start justify-between pb-3 border-b border-[#F3F4F6]">
            <slot name="header" />
            <button
              class="bg-[#F8FAFC] size-10 grid place-content-center rounded-lg"
              @click="close"
            >
              <Close class="size-[20px] text-[#64748B]" />
            </button>
          </div>
          <slot name="body" />
          <div class="mt-auto flex items-center justify-end gap-3 font-medium">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import Close from '~/assets/icons/close.svg'
const emits = defineEmits(['closeModal'])
const { showModal } = defineProps(['showModal'])
const close = () => {
  emits('closeModal')
}
</script>

<style scoped>
/* Common styles for all positions */
.v-enter-from {
  opacity: 0;
}

.v-enter-active {
  transition: all 20ms ease-in-out;
}

.v-enter-to {
  opacity: 1;
}

.v-leave-to {
  opacity: 0;
}
</style>
