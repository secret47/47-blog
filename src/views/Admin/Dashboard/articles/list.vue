<template>
  <div>
    <el-row class="listHead" :gutter="24">
      <!-- 搜索部分 -->
      <el-col :span="12" class="search">
        <el-select v-model="value" placeholder="请选择" class="" clearable>
          <el-option
            change="changes($index)"
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-input
          v-model="searchText"
          class=""
          placeholder="请输入内容"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="4" class="blank"></el-col>
      <el-col :span="8" class="btns">
        <el-button @click="newArticle">新建文章</el-button>
        <el-button @click="getExcel">导出excel</el-button>
      </el-col>
    </el-row>
    <div class="tables">
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @select-all="selectAll"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="aid" label="id" width="80"> </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="cname" label="分类" width="100">
        </el-table-column>
        <el-table-column prop="tags" label="标签" width="150">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间"
          width="220"
        ></el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <!-- <el-button size="mini" type="primary" @click="show(scope.$index, scope.row)">查看</el-button> -->
            <el-button size="mini" @click="edit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="del(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {
  getArticlesList,
  getArticle,
  deleteArticles
} from "../../../../api/articles.js";
import moment from "moment";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      tableData: [],
      searchText: "",
      options: [
        {
          id: 1,
          name: "作者"
        },
        {
          id: 2,
          name: "标题"
        },
        {
          id: 3,
          name: "分类"
        }
      ],
      value: "",
      article: [],
      multipleSelection: []
    };
  },
  mounted() {
    this.getList(this.currentPage, this.pageSize);
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAll() {
      let selectedArr = this.multipleSelection;
    },
    //全选
    selectAll() {
      // todo 挨个取消选择后，选中和未选中就反起来了，需要更改
      if (this.multipleSelection.length != 0) {
        this.selected = !this.selected;
      } else {
        this.selected = false;
      }
    },
    //得到文章列表
    getList(currentPage, pageSize) {
      getArticlesList(currentPage, pageSize)
        .then(res => {
          let data = res.data;
          data.forEach(element => {
            //更改一下时间格式
            let createDate = element.createDate;
            createDate = moment(createDate).format("YYYY-MM-DD HH:mm:ss");
            element.createDate = createDate;
            let tags = element.tags;
            element.tagsArr = tags.split(",");
          });
          this.tableData = res.data;
        })
        .catch();
    },
    show(index, row) {
      let aid = index + 1;
      getArticle(aid)
        .then(res => {
          this.article = res.data;
        })
        .catch(err => {
          ;
        });
    },
    edit(index, row) {
      let aid = row.aid;
      this.$router.push({
        path: "/dashboard/articles/edit?aid=" + aid
      });
    },
    //删除指定文章
    del(index, row) {
      let aid = row.aid;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteArticles(aid).then(res => {
            if (res.code == "ok") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getList(this.currentPage, this.pageSize);
            }
          });
        })
        .catch(() => {});
    },
    change(index) {
    },
    //搜索
    search() {
      //按照id来选择调用哪个接口  1 作者，2 标题， 3 分类
      let id = this.value;
      let searchText = this.searchText;
      switch (id) {
        case "":
          this.$alert("选项不能为空", "提示", {
            confirmButtonText: "确定",
            center: true,
            type: "warning"
          });
          return;
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
      }
    },
    newArticle() {
      this.$router.push("/dashboard/articles/edit");
    },
    //导出excel
    getExcel() {}
  }
};
</script>
<style scoped>
.listHead {
  width: 100%;
  height: 50px;
}
.search {
  display: flex;
}
.blank {
  height: 100%;
}
.el-col div {
  margin-right: 10px;
}
.btns {
  text-align: right;
}
.tables {
  height: calc(100% - 100px);
  background: #ffffff;
}
</style>
