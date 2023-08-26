<script setup lang="ts">
import { reactive } from 'vue';
import EditorPreview from '../components/editor/EditorPreview'
import data from '../data.json'
let EditorData = reactive(data);
</script>

<template>
  <EditorPreview :EditorData="EditorData"></EditorPreview>
</template>

<style scoped>

</style>
