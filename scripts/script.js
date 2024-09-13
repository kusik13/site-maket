$(window).scroll(function () {
      if ($(this).scrollTop() > 0) {
      	$('.up').fadeIn();
     } else {
     	$('.up').fadeOut();
     }
});
$(function(){
	$('.up').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 1000);
	});

});

let form = document.querySelector("form");
  
  async function handleSubmit(event) {
    event.preventDefault();
    let status = document.getElementById("my-form-status");
    let data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        status.innerHTML = "Дякуємо за замовлення. Наш менеджер зв'яжеться з вами у найближчий час";
        form.reset()
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form"
          }
        })
      }
    }).catch(error => {
      status.innerHTML = "Oops! There was a problem submitting your form"
    });
  }
  form.addEventListener("submit", handleSubmit)