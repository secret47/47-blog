<template>
  <div>
    <div class="hi">
      {{hiText}}{{userInfo.nickname}}
    </div>
    <el-row :gutter="24">
      <el-col :span="8">
        <div class="item">
          <p>今日访问量</p>
          <div class="today">
            10001
          </div>
          <div class="charts" id="pvChart"></div>
          <p class="total">总访问量:14000</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item">
          <p>今日评论数</p>
          <div class="today">
            3
          </div>
          <div class="charts" id="remarkChart"></div>
          <p class="total">总评论:20</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item">

        </div>
      </el-col>
    </el-row>
    <div class="new">
      <div class="remark">
        <el-divider content-position="left">最新评论</el-divider>
        <div v-if="noRemark" class="noData">
          暂时没有新的评论
        </div>
        <div v-for="(item,index) in remarkDate" :key="index" class="remarkItems" v-else>
          <div class="leftThing">
            <span class="name">{{item.nickname}}</span> 给
            <span class="title">《{{item.title}}》</span> 留言说
            <span class="content">{{item.container}}</span>
          </div>
          <div class="date">{{item.createDate}}</div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { getNewRemark } from "../../../api/system.js";
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      hiText: "早上好",
      currentTime: "",
      calendar: new Date(),
      remarkDate: [],
      noRemark: true
    };
  },
  computed: {
    ...mapState({
      userInfo: function(state) {
        return state.user.userInfo;
      }
    })
  },
  watch: {
    userInfo: function(val) {}
  },
  mounted() {
    this.getCurrentTime();
    // this.getPVCharts();
    // this.getMarkCharts();
    this.getRemark();
  },
  methods: {
    getRemark() {
      getNewRemark().then(res => {
        console.log(res);
        let data = res.data;
        data.forEach(item => {
          item.createDate = this.$moment(data.createDate).format("MM/DD HH:mm:ss");
        });
        this.remarkDate = data;
      });
    },
    //得到当前的时间
    getCurrentTime() {
      let date = new Date();
      let hour = date.getHours();
      if (hour < 6) {
        this.hiText = "凌晨好！";
      } else if (hour < 9) {
        this.hiText = "早上好！";
      } else if (hour < 12) {
        this.hiText = "上午好！";
      } else if (hour < 14) {
        this.hiText = "中午好！";
      } else if (hour < 17) {
        this.hiText = "下午好！";
      } else if (hour < 19) {
        this.hiText = "傍晚好！";
      } else if (hour < 22) {
        this.hiText = "晚上好！";
      } else {
        this.hiText = "难道又在加班吗？该休息了。";
      }
    },
    getCurrentWeather() {},
    getPVCharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("pvChart"));
      myChart.setOption({
        tooltip: {},
        xAxis: {
          show: false,
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周天"]
        },
        yAxis: {
          show: false,
          type: "value",
          splitLine: {
            show: false //不显示中间的横线
          }
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            areaStyle: {}
          }
        ]
      });
    },
    getMarkCharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("remarkChart"));
      myChart.setOption({
        tooltip: {},
        xAxis: {
          show: false,
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周天"]
        },
        yAxis: {
          show: false,
          type: "value",
          splitLine: {
            show: false //不显示中间的横线
          }
        },
        series: [
          {
            data: [0, 2, 3, 4, 7, 10, 20],
            type: "line",
            smooth: true,
            areaStyle: {
              color: "#3A8BFF"
            }
          }
        ],
        color: "3A8BFF"
      });
    }
  }
};
</script>
<style scoped>
.new {
  background: #ffffff;
  width: 90%;
  padding: 10px;
  margin-top: 10px;
}
.showContent {
  display: flex;
}
.item {
  background: #ffffff;
  height: 170px;
  padding: 10px 20px;
}
.item p {
  font-size: 13px;
  height: 30px;
  line-height: 30px;
  color: #888;
}
.item .today {
  height: 40px;
  line-height: 40px;
  font-size: 35px;
}
.charts {
  width: 100%;
  height: 80px;
}

.total {
  text-align: center;
}
.hi {
  height: 50px;
  line-height: 50px;
}
.name {
  display: inline-block;
  width: 60px;
  color: #01024e;
}
.title {
  display: inline-block;
  width: 200px;
  text-align: left;
  color: #8bbabb;
}
.content {
  color: #8bbabb;
}
.remarkItems {
  width: 100%;
  display: flex;
  height: 30px;
  line-height: 30px;
}
.date {
  width: 140px;
  float: right;
}
.leftThing {
  width: calc(100% - 140px);
}
.noData {
  font-size: 13px;
}
</style>
