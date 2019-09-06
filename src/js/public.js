//7.cookie添加，获取，删除
function addcookie(key, value, day) {
    let date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + date;
}

function getcookie(key) {
    let arr = decodeURIComponent(document.cookie).split('; ');
    for (let value of arr) {
        let newarr = value.split('=');
        if (key === newarr[0]) {
            return newarr[1];
        }
    }
}
function delcookie(key) {
    addcookie(key, '', -1);
}
