canvas = document.getElementById('canvas');
// canvas2 = document.getElementById('canvas2');
context = canvas.getContext('2d');
// context2 = canvas2.getContext('2d');

a = [];
A = 64;
n = A + 1;
q = 8;


for (var i = 0; i < n; i++) {
    a[i] = new Array(n);
    for (var j = 0; j < n; j++) {
        if (i === 0) {
            a[i][j] = 0;
        } else if (j === 0) {
            a[i][j] = 0;
        } else {
            a[i][j] = Math.random() < 0.6 ? 1 : 0;
        }
    }
}

for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
        if (a[i][j] !== 0) {
            context.fillRect((j - 1) * q, (i - 1) * q, q, q);
        }
    }
}

/*//Вывод отладки в консоль для проверки
var str = '';
for (var i = 1; i < n; i++) {
    str = '';
    for (var j = 1; j < n; j++) {
        str += a[i][j] + '\t';
    }
    console.log(str);
}*/


badCluster = []; // badCluster содержит [a, b] где a < b
cl = [];
goodCL = [];
count = 0;
for (var i = 1; i < n; i++) {
    for (var j = 1; j < n; j++) {

        cur = a[i][j];
        up = a[i - 1][j];
        left = a[i][j - 1];

        if (cur !== 0) {
            if (cur === 1) {
                if (left === 0 && up === 0) {
                    a[i][j] = ++count;
                    cl.push(count);
                } else if (up === 0 && left !== 0) {
                    a[i][j] = left;
                } else if (up !== 0 && left === 0) {
                    a[i][j] = up;
                } else if (up > 0 && left > 0) {
                    if (left < up) {
                        a[i][j] = left;
                        goodCL[up] = left;
                        // console.log('Change: ' + up + ', on the: ' + left);
                        for (var ii = 1; ii < n; ii++) {
                            for (var jj = 1; jj < n; jj++) {
                                if (a[ii][jj] == up) {
                                    a[ii][jj] = left;
                                }
                            }
                        }




                    } else if (up < left) {
                        a[i][j] = up;
                        goodCL[left] = up;
                        // console.log('Change: ' + left + ', on the: ' + up);
                        for (var ii = 1; ii < n; ii++) {
                            for (var jj = 1; jj < n; jj++) {
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


/*console.log('\nКластеризация!!!\n');
for (var i = 1; i < n; i++) {
    str = '';
    for (var j = 1; j < n; j++) {
        str += a[i][j] + '\t';
    }
    console.log(str);
}*/

// Через таймаут
/*lengthOfgoodCL = goodCL.length;
for (var index = lengthOfgoodCL; index > -1; index--) {
    if (goodCL[index]) {
        // console.log('Замены: ' + index + ' на: ' + goodCL[index]);
        (function(ind) {
            setTimeout(function() {
                for (var i = 0; i < n; i++) {
                    for (var j = 0; j < n; j++) {
                        if (a[i][j] === ind) {
                            a[i][j] = goodCL[ind];
                        }
                    }
                }
            }, 4);
        })(index);
    }
}*/

/*lengthOfgoodCL = goodCL.length;
for (var index = lengthOfgoodCL; index > 0; index--) {
    if (goodCL[index]) {
        console.log('Замены: ' + index + ' на: ' + goodCL[index]);
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                if (a[i][j] === index) {
                    a[i][j] = goodCL[index];
                }
            }
        }
    }
}*/



/*console.log('\nКластеризация!!!\n');
for (var i = 1; i < n; i++) {
    str = '';
    for (var j = 1; j < n; j++) {
        str += a[i][j] + '\t';
    }
    console.log(str);
}
*/


//Выделяем только существующие кластеры
var leftCL = [];

for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
        if (a[i][j] !== 0) {
            if (leftCL.indexOf(a[i][j]) == -1) {
                leftCL.push(a[i][j]);
            }
        }
    }
}
////////////////////////////////////
///
///
// Составим список кластеров находящийся у левой грани и у правой грани.
var leftColumn = [],
    rightColumn = [];

for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
        if (j == 1 && a[i][j] !== 0) {
            leftColumn.push(a[i][j]);
        } else if (j == n - 1 && a[i][j] !== 0) {
            rightColumn.push(a[i][j]);
        }
    }
}

var goal;
leftColumn.forEach(function(clusterNum) {
    if (rightColumn.indexOf(clusterNum) !== -1) {
        goal = clusterNum;
    }
});

//Разукрашиваем!
var colors = ['black', 'red', 'yellow', 'aqua', 'fuchsia', 'orange', 'purple', 'navy', 'teal', 'dodgerblue', 'aquamarine'];


leftCL.forEach(function(number) {
    generate_colour = '#' + (Math.random() * 0xEEEEEE << 0).toString(16);
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            if (a[i][j] === number) {
                context.fillRect((j - 1) * q, (i - 1) * q, q, q);
            }
            context.fillStyle = generate_colour;
        }
    }
});

/*
if (a[i][j] === 1) {
    context.fillRect((j - 1) * q, (i - 1) * q, q, q);
}
context.fillStyle = "black";*/


for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
        if (a[i][j] === goal) {
            context.fillRect((j - 1) * q, (i - 1) * q, q, q);
        }
        context.fillStyle = '#000';

    }
}


for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
        if (a[i][j] === 0) {
            context.fillRect((j - 1) * q, (i - 1) * q, q, q);
        }
        context.fillStyle = '#bd9c9c';

    }
}

console.log('Clusters: ' + cl.length);
console.log('Claster changes: ' + goodCL.length);
console.log('Goal cluster numb: ' + goal);
