<template>
  <div>
    <div class="head">
      <el-button type="primary" @click="add">添加分类</el-button>
      <el-button type="danger" @click="delAll" v-show="selected">删除选中</el-button>
    </div>
    <div class="box">
      <el-table ref="multipleTable" :data="data" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" @select-all="selectAll">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="id" width="100"> </el-table-column>
        <el-table-column prop="cname" label="分类名称" width="180">
        </el-table-column>
        <el-table-column prop="cdesc" label="分类描述"> </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="editText" :visible.sync="showEdit" width="40%" center>
      <el-form :model="catalogs" label-position="left" ref="catalogs" :rules="rules">
        <el-form-item label="分类名称" prop="cname">
          <el-input v-model="catalogs.cname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类描述" prop="cdesc">
          <el-input type="textarea" :rows="3" v-model="catalogs.cdesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEdit = false">取 消</el-button>
        <el-button type="primary" @click="saveCatalog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getCatalogs,
  updateCatalogs,
  addCatalog,
  delCatalog
} from "../../../../api/articles.js";
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("名称不能为空"));
      }
      setTimeout(() => {
        if (value.length > 6) {
          callback(new Error("不能超过6个字"));
        } else {
          callback();
        }
      }, 1000);
    };
    var checkDesc = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("描述不能为空"));
      } else {
        setTimeout(() => {
          if (value.length > 18) {
            callback(new Error("不能超过18个字"));
          } else {
            callback();
          }
        }, 1000);
      }
    };
    return {
      data: null,
      multipleSelection: [],
      showEdit: false,
      catalogs: {
        cname: "",
        cdesc: ""
      },
      editText: "添加新的分类",
      isNew: true,
      rules: {
        cname: [{ validator: checkName, trigger: "blur" }],
        cdesc: [{ validator: checkDesc, trigger: "blur" }]
      },
      selected: false
    };
  },
  mounted() {
    this.getCatalogs();
  },
  methods: {
    delAll() {
      let selectedArr = this.multipleSelection;
      console.log(selectedArr);
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
    //得到所有的分类
    getCatalogs() {
      getCatalogs()
        .then(res => {
          console.log(res);
          this.data = res.data;
        })
        .catch(err => {});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //编辑当前分类
    edit(index, row) {
      this.editText = "修改当前分类";
      this.showEdit = true;
      this.isNew = false; // 当点的是编辑按钮的时候，这个就是false
      let aid = row.id;
    },
    //删除分类
    del(index, row) {
      let id = row.id;
      console.log(id);
      this.$confirm("此操作将永远删除该分类，是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delCatalog(id)
            .then(res => {
              console.log(res);
              if (res.code == "200") {
                this.$message({
                  showClose: true,
                  message: "删除分类成功！",
                  type: "success"
                });
              }
              this.getCatalogs();
            })
            .catch(err => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //添加分类
    add() {
      this.showEdit = true;
      this.isNew = true;
    },

    //保存分类
    saveCatalog() {
      let isNew = this.isNew;
      let catalogs = this.catalogs;
      console.log(catalogs);
      if (catalogs.name === "" || catalogs.desc === "") {
        this.$message("内容为空不可提交");
        return;
      }
      addCatalog(catalogs)
        .then(res => {
          console.log(res);
          if (res.code == "ok") {
            this.showEdit = false;
            this.$message({
              showClose: true,
              message: "新建分类成功！",
              type: "success"
            });
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
.box {
  width: 100%;
  height: calc(100% - 70px);
  background: #ffffff;
  overflow: auto;
}
.head {
  height: 70px;
  width: 100%;
  background: #ffffff;
}
.head button {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 10px;
}
</style>
