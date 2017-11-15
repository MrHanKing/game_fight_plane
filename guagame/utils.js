var e = sel => document.querySelector(sel)

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

// 矩形与矩形碰撞
var rectIntersects = function(a, b) {
    if ((a.x > b.x + b.w) || (a.x + a.w < b.x) ) {
        return false
    }
    if ((a.y > b.y + b.h) || (a.y + a.h < b.y) ) {
        return false
    }
    return true    
}

// 随机数
var randomBetween = function(start, end) {
    var value = Math.random() * (end - start + 1)
    return Math.floor(value) + start
}