function Login(container){
    this.container = container;
    this.init();
}

Login.template = `<div class="login">
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
                                <button type="submit" class="btn btn-primary" id="login_btn">登录</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-2">
                                <button type="button" class="btn btn-info index-btn" id="login-btn">注册</button>
                                <button type="button" class="btn btn-danger index-btn">忘记密码！</button>
                            </div>
                        </div>
                    </form>
                </div>`

Login.prototype = {
    init:function(){
        this.createDom();
        this.LoginBtn();
        this.loginbtn();
    },
    createDom:function(){
        this.container.append(Login.template);
    },
    LoginBtn(){
        this.container.find("#login-btn").on("click",$.proxy(this.handleBtn,this))
    },
    handleBtn(){
        new Page().createContent(false);
    },
    loginbtn(){
        this.container.find("#login_btn").on("click",this.handleLoginBtn.bind(this))
    },
    handleLoginBtn(){
        let user = {
            uname : this.container.find("#uname").val(),
            pwd : this.container.find("#pwd").val()
        }
        $.ajax({
            type:"post",
            url:"/api/login",
            data:user,
            dataType:"json",
            async:false,
            success:this.LoginSuccess.bind(this)
        })
        return false;
    },
    LoginSuccess(data){
        if(data.stauts){
            alert("登录成功！")
            window.location.href = "http://localhost:3000/html/admin.html";
        }else{
            alert("账号密码错误！")
        }
    }
}