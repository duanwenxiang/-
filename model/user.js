const mongoose = require("../util/database").mongoose;

let user = mongoose.model("users",{
    uname:String,
    pwd:String
})

// 查
const userFind = (userInfo,cb)=>{
    user.findOne(userInfo).then(cb)
}

// 增
const userAdd = (userInfo,cb)=>{
    let User = new user(userInfo)
    User.save().then(cb)
}


module.exports={ 
    userFind,
    userAdd
}
