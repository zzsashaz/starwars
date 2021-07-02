<template>
  <div class="container">
    <CharacterCard
      v-for="el in likedCharacters"
      :key="el.key"
      :CharID="el.charID"
      :CharName="el.name"
      :HomeWorld="el.homeland"
    />
  </div>
</template>

<script>
import CharacterCard from "@/components/CharacterCard";
export default {
  name: "Home",
  components: { CharacterCard },
  data() {
    return {
      likedCharacters: JSON.parse(window.localStorage.getItem("liked")),
    };
  },
};
</script>
<style lang="scss"></style>
