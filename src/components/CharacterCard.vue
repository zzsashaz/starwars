<template>
  <a-card class="character-card-body">
    <template #cover>
      <img
        alt="Photo"
        :src="`https://starwars-visualguide.com/assets/img/characters/${CharID}.jpg`"
      />
    </template>
    <h1 class="character-name">{{ CharName }}</h1>
    <h3
      v-if="!isHomeworldLoading"
      @click="showHomeworld"
      class="character-born-get"
    >
      Узнать место рождения
    </h3>
    <div class="center">
      <a-spin
        style="height: 33px"
        v-if="isHomeworldLoading && !isHomeworldShown"
      />
    </div>
    <h3 v-if="isHomeworldShown" class="character-born">
      {{ CharBorn }}
    </h3>
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
      isHomeworldShown: false,
      isHomeworldLoading: false,
    };
  },
  async mounted() {
    const likedData = JSON.parse(window.localStorage.getItem("liked"));
    if (likedData) {
      this.isLiked = likedData.find((el) => el.name === this.CharName);
    }
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
    },
    async showHomeworld() {
      this.isHomeworldLoading = true;
      this.CharBorn = await getHomeworld(
        this.HomeWorld.split("/").reverse()[1]
      );
      this.isHomeworldShown = true;
    },
  },
};
</script>

<style scoped lang="scss">
.character-card-body {
  width: calc(20% - 20px);
  display: inline-block;
  margin: 10px;
}
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
  color: blue;
}
.character-born-get {
  cursor: pointer;
  text-align: center;
  color: red;
}
@media (max-width: 1399px) {
  .character-card-body {
    width: calc(25% - 20px);
  }
}
@media (max-width: 1199px) {
  .character-card-body {
    width: calc(33.3% - 20px);
  }
}
@media (max-width: 991px) {
  .character-card-body {
    width: calc(50% - 20px);
  }
}
@media (max-width: 767px) {
  .character-card-body {
    width: calc(100% - 20px);
  }
}
</style>
