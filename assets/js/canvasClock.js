//width = 350;
    	//height = 350;
    	document.getElementById("canvas").style.width = "350px";
    	//var canvas = document.createElement("canvas");
    	//canvas.id = "canvas";
    	//canvas.style = "width:"+width+"px; height:"+height+"px;"
    	//document.body.appendChild(canvas);

        var cvs = document.getElementById('canvas');
        var ctx = cvs.getContext('2d');
        ctx.lineWidth = 25;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '25px Trebuchet MS';
        ctx.fillStyle = 'black';

        var draw = (function() {
            var start = 1.5 * Math.PI; // Start circle from top
            var end = (2 * Math.PI) / 100; // One percent of circle
          	return function(r, p, c) {
                p = p || 100; // When time is '00' we show full circle
                ctx.strokeStyle = c;
                ctx.beginPath();
                ctx.arc(175, 175, r, start, p * end + start, false);
                ctx.stroke();
            };
        }());

        var clock = function() {
            requestAnimationFrame(clock);

            var date = new Date;
            //var y = date.getFullYear();
            //var mth = date.getMonth()+1;
            //var d = date.getDate();
            //var w = date.getDay();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            var ms = date.getMilliseconds();
            // Calculate percentage to be drawn
            var hp = 100 / 12 * (h % 12);
            var mp = 100 / 60 * m;
            var sp = 60000 / 1000 * ms;
            var msp = 100 / 1000 * ms;
            // Ensure double digits
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            //var cWidth = width;
            //var cHeight = height;
            ctx.clearRect(0, 0, 350, 350);
            ctx.fillText(h + ':' + m + ':' + s, 175, 175);
            //ctx.fillText(h + ':' + m + ':' + s, 175, 160);
            //ctx.fillText(d + '-' + mth + '-' + y, 175, 190);
            draw(150, hp, '#339966');
            draw(125, mp, '#669999');
            draw(100, sp, '#006666');
            draw(75, msp, '#003366');
        };
        clock();
