function Admin(){
    this.init()
}

Admin.prototype = {
    init(){
        this.AdminBtn()
    },
    AdminBtn(){
        $(".tab>div").on("click",this.BackgroundColor)
    },
    BackgroundColor(){
        $(this).addClass("active").siblings().removeClass("active");
        if($(this).index() == 2){
            new Job();
            $("#page").hide();
        }else if($(this).index() == 1){
            new JobList();
            $("#page").show();
        }
    }
}

new Admin();