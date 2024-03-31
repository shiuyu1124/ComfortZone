// 繪圖板區

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
//繪圖板控制開關
let painting = false;
//下筆第一點座標
let startPoint = { x: undefined, y: undefined };
//初始繪圖板大小
wh();

//特性檢測
if (document.body.ontouchstart !== undefined) {

    canvas.ontouchstart = function (e) {
        //[0]表示碰觸第一个位置
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        painting = true;
        if (EraserEnabled) {
            ctx.clearRect(x - 20, y - 20, 40, 40)
        }
        startPoint = { x: x, y: y };
    };
    canvas.ontouchmove = function (e) {
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        let newPoint = { x: x, y: y };
        if (painting) {
            if (EraserEnabled) {
                ctx.clearRect(x - 15, y - 15, 30, 30)
            } else {
                drawLine(startPoint.x, startPoint.y, newPoint.x, newPoint.y);
            }
            startPoint = newPoint;
        }
    };
    canvas.ontouchend = function () {
        painting = false;
    };
} else {
    // 按下滑鼠
    //滑鼠點擊事件（onmousedown）
    canvas.onmousedown = function (e) {
        let x = e.offsetX;
        let y = e.offsetY;
        painting = true;
        if (EraserEnabled) {
            ctx.clearRect(x - 15, y - 15, 30, 30)
        }
        startPoint = { x: x, y: y };
    };

    //    移動滑鼠
    //    滑鼠移動事件（onmousemove）
    canvas.onmousemove = function (e) {
        let x = e.offsetX;
        let y = e.offsetY;
        let newPoint = { x: x, y: y };
        if (painting) {
            if (EraserEnabled) {
                ctx.clearRect(x - 15, y - 15, 30, 30)
            } else {
                drawLine(startPoint.x, startPoint.y, newPoint.x, newPoint.y);
            }
            startPoint = newPoint;
        }
    };
    //    放開滑鼠
    //    滑鼠鬆開事件（onmouseup)
    canvas.onmouseup = function () {
        painting = false;
    };
}


/*****工具函数*****/
//    連接點
function drawLine(xStart, yStart, xEnd, yEnd) {
    //開始繪製路徑
    ctx.beginPath();
    //畫筆寬度
    ctx.lineWidth = 2;
    //起始位置
    ctx.moveTo(xStart, yStart);
    //停止位置
    ctx.lineTo(xEnd, yEnd);
    //繪圖路線
    ctx.stroke();
    //結束繪圖
    ctx.closePath();
}

//設定canvas的長寬和屏幕一致
function wh() {
    let pageWidth = document.documentElement.clientWidth;
    let pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
}

//控制橡皮擦開啟
let EraserEnabled = false;
eraser.onclick = function () {
    EraserEnabled = true;
    eraser.classList.add('active');
    brush.classList.remove('active');
    canvas.classList.add('eraser');
};
brush.onclick = function () {
    EraserEnabled = false;
    brush.classList.add('active');
    eraser.classList.remove('active');
    canvas.classList.remove('eraser');
};

//清空繪圖板
clear.onclick = function () {
    ctx.fillStyle = '#fcf9dc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

//保存
save.onclick = function () {
    let url = canvas.toDataURL('image/jpg');
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = '草稿纸';
    a.target = '_blank';
    a.click()
};

//變換畫筆顏色及滑鼠樣式
black.onclick = function () {
    ctx.strokeStyle = 'black';
    canvas.classList.add('cursor1');
    canvas.classList.remove('cursor2');
    canvas.classList.remove('cursor3');
    canvas.classList.remove('cursor4');
    canvas.classList.remove('cursor5');
    canvas.classList.remove('eraser');
    EraserEnabled = false;
    eraser.classList.remove('active');
};
red.onclick = function () {
    ctx.strokeStyle = 'red';
    canvas.classList.add('cursor2');
    canvas.classList.remove('cursor1');
    canvas.classList.remove('cursor3');
    canvas.classList.remove('cursor4');
    canvas.classList.remove('cursor5');
    canvas.classList.remove('eraser');
    EraserEnabled = false;
    eraser.classList.remove('active');
};
orange.onclick = function () {
    ctx.strokeStyle = 'orange';
    canvas.classList.add('cursor3');
    canvas.classList.remove('cursor2');
    canvas.classList.remove('cursor1');
    canvas.classList.remove('cursor4');
    canvas.classList.remove('cursor5');
    canvas.classList.remove('eraser');
    EraserEnabled = false;
    eraser.classList.remove('active');
};
green.onclick = function () {
    ctx.strokeStyle = 'green';
    canvas.classList.add('cursor4');
    canvas.classList.remove('cursor2');
    canvas.classList.remove('cursor3');
    canvas.classList.remove('cursor1');
    canvas.classList.remove('cursor5');
    canvas.classList.remove('eraser');
    EraserEnabled = false;
    eraser.classList.remove('active');
};
blue.onclick = function () {
    ctx.strokeStyle = 'blueviolet';
    canvas.classList.add('cursor5');
    canvas.classList.remove('cursor2');
    canvas.classList.remove('cursor3');
    canvas.classList.remove('cursor4');
    canvas.classList.remove('cursor1');
    canvas.classList.remove('eraser');
    EraserEnabled = false;
    eraser.classList.remove('active');
};



