function Register(container){
    this.container = container;
    this.init();
}

Register.template = `<div class="login">
                    <form class="form-horizontal">
                        <div class="logo">
                            <img src="https://www.lgstatic.com/lp/static/images/logo-slogan_6187040.png" alt="">
                        </div>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">用户名</label>
                            <div class="col-sm-10">
                                <input type="input" class="form-control" id="uname" placeholder="请输入用户名">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" id="pwd" placeholder="请输入密码">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button type="" class="btn btn-primary" id="RegisterBtn">注册</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-2">
                                <button type="button" class="btn btn-info index-btn" id="register-btn">登录</button>
                                <button type="button" class="btn btn-danger index-btn">忘记密码！</button>
                            </div>
                        </div>
                    </form>
                    </div>`

Register.prototype = {
    init:function(){
        this.createDom();
        this.RegisterBtn();
        this.Register();
    },
    createDom:function(){
        this.container.append(Register.template)
    },
    RegisterBtn:function(){
        this.container.find("#register-btn").on("click",this.handleBtn.bind(this))  //bind改变函数内this的指向
    },
    handleBtn:function(){
        new Page().createContent(true);
    },
    Register:function(){
        this.container.find("#RegisterBtn").on("click",this.registerVal.bind(this))
    },
    registerVal:function(){
        let uname = this.container.find("#uname").val();
        let pwd = this.container.find("#pwd").val();
        let user = {
            uname,
            pwd
        }
        $.ajax({
            type:"post",
            url:"/api/register",
            data:user,
            dataType:"json",
            async:false,
            success:this.handleRegisterSuccess.bind(this)
        })
        return false;
    },
    handleRegisterSuccess(data){
        if(data.stauts){
            alert("注册成功！")
            new Page().createContent(true);
        }else{
            alert("用户名已存在！")
        }
    }
}