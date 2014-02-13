canvas = document.getElementById('canvas');
context = canvas.getContext('2d');

function draw(x, y) {
    context.fillRect(50, 25, x, y);
}

// for (var x = 0.5; x < 300; x += 2) {
//     context.moveTo(x, 0);
//     context.lineTo(x, 1);
// }

// context.strokeStyle = "#000";
// context.stroke();

a = [
    []
];
for (var i = 0; i < 32; i++) {
    a[i] = new Array(32);
    for (var j = 0; j < 32; j++) {
        a[i][j] = Math.random() > 0.55 ? 1 : 0;
    }
}

for (var i = 0; i < 32; i++) {
    for (var j = 0; j < 32; j++) {
        if (a[i][j] !== 0) {
        context.fillRect(j*16, i*16, 16*a[i][j], 16*1);
        }
    }
}
