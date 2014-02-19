var canvas = document.getElementById('canvas');
// canvas2 = document.getElementById('canvas2');
var context = canvas.getContext('2d');
// context2 = canvas2.getContext('2d');
var go = document.getElementById('btn_go');
var cycle = document.getElementById('btn_cycle');

control();
go.addEventListener('click', function() {
    control();
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

    /*    function checkClusters() {
        var goodCL = [];
        var count = 0;
        for (var i = 1; i < L; i++) {
            for (var j = 1; j < L; j++) {

                cur = a[i][j];
                up = a[i - 1][j];
                left = a[i][j - 1];

                if (cur !== 0) {
                    if (cur === 1) {
                        if (left === 0 && up === 0) {
                            a[i][j] = ++count;
                        } else if (up === 0 && left !== 0) {
                            a[i][j] = left;
                        } else if (up !== 0 && left === 0) {
                            a[i][j] = up;
                        } else if (up > 0 && left > 0) {
                            if (left < up) {
                                a[i][j] = left;
                                goodCL[up] = left;
                                // console.log('Change: ' + up + ', on the: ' + left);
                                for (var ii = 1; ii < L; ii++) {
                                    for (var jj = 1; jj < L; jj++) {
                                        if (a[ii][jj] == up) {
                                            a[ii][jj] = left;
                                        }
                                    }
                                }
                            } else if (up < left) {
                                a[i][j] = up;
                                goodCL[left] = up;
                                // console.log('Change: ' + left + ', on the: ' + up);
                                for (var ii = 1; ii < L; ii++) {
                                    for (var jj = 1; jj < L; jj++) {
                                        if (a[ii][jj] == left) {
                                            a[ii][jj] = up;
                                        }
                                    }
                                }
                            } else if (up == left) {
                                a[i][j] = up;
                            }
                        }
                    }
                }
            }
        }
    }
*/

    function checkClusters() {
        for (var j = 1; j < L; j++) {
            i = 1;
            if (a[i][j] == 1) {
                a[i][j] = 2;
            }
        }

        var temp = 0;
        while (temp <= 5) {
            checkDown();
            checkUP();
            temp++;
        }


        function checkDown() {
            for (var i = 1; i < L; i++) {
                for (var j = 1; j < L; j++) {
                    var cur = a[i][j],
                        up = a[i - 1][j],
                        left = a[i][j - 1];
                    var right = a[i][j + 1];
                    var down = a[i + 1][j];

                    if (cur !== 0) {
                        if (cur === 1) {
                            if (up === 2 || left === 2 || right === 2 || down === 2) {
                                a[i][j] = 2;
                            }
                        }
                    }
                }

                for (var j = L - 1; j > 0; j--) {
                    var cur = a[i][j],
                        up = a[i - 1][j],
                        left = a[i][j - 1];
                    var right = a[i][j + 1];
                    var down = a[i + 1][j];

                    if (cur !== 0) {
                        if (cur === 1) {
                            if (up === 2 || left === 2 || right === 2 || down === 2) {
                                a[i][j] = 2;
                            }
                        }
                    }
                }

            }
        }

        function checkUP() {
            for (var i = L - 1; i > 0; i--) {
                for (var j = 1; j < L; j++) {
                    var cur = a[i][j],
                        up = a[i - 1][j],
                        left = a[i][j - 1];
                    var right = a[i][j + 1];
                    var down = a[i + 1][j];

                    if (cur !== 0) {
                        if (cur === 1) {
                            if (up === 2 || left === 2 || right === 2 || down === 2) {
                                a[i][j] = 2;
                            }
                        }
                    }
                }

                for (var j = L - 1; j > 0; j--) {
                    var cur = a[i][j],
                        up = a[i - 1][j],
                        left = a[i][j - 1];
                    var right = a[i][j + 1];
                    var down = a[i + 1][j];

                    if (cur !== 0) {
                        if (cur === 1) {
                            if (up === 2 || left === 2 || right === 2 || down === 2) {
                                a[i][j] = 2;
                            }
                        }
                    }
                }

            }
        }



        // var str = '';
        // for (var j = 0; j < L; j++) {
        //     var i = L - 1;
        //     str += a[i][j] + '\t';
        // }
        // console.log(str);
        // console.log("\n");



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
        leftCL.forEach(function(number) {
            generate_colour = '#' + (Math.random() * 0xCCCCCC << 0).toString(16);
            for (var i = 0; i < L; i++) {
                for (var j = 0; j < L; j++) {
                    if (a[i][j] === number) {
                        context.fillRect((j - 1) * pixel, (i - 1) * pixel, pixel, pixel);
                    }
                    context.fillStyle = generate_colour;
                }
            }
        });

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
                    context.fillStyle = 'orange';

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
