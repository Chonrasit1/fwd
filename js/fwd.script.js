var path_form = "gates/phpmail.php";
var checktext = 1;

$(document).ready(function(){
	
	$("#firstname").keyup(function(){
        var gettext = $(this).val();
        var reText = /[A-Za-zก-๙]/g;
        var reNumber = /[0-9]/g;
        var textvalue = gettext.match(reText);
        var numbervalue = gettext.match(reNumber);
        var formalert = $("#formalert");
        var text, newtext;

        if (textvalue) {
            formalert.slideUp(600);
            checktext = 0;

            text = textvalue.toString(); 
            newtext = text.replace(/,/g,"");
            document.getElementById("firstname").value = newtext;

        }else if(numbervalue){
            textalert("กรุณากรอกเฉพาะตัวหนังสือ");
            btnsend.setAttribute("disabled","");
            checktext++;
        }
    });

    $("#lastname").keyup(function(){
        var gettext = $(this).val();
        var reText = /[A-Za-zก-๙]/g;
        var reNumber = /[0-9]/g;
        var textvalue = gettext.match(reText);
        var numbervalue = gettext.match(reNumber);
        var formalert = $("#formalert");
        var text, newtext;

        if (textvalue) {
            formalert.slideUp(600);
            checktext = 0;

            text = textvalue.toString();
            newtext = text.replace(/,/g,""); 
            document.getElementById("lastname").value = newtext;

        }else if(numbervalue){
            textalert("กรุณากรอกเฉพาะตัวหนังสือ");
            btnsend.setAttribute("disabled","");
            checktext++;
        }
    });

    $("#mobile").keyup(function(){
        var gettext = $(this).val();
        var reText = /[0-9]/g;
        var textvalue = gettext.match(reText);
        var formalert = $("#formalert");
        var text, newtext;

        if (textvalue) {
            formalert.slideUp(600);
            checktext = 0;

            text = textvalue.toString(); 
            newtext = text.replace(/,/g,""); 
            document.getElementById("mobile").value = newtext;
        }else{
            textalert("กรุณากรอกเฉพาะตัวเลข");
            btnsend.setAttribute("disabled","");
            checktext++;
        }
    });

    $("#checkconfirm").change(function(){
        var value = checkform();
        var btnsend = document.getElementById("btnsend");
        if($(this).context.checked == true) {
            if(value == 0 && checktext == 0){
                btnsend.removeAttribute("disabled");
            }else{
                btnsend.setAttribute("disabled","");
            }
        }else{
            btnsend.setAttribute("disabled","");
        }
    });

    $("select").change(function(){
        var btnsend = document.getElementById("btnsend");
        var checkconfirm = document.getElementById("checkconfirm");
        var checkvalue = $(this).val();
        console.log(checkvalue);

        if (checkvalue != 0) {
            $(this).addClass("selectChange");
        }else{
            $(this).removeClass("selectChange");
        }
       
    });

});

function sendform(){
    var arrayform = $("#fwddata").serializeArray();
    var checkconfirm = document.getElementById("checkconfirm");
    var formData = new FormData();

    var value = checkform();

    if(value == 0 && checktext == 0) {

        if(checkconfirm.checked){

            $.each(arrayform, function( key, field) {
                formData.append(field.name, field.value);
            });
            
            $.ajax({
                url: path_form,
                type: "POST",
                data: formData,
                dataType: "json",
                success: function(data){
                    textalertform(data[0].status);
                },
                cache: false,
                contentType: false,
                processData: false
            });

            fbq('track', 'CompleteRegistration');
			gtag('event', 'conversion', {'send_to': 'AW-857335301/z495CNe49XQQhcznmAM'});
            
        }else{
            textalert("กรุณายอมรับข้อตกลง");
        }

    }else{
        textalert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
}

function checkform(){
    var btnsend = document.getElementById("btnsend");
    var btnsendAttr = document.getElementById("btnsend");
    var arrayform = $("#fwddata").serializeArray();
    var err = 0;

    for(var v in arrayform){
        console.log(arrayform[v].name);
        if (!arrayform[v].value) {
            $("input[name^="+arrayform[v].name+"]").addClass("alertform");
            textalert("กรุณากรอกข้อมูลให้ครบถ้วน");
            err += 1;
        }else{

            if(arrayform[v].name == "mobile"){
                var re = /[0-9]/g;
                var checkphone = arrayform[v].value.match(re);

                if (checkphone) {
                    number = checkphone.toString(); 
                    newnumber = number.replace(/,/g,""); 
                    document.getElementById("mobile").value = newnumber; 
                }else{
                    textalert("กรุณากรอกเฉพาะตัวเลข");
                    btnsend.setAttribute("disabled","");
                    checktext++;
                }
            }

            if (arrayform[v].value == "จังหวัด" || arrayform[v].value == "0") {
                $("select[name^="+arrayform[v].name+"]").addClass("alertform");
                textalert("กรุณากรอกข้อมูลให้ครบถ้วน");
                err += 1;
            }else{
                if ($("input[name^="+arrayform[v].name+"]").hasClass("alertform")) {
                    $("input[name^="+arrayform[v].name+"]").removeClass("alertform");
                }

                if ($("select[name^="+arrayform[v].name+"]").hasClass("alertform")) {
                    $("select[name^="+arrayform[v].name+"]").removeClass("alertform");
                }

                if (btnsendAttr.hasAttribute("disabled")) {
                    btnsend.removeAttribute("disabled");
                }
                
            }
        }//end else

    }

    return err;
}


function textalert(txt){
    var formalert = $("#formalert");
    var txtalert = document.getElementById("formalert");

    txtalert.innerHTML = txt;
    formalert.slideDown(600);
}

function textalertform(txt){
    var formalert = $("#formalert");
    var txtalert = document.getElementById("formalert");
    var btntxt = $("#btnsend");
    var btnsendAttr = document.getElementById("btnsend").hasAttribute("disabled");
    var btnsend = document.getElementById("btnsend");
    var settext = "";

    if (txt == "success"){
        settext = "ขอบคุณสำหรับข้อมูล เจ้าหน้าที่จะทำการติดต่อกลับภายใน 3 วันทำการ";
        formalert.css("color", "#2dc51e"); 
        if (btnsendAttr) {
            btnsend.removeAttr("disabled");
        }
    }else{
        settext = "เกิดข้อผิดพลาด ขออภัยในความไม่สะดวก";
        formalert.css("color", "red");
    }

    txtalert.innerHTML = settext;
    formalert.slideDown(600);
    btntxt.text("ส่งข้อมูลเรียบร้อยแล้ว");
    btntxt.css("color", "#333333");
    btnsend.setAttribute("disabled","");
}


