function Layui(){
    this.container = $(".container");
    this.init();
}

Layui.prototype = {
    init(){
        this.handleLayui();
    },
    handleLayui(){
        layui.use('laypage', ()=>{
            // 使用分页模块
            let laypage = layui.laypage;
            // 分页的配置项
            laypage.render({
                // 输入ID，让块成为分页形式
                elem : 'page',
                // 数据的总数是多少
                count : 50,
                // 每页显示的条数
                limit : 3,
                // 页面上出现的页码数
                groups : 3,
                // 返回的参数
                jump: function(obj, first){
                    //obj包含了当前分页的所有参数，比如：
                    console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据
                    console.log(obj.limit); //得到每页显示的条数
                }
            })
        })
        this.createDom(obj);
    },
    createDom(obj){
        let curr = obj.curr;
        let limit = obj.limit;
        $.ajax({ 
            type: "post",
            url: "/job/joblist",
            data:{curr,limit},
            dataType: "json",
            success:this.createDomSuccess.bind(this)
        })
    },
    createDomSuccess(data){
        if(data.status){
            var JobTemplate = "";
            for(var i = 0;i < data.data.length;i ++){
                JobTemplate += `<ul class="Info_Job" data=${data.data[i]._id}>
                                    <img class="company_logo" src=${data.data[i].logo}>
                                    <li class="company_name">${data.data[i].companyname}</li>
                                    <li class="job_name"><p>${data.data[i].jobname}</p><p>${data.data[i].jobmoney}</p></li>
                                    <li class="job_exp">${data.data[i].jobexp}</li>
                                    <li class="job_btn"><button class="re_Btn">修改</button><button class="remove_Btn">删除</button></li>
                                </ul>`
            }
            this.el = $("<div class='Info_container'></div>");
            this.container.html(this.el);
            this.el.append(JobTemplate);
            this.el.append("<div id='page'></div>")
        }
        // 删除DOM的事件
        this.removeDom();
        // 修改的点击事件
        this.reBtn();
        // 修改退出的点击事件
        this.ReOutBtn();
    },
}