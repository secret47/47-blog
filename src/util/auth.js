const getAuth = localStorage.getItem('role')
const currentAuth = new Array();
currentAuth.push(getAuth)
console.log(currentAuth,'===')
//得到当前的auth
export function getCurrentAuth(){
    return currentAuth
}

//判断当前的auth
export function check(auth){
    const current = getCurrentAuth();
    return current.some(item=>auth.includes(item))
}

export function isLogin(){
    const current = getCurrentAuth();
    return current && current[0] != "user"
}