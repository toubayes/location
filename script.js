// ------------------------------------------------------------------------------------------------------
// navigator.geolocation  يستخدم لتحقق إن كان متصفح وجهاز مستخدم يدعم خاصية تحديد مواقع              
// navigator.geolocation.getCurrentPosition()يستخدم لطلب صلاحية وصول إلى موقع من المستخدم
//                                            ولحصول على معلومات متعلقة بالموقع المستخدم
// ------------------------------------------------------------------------------------------------------
// navigator.geolocation.watchPosition() يستخدم للحصول على موقع مستخدم ويتم تحديث موقع بالاستمرار                                         
// ------------------------------------------------------------------------------------------------------
// navigator.geolocation.clearWatch(id); يستخدم لإيقاف تتبع مستخدم | ايقاف عرض موقع مستخدم بشكل مباشر
// ------------------------------------------------------------------------------------------------------
// https://www.openstreetmap.org/export/embed.html?bbox=,&;layer=mapnik

var ischaring =false;
var sharelocation;


document.querySelector('.getlocation').onclick= ()=>{
    sharelocation=navigator.geolocation.watchPosition(
        function(position){
            
            document.querySelector('.map').innerHTML=`
            <iframe height="400" width="100%" src="https://www.openstreetmap.org/export/embed.html?bbox=${position.coords.longitude},${position.coords.latitude}&;layer=mapnik">
             </iframe> `
        },
        function(error){
            switch(error.code){
                case error.PERMISSION_DENIED:
                    document.querySelector(".alert").innerHTML=
                    `<div class="alert alert-danger" role="alert" style="font-weight:bold;">
                    User denied the request for Geolocation.
                  </div>`;
                    break;
                case error.UNKNOWN_ERROR:
                    document.querySelector(".alert").innerHTML=
                    `<div class="alert alert-danger" role="alert" style="font-weight:bold;">
                    Location information is unavailable
                  </div>`;
                    break;
            }
        }
    )
    
    if (ischaring == false) {
        console.log("sharelocation")
        document.querySelector('.getlocation').innerHTML="stop sharingg";
        document.querySelector(".alert").innerHTML=
            `<div class="alert alert-info" role="alert" style="font-weight:bold;">
        you location start sharing
      </div>`;
        ischaring = true;
    }else{    
            navigator.geolocation.clearWatch(sharelocation);
        console.log("removed" + navigator.geolocation.clearWatch(sharelocation))
        document.querySelector('.getlocation').innerHTML="start shharing";
        document.querySelector(".alert").innerHTML=
        `<div class="alert alert-danger" role="alert" style="font-weight:bold;">
    you location stop sharing
  </div>`;
        ischaring =false;
    }
}