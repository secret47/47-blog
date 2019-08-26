import { login, getInfo,getRole } from "../../api/user";

const user = {
  state: {
    token: "",
    userInfo: [],
    userRole:""
  },
  mutations: {
    set_token: (state, token) => {
      state.token = token;
    },
    set_info: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    set_role:(state,userRole) =>{
      state.userRole = userRole
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(res => {
            const data = res.data;
            commit("set_token", data.token);
            window.localStorage.setItem("uid", data.uid);
            window.localStorage.setItem("token", data.token);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    //得到用户资料
    GetUserInfo({ commit }, id) {
      return new Promise((resolve, reject) => {
        getInfo(id)
          .then(res => {
            const data = res.data;
            const jsonData = JSON.stringify(data);
            commit("set_info", jsonData);
            window.localStorage.setItem("userInfo", jsonData);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getUserRole({commit},id){
      return new Promise((resolve, reject) => {
        getRole(id)
          .then(res => {
            console.log(res)
            const data = res.data;
            localStorage.setItem('role',data)
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }
};

export default user;
