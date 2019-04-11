var gender = '';
var age = '0';
var insurance = document.getElementById("c-ins");
var item = $(".item");
var txtage = document.getElementById("txtage");
var initialSlide = 16;

$(document).ready(function(){

	$('.sliderAge').slick({
        centerMode: true,
		slidesToShow: 5,
		arrows: false,
        nextArrow: false,
        prevArrow: false,
        draggable: true,
        infinite: true,
        swipeToSlide: true,
        slidesToScroll: 1,
        speed: -30,
        responsive: [
		    {
		    	breakpoint: 768,
		    	settings: {
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 3,
                    prevArrow: false,
                    nextArrow: false,
                    infinite: true,
                    swipeToSlide: true,
                    swipe: true
                }
		    },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 3,
                    prevArrow: false,
                    nextArrow: false,
                    infinite: true,
                    swipeToSlide: true,
                    swipe: true
                }
            }
		]
    });

	//Fix bug prev slide: https://github.com/kenwheeler/slick/issues/2002
    $('.sliderAge').each(function() {
        this.slick.getNavigableIndexes = function() {
            var _ = this,
                breakPoint = 0,
                counter = 0,
                indexes = [],
                max;

            if (_.options.infinite === false) {
                max = _.slideCount;
            } else {
                breakPoint = _.options.slideCount * -1;
                counter = _.options.slideCount * -1;
                max = _.slideCount * 2;
            }

            while (breakPoint < max) {
                indexes.push(breakPoint);
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }

            return indexes;
        };
    });


    $('.sliderAge').on('swipe', function(event, slick, direction) {
        var newValue = slick.currentSlide+16;
        age = newValue;
        
        //ตรวจสอบเพศ
	  	if (gender != "") {
	  		$("#c-ins").removeClass("txtresult_error");
	  		fwdCalculate(age, gender);
	  	}else{
	  		$("#c-ins").addClass("txtresult_error");
	  		insurance.innerHTML = "กรุณาเลือกเพศ";
	  	}
        
    });
});

function getGender($gen){
	$(this).addClass('active');
	$("#c-ins").removeClass("txtresult_error");

	gender = $gen;
	fwdCalculate(age, gender);
}

function fwdCalculate($gage, $ggen){

	$.getJSON("./js/cancer2.json", function(json) {
	    insjson = json;

	    $.each(insjson, function(k, v){	  
	    	for (var key in v) {
	    	  	if ($gage == v.age) {
	    	  		if ($ggen == 'm') {
	    	  			insurance.innerHTML = v.male;
	    	  		}else{
	    	  			insurance.innerHTML = v.female;
	    	  		}
				}
	    	}
		});
	});
}
