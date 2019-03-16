let uname = Cookies.get('uname');
let token = Cookies.get("token");

if(!token){
    location.href = "http://localhost:3000"
}
if(uname){
    $("#uname_token").html(uname);
}


function LoginOut(){
    this.init()
}

LoginOut.prototype = {
    init(){
        this.OutBtn()
    },
    OutBtn(){
        $("#OutBtn").on("click",this.handleOutBtn.bind(this))
    },
    handleOutBtn(){
        Cookies.remove("token")
        location.reload();
    }
}

new LoginOut();