<template>
  <q-layout
    view="lhh LpR lff"
    container
    style="height: 900px"
    class="shadow-2 rounded-borders"
  >
    <q-header reveal class="bg-black">
      <q-toolbar>
        <q-btn flat round dense icon="menu" />
        <q-toolbar-title>Header</q-toolbar-title>
        <q-btn flat round dense icon="menu" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page style="padding-top: 60px" class="q-pa-md">
        <RouterView />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>
