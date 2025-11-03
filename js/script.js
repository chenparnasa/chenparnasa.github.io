//---------------- Mobile Nav ----------------//
const navSlide = () =>{
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', ()=>{
        //Toggle nav
        nav.classList.toggle('nav-active');

        //Animate links
        navLinks.forEach((link, index)=>{
            if(link.style.animation){
                link.style.animation = ''
            }
            else{
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 1}s`;
            }
        });

        //Burger animation
        burger.classList.toggle('toggle');
    });

    burger.addEventListener('mouseleave', ()=>{
        mouseCursor.classList.remove("link-grow");
    });
    burger.addEventListener('mouseover', ()=>{
        mouseCursor.classList.add("link-grow");
    });
}

navSlide();
//---------------- Mobile Nav ----------------//



//---------------- Mouse Cursor ----------------//
let mouseCursor = document.querySelector('.cursor');
let navLinks = document.querySelectorAll('.nav-links li');
let scrollDown = document.querySelectorAll('.scroll-down');
let creditLinks = document.querySelectorAll('.credits a');
/*var cursor = document.querySelector(".cursor");
var cursor2 = document.querySelector(".cursor2");
document.addEventListener("mousemove", function(e){
    cursor.style.cssText = cursor2.style.cssText = "left: " +e.clientX + "px; top: " + e.clientY +"px;";
});*/

window.addEventListener('mousemove', cursor);

function cursor(e){
    mouseCursor.style.top = e.pageY + 'px';
    mouseCursor.style.left = e.pageX + 'px';
}

/*

socialLinks.forEach((link)=>{
    link.addEventListener('mouseleave', ()=>{
        mouseCursor.classList.remove("link-grow");
    });
    link.addEventListener('mouseover', ()=>{
        mouseCursor.classList.add("link-grow");
    });
});

downloadCV.forEach((link)=>{
    link.addEventListener('mouseleave', ()=>{
        mouseCursor.classList.remove("link-grow");
    });
    link.addEventListener('mouseover', ()=>{
        mouseCursor.classList.add("link-grow");
    });
});

viewProject.forEach((link)=>{
    link.addEventListener('mouseleave', ()=>{
        mouseCursor.classList.remove("link-grow");
    });
    link.addEventListener('mouseover', ()=>{
        mouseCursor.classList.add("link-grow");
        
    });
});
*/

navLinks.forEach((link)=>{
    link.addEventListener('mouseleave', ()=>{
        mouseCursor.classList.remove("link-grow");
    });
    link.addEventListener('mouseover', ()=>{
        mouseCursor.classList.add("link-grow");
    });
});

scrollDown.forEach((link)=>{
    link.addEventListener('mouseleave', ()=>{
        mouseCursor.classList.remove("link-grow");
    });
    link.addEventListener('mouseover', ()=>{
        mouseCursor.classList.add("link-grow");
    });
});

creditLinks.forEach((link)=>{
    link.addEventListener('mouseleave', ()=>{
        mouseCursor.classList.remove("link-grow");
    });
    link.addEventListener('mouseover', ()=>{
        mouseCursor.classList.add("link-grow");
    });
});



//---------------- Mouse Cursor ----------------//

// Copy email

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}




/**
 * Change the text of a button
 * @param {el} object HTMLElement: button to change text of
 * @param {dText} string: default text
 * @param {nText} string: new text
 **/
 function changeText(el, dText, nText) {
    var content = '',
        context = '';
    
    /**
     * Set the text of a button
     *     - dependant upon current text
     **/
    function setText() {
      return (content === dText) ? nText : dText;
    }
    
    /* Check to see if the browser accepts textContent */
    if ('textContent' in document.body) {
      context = 'textContent';
      /* Get the current button text */
      content = el[context];
    /* Browser does NOT use textContent */
    } else {
      /* Get the button text with fallback option */
      content = el.firstChild.nodeValue;
    }
    
    /* Set button text */
    if (context === 'textContent') {
      el.textContent = setText();
    } else {
      el.firstChild.nodeValue = setText();
    }
  }
  
  
var defaultText,
    substituteText,
    btn;

/* Default text of the button */
defaultText = 'Email';
/* Alternate text for button */
substituteText = 'Copied to clipboard';
/* Grab our button */
btn = document.querySelector('.email');

/* Add a listener to the button instance so we can manipulate it */
btn.addEventListener('click', function() {
  changeText(this, defaultText, substituteText);
  
  // Change the text back to the default after 2 seconds
  setTimeout(function() {
    changeText(btn, substituteText, defaultText);  // Change text back to 'Email'
  }, 2000);  // 2000ms = 2 seconds
}, false);

/* Function to change the text of the button */
function changeText(button, oldText, newText) {
  if (button.textContent === oldText) {
    button.textContent = newText;
  } else {
    button.textContent = oldText;
  }
}


/*
//---------------- Skills Bars ----------------//
const htmlBar = document.querySelector('.bar-html')
const cssBar = document.querySelector('.bar-css')
const jsBar = document.querySelector('.bar-javascript')
const javaBar = document.querySelector('.bar-java')
const psBar = document.querySelector('.bar-photoshop')
const aiBar = document.querySelector('.bar-illustrator')

var t1 = new TimelineLite()

t1.fromTo(htmlBar, .75, {width: 'calc(0% - 6px)'}, {width: 'calc(90% - 6px)', ease: Power4.easeOut})
.fromTo(cssBar, .75, {width: 'calc(0% - 6px)'}, {width: 'calc(90% - 6px)', ease: Power4.easeOut})
.fromTo(jsBar, .75, {width: 'calc(0% - 6px)'}, {width: 'calc(80% - 6px)', ease: Power4.easeOut})
.fromTo(javaBar, .75, {width: 'calc(0% - 6px)'}, {width: 'calc(80% - 6px)', ease: Power4.easeOut})
.fromTo(psBar, .75, {width: 'calc(0% - 6px)'}, {width: 'calc(70% - 6px)', ease: Power4.easeOut})
.fromTo(aiBar, .75, {width: 'calc(0% - 6px)'}, {width: 'calc(60% - 6px)', ease: Power4.easeOut})

const controller = new ScrollMagic.Controller()
const scene = new ScrollMagic.Scene({
    triggerElement: '.about',
    triggerHook: 0
})
.setTween(t1)
.addTo(controller)

//---------------- Skills Bars ----------------//


function togglePopup1(){
    document.getElementById("popup-1").classList.toggle("active");
}

function togglePopup2(){
    document.getElementById("popup-2").classList.toggle("active");
}

function togglePopup3(){
    document.getElementById("popup-3").classList.toggle("active");
}
*/