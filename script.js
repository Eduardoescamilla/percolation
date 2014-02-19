var canvas = document.getElementById('canvas');
// canvas2 = document.getElementById('canvas2');
var context = canvas.getContext('2d');
// context2 = canvas2.getContext('2d');
var go = document.getElementById('btn_go');
var cycle = document.getElementById('btn_cycle');

control();
go.addEventListener('click', function() {
    console.time('test');
    control();
    console.timeEnd('test');
});

cycle.addEventListener('click', function() {
    var count = 0,
        luck = 0,
        times = document.getElementById('cycle').value;
    while (count <= times) {
        if (control()) {
            luck++;
        }
        count++;
        console.log('Calc No. ' + count + ' done.');
    }
    console.log('The % of luck probes is: ' + luck / count);
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
    var leftCL = leftClusters();
    var goal = isPercolation();
    // fillByColors();
    // fillZeroCells();




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
                chNeighbor(i, j);
            }
        }

        function chNeighbor(ii, jj) {
            var cur = a[ii][jj],
                up = a[ii - 1][jj],
                left = a[ii][jj - 1],
                right = a[ii][jj + 1],
                down = a[ii + 1][jj];

            if (cur === 2) {
                if (up === 1) {
                    a[ii - 1][jj] = 2;
                    setTimeout(chNeighbor(ii - 1, jj), 5);
                }
                if (down === 1) {
                    a[ii + 1][jj] = 2;
                     setTimeout(chNeighbor(ii + 1, jj), 5);
                }
                if (left === 1) {
                    a[ii][jj - 1] = 2;
                     setTimeout(chNeighbor(ii, jj - 1), 5);
                }
                if (right === 1) {
                    a[ii][jj + 1] = 2;
                     setTimeout(chNeighbor(ii, jj + 1), 5);
                }
            }
        }
        console.log('FINISH!');
    }

    function leftClusters() {
        //Выделяем только существующие кластеры
        var leftCL = [];

        for (var i = 0; i < L; i++) {
            for (var j = 0; j < L; j++) {
                if (a[i][j] !== 0) {
                    if (leftCL.indexOf(a[i][j]) == -1) {
                        leftCL.push(a[i][j]);
                    }
                }
            }
        }
        return leftCL;
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
