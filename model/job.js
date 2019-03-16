const mongoose = require("../util/database").mongoose;

let jobInfo = mongoose.model("jobInfos",{
    jobname:String,
    jobmoney:String,
    jobexp:String,
    companyname:String,
    logo:String,
})

// 增加
let addJob = (JobInfo,cb)=>{
    let Job = new jobInfo(JobInfo);
    Job.save().then(cb);
}

// 查找
let getJob = (JobInfo,cb) =>{
    jobInfo.find(JobInfo).then(cb)
}

// 删除
let removeJob = (JobInfo,cb) =>{
    jobInfo.remove(JobInfo).then(cb)
}

// 改
let reviseJob = (JobInfo,ReJobInfo,cb) =>{
    jobInfo.find().update(JobInfo,{$set:ReJobInfo}).then(cb)
}

// 跳过多少条数据，显示多少条数据
let pageJob = (N,M,cb) =>{
    jobInfo.find().skip(N).limit(M).then(cb)
}
// 获取数据库中的数据多少条
let sumJob = (cb) =>{
    jobInfo.find().count().then(cb)
}
module.exports = {
    addJob,
    getJob,
    removeJob,
    reviseJob,
    pageJob,
    sumJob
}