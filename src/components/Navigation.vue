<template>
  <div class="container nav">
    <RouterLink to="/"><a-button type="primary">Главная</a-button></RouterLink>
    <RouterLink to="/favorites"
      ><a-button type="primary">Любимые</a-button></RouterLink
    >
  </div>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  justify-content: space-around;
  margin: 25px auto;
}
</style>
