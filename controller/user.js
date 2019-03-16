const userModel = require("../model/user");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
// 注册方法
const register = (req,res) =>{
    let{uname,pwd} = req.body;
    
    userModel.userFind({uname},(data)=>{
        if(data){
            res.json({
                stauts:false,
                info:"用户名已存在！"
            })
        }else{
            let hash = crypto.createHash("sha256");
            hash.update(pwd);
            userModel.userAdd({uname,pwd:hash.digest("pwd")},()=>{
                res.json({
                    stauts:true,
                    info:"注册成功！"
                })
            })
        }
    })
}
// 登录的方法
const login = (req,res) => {
    let{uname,pwd} = req.body;
    userModel.userFind({uname},(data)=>{
        if(!data){
            res.json({
                stauts:false,
                info:"用户名不存在！"
            })
        }else{
            let hash = crypto.createHash("sha256");
            hash.update(pwd);
            if(data.pwd == hash.digest("pwd")){

                let token = jwt.sign({uname},"uname",{"expiresIn":"1h"})
                res.cookie("token",token)
                res.cookie("uname",uname)

                res.json({
                    stauts:true,
                    info:"登录成功！"
                })
            }else{
                res.json({
                    stauts:false,
                    info:"密码错误！"
                })
            }
        }
    })
}

module.exports = {
    register,
    login
}