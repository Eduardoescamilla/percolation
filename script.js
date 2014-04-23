var canvas = document.getElementById('canvas');
var canvas2 = document.getElementById('canvas2');
var context = canvas.getContext('2d');
var context2 = canvas2.getContext('2d');
var go = document.getElementById('btn_go');
var renorm = document.getElementById('btn_renorm');
var cycle = document.getElementById('btn_cycle');
var lengthInput = document.getElementById('selectLength');

/**
 *
 */

Percolation.prototype.renormGroup = function() {
    var length = (this.L - 1);
    var renormCluster = [];
    var ii = -1;

    for (var i = 1; i < length; i += 2) {
        renormCluster[++ii] = [];
        for (var j = 1; j < length; j += 2) {
            var cur = this.a[i][j],
                down = this.a[i + 1][j],
                right = this.a[i][j + 1],
                rigthDown = this.a[i + 1][j + 1];
            if ((cur && down && right && rigthDown) == (1 || 2)) {
                renormCluster[ii].push(1);
            } else if (cur === 0 && (right && rigthDown && down) !== 0) {
                renormCluster[ii].push(1);
            } else if (right === 0 && (cur && down && rigthDown) !== 0) {
                renormCluster[ii].push(1);
            } else if (rigthDown === 0 && (cur && right && down) !== 0) {
                renormCluster[ii].push(1);
            } else if (down === 0 && (cur && right && rigthDown)) {
                renormCluster[ii].push(1);
            } else if ((cur && down) !== 0 && (right && rigthDown) === 0) {
                renormCluster[ii].push(1);
            } else if ((cur && down) === 0 && (right && rigthDown) !== 0) {
                renormCluster[ii].push(1);
            } else {
                renormCluster[ii].push(0);
            }
        }
    }

    for (var i = 0; i < renormCluster.length; i++) {
        renormCluster[i].push(0);
        renormCluster[i].unshift(0);
    }
    renormCluster = transpose(renormCluster);
    for (var i = 0; i < renormCluster.length; i++) {
        renormCluster[i].push(0);
        renormCluster[i].unshift(0);
    }
    renormCluster = transpose(renormCluster);

    /*for (var i = 0; i < renormCluster.length; i++) {
        var temp = '';
        console.log('\n');
        for (var j = 0; j < renormCluster.length; j++) {
            temp += '\t' + renormCluster[i][j];
        }
        console.log(temp);
    }*/


    context.clearRect(0, 0, 512, 512);


    Percolation.clearArray();
    Percolation.setA(renormCluster);

};





function Percolation() {
    this.a = [];
    this.L = length + 1;
    that = this;

    this.px = choosePixel();
    this.prob = document.getElementById('prob').value;
    this.goal = false;
}



Percolation.prototype.fillRandomMatrix = function() {
    for (var i = 0; i < this.L + 1; i++) {
        this.a[i] = [];
        for (var j = 0; j < this.L + 1; j++) {
            if (i === 0 || i === this.L) {
                this.a[i][j] = 0;
            } else if (j === 0 || j === this.L) {
                this.a[i][j] = 0;
            } else {
                this.a[i][j] = Math.random() < this.prob ? 1 : 0;
            }
        }
    }
};

Percolation.prototype.checkClusters = function() {
    var that = this;
    for (var j = 1; j < this.L; j++) {
        i = 1;
        if (this.a[i][j] == 1) {
            this.a[i][j] = 2;
        }
    }



    for (var i = 1; i < this.L; i++) {
        for (var j = 1; j < this.L; j++) {
            if (this.a[i][j] === 2) {
                setTimeout(chNeighbor(i, j, 0), 5);
            }
        }
    }


    function chNeighbor(ii, jj, count) {
        var cur = that.a[ii][jj],
            up = that.a[ii - 1][jj],
            down = that.a[ii + 1][jj],
            left = that.a[ii][jj - 1],
            right = that.a[ii][jj + 1];


        if (up === 1 && count < 1000) {
            that.a[ii - 1][jj] = 2;
            chNeighbor(ii - 1, jj, ++count);
        }
        if (down === 1) {
            that.a[ii + 1][jj] = 2;
            chNeighbor(ii + 1, jj, ++count);
        }
        if (left === 1) {
            that.a[ii][jj - 1] = 2;
            chNeighbor(ii, jj - 1, ++count);
        }
        if (right === 1) {
            that.a[ii][jj + 1] = 2;
            chNeighbor(ii, jj + 1, ++count);
        }

    }

};

Percolation.prototype.isPercolation = function() {

    var topColumn = [];
    var downColumn = [];
    // Составим список кластеров находящийся у левой грани и у правой грани.
    for (var j = 0; j < this.L; j++) {
        var i = this.L - 1;
        if (this.a[i][j] === 2) {
            this.goal = true;
        }
    }
};

function choosePixel(bool) {
    var lengthInput = document.getElementById('selectLength');
    var length = parseInt(lengthInput.options[lengthInput.selectedIndex].value, 10);
    var param = 1;
    if (bool) {
        param = 2;
    }
    if (length === 1) {
        return 512 * param;
    } else if (length === 2) {
        return 256 * param;
    } else if (length === 4) {
        return 128 * param;
    } else if (length === 8) {
        return 64 * param;
    } else if (length === 16) {
        return 32 * param;
    } else if (length === 32) {
        return 16 * param;
    } else if (length === 64) {
        return 8 * param;
    } else if (length === 128) {
        return 4 * param;
    } else if (length === 256) {
        return 2 * param;
    } else if (length === 512) {
        return 1 * param;
    }
}


Percolation.prototype.fillByColors = function() {
    console.log(this);
    for (var i = 0; i < this.L; i++) {
        for (var j = 0; j < this.L; j++) {
            if (this.a[i][j] === 1) {
                context.fillRect((j - 1) * this.px, (i - 1) * this.px, this.px, this.px);
            }
            context.fillStyle = 'darkcyan';


        }
    }
    if (this.goal) {
        for (var i = 0; i < this.L; i++) {
            for (var j = 0; j < this.L; j++) {
                if (this.a[i][j] === 2) {
                    context.fillRect((j - 1) * this.px, (i - 1) * this.px, this.px, this.px);
                }
                context.fillStyle = 'aqua';

            }
        }
    } else {
        for (var i = 0; i < this.L; i++) {
            for (var j = 0; j < this.L; j++) {
                if (this.a[i][j] === 2) {
                    context.fillRect((j - 1) * this.px, (i - 1) * this.px, this.px, this.px);
                }
                context.fillStyle = 'black';

            }
        }
    }
};

Percolation.prototype.fillZeroCells = function() {
    for (var i = 0; i < this.L; i++) {
        for (var j = 0; j < this.L; j++) {
            if (a[i][j] === 0) {
                context.fillRect((j - 1) * this.px, (i - 1) * this.px, this.px, this.px);
            }
            context.fillStyle = '#bd9c9c';

        }
    }
};


Percolation.prototype.setL = function(param) {
    var length = parseInt(lengthInput.options[lengthInput.selectedIndex].value, 10);
    if (param) length /= 2;
    this.L = length + 1;
};

Percolation.prototype.setProb = function() {
    this.prob = document.getElementById('prob').value;
};

Percolation.prototype.setPixel = function(bool) {
    this.px = choosePixel(bool);
};

Percolation.prototype.setGoal = function() {
    this.goal = false;
};

Percolation.prototype.getGoal = function() {
    return this.goal;
};

Percolation.prototype.setA = function(array) {
    this.a = array;
};

Percolation.prototype.clearArray = function() {
    this.a.length = 0;
};

var Percolation = new Percolation();

go.addEventListener('click', startPercolation);

function startPercolation() {
    //Очищаем поле
    context.clearRect(0, 0, 512, 512);
    //Обновляем параметры
    Percolation.setL();
    Percolation.setProb();
    Percolation.clearArray();
    Percolation.setPixel();
    Percolation.setGoal();
    // Запускаем расчет
    console.time('one');
    Percolation.fillRandomMatrix();
    Percolation.checkClusters();
    Percolation.isPercolation();
    Percolation.fillByColors();
    console.timeEnd('one');
    return Percolation.getGoal();
}
startPercolation();

renorm.addEventListener('click', function() {
    var value = document.getElementById('selectLength').value;
    // if (Percolation.L === 9) return;
    Percolation.setPixel(true);

    Percolation.renormGroup();
    Percolation.setL(true);
    Percolation.checkClusters();
    Percolation.isPercolation();
    Percolation.fillByColors();
    document.getElementById('selectLength').value = value / 2;
});


cycle.addEventListener('click', function() {
    var count = [],
        times = document.getElementById('cycle').value;


    for (var prob = 0.01; prob <= 1.01; prob += 0.01) {
        console.log(prob);
        document.getElementById('prob').value = prob;
        var luck = 0;
        for (var i = 0; i < times; i++) {
            if (startPercolation()) {
                luck++;
            }
        }
        count.push(luck);
    }
    //Параметры 1 ячейки графика
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

function transpose(a) {
    return Object.keys(a[0]).map(function(c) {
        return a.map(function(r) {
            return r[c];
        });
    });
}
