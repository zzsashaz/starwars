<template>
  <a-card style="width: calc(20% - 20px); display: inline-block; margin: 10px">
    <template #cover>
      <img
        alt="Photo"
        :src="`https://starwars-visualguide.com/assets/img/characters/${CharID}.jpg`"
      />
    </template>
    <h1 class="character-name">{{ CharName }}</h1>
    <h3 class="character-born">{{ CharBorn }}</h3>
    <div class="like-area">
      <HeartOutlined
        v-if="!isLiked"
        style="font-size: 23px; cursor: pointer"
        @click="changeLike"
      />
      <HeartFilled
        v-if="isLiked"
        style="font-size: 23px; cursor: pointer; color: red"
        @click="changeLike"
      />
    </div>
  </a-card>
</template>

<script>
import { HeartOutlined, HeartFilled } from "@ant-design/icons-vue";
import { getHomeworld } from "@/hooks/main";
import { likedCharacters } from "@/store";

export default {
  name: "CharacterCard",
  components: {
    HeartOutlined,
    HeartFilled,
  },
  props: {
    CharName: String,
    CharID: Number,
    HomeWorld: String,
  },
  data() {
    return {
      isLiked: false,
      CharBorn: "",
    };
  },
  async updated() {
    this.CharBorn = await getHomeworld(this.HomeWorld.split("/").reverse()[1]);
    console.log(this.CharBorn);
    this.isLiked = JSON.parse(window.localStorage.getItem("liked")).find(
      (el) => el.name === this.CharName
    );
  },
  async mounted() {
    this.CharBorn = await getHomeworld(this.HomeWorld.split("/").reverse()[1]);
    this.isLiked = JSON.parse(window.localStorage.getItem("liked")).find(
      (el) => el.name === this.CharName
    );
  },
  methods: {
    changeLike() {
      if (!this.isLiked) {
        likedCharacters.push({
          name: this.CharName,
          charID: this.CharID,
          homeland: this.HomeWorld,
        });
      } else {
        let idToDelete = likedCharacters.findIndex(
          (char) => char.name === this.CharName
        );
        likedCharacters.splice(idToDelete, 1);
      }
      this.isLiked = !this.isLiked;
      localStorage.setItem("liked", JSON.stringify(likedCharacters));
      console.log(localStorage.getItem("liked"));
    },
  },
};
</script>

<style scoped lang="scss">
.like-area {
  display: flex;
  width: 100%;
  height: 50px;
  align-items: flex-end;
  justify-content: center;
  user-select: none;
}
.character-name {
  text-align: center;
  font-size: 20px;
}
.character-born {
  text-align: center;
}
</style>
