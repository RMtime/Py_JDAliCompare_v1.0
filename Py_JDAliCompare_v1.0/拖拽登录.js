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


function handleDragStart(event) {
  // 将拖放的p元素的文本内容存储到dataTransfer对象中
  event.dataTransfer.setData('text/plain', event.target.innerText);
}


function handleDrop(event) {
  // 阻止默认行为
  event.preventDefault();

  // 获取拖放的文本内容
  const text = event.dataTransfer.getData('text/plain');

  // 将文本内容填充到input text中
  document.querySelector('input[type="text"]').value = text;
}


function checkLogin() {
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;
      // 这里可以将username和password与外部文件中的信息进行比对
      // alert("用户名：" + username + "\n密码：" + password);
	  // 发送登录请求到后端
      fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password })
            })
            .then(response => response.json())
            .then(data => {       
                if (data.success) {
                    alert("登录成功！");
					window.open('level2-1.html', '_blank');
                } else {
                    alert("用户名或密码错误！");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
	  
}


function opennew(){
	setKeyword();
	checkLogin();
}


function setKeyword(){
	var sBox = document.getElementById("searchBox").value;
	localStorage.setItem("keyWord", sBox);
}


function getKeyword(){
	var keyWord = localStorage.getItem("keyWord");
	return keyWord;
}


function searchOnJD() {
  // 获取文本框中的值
  var keyword = getKeyword();
  // 构造搜索 URL
  var searchURL = "https://search.jd.com/Search?keyword=" + keyword;
  return searchURL;
}


function searchOnTaobao() {
  // 获取文本框中的值
  var keyword = getKeyword();
  // 构造淘宝搜索链接
  var url = "https://s.taobao.com/search?q=" + keyword;
  return url;
}
