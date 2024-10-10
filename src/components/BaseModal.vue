<template>
  <Teleport to="body">
    <Transition>
      <div v-if="showModal" class="modal-container" @click="close">
        <div class="modal" @click.stop role="dialog">
          <button class="modal_close_button" @click="close" aria-label="Close modal">
            <CloseIcon class="size-[20px] text-[#64748B]" />
          </button>
          <slot name="body" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import CloseIcon from '@/components/icons/IconCancel.vue'
const emit = defineEmits(['closeModal'])
defineProps<{
  showModal: boolean
}>()

const close = () => {
  emit('closeModal')
}
</script>

<style scoped lang="scss">
/* Common styles for all positions */
.v-enter-from {
  opacity: 0;
  transform: scale(0.4);
}

.v-enter-active {
  transition: all 0.3s ease-out;
}

.v-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.v-leave-active {
  transition: all 0.3s ease-in;
}

.v-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(10vh);
}
</style>
