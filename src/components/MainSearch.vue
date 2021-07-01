<template>
  <a-input-search
    v-model:value="searchValue"
    placeholder="Введите имя вашего героя"
    enter-button
    @search="search"
    style="margin: 25px 0"
  />
</template>

<script>
import { searchCharacters } from "@/hooks/main";
export default {
  name: "MainSearch",
  data() {
    return {
      searchValue: "",
    };
  },
  methods: {
    search() {
      searchCharacters(this.searchValue);
    },
  },
};
</script>

<style scoped lang="scss"></style>
