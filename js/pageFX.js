$( document ).ready(function() {

    $(window).scroll(function() {
        // console.log(window.screenY);
        // console.log(document.body.scrollTop);
        console.log(document.documentElement.scrollTop);
        // const switchLoc = [50, 70];
        // var c = 0;

        //  (document.documentElement.scrollTop > )
    });

    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

  


    function get_popover_content(element) {
        if (element.dataset.tagInfo) {
           //
        }
        //
    }
    
    const container = document.getElementById("cont");
    container.style.marginTop = determineTopSpace() + "px";

    function determineTopSpace() {
        const navH = $(".nav").height();

        // console.log(navH);
        // console.log(parseInt($(".nav").css("top")));
        // console.log((navH - (parseInt($(".nav").css("top")))) / 2);

        const extraSpace = ((navH - (parseInt($(".nav").css("top")))) / 2);

        const offsetTop = navH + extraSpace - 5 ;
        return offsetTop;

    }

    localStorage.getItem("realBtnWidth");

    function centerElements() {
        // const container = document.getElementById("container");
        // const buttons = document.querySelectorAll(".buttons");
        // console.log("hello")
        const containerWidth = container.clientWidth;
        const buttonWidth = elements[0].getBoundingClientRect().width + 20;
        localStorage.setItem("realBtnWidth", buttonWidth);
        const totalWidth = buttonWidth * elements.length;
      
        // Calculate the left offset to center the buttons
        const leftOffset = (containerWidth - totalWidth) / 2;
      
        elements.forEach((button, index) => {
          const leftPosition = leftOffset + index * buttonWidth;
          button.style.left = leftPosition + "px";
          initialPositionsX[index] = leftPosition;
          button.style.top = "70px";
          initialPositionsY[index] = 20;
        });
    }

});