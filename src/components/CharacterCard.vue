<template>
  <a-card style="width: calc(20% - 20px); display: inline-block; margin: 10px">
    <template #cover>
      <img
        alt="Photo"
        src="https://starwars-visualguide.com/assets/img/characters/1.jpg"
      />
    </template>
    <a-card-meta title="Имя героя"> </a-card-meta>
    <div class="like-area">
      <HeartOutlined
        v-if="!isLiked"
        style="font-size: 30px; cursor: pointer"
        @click="changeLike"
      />
      <HeartFilled
        v-if="isLiked"
        style="font-size: 30px; cursor: pointer"
        @click="changeLike"
      />
    </div>
  </a-card>
</template>

<script>
import { HeartOutlined, HeartFilled } from "@ant-design/icons-vue";
export default {
  name: "CharacterCard",
  components: {
    HeartOutlined,
    HeartFilled,
  },
  props: {
    CharName: String,
    CharBorn: String,
  },
  data() {
    return {
      isLiked: false,
    };
  },
  methods: {
    changeLike() {
      this.isLiked = !this.isLiked;
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
</style>
