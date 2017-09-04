// 首页初始化数据
export const initHome = () => fetch('http://vue.wclimb.site/vi/list').then(response => response.json())

// 验证码
export const yzmChange = () => fetch('http://vue.wclimb.site/vi/yzm/img').then(response => response.text())

// 注册登录
export const signin = ( name , pass ) => fetch('http://vue.wclimb.site/vi/signin', {
                method: "POST",
                body: JSON.stringify({ userName: name, password: pass}),
                mode: "cors",
            }).then(function(response) {
                return  response.text()
            })

// 个人评论
export const meComment = (name) => fetch('http://vue.wclimb.site/vi/comment/user?name='+ name).then(response => response.json())

// 获取喜欢不喜欢数据
export const meLike = ( name ) => fetch('http://vue.wclimb.site/vi/like/list?name='+ name).then(response => response.json())

// 删除评论
export const meDelete = ( id ) => fetch('http://vue.wclimb.site/vi/delete/comment/'+id,{
                method: 'POST',
                mode:'cors'
            }).then(response=>{
                return response.text()
            })

// 上传头像
export const uploadAvator = ( name , val ) => fetch('http://vue.wclimb.site/vi/avator?name='+name,{
                method:'POST',
                body: JSON.stringify({avator:val}),
                mode:'cors',
            }).then(response=>{
              return response.text()
            })

// 编辑用户名
export const editNameData = ( oldName , newName) =>  fetch('http://vue.wclimb.site/vi/edit/user?name='+ oldName, { 
                method:'POST',
                body: JSON.stringify({
                    newName:newName
                }),
                mode:'cors',
              }).then(response=>{
                return response.text()
              })

// 搜索
export const search = ( val ) =>  fetch('http://vue.wclimb.site/vi/search/result?val='+ val).then(response => response.json())

// 获取单个video数据
export const singleVideoData = ( id ) => fetch('http://vue.wclimb.site/vi/'+id).then(response => response.json())

// 获取评论
export const getVideoComment = ( id ) => fetch('http://vue.wclimb.site/vi/'+id+'/comment').then(response => response.json())

// 初始化单个video的like信息（判断用户当前的选项）
export const getInitVideoLikeData = ( id , userName ) =>fetch('http://vue.wclimb.site/vi/'+id+'/like?name='+userName).then(response => response.text())

// 提交用户选择like数据
export const postVideoLikeData = (id, likeData , userName , videoName , videoImg , star ) => fetch('http://vue.wclimb.site/vi/'+ id +'/like', {
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
export const reportComment = (id, userName , date , comment , videoName , avator) => fetch('http://vue.wclimb.site/vi/'+ id +'/comment', {
                method: "POST",
                body: JSON.stringify({ 
                    userName: userName,
                    date: date,
                    content: comment,
                    videoName: videoName,
                    avator: avator
                }),
                mode: "cors" 
            }).then(function(response) {
                return  response.text()
            })