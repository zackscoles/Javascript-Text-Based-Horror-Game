$(document).ready(function () {

    var scrollDownPageLoop;
    
    $(function () {
        var name = "";
        var choice = 0;
        start();
    });


    function start() {
        $("#textInput").hide();
        $("#buttonOptions").hide();
        $("#buttonReveal").hide();
        $("#buttonYes").hide();
        $("#coffins").hide();
        $("#intro").append("TEXT-BASED HORROR!");
        naming();
    }

    function naming() {
        $('.yes1').off();
        $('.no1').off();
        $('.yes1').on();
        $('.no1').on();
        $("#button").off();
        $("#button").on();
        $("#instructions").empty();
        addToInstructions("^750</br>What is my name?", function () {
            $("#textInput").show();
            $("input:text:visible:first").focus();
        });
        $("#button").one("click", function () {
           name = document.getElementById("myText").value;
            if (name !== "") {
                addToInstructions("Is " + name + " my correct name.", function () { $("#buttonYes").show(); });
                $('#textInput').val('');
                $("#textInput").hide();
                
                $("#instructions2").empty();
            }
            else {
                $("#instructions2").empty();
                $('#textInput').val('');
                $("#instructions2").append("<br>Please type in my name.");
                naming();
            }
            $(".yes1").one("click", function () {
                 namingnaming(name);
            });
            $(".no1").one("click", function () {
                naming();
            });
        });

        $("#myText").keypress(function (e) {
            if (e.which == 13) {
                $("#button").click();
            }
        });
    }

    function namingnaming(name) {
        $("#textInput").hide();
        $("#buttonYes").hide();
        $("#instructions2").empty();
        $("#story").typed({
            strings: ["My name is " + name + ".</br>The choices I make determine whether I live or die.</br>This is my story.<hr>"], typeSpeed: -5
        });
        $("#instructions").empty();
        $("#story").empty();
        play();
    }

    function addToInstructions(newInstruction, callback) {
        $("#buttonOptions").hide();
        startScrollPageDownLoop();
        $('<p></p>').appendTo($("#instructions")).typed({
            strings: [filter_text_options_out(newInstruction)], typeSpeed: 0, callback: function () {
                endScrollPageDownLoop();
                callback && callback();
                options(newInstruction);
            }
        });
    }

    function options(input) {
        //adds options to buttons
        var option_one_start = false;
        var option_two_start = false;
        var opt1 = "";
        var opt2 = "";

        for (var i = 0, len = input.length; i < len; i++) {

            if (input.charAt(i) === ":") {
                option_one_start = true;
            }
            if (option_one_start === true && option_two_start === false) {
                if (input.charAt(i) === "<") {
                    option_two_start = true;
                    option_one_start = false;
                    opt1 = opt1.replace(": ", "").replace("<", "");
                    $("#yes").html(opt1);
                }
                opt1 += input.charAt(i);
            }
            if (option_one_start === true && option_two_start === true) {
                if (input.charAt(i) === "<") {
                    option_two_start = false;
                    option_one_start = false;
                    opt2 = opt2.replace(": ", "").replace("<", "");
                    $("#no").html(opt2);
                }
                opt2 += input.charAt(i);
            }
        }
    }

    function filter_text_options_out(input) {
        //filters options out of text
        var input2 = reverse(input);
        var arrow = 0;
        var save = false;
        var save2 = false;
        var string = "";
        for (var i = 0, len = input2.length; i < len; i++) {
            if (input2.charAt(i) === "<" && i < 155) {
                arrow = arrow + 1;
            }
            if (input2.charAt(i) === ":") {
                save2 = true;
            }
            if (arrow === 4 && i < 155) {
                save = true;
            }
            if (save === true) {
                string = string + input2.charAt(i);
            }
            if (i === len - 1 && save === true && save2 === true) {
                return reverse(string.replace("<", "").replace("", "").replace("/", "").replace(">rb<", "").replace("^", "").replace("0001", "").replace("&", ""));
            }
            else if (i === len - 1 && save2 === false) {
                return reverse(input2);
            }
        }
    }

    function reverse(s) {
        //reverses order of strings. i needed it for my filter_text_options_out(input) function 
        var o = '';

        for (var i = s.length - 1; i >= 0; i--)
            o += s[i];
        return o;
    }

    function startScrollPageDownLoop() {
        scrollDownPageLoop = window.setInterval(scrollPageDown, 750);
    }

    function endScrollPageDownLoop() {
        scrollPageDown();
        scrollDownPageLoop && window.clearInterval(scrollDownPageLoop);
    }

    function scrollPageDown() {
        var bottomOfScreen = $(document).height();
        var bottomOfPage = $(window).scrollTop() + $(window).height();
        if (bottomOfPage < bottomOfScreen) {
            $(window).scrollTop((bottomOfPage + bottomOfScreen) + $(window).height());
        }
    }

    function revealOptions(progress) {
        window.setTimeout(function () {
            $('#buttonReveal').show();
        }, 500);
        $('#buttonReveal').one('click', function () {
            startScrollPageDownLoop;
            $("#buttonReveal").hide();
            $('#buttonOptions').show();
            var sevenSeconds = 7;
            clock = $("#time");
            startTimer(sevenSeconds, clock, progress);
            endScrollPageDownLoop;
        });
    }

    function startTimer(duration, clock, progress) {
        var countdown = setInterval(function seconds() {
            clock.text("Time is running out! " + duration);
            document.getElementById("ticking").play();
            if (--duration < 0) {
                clearInterval(countdown);
                clock.text("");
                
                $('#textInput').hide();
                $('#buttonOptions').hide();
                $('#yes').off();
                $('#no').off();
                $('.yesDead').off();
                $('.noDead').off();

                document.getElementById("ticking").pause();

                addToInstructions("I couldn't make a decision in time and this is the end of my story. <br> I died. <br>Would you like to play again? <br> ", function () {
                    document.getElementById('laugh').play(); 
                    $('#buttonYes').show();
                });                
                
                $(".yesDead").one("click", function () {
                    addToInstructions("Back into hell you go...", function () { $('.buttonOptions').show(); });

                    $('.buttonYes').hide();

                    resurrected = true;
                    choices();
                });

                $(".noDead").one("click", function () {
                    $("#buttonYes").hide();
                    addToInstructions("Smart decision. Get out while you still can.", function () {

                        return;
                    });
                })

            } else {
                $("#yes, #no").click(function () {
                    clearInterval(countdown);
                    clock.text("");
                    document.getElementById("ticking").pause();
                });
            }
            return seconds;
        }(), 1000);
    }

    function play() {
        $("#textInput").hide();
        $('.yes2').off();
        $('.no2').off();
        $('.yes2').on();
        $('.no2').on();

        addToInstructions("^3500Do you dare start this horrific journey? ", function () {
            $("#buttonYes").show();
        });

        $(".yes2").one("click", function () {
            $("<p></p>").appendTo($("#story")).typed({
                strings: ["Good luck!  You have been warned..."], typeSpeed: -5
            });
            $("#instructions").empty();
            choices();
        });

        $(".no2").one("click", function () {
            $("#textInput").hide();
            $("#buttonOptions").hide();
            $("#buttonYes").hide();
            $("#story").empty();
            $("#instructions").empty();
            addToInstructions("Wise choice.  Come back if you change your mind...", function () {
                $('.no2').off();
                return;
            });
        });
    }

    // grouped common functions
    function buttonReset() {
        $('.yes3').off();
        $('.no3').off();
        $('.yes3').on();
        $('.no3').on();
        $('#buttonYes').hide();
    }      

    // established variables for game play
    var currentChapter = 0; // currentChapter is the array position of the story array.
    var resurrected = false; // resurrected is used to prevent the display of the story text when choosing to continue playing

    // created sound switch for chapter sounds to be access by the story array
    function playSound(sound) {
        switch (sound) {
            case "gravel":
                document.getElementById("gravel").play();
                break;
            case "window":
                document.getElementById("window").play();
                break;
            case "door":
                document.getElementById("door").play();
                break;
            default:
                break;
        }
    }

    // choices function will respond to chapter being acted upon
    function choices() {
        
        if (story[currentChapter].coffin1) {
            addToInstructions(story[currentChapter].chapter, function () {
                coffinone();
            })
        }
        else if (story[currentChapter].coffin2) {
            addToInstructions(story[currentChapter].chapter, function () {
                coffintwo();
            })
        }
        else if (story[currentChapter].coffin3) {
            addToInstructions(story[currentChapter].chapter, function () {
                coffinthree();
            })
        }
        else if (story[currentChapter].death) {
            
            $('#textInput').hide();
            $('#buttonOptions').hide();
            $('#yes').off();
            $('#no').off();
            $('.yesDead').off();
            $('.noDead').off();
            
            playSound(story[currentChapter].sound);
            addToInstructions(story[currentChapter].chapter + "<br> I died. <br>Would you like to play again? <br> ", function () {
                document.getElementById('laugh').play();
                $('#buttonYes').show();
            });

            $(".yesDead").one("click", function () {
                addToInstructions("Back into hell you go...");
                $('#buttonOptions').show();
                $('#buttonYes').hide();
                currentChapter = currentChapter - story[currentChapter].previous;
                resurrected = true;
                choices();
            });
            $(".noDead").one("click", function () {
                $('#buttonYes').hide();
                endScrollPageDownLoop;
                addToInstructions("Smart decision. Get out while you still can.", function () {
                 
                    return;
                }); 
            });                
        }
        else if (story[currentChapter].ending) {

            $("#buttonYes").hide();
            $("#buttonOptions").hide();

            story_text = story[currentChapter].chapter;
            story_text = story_text.replace(/playerName/g, name);

            addToInstructions(story_text, function () {
                    endScrollPageDownLoop;
                    exit();
                });                        
        }
        else if (story[currentChapter].options == "") {

            $("#buttonYes").hide();
            $("#buttonOptions").hide();

            playSound(story[currentChapter].sound);
            addToInstructions(story[currentChapter].chapter, function () {
                currentChapter = currentChapter + story[currentChapter].option1;
                choices();
            });
        }        
        else
        {
            $("#buttonYes").hide();
            $("#buttonOptions").hide();

            console.log("not death");

            if (!resurrected) {

                story_text = story[currentChapter].chapter;
                story_text = story_text.replace(/playerName/g, name);

                playSound(story[currentChapter].sound);
                addToInstructions(story_text, function () { revealOptions(); });
            }
            else
            {
                resurrected = false;
                revealOptions();
            }           
            
            buttonReset();            

            addToInstructions(story[currentChapter].options);            
            
            
            $(".yes3").one("click", function () {
                $('#buttonReveal').hide();
                currentChapter = currentChapter + story[currentChapter].option1;
                console.log(currentChapter);
                choices();                    
            });

            $(".no3").one("click", function () {
                $('#buttonReveal').hide();
                currentChapter = currentChapter + story[currentChapter].option2;
                console.log(currentChapter);
                choices();
            });                
        }
    }

    function coffinone() {
        $("#buttonOptions").hide();
        $("#buttonYes").hide();
        $("#textInput").show();
        $("#myText").val('');

        addToInstructions("<br>Which coffin did I open first?</br>choose a numeral from 1-17");
        $("#button").one("click", function () {
            var choice = document.getElementById("myText").value;
            if (choice <= 2 || choice >= 4) {
                currentChapter = 78;
                choices();
            }
            else if (choice > 17) {
                addToInstructions("</br></br>Please enter a number between 1-17", function () {
                    coffinone();
                });
            }
            else if (choice == 3) {
                addToInstructions("</br>I reached down and opened the lid. There was a note. On it was scrawled \"first step on your path downward.\"", function () {
                    coffintwo();
                });
            }
            else {
                addToInstructions("</br></br>Please enter a number between 1-17", function () {
                    coffinone();
                });
            }
        });
    }

    function coffintwo() {
        $("#buttonOptions").hide();
        $("#buttonYes").hide();
        $("#textInput").show();
        $("#myText").val('');
        addToInstructions("<br>Which coffin did I open second?</br>choose a numeral from 1-17");
        $("#button").one("click", function () {
            choice = document.getElementById("myText").value;
            if (choice != 3 && choice != 17) {
                currentChapter = 80;
                choices();
            }
            else if (choice == 17) {
                addToInstructions("</br></br>I reached down and opened the lid. There was another note. \"One more motion toward the depths below.\"", function () {
                    coffinthree();
                });
            }
            else if (choice == 3) {
                addToInstructions("</br>I already opened coffin number 3...", function () {
                    coffintwo();
                });
            }
            else if (choice > 17) {
                addToInstructions("</br>Please enter a number between 1-17", function () {
                    coffintwo();
                });
            }
            else {
                addToInstructions("</br>Please enter a number between 1-17", function () {
                    coffintwo();
                });
            }
        });
    }

    function coffinthree() {
        $("#buttonOptions").hide();
        $("#buttonYes").hide();
        $("#textInput").show();
        $("#myText").val('');
        addToInstructions("</br>Which coffin did I open third?</br>choose a numeral from 1-17");
        $("#button").one("click", function () {
            var choice = document.getElementById("myText").value;
            if (choice != 3 && choice != 17 && choice != 5) {
                currentChapter = 82;
                choices();
            }
            else if (choice == 5) {
                $("#textInput").hide();

                resurrected = false;
                currentChapter = 83;
                choices();
                
            }
            else if (choice == 17 || choice == 3) {
                addToInstructions("</br>I already opened coffin number " + choice + "...", function () {
                    coffinthree();
                });
            }
            else if (choice > 17) {
                addToInstructions("Please enter a number between 1-17.", function () {
                    coffinthree();
                });
            }
            else {
                addToInstructions("Please enter a number between 1-17.", function () {
                    coffinthree();
                });
            }
        });
    }

});