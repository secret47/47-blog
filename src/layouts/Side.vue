<template>
  <el-aside width="250px" class="aside">
      <div class="logo"></div>
      <el-menu :default-active="defaultActive" unique-opened v-for="(item,index) in menuData"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" >
        <template v-for="(item,index) in item.children">
          <el-submenu :index="index+1+''" v-if="item.children">
              <template slot="title">
                <i :class="item.meta.icon"></i>
                <span slot="title">{{item.meta.title}}</span>
              </template>
              <el-menu-item-group v-for="(item,itemIndex) in item.children">
                <el-menu-item @click="() => $router.push({ path: item.path, query: $route.query })" :index="index+'-'+(itemIndex+1)">{{item.meta.title}}</el-menu-item>
              </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-else @click="() => $router.push({ path: item.path, query: $route.query })">
              <i :class="item.meta.icon"></i>
              <span slot="title" >{{item.meta.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
  </el-aside>
</template>
<script>
export default {
  data() {
    const menuData = this.getMenuData(this.$router.options.routes);
    return{
      menuData,
      defaultActive:"1"
    }
  },
  watch: {
    "$route.path": function(val) {
      console.log(val)
    },
  },
  mounted() {

  },
  methods: {
    getMenuData(routes = []) {
      const menuData = [];
      for (let item of routes) {
        if (item.name && !item.hideMenu) {
          const newItem = { ...item };
          delete newItem.children;
          if (item.children) {
            newItem.children = this.getMenuData(item.children);
          } else {
            this.getMenuData(
              item.children
            );
          }
          menuData.push(newItem);
        } else if (
          !item.hideMenu &&
          item.children
        ) {
          menuData.push(
            ...this.getMenuData(item.children)
          );
        }
      }
      return menuData;
    }
  
  }
};
</script>
<style>
.dashboard {
  background: #ffffff;
}
.logo {
  height: 100px;
}
.el-menu{
  border-right:0 !important
}
</style>