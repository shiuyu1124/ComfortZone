var myAduio = document.getElementsByTagName('audio')[0];
var divLyrics = document.getElementsByClassName('div-lyrics')[0];
var divTitle = document.getElementsByClassName('div-title')[0];
var lyricsTime = document.getElementsByClassName('lyrics-time')[0];
var lyricsTime_a = lyricsTime.getElementsByTagName('a');
var progressTime = document.getElementsByClassName('time')[0];
var nowLine = 0;
var lyricsMove = false;
var playState = false;
var lyrics, lyricsStyle, lyricsFirst, rollT;
var timeArray1 = new Array();
var timeArray2 = new Array();
var timeInterval = new Array();

window.onload = function () {
	initialLyrics();
	lyricsStyle = getComputedStyle(lyricsFirst, null);
	setLyrics(0);
	setMouseEvent();
	setTimeText();
};

// 設置滑鼠事件
function setMouseEvent() {
	// 拖曳歌詞
	let lyrics_Y, line;
	divLyrics.onmousedown = function (e) {
		if (lyricsMove == false) {
			lyricsTime_a[0].style.display = lyricsTime_a[1].style.display = lyricsTime.style.display =
				'block';
			lyricsMove = true;
		}
		lyrics_Y = parseInt(lyricsStyle.marginTop);
		document.onmousemove = function (event) {
			lyricsFirst.style.marginTop =
				event.clientY - (e.clientY - lyrics_Y) + 'px';
			line = Math.floor(-(parseInt(lyricsStyle.marginTop) - 170) / 34);
			if (line < 0) {
				line = 0;
			} else if (line > lyrics.length - 1) {
				line = lyrics.length - 1;
			}
			lyricsTime_a[1].innerText = timeArray2[line];
		};
		document.onmouseup = function () {
			var lyrics_Y1 = parseInt(lyricsStyle.marginTop);
			setTimeout(function () {
				if (parseInt(lyricsStyle.marginTop) == lyrics_Y1) {
					lyricsMove = false;
					setLyrics(nowLine);
					lyricsTime_a[0].style.display = lyricsTime_a[1].style.display = lyricsTime.style.display =
						'none';
				}
			}, 1000);
			document.onmousemove = null;
			document.onmouseup = null;
		};
		// 防止選中文字
		return false;
	};

	// 音量控制
	let volume_now = document.getElementsByClassName('volume-now')[0];
	let volume_back = document.getElementsByClassName('volume-back')[0];
	let volume_text = document.getElementsByClassName('volume-text')[0];
	let volume_a = document.getElementsByClassName('volume')[0];
	volume_back.onmousedown = function (e) {
		volume_now.style.width = e.offsetX + 'px';
		myAduio.volume = e.offsetX / 100;
		volume_text.innerText = volume_now.clientWidth;
		volume_back.onmousemove = function (ev) {
			let volume = ev.offsetX;
			if (volume > 100) {
				volume = 100;
			}
			volume_now.style.width = volume + 'px';
			myAduio.volume = volume / 100;
			volume_text.innerText = volume_now.clientWidth;
		};
		document.onmouseup = function () {
			if (myAduio.volume == 0) {
				volume_a.style.backgroundImage = 'url(../img/mute.png)';
			} else {
				volume_a.style.backgroundImage = 'url(../img/volume.png)';
			}
			volume_back.onmousemove = null;
			document.onmouseup = null;
		};
		return false;
	};

	// 進度條控制
	let progress_now = document.getElementsByClassName('progress-now')[0];
	let progress_bar = document.getElementsByClassName('progress-bar')[0];
	progress_bar.onmousedown = function (e) {
		progress_now.style.width = e.offsetX + 'px';
		myAduio.pause();
		myAduio.currentTime =
			(e.offsetX * myAduio.duration) / progress_bar.clientWidth;
		setTimeText();
		progress_bar.onmousemove = function (ev) {
			let progress = ev.offsetX;
			if (progress > progress_bar.clientWidth) {
				progress = progress_bar.clientWidth;
			}
			progress_now.style.width = progress + 'px';
			myAduio.currentTime =
				(progress * myAduio.duration) / progress_bar.clientWidth;
			setTimeText();
		};
		document.onmouseup = function () {
			myAduio.play();
			for (var i = 0; i < timeArray1.length; i++) {
				if (myAduio.currentTime < timeArray1[i]) {
					nowLine = i - 1;
					setLyrics(i - 2);
					timeInterval[nowLine] =
						timeArray1[nowLine + 1] - myAduio.currentTime;
					setPlay(true);
					break;
				}
			}
			progress_bar.onmousemove = null;
			document.onmouseup = null;
		};
		return false;
	};

	let goto = document.getElementsByClassName('goto')[0];
	goto.onmouseup = function () {
		nowLine = line;
		myAduio.currentTime = timeArray1[line];
		setLyrics(line - 1);
		setPlay(true);

		lyricsMove = false;
		lyricsTime_a[0].style.display = lyricsTime_a[1].style.display = lyricsTime.style.display =
			'none';

		document.onmouseup = null;
	};
}

// 設定播放狀態
function setPlay(state) {
	var play_pause = document.getElementsByClassName('play-pause')[0];
	if (state == null) {
		state = myAduio.paused;
	}
	clearTimeout(rollT);
	if (state == true) {
		myAduio.play();
		play_pause.style.backgroundImage = 'url(../IMG/pause.png)';
		playState = true;
		setTimeText();
		lyricsRoll();
		setProgress();
		// 重新播放後須將狀態調整回來
		timeInterval[nowLine] = timeArray1[nowLine + 1] - timeArray1[nowLine];
	} else {
		myAduio.pause();
		play_pause.style.backgroundImage = 'url(../IMG/play.png)';
		playState = false;
		timeInterval[nowLine] = timeArray1[nowLine + 1] - myAduio.currentTime;
	}
}

// 設定音量
function setVolume(volume) {
	myAduio.volume = volume;
}

// 設置靜音
function setMuted() {
	let volume_now = document.getElementsByClassName('volume-now')[0];
	let volume_text = document.getElementsByClassName('volume-text')[0];
	let volume_a = document.getElementsByClassName('volume')[0];
	if (myAduio.muted == true) {
		myAduio.muted = false;
		volume_a.style.backgroundImage = 'url(../img/volume.png)';
		volume_now.style.width = myAduio.volume * 100 + 'px';
		volume_text.innerText = myAduio.volume * 100;
	} else {
		myAduio.muted = true;
		volume_a.style.backgroundImage = 'url(../img/mute.png)';
		volume_now.style.width = '0';
		volume_text.innerText = '0';
	}
}

// 歌詞回彈
function lyricsRebound(lyricsTop) {
	if (parseInt(lyricsStyle.marginTop) != nowLine * -34 + 136) {
		if (lyricsTop == null) {
			lyricsTop = nowLine * -34 + 136;
		}
		let lyrics_animation = lyricsFirst.animate(
			[
				{
					marginTop: lyricsStyle.marginTop,
				},
				{
					marginTop: lyricsTop + 'px',
				},
			],
			{
				duration: 500,
			}
		);
		lyrics_animation.addEventListener(
			'finish',
			function () {
				lyricsFirst.style.marginTop = lyricsTop + 'px';
			},
			false
		);
	}
}

// 歌詞初始化
function initialLyrics() {
	let sp = divTitle.getElementsByTagName('span')[0];
	let ar = divTitle.getElementsByTagName('span')[1];
	let ti = divTitle.getElementsByTagName('h1')[0];
	let lyricsData, timeString;
	let lyricsArray = new Array();
	// 清除數據
	timeArray1.splice(0, timeArray1.length);
	timeArray2.splice(0, timeArray2.length);
	lyricsArray.splice(0, lyricsArray.length);
	// 歌詞放入區
	lyricsData =
		'[ti:都是浪漫害的]\n[ar:麋先生]\n[al:都是浪漫害的]\n[00:00.22]都是浪漫害的 - 麋先生\n[00:02.80]詞：吳聖皓\n[00:03.55]曲：吳聖皓\n[00:04.54]編曲：麋先生 MIXER/周菲比\n[00:06.92]（本作品聲明，著作權權利保留。未經著作權人書面許可，不得以任何方式（包括翻唱、翻錄等）使用。)\n[00:24.01]你想用玫瑰說什麼\n[00:30.71]你說這片雲像什麼\n[00:37.74]不過都是浪漫的胡說\n[00:46.39]當再見開始抱着說\n[00:54.00]當祝福非得說出口\n[01:00.18]不過都是浪漫找罪受\n[01:08.43]不就是陰天 不就是多支菸\n[01:11.84]要搞得多可憐 要弄得多凄美\n[01:16.32]又再哭一遍 就又被笑一遍\n[01:19.45]都閉嘴\n[01:26.25]都是浪漫害的\n[01:30.81]我們是從什麼時候開始感覺痛\n[01:37.55]吞下第一口啤酒\n[01:40.68]第一次跟着歌手 剝開寂寞\n[01:46.20]我們是從什麼時候無力的還手\n[01:52.65]都怪我愛上溫柔 卻討厭太溫柔\n[02:00.17]才讓你仗着溫柔\n[02:03.01]抓着愛對我說 別動\n[02:26.88]都是浪漫讓時間會哭會痛\n[02:30.81]都是浪漫讓回憶多了傷口\n[02:34.34]何況是我\n[02:37.96]都是浪漫讓愛逗留那麼久\n[02:41.88]都是浪漫都不幹脆點拜託請放心走\n[02:48.63]至少讓我們能像一場 燦爛煙火\n[02:57.02]我們是從什麼時候開始感覺痛\n[03:02.80]吞下第一口啤酒\n[03:05.90]第一次跟着歌手 剝開寂寞\n[03:11.93]我們是從什麼時候無力的還手\n[03:17.90]都怪我愛上溫柔 卻討厭太溫柔\n[03:25.36]才讓我這個歌手 讓你能聽得懂\n';
	// 文本.split(分隔符號) -> 用來分隔不同歌曲歌詞
	lyricsArray = lyricsData.split('\n');
	// 加入歌曲訊息
	ar.innerText = lyricsArray[0].split(']')[1];
	ti.innerText = lyricsArray[1].split(']')[1];
	// sp.innerText = lyricsArray[2].split(']')[1];
	// 加入歌詞
	for (var i = 3; i < lyricsArray.length; i++) {
		if (i == 3) {
			divLyrics.innerHTML +=
				'<p style="margin-top: 100%;color:#5192fe;">' +
				lyricsArray[i].split(']')[1] +
				'</p>';
		} else {
			divLyrics.innerHTML +=
				'<p>' + lyricsArray[i].split(']')[1] + '</p>';
		}
	}

	// 獲取後續需用之變量
	lyricsFirst = divLyrics.getElementsByTagName('p')[0];
	lyrics = divLyrics.getElementsByTagName('p');

	//計算歌詞所需秒數
	timeArray1.push(0);
	for (var i = 0; i < lyrics.length; i++) {
		timeString = lyricsArray[i + 3].substring(1, 9).split(':');
		timeArray1.push(
			parseFloat(timeString[0]) * 60 + parseFloat(timeString[1])
		);
	}

	// 計算時間間隔，將時間從秒數改為分鐘+秒數
	for (var i = 0; i < timeArray1.length - 1; i++) {
		timeInterval[i] = timeArray1[i + 1] - timeArray1[i];
		if (Math.floor(timeArray1[i] % 60) < 10) {
			timeArray2.push(
				Math.floor(timeArray1[i] / 60) +
				':0' +
				Math.floor(timeArray1[i] % 60)
			);
		} else {
			timeArray2.push(
				Math.floor(timeArray1[i] / 60) +
				':' +
				Math.floor(timeArray1[i] % 60)
			);
		}
	}
}

//設定歌詞位置
function setLyrics(line) {
	for (let i = 0; i < lyrics.length; i++) {
		lyrics[i].style.color = '#000';
	}
	lyrics[line].style.color = '#5192fe';
	let lyrics_animation = lyrics[0].animate(
		[
			{
				marginTop: lyricsStyle.marginTop,
			},
			{
				marginTop: line * -34 + 136 + 'px',
			},
		],
		{
			duration: 100,
		}
	);
	lyrics_animation.addEventListener(
		'finish',
		function () {
			lyrics[0].style.marginTop = line * -34 + 136 + 'px';
		},
		false
	);
}

//歌詞自動滾動
function lyricsRoll() {
	rollT = setTimeout(function () {
		if (nowLine < lyrics.length && myAduio.paused == false) {
			if (lyricsMove == false) {
				setLyrics(nowLine);
			}
			nowLine += 1;
			lyricsRoll();
		}
	}, timeInterval[nowLine] * 1000);
}

// 設置歌詞進度
function setTimeText() {
	var nowTime = myAduio.currentTime;
	var allTime = myAduio.duration;
	// 計算時間，若為個位數，則補零
	if (Math.floor(nowTime % 60) < 10) {
		nowTime = Math.floor(nowTime / 60) + ':0' + Math.floor(nowTime % 60);
	} else {
		nowTime = Math.floor(nowTime / 60) + ':' + Math.floor(nowTime % 60);
	}
	if (Math.floor(allTime % 60) < 10) {
		allTime = Math.floor(allTime / 60) + ':0' + Math.floor(allTime % 60);
	} else {
		allTime = Math.floor(allTime / 60) + ':' + Math.floor(allTime % 60);
	}
	progressTime.innerText = nowTime + '/' + allTime;
	// 每0.1秒執行一次
	if (myAduio.paused == false) {
		setTimeout(setTimeText, 100);
	}
}

//進度條進度設定
function setProgress() {
	let progress_now = document.getElementsByClassName('progress-now')[0];
	let progress_bar = document.getElementsByClassName('progress-bar')[0];
	let progress = Math.floor(
		(myAduio.currentTime / myAduio.duration) * progress_bar.clientWidth
	);
	progress_now.style.width = progress + 'px';
	if (myAduio.paused == false) {
		setTimeout(setProgress, 100);
	}
}

//獲取網頁屬性
function getDocument(attribute) {
	if (attribute == 'sT') {
		return document.documentElement.scrollTop;
	} else if (attribute == 'sL') {
		return document.documentElement.scrollLeft;
	} else if (attribute == 'sH') {
		return document.documentElement.scrollHeight;
	} else if (attribute == 'sW') {
		return document.documentElement.scrollWidth;
	} else if (attribute == 'cH') {
		return document.documentElement.clientHeight;
	} else if (attribute == 'cW') {
		return document.documentElement.clientWidth;
	}
}
