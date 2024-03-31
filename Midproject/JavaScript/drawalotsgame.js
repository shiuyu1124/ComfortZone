 // 共十六張籤詩，籤詩圖檔從 1 到 16 進行命名，並隨機抽取一張
function selectCard() {
    var card = getRandom(1, 16);
    console.log(card);
    var card_div = document.getElementById("card");
    card_div.innerHTML = `<img src='../IMG/card/${card}.png' alt='Playing Card'>`;
}

function getRandom(min, max) { //  min <= x < max, x是整數亂數
    return Math.floor(Math.random() * (max - min)) + min;
}  