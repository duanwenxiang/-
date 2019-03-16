function JobList(){
    this.container = $(".container");
    this.init()
}

JobList.prototype = {
    init(){
        this.SumJob();
    },
    SumJob(){
        $.ajax({ 
            type: "post",
            url: "/job/sumjob",
            success:this.SumJobSuccess.bind(this)
        })
    },
    SumJobSuccess(data){
        if(data.status){
            this.handleLayui(data);
        }
    },
    handleLayui(data){
        layui.use('laypage', ()=>{
            // 使用分页模块
            let laypage = layui.laypage;
            // 分页的配置项
            laypage.render({
                // 输入ID，让块成为分页形式
                elem : 'page',
                // 数据的总数是多少
                count : data.data,
                // 每页显示的条数
                limit : 3,
                // 页面上出现的页码数
                groups : 3,
                // 返回的参数
                jump: this.createDom.bind(this)
            })
        })
    },
    createDom(obj){
        //obj包含了当前分页的所有参数，比如：
        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据
        // console.log(obj.limit); //得到每页显示的条数
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
            this.el.html(JobTemplate);
        }
        // 删除DOM的事件
        this.removeDom();
        // 修改的点击事件
        this.reBtn();
        // 修改退出的点击事件
        this.ReOutBtn();
    },
    // 删除
    removeDom(){
        var _this = this;
        this.el.find(".remove_Btn").on("click",_this,this.removeBtn)
    },
    removeBtn(e){
        var flag = confirm("您确定删除吗？");
        if(flag){
            var id = $(this).parent().parent().attr("data");
            $.ajax({
                type:"post",
                url:"/job/removejob",
                data:{id},
                dataType:"json",
                success:e.data.removeBtnSuccess.bind(e.data)
            })
        }
    },
    removeBtnSuccess(info){
        if(info.status){
            this.SumJob();
        }
    },
    reBtn(){
        var _this = this;
        this.el.find(".re_Btn").on("click",_this,this.handleReBtn)
    },
    handleReBtn(e){
        var id = $(this).parent().parent().attr("data");
        $.ajax({
            type:"post",
            url:"/job/rejob",
            data:{id},
            dataType:"json",
            success:e.data.rejobSuccess.bind(e.data)
        })
        $(".add_re").show();
    },
    rejobSuccess(data){
        if(data.status){
            $("#job_re_name").val(data.data[0].jobname);
            $("#job_re_money").val(data.data[0].jobmoney);
            $("#job_re_exp").val(data.data[0].jobexp);
            $("#company_re_name").val(data.data[0].companyname);
            $("#add_re").attr("data",data.data[0]._id);
        }
    },
    ReOutBtn(){
        $("#Out_re").on("click",this.handleReOutBtn);
    },
    handleReOutBtn(){
        $(".add_re").hide();
    }
}