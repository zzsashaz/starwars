<template>
  <div class="container center">
    <a-input-search
      v-model:value="searchValue"
      placeholder="Введите имя вашего героя"
      @search="search"
      class="search"
    />
    <CharacterCard
      v-for="el in characters"
      :key="el.name"
      :CharID="Number(el.url.split('/').reverse()[1])"
      :CharName="el.name"
      :HomeWorld="el.homeworld"
    />
    <h1 v-if="!charactersCount" class="thereIsNothingHere">
      <a-spin v-if="isPageLoading" size="large"></a-spin>
      <template v-if="!isPageLoading"
        >По вашему запросу ничего не найдено</template
      >
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
      isPageLoading: true,
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
  },
  async created() {
    await this.CharacterRefresh();
    this.isPageLoading = false;
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
.search {
  margin: 25px 0;
}
@media (max-width: 767px) {
  .nav {
    position: sticky;
    top: 0px;
    padding: 10px 0 50px 0;
    z-index: 100;
    background: #fff;
  }
  .search {
    position: sticky;
    top: 55px;
    background: #fff;
    z-index: 100;
  }
}
</style>
