<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <div class="text-h6 q-mt-sm q-mb-xs">{{ title }}</div>
        <div class="text-caption text-grey">
          {{ subtitle }}
        </div>
      </q-card-section>

      <q-card-section class="col-5 flex flex-center">
        <span class="info">{{ info }}</span>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
  // interface PropsType {
  //   title: string;
  //   subtitle: string;
  //   info?: string;
  // }

  // defineProps<PropsType>();

  defineProps({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    info: { type: String, required: true },
  });
</script>

<style lang="scss">
  .my-card {
    // min-width: 300px;

    .info {
      font-size: xx-large;
      font-weight: bolder;
    }
  }
</style>
