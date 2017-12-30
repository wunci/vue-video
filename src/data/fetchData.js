const baseUrl = 'http://vue.wclimb.site/vi/'
// 首页初始化数据
export const initHome = () => fetch(baseUrl+'list').then(response => response.json())

// 验证码
export const yzmChange = () => fetch(baseUrl+'yzm/img').then(response => response.text())

// 注册登录
export const signin = ( name , pass ) => fetch(baseUrl+'signin', {
    method: "POST",
    body: JSON.stringify({ userName: name, password: pass}),
    mode: "cors",
}).then(function(response) {
    return  response.text()
})
// 检查登录信息
export const checkUser = (name, token) => fetch(baseUrl + 'checkUser', {
    method: "POST",
    body: JSON.stringify({ userName: name, token: token }),
    mode: "cors",
}).then(function (response) {
    return response.text()
})
// 个人评论
export const meComment = (name) => fetch(baseUrl+'comment/user?name='+ name).then(response => response.json())

// 获取喜欢不喜欢数据
export const meLike = ( name ) => fetch(baseUrl+'like/list?name='+ name).then(response => response.json())

// 删除评论
export const meDelete = ( id ) => fetch(baseUrl+'delete/comment/'+id,{
    method: 'POST',
    mode:'cors'
}).then(response=>{
    return response.text()
})

// 上传头像
export const uploadAvator = ( name , val ) => fetch(baseUrl+'avator?name='+name,{
    method:'POST',
    body: JSON.stringify({avator:val}),
    mode:'cors',
}).then(response=>{
    return response.text()
})
// 获取头像
export const getAvator = ( name) => fetch(baseUrl+'avator/list?name='+name).then(response=>{return response.text()})
               
// 编辑用户名
export const editNameData = ( oldName , newName) =>  fetch(baseUrl+'edit/user?name='+ oldName, { 
    method:'POST',
    body: JSON.stringify({
        newName:newName
    }),
    mode:'cors',
    }).then(response=>{
        return response.text()
})

// 搜索
export const search = ( val ) =>  fetch(baseUrl+'search/result?val='+ val).then(response => response.json())

// 获取单个video数据
export const singleVideoData = ( id ) => fetch(baseUrl+''+id).then(response => response.json())

// 获取评论
export const getVideoComment = ( id ) => fetch(baseUrl+''+id+'/comment').then(response => response.json())

// 初始化单个video的like信息（判断用户当前的选项）
export const getInitVideoLikeData = ( id , userName ) =>fetch(baseUrl+''+id+'/like?name='+userName).then(response => response.text())

// 提交用户选择like数据
export const postVideoLikeData = (id, likeData , userName , videoName , videoImg , star ) => fetch(baseUrl+''+ id +'/like', {
    method: "POST",
    body: JSON.stringify({
        like: likeData ,
        userName: userName, 
        videoName: videoName,
        videoImg: videoImg, 
        star: star
    }),
    mode: "cors",
}).then(function(response) {
    return  response.text()
})

// 发表评论
export const reportComment = (id, userName , comment , videoName , avator) => fetch(baseUrl+''+ id +'/comment', {
    method: "POST",
    body: JSON.stringify({ 
        userName: userName,
        //date: date,
        content: comment,
        videoName: videoName,
        avator: avator
    }),
    mode: "cors" 
}).then(function(response) {
    return  response.text()
})

