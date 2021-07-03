<template>
  <div class="container center">
    <CharacterCard
      v-for="el in likedCharacters"
      :key="el.name"
      :CharID="el.charID"
      :CharName="el.name"
      :HomeWorld="el.homeland"
    />
    <div class="localstorage-clear">
      <h1 v-if="!likedCharacters?.length" class="thereIsNothingHere">
        У вас нет ни одного любимого персонажа!
      </h1>
      <a-button
        @click="clearStorage"
        v-if="likedCharacters?.length"
        type="primary"
        style="margin: 25px 0"
        >Отчистить избранное</a-button
      >
    </div>
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
  methods: {
    clearStorage() {
      window.localStorage.clear();
      this.likedCharacters = JSON.parse(window.localStorage.getItem("liked"));
    },
  },
};
</script>
<style lang="scss">
.localstorage-clear {
  text-align: center;
}
.thereIsNothingHere {
  text-align: center;
  color: red;
}
</style>
