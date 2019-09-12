jQuery(document).ready(function($) {

	$(window).on('load', function () {
		var $preloader = $('#p_prldr'),
		$svg_anm   = $preloader.find('.svg_anm');
		$svg_anm.fadeOut();
		$preloader.delay(500).fadeOut('slow');
	});

	$(".zakas-uslug").on("click",function(e){
		var popup_uslugi = $(".form-wrap");
		if(e.target!= popup_uslugi[0] && !popup_uslugi.has(e.target).length){
			$(this).slideUp();
		}
	});



	$('#true_loadmore').click(function(){
		$(this).text('Загрузка...'); // изменяем текст кнопки, вы также можете добавить прелоадер
		var data = {
			'action': 'loadmore',
			'query': true_posts,
			'page' : current_page
		};
		$.ajax({
			url:ajaxurl, // обработчик
			data:data, // данные
			type:'POST', // тип запроса
			success:function(data){
				if( data ) { 
					$('#true_loadmore').text('Загрузить ещё').before(data); // вставляем новые посты
					current_page++; // увеличиваем номер страницы на единицу
					if (current_page == max_pages) $("#true_loadmore").remove(); // если последняя страница, удаляем кнопку
				} else {
					$('#true_loadmore').remove(); // если мы дошли до последней страницы постов, скроем кнопку
				}
			}
		});
	});

	$('.heade-mnu   li.menu-item-has-children > a').before('<div class="before-icon">&raquo;</div>');
	$('.menu-navesnoe   li.menu-item-has-children > .sub-menu > li.menu-item-has-children > a').before('<div class="before-icon">&raquo;</div>');

	if (window.innerWidth <= 1200) {
		document.querySelectorAll('.before-icon').forEach((item)=> {
			item.addEventListener('click', function() {
				this.parentNode.parentNode.querySelectorAll('.active-menu-item').forEach(function(item){
					item.querySelectorAll('.active-menu-item').forEach(function(item){
						item.classList.remove('active-menu-item');
					});
					item.classList.remove('active-menu-item');
				});
				this.parentNode.classList.add('active-menu-item');
			})
		});
	}


});

var index = 1;
showSlides(index);
function plus(n){
	showSlides(index += n);
}
function current(n){
	showSlides(index = n);
}
function showSlides(n){
	var i = 0;
	var slaidiki = document.getElementsByClassName("slaidik");
 //console.log(slaidiki);
 var dots = document.getElementsByClassName("dot");
 //console.log(dots.length);
 if(n > slaidiki.length){
 	index = 1;
 }
 if(n < 1){
 	index = slaidiki.length;
 }
 for(i = 0; i < slaidiki.length; i++){
 	slaidiki[i].style.display = "none";
 }
 for(i = 0; i < dots.length; i++){
 	dots[i].classList.remove("dots-active");
 }
 slaidiki[index - 1].style.display = "block";
 dots[index - 1].classList.add("dots-active");
}

