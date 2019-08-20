<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
.container {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>
