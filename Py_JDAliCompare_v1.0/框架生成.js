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


function addIframe1() {
        // 创建 iframe 元素
        var iframe = document.createElement("iframe");

        // 设置 iframe 属性
        iframe.width = "900";
	    iframe.src = searchOnJD();
        iframe.height = "900";

        // 添加 iframe 元素到 HTML 页面中的 myDiv 元素中
        myDiv.appendChild(iframe);
      }


function addIframe2() {
        // 创建 iframe 元素
        var iframe = document.createElement("iframe");

        // 设置 iframe 属性
        iframe.src = searchOnTaobao();
        iframe.width = "900";
        iframe.style.height = "900";

        // 添加 iframe 元素到 HTML 页面中的 myDiv 元素中
        myDiv.appendChild(iframe);
      }
