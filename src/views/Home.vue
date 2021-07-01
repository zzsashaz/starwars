<template>
  <div class="container">
    <MainSearch />
    <CharacterCard />
    <CharacterCard />
    <CharacterCard />
    <CharacterCard />
    <CharacterCard />
    <CharacterCard />
    <CharacterCard />
    <CharacterCard />
    <CharacterCard />
    <CharacterCard />
    <a-pagination
      v-model:current="current"
      :total="50"
      style="padding: 20px; text-align: center"
      show-less-items
    />
  </div>
</template>

<script>
import MainSearch from "@/components/MainSearch";
import CharacterCard from "@/components/CharacterCard";

export default {
  name: "Home",
  components: { CharacterCard, MainSearch },
  setup() {
    return {
      current: 2,
    };
  },
};
</script>
<style lang="scss"></style>
