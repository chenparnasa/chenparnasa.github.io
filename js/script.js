//---------------- Mouse Cursor ----------------//
let mouseCursor = document.querySelector('.cursor');
let navLinks = document.querySelectorAll('.nav-links li');
let scrollDown = document.querySelectorAll('.scroll-down');
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



//---------------- Mouse Cursor ----------------//


/*
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