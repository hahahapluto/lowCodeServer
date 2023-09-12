<script setup lang="ts">
import { reactive } from "vue";
import EditorPreview from "../components/editor/EditorPreview";
import data from "../data.json";

const EditorDataMap = new Map();
for (let [key, value] of Object.entries(data)) {
  EditorDataMap.set(key, reactive(value as object));
}
</script>

<template>
  <EditorPreview :EditorData="EditorDataMap"></EditorPreview>
</template>

<style scoped></style>
