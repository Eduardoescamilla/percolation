var canvas = document.getElementById('canvas');
var canvas2 = document.getElementById('canvas2');
var context = canvas.getContext('2d');
var context2 = canvas2.getContext('2d');
var go = document.getElementById('btn_go');
var cycle = document.getElementById('btn_cycle');

control();
go.addEventListener('click', function() {
    console.time('one');
    control();
    console.timeEnd('one');
});

cycle.addEventListener('click', function() {
    var count = [],
        times = document.getElementById('cycle').value;


    for (var prob = 0.01; prob <= 1.01; prob += 0.01) {
        console.log(prob);
        document.getElementById('prob').value = prob;
        var luck = 0;
        for (var i = 0; i < times; i++) {
            if (control()) {
                luck++;
            }
        }
        count.push(luck);
    }
    //Параметры 1 ячейки гарфики
    var yParams = 128 / times;
    var xParams = 512 / count.length;
    console.log(times);
    var positionX, postitionY;

    for (var i = 1; i < count.length; i++) {
        // Позиция прорисовки по оси X
        positionX = xParams * (i - 1);
        //Позиция прорисовки по оси Y
        positionY = yParams * count[i];
        context2.fillRect(positionX - 0.5, 0, xParams, 128 - positionY);
    }
    console.log('Calc No. ' + count + ' done.');
    context2.stroke();
    console.time('cycle');
    console.timeEnd('cycle');
});


function control() {
    var lengthInput = document.getElementById('selectLength');
    var length = parseInt(lengthInput.options[lengthInput.selectedIndex].value, 10);
    var L = length + 1;
    var prob = document.getElementById('prob').value;
    var pixel;
    pixel = choosePixel();


    var a = fillRandomMatrix();
    checkClusters();
    var goal = isPercolation();
    fillByColors();
    fillZeroCells();



    function choosePixel() {
        if (length === 8) {
            return 64;
        } else if (length === 16) {
            return 32;
        } else if (length === 32) {
            return 16;
        } else if (length === 64) {
            return 8;
        } else if (length === 128) {
            return 4;
        } else if (length === 256) {
            return 2;
        } else if (length === 512) {
            return 1;
        }
    }

    function fillRandomMatrix() {
        var a = [];
        for (var i = 0; i < L + 1; i++) {
            a[i] = new Array(L);
            for (var j = 0; j < L + 1; j++) {
                if (i === 0 || i === L) {
                    a[i][j] = 0;
                } else if (j === 0 || j === L) {
                    a[i][j] = 0;
                } else {
                    a[i][j] = Math.random() < prob ? 1 : 0;
                }
            }
        }
        return a;
    }

    function checkClusters() {
        for (var j = 1; j < L; j++) {
            i = 1;
            if (a[i][j] == 1) {
                a[i][j] = 2;
            }
        }



        for (var i = 1; i < L; i++) {
            for (var j = 1; j < L; j++) {
                if (a[i][j] === 2) {
                    setTimeout(chNeighbor(i, j, 0), 5);
                }
            }
        }


        function chNeighbor(ii, jj, count) {
            var cur = a[ii][jj],
                up = a[ii - 1][jj],
                down = a[ii + 1][jj],
                left = a[ii][jj - 1],
                right = a[ii][jj + 1];


            if (up === 1 && count < 1000) {
                a[ii - 1][jj] = 2;
                chNeighbor(ii - 1, jj, ++count);
            }
            if (down === 1) {
                a[ii + 1][jj] = 2;
                chNeighbor(ii + 1, jj, ++count);
            }
            if (left === 1) {
                a[ii][jj - 1] = 2;
                chNeighbor(ii, jj - 1, ++count);
            }
            if (right === 1) {
                a[ii][jj + 1] = 2;
                chNeighbor(ii, jj + 1, ++count);
            }

        }
        // console.log('DONE!');

    }


    function isPercolation() {
        var topColumn = [];
        var downColumn = [];
        var goal;
        // Составим список кластеров находящийся у левой грани и у правой грани.
        for (var j = 0; j < L; j++) {
            var i = L - 1;
            if (a[i][j] === 2) {
                goal = true;
            }
        }

        return goal;

    }

    function fillByColors() {
        for (var i = 0; i < L; i++) {
            for (var j = 0; j < L; j++) {
                if (a[i][j] === 1) {
                    context.fillRect((j - 1) * pixel, (i - 1) * pixel, pixel, pixel);
                }
                context.fillStyle = 'darkcyan';


            }
        }
        if (goal) {
            for (var i = 0; i < L; i++) {
                for (var j = 0; j < L; j++) {
                    if (a[i][j] === 2) {
                        context.fillRect((j - 1) * pixel, (i - 1) * pixel, pixel, pixel);
                    }
                    context.fillStyle = 'aqua';

                }
            }
        } else {
            for (var i = 0; i < L; i++) {
                for (var j = 0; j < L; j++) {
                    if (a[i][j] === 2) {
                        context.fillRect((j - 1) * pixel, (i - 1) * pixel, pixel, pixel);
                    }
                    context.fillStyle = 'black';

                }
            }
        }
    }

    function fillZeroCells() {
        for (var i = 0; i < L; i++) {
            for (var j = 0; j < L; j++) {
                if (a[i][j] === 0) {
                    context.fillRect((j - 1) * pixel, (i - 1) * pixel, pixel, pixel);
                }
                context.fillStyle = '#bd9c9c';

            }
        }
    }

    if (goal) {
        return true;
    }
    return false;
}
