<template>
  <div class="modal">
    <Teleport to="body">
      <DsfrModal
        :opened="isOpened"
        :title="title"
        :origin="$refs.modalOrigin"
        @close="cancelAction()"
      >
        <p
          v-if="message"
          class="message"
          data-testid="app-popin-message"
          v-html="message"
        />
        <DsfrPicture
          v-if="hasImage"
          :src="image"
        />
        <div>
          <slot name="content" />
        </div>
      </DsfrModal>
    </Teleport>
  </div>
</template>

<script setup>

import { defineProps, defineEmits } from 'vue';

const props = defineProps({
isOpened: Boolean,
hasImage: Boolean,
image: {
  type: String,
  default: '',
},
title: {
  type: String,
  default: '',
},
message: {
  type: String,
  default: '',
},
customClass: {
  type: String,
  default: '',
},
cancelClass: {
  type: String,
  default: '',
},
cancelText: {
  type: String,
  default: 'Annuler',
},
validateText: {
  type: String,
  default: 'Valider',
},
validateDisabled: Boolean,
extraActionText: {
  type: String,
  default: '',
},
actionValidate: {
  type: Boolean,
  default: true,
},
actionCancel: {
  type: Boolean,
  default: true,
},
})
const emit = defineEmits(['cancel', 'confirm'])
const cancelAction = () => emit('cancel')
const validateAction = () => emit('confirm')
const actionValidate =
props.actionValidate
  ? [{
      label: 'Valider',
      onClick: validateAction,
    }]
  : []
const actionCancel =
props.actionCancel
? [{
    label: 'Annuler',
    secondary: true,
    onClick: cancelAction,
  }]
: []
const actions = [
...actionValidate,
...(
  props.extraActionText
    ? [{
        label: props.extraActionText,
        onClick: extraAction,
      }]
    : []
),
...actionCancel,
]
</script>