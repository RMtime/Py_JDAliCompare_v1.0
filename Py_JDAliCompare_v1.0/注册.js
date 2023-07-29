// JavaScript Document
window.onload = function() {
  drawWatermark();
};


function drawWatermark() {
    var canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    canvas.style.position = 'fixed';
    canvas.style.top = '0px';
    canvas.style.left = '500px';
    canvas.style.zIndex = '999';
    canvas.style.pointerEvents = 'none';

    var ctx = canvas.getContext('2d');
    ctx.font = '30px Arial';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillText("RMtime", 50, 150);

    document.body.appendChild(canvas);
}


function register(){
	var name = document.getElementsByName("user")[0].value
	var gender = document.getElementsByName("gender")[0].value
	var email = document.getElementsByName("email")[0].value
	var age = document.getElementsByName("age")[0].value
	var degree = document.getElementsByName("degree")[0].value
	var username = document.getElementsByName("username")[0].value
	var code = document.getElementsByName("code")[0].value
	fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, code: code, gender: gender, email:email, age:age, degree:degree, username:username })
            })
            .then(response => response.json())
            .then(data => {       
                if (data.success) {
                    alert("注册成功！");
					window.open('index.html', '_blank');
                } else {
                    alert("用户名已存在！请更改！");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
}
