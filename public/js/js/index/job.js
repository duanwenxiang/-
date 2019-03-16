function Job(){
    this.container = $(".container");
    this.init()
}

Job.template = `<ul class="add">
                <li><p>职业名称</p><input type="text" id="job_name" placeholder="请输入职位名称"></li>
                <li><p>薪资</p><input type="text" id="job_money" placeholder="薪资范围"></li>
                <li><p>要求</p><input type="text" id="job_exp" placeholder="招聘要求"></li>
                <li><p>公司名称</p><input type="text" id="company_name" placeholder="请输入公司名称"></li>
                <li><p>上传公司logo</p><input type="file" id="logo"></li>
                <li><button id="AddBtn">提交</button></li>
                </ul>`

Job.prototype = {
    init(){
        this.createDom();
        this.AddInfo();
    },
    createDom(){
        this.el = $("<div class='add_container'></div>")
        this.container.html(this.el);
        this.el.html(Job.template);
    },
    AddInfo(){
        this.el.find("#AddBtn").on("click",this.handleBtn.bind(this))
    },
    handleBtn(){
        let jobName = this.el.find("#job_name");
        let jobMoney = this.el.find("#job_money");
        let jobExp = this.el.find("#job_exp");
        let companyName = this.el.find("#company_name");
        let logo= this.el.find("#logo");

        // 创建formData 模拟表单提交数据  有兼容性问题
        let formData = new FormData();
        formData.append("jobname",jobName.val());
        formData.append("jobmoney",jobMoney.val());
        formData.append("jobexp",jobExp.val());
        formData.append("companyname",companyName.val());
        formData.append("logo",logo[0].files[0]);

        $.ajax({
            type:"post",
            url:"/job/addjob",
            data:formData,
            cache:false,
            contentType:false,
            processData:false,
            success:this.handleBtnSuccess.bind(this)
        })
    },
    handleBtnSuccess(data){
        if(data.status){
            alert("提交成功！")
        }else{
            alert("提交失败！")
        }
    }
}