import request from "../util/request";
import axios from "axios";

export const login = (username, password) => {
  return request({
    url: "/user/login",
    method: "post",
    data: {
      username,
      password
    }
  });
};

//得到用户资料
export const getInfo = uid => {
  return request({
    url: "/user/getInfo",
    method: "get",
    params: {
      uid
    }
  });
};

//更改用户资料
export const changeUserInfo = data => {
  return request({
    url: "/user/updateInfo",
    method: "post",
    data
  });
};


export const getRole = uid => {
  return request({
    url: "/user/getRoles",
    method: "get",
    params: {
      uid
    }
  })
}