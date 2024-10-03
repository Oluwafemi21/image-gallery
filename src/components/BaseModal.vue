<template>
  <Teleport to="body">
    <Transition>
      <div v-if="showModal" class="modal-container" @click="close">
        <div class="modal" @click.stop>
          <button class="modal_close_button" @click="close">
            <CloseIcon class="size-[20px] text-[#64748B]" />
          </button>
          <slot name="body" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import CloseIcon from '@/components/icons/IconCancel'
const emits = defineEmits(['closeModal'])
defineProps<{
  showModal: boolean
}>()

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
