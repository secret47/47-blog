<template>
  <el-aside class="aside">
    <div class="logo"></div>
    <el-menu :default-active="defaultActive" unique-opened v-for="(item, index) in menuData" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :key="index">
      <template v-for="(item, index) in item.children">
        <el-submenu :index="index + 1 + ''" v-if="item.children" :key="index">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <!-- <span slot="title">{{ item.meta.title }}</span> -->
            {{ item.meta.title }}
          </template>
          <el-menu-item-group v-for="(item, itemIndex) in item.children" :key="itemIndex">
            <el-menu-item @click="
                () => $router.push({ path: item.path, query: $route.query })
              " :index="index + '-' + (itemIndex + 1)">{{ item.meta.title }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else :key="item.path" @click="() => $router.push({ path: item.path, query: $route.query })">
          <i :class="item.meta.icon"></i>
          <!-- <span slot="title">{{ item.meta.title }}</span> -->
          {{ item.meta.title }}
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>
<script>
import { mapGetters } from "vuex";
import { check } from "../utils/checkAuth.js";
export default {
  data() {
    const menuData = this.getMenuData(this.$store.getters.permission_routes);
    return {
      menuData,
      defaultActive: "1"
    };
  },
  computed: {
    ...mapGetters(["permission_routes"])
  },
  watch: {
    "$route.path": function(val) {
      // console.log(val)
    }
  },
  mounted() {
    // console.log(this.menuData);
  },
  methods: {
    getMenuData(routes = []) {
      const menuData = [];
      for (let item of routes) {
        //先把符合条件的router提取出来
        if (item.meta && item.meta.auth && !check(item.meta.auth)) {
          continue;
        }
        if (item.name && !item.hideMenu) {
          // console.log(item)
          const newItem = { ...item };
          delete newItem.children;
          if (item.children) {
            newItem.children = this.getMenuData(item.children);
          } else {
            this.getMenuData(item.children);
          }
          menuData.push(newItem);
        } else if (!item.hideMenu && item.children) {
          menuData.push(...this.getMenuData(item.children));
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
.el-menu {
  border-right: 0 !important;
}
</style>
