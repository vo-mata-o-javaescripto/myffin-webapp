<template>
  <div>
    <q-btn color="primary" label="Primary" @click="addItem" />
    <template v-for="item in listFull">
      <p>{{ item.fullname }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";

const name = ref(undefined);
const list = ref([
  {
    name: "Jhon",
    lastname: "Doe",
  },
  {
    name: "Maria",
    lastname: "Souza",
  },
  {
    name: "Joao",
    lastname: "Bosco",
  },
]);

const listFull = computed(() => {
  return list.value.map((item) => {
    return { fullname: `${item.name} ${item.lastname}` };
  });
});

const addItem = () => {
  list.value.push({ name: "Lucas", lastname: "Silva e silva" });
  name.value = "Renato";
};

watch(name, (currentValue, oldValue) => {
  console.log(currentValue);
  console.log(oldValue);
});
</script>
