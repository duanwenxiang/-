var jobModel = require("../model/job");
// 存入数据到数据库
let addjob = (req,res)=>{
    let {jobname,jobmoney,jobexp,companyname} = req.body;
    let path = req.files.logo[0].path;
    let reg = /public\\img\\(.+)/;
    let newPath = path.replace(reg,($0,$1)=>{
        var str = "http://localhost:3000/img/";
        return str += $1;
    })
    jobModel.addJob({jobname,jobmoney,jobexp,companyname,logo:newPath},(data)=>{
        if(data){
            res.json({
                status:true,
                info:"存入数据库成功"
            })
        }else{
            res.json({
                status:false,
                info:"存入数据库失败"
            })
        }
    })
}
// 取出数据到页面
let getjob = (req,res)=>{
    jobModel.getJob({},(data)=>{
        if(data){
            res.json({
                status:true,
                info:"查找数据成功！",
                data
            })
        }else{
            res.json({
                status:false,
                info:"查找数据失败！"
            })
        }
    })
}
// 删除数据
let removejob = (req,res)=>{
    let {id} = req.body;
    console.log(id);
    jobModel.removeJob({_id:id},(info)=>{
        if(info){
            res.json({
                status:true,
                info:"删除成功！"
            })
        }else{
            res.json({
                status:false,
                info:"删除失败！"
            })
        }
    })
}
// 获取修改时职位的信息
const rejob = (req,res)=>{
    let {id} = req.body;
    jobModel.getJob({_id:id},(data)=>{
        if(data){
            res.json({
                status:true,
                info:"数据取出成功！",
                data
            })
        }else{
            res.json({
                status:false,
                info:"数据取出失败！"
            })
        }
    })
}
// 修改数据库的资源信息
const rejobBtn = (req,res) =>{
    let {jobname,jobmoney,jobexp,companyname,_id} = req.body;
    let path = req.files.logo[0].filename;
    let str  = "http://localhost:3000/img/" + path;
    jobModel.reviseJob({_id},{jobname,jobmoney,jobexp,companyname,logo:str},(data)=>{
        if(data){
            res.json({
                status:true,
                info:"数据修改成功！"
            })
        }else{
            res.json({
                status:false,
                info:"数据修改失败！"
            })
        }       
    })
}
// 跳过多少条数据，显示多少条数据
const pagejob = (req,res) =>{
    let {curr,limit} = req.body;
    let Curr = (curr - 1) * limit;
    let Limit = limit * 1;
    jobModel.pageJob(Curr,Limit,(data)=>{
        if(data){
            res.json({
                status:true,
                info:"分页成功！",
                data
            })
        }else{
            res.json({
                status:false,
                info:"分页失败！"
            })
        }
    })
}
// 数据的总和
const sumjob = (req,res) =>{
    jobModel.sumJob((data)=>{
        if(data){
            res.json({
                status:true,
                info:"数据总和获取成功！",
                data
            })
        }else{
            res.json({
                status:false,
                info:"数据总和获取失败！"
            })
        }
    })
}
// 获取数据总条数
module.exports = {
    addjob,
    getjob,
    removejob,
    rejob,
    rejobBtn,
    pagejob,
    sumjob
}