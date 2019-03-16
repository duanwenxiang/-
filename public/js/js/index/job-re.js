function jobRe(){
    this.el = $("#add_re");
    this.init();
}

jobRe.prototype = {
    init(){
        this.ReBtn();
    },
    ReBtn(){
        this.el.find(".AddBtn_re").on("click",this.handleReBtn.bind(this))
    },
    handleReBtn(){
        let jobName = this.el.find("#job_re_name").val();
        let jobMoney = this.el.find("#job_re_money").val();
        let jobExp = this.el.find("#job_re_exp").val();
        let companyName = this.el.find("#company_re_name").val();
        let logo = this.el.find("#logo_re");
        let id = this.el.attr("data");
        // 创建formData 模拟表单提交数据  有兼容性问题
        let formData = new FormData();
        formData.append("jobname",jobName);
        formData.append("jobmoney",jobMoney);
        formData.append("jobexp",jobExp);
        formData.append("companyname",companyName);
        formData.append("logo",logo[0].files[0]);
        formData.append("_id",id);

        $.ajax({
            type:"post",
            url:"/job/rejobBtn",
            data:formData,
            cache:false,
            contentType:false,
            processData:false,
            success:this.handleReBtnSuccess.bind(this)
        })
    },
    handleReBtnSuccess(data){
        if(data.status){
            new JobList().createDom();
            this.el.hide();
        }
    }
}

new jobRe();