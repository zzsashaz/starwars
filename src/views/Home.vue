<template>
  <div class="container">
    <a-input-search
      v-model:value="searchValue"
      placeholder="Введите имя вашего героя"
      enter-button
      @search="search"
      style="margin: 25px 0"
    />
    <CharacterCard
      v-for="el in characters"
      :key="el.key"
      :CharID="Number(el.url.split('/').reverse()[1])"
      :CharName="el.name"
      :HomeWorld="el.homeworld"
    />
    <h1 v-if="!charactersCount" class="thereIsNothingHere">
      По вашему запросу ничего не найдено
    </h1>
    <a-pagination
      v-model:current="currentPage"
      :total="charactersCount"
      style="padding: 20px; text-align: center"
      show-less-items
    />
  </div>
</template>

<script>
import CharacterCard from "@/components/CharacterCard";
import { searchCharacters, getCharacters } from "@/hooks/main";

export default {
  name: "Home",
  components: { CharacterCard },
  data() {
    return {
      searchValue: "",
      currentPage: 1,
      charactersCount: 0,
      characters: [],
    };
  },
  methods: {
    async search() {
      const SearchCharactersData = await searchCharacters(this.searchValue);
      this.charactersCount = SearchCharactersData.count;
      this.characters = SearchCharactersData.results;
    },
    async CharacterRefresh() {
      const AllCharactersData = await getCharacters(this.currentPage);
      this.charactersCount = AllCharactersData.count;
      this.characters = AllCharactersData.results;
    },
    handleMenuClick(e) {
      console.log("click", e);
    },
  },
  async created() {
    await this.CharacterRefresh();
  },
  watch: {
    async currentPage() {
      await this.CharacterRefresh();
    },
    async searchValue() {
      await this.search();
    },
  },
};
</script>
<style lang="scss">
.thereIsNothingHere {
  text-align: center;
  color: red;
}
</style>
