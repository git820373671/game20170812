(function () {
    'use strict';

    _event()
    var atuoTime, atuo, sucressNum = 0, comTime = 30

    function _event() {

        $('#start').click(function () {

            $('#screen1').removeClass('show').remove()

            $('#screen2').addClass('show')

        });

        $('#startTest').click(function () {

            $('#screen2').removeClass('show').remove()

            $('#screen3').addClass('show')

            _putIcon();

        })
        var cliN = 0

        $('ul[data-role=putIcon]').on('click', function (e) {

            var state = $(this).attr('data-state')

            var num = $(e.target).attr('data-num'),

                curNum = $('img[data-role=textIcon]').attr('data-num')

            $('ul[data-role=putIcon] li').removeClass('active')

            $(e.target).addClass('active');

            $('ul[data-role="process"] li')


            if (num != curNum) {

                $(e.target).addClass('error');

            } else {

                cliN = cliN + 1


                if (state == 'test') {

                    if (cliN == 2) {

                        setTimeout(function () {

                            $('#screen3').removeClass('show').remove()

                            $('#screen4').addClass('show')

                        }, 100)

                        cliN = (cliN == 2) ? 0 : cliN

                        return
                    }
                    _imgSrc(cliN)

                } else if (state == 'check') {

                    sucressNum = sucressNum + 1


                    if (cliN == 12) {

                        comTime = $('#time').text()

                        $('#screen5').removeClass('show').remove()

                        $('#screen6').addClass('show')

                        _complete(sucressNum, comTime)

                        return
                    }

                    _imgSrc(cliN)

                    clearInterval(atuo)

                    var curTime = $('#time').text()

                    _suspend(curTime)


                }


                $('ul[data-role="process"] >li').removeClass('big')

                $('ul[data-role="process"] >li:eq(' + cliN + ')').addClass('big')

                _putIcon();


            }

        });

        $('ul[data-role="process"] >li:eq(' + cliN + ')').addClass('big')


        $('#startCheck').click(function () {

            $('#screen4').removeClass('show').remove();

            $('#screen5').addClass('show');

            _putIcon();

            _time(30);

            _suspend(30)

        })


    }

    function _complete(num, time) {

        $('#screen5').removeClass('show').remove();

        $('#screen6').addClass('show');

        clearInterval(atuo)
        clearInterval(atuoTime)

        $('#uesTime').text(time)

        $('#successNum').text(num)

        var score = (num * 1000) / time

        $('#score').text(parseInt(score))

        console.log('num,time>>>>>>', num, time)

    }

    function _suspend(time) {

        var t15 = time - 15

        if (t15 < 0) return

        var timeFn = function () {

            time = time - 1

            if (time == t15) {

                clearInterval(atuoTime)

                clearInterval(atuo)

                console.log('>>>>>>>>>>>>>>222222')
                $('#screenStop').addClass('show')

                return
            }

        }
        atuo = setInterval(timeFn, 1000);

        $('#continue').click(function () {

            _time(time)

            $('#screenStop').removeClass('show')

        })

    }

    function _time(i) {

        var timeFn = function () {

            i = i - 1

            $('#time').text(i)

            if (i == 0) {

                clearInterval(atuoTime)
                console.log('>>>>>>>>>>>>>>11111')
                _complete(sucressNum, 30)

            }

        }


        atuoTime = setInterval(timeFn, 1000);


    }


    function _imgSrc(n) {

        var src = '';

        for (var i = 0; i < n; i++) {

            src = $('ul[data-role="process"] >li:eq(' + i + ')').children('img').attr('src', 'img/guanqia' + (i + 1) + 's.png')

        }
    }

    function _textIcon(arr) {

        var num = arr[Math.floor(Math.random() * arr.length)];


        $('img[data-role=textIcon]').attr({'src': 'img/btn' + num + '.png', 'data-num': num})

    }


    function _putIcon() {

        var ArrList = [11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44];


        var num = getArrayItems(ArrList, 12);

        $('ul[data-role=putIcon]').empty();

        for (var i = 0; i < num.length; i++) {

            $('ul[data-role=putIcon]').append('<li data-num="' + num[i] + '" class="btn' + num[i] + '">')

        }

        _textIcon(num)

    }

    function getArrayItems(arr, num) {

        var array = [];

        for (var index in arr) {

            array.push(arr[index]);
        }

        var return_array = [];

        for (var i = 0; i < num; i++) {

            if (array.length > 0) {

                var arrIndex = Math.floor(Math.random() * array.length);

                return_array[i] = array[arrIndex];

                array.splice(arrIndex, 1);

            } else {
                break;
            }
        }
        return return_array;
    }


}());