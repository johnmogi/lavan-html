function init() {

    window.addEventListener('scroll', function (e) {
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 300;

        var header = document.getElementsByTagName("header");
        if (distanceY > shrinkOn ) {
               $("header").addClass("smaller");
            
        }  if (distanceY < shrinkOn)  {
             $("header").removeClass("smaller"); 
        }else{
      
        }
    });
}
// window.onload = init();
document.readyState = init();
