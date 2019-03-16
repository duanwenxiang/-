function Page(){
    this.container = $(".login-container");
    this.flag = true;
    this.init();
}

Page.prototype = {
    init:function(){
        this.createContent();
    },
    createContent:function(params = this.flag){
        this.container.html("");
        if(params){
            this.Login = new Login(this.container);
        }else{
            this.Register = new Register(this.container);
        }
    }
}

new Page();