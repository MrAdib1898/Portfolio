function init(){
    const slides =  document.querySelectorAll(".slide");
    const pages = document.querySelectorAll(".page")
    const backgrounds = [
        'radial-gradient(circle, rgba(108,56,56,1) 28%, rgba(83,47,47,1) 55%, rgba(2,18,22,1) 98%)',
        'radial-gradient(#2b3760, #0b1023',
        'radial-gradient(#4e4342, #161616)'
    ];
    let current = 0;
    let scrollSlide = 0;

    slides.forEach((slide,index) => {
        slide.addEventListener("click", function(){
            changeDots(this);
            nextSlide(index);
        });
    });
    function changeDots(dot){
        slides.forEach(slide=>{
            slide.classList.remove("active");
        });
        dot.classList.add("active");
    }
    function nextSlide(pageNumber){
        const nextPage = pages[pageNumber];
        const currentPage = pages[current];
        const nextLeft = nextPage.querySelector(".hero .model-left");
        const currentLeft = currentPage.querySelector(".hero .model-left");
        const nextText = nextPage.querySelector(".details");
        const folio = document.querySelector(".folio");
        const tl = new TimelineMax();
        tl.fromTo(currentLeft,0.3, {y: "20%"}, {y:"-500%"}, "-=0.2")
        .to(folio, 0.3,{backgroundImage:backgrounds[pageNumber]})
        .fromTo(
            currentPage,
            0.3,
            { opacity:1, pointerEvents:"all"},
            { opacity:0, pointerEvents:"none"}
        )
        .fromTo(
            nextPage,
            0.3,
            {opacity:0, pointerEvents:"none"},
            {opacity:1,pointerEvents:"all"},
            "-=0.3"
        )

        .fromTo(nextLeft,1.0,{y:"-100%"}, {y:"-10%"}, "-=0.6");

    current = pageNumber;
   
    }
    document.addEventListener('wheel', throttle(scrollChange, 1500));

    function switchDots(dotNumber){
        const activeDot = document.querySelectorAll(".slide")[dotNumber];
        slides.forEach(slide=>{
            slide.classList.remove("active");
        })
        activeDot.classList.add("active");
    }

    function scrollChange(e){ /*limit the scroll to not more than once, so that the page does not change continuously*/
        if(e.deltaY>0){
            scrollSlide +=1; 
        }else{
            scrollSlide-=1;
        }

        if(scrollSlide>2){
            scrollSlide=0;
        }
        if(scrollSlide<0){
            scrollSlide =2;
        }
        
        nextSlide(scrollSlide);
        switchDots(scrollSlide);
        console.log(scrollSlide);   
    }
    const menus = document.querySelector('.menu');
    const menusLines = document.querySelectorAll('.menu line');
    const navOpen = document.querySelector('.nav-open');
    const contact = document.querySelector('.contact');
    const social = document.querySelector('.social');
    const logo = document.querySelector('.logo');

    const tl = new TimelineMax({paused:true});

    tl.to(navOpen, 0.5, {y:0})
    .fromTo(contact, 0.5, {opacity:0, y:10}, {opacity:1, y:0});

    menus.addEventListener('click', ()=> {
        tl.reversed() ? tl.play() :tl.reversed();
    });

    console.log(counter);
   
}
const images = document.querySelectorAll('.img-container img');
const texts = document.querySelectorAll('.myWork .details');
const desc =  document.querySelectorAll('.mySkills .details');


let i = 0; //current
let j = 4; //total 

function next(){

    
    document.getElementById('content' + (i+1)).classList.remove('active');
    document.getElementById('text' + (i+1)).classList.remove('active');
    document.getElementById('skill' + (i+1)).classList.remove('active');
    document.getElementById('skills-desc' + (i+1)).classList.remove('active');
    i=(j+i-1)%j;
    document.getElementById('content' + (i+1)).classList.add('active');
    document.getElementById('text' + (i+1)).classList.add('active');
    document.getElementById('skill' + (i+1)).classList.add('active');
    document.getElementById('skills-desc' + (i+1)).classList.add('active');
}


function prev(){   
    document.getElementById('content' + (i+1)).classList.remove('active');
    document.getElementById('text' + (i+1)).classList.remove('active');
    document.getElementById('skill' + (i+1)).classList.remove('active');
    document.getElementById('skills-desc' + (i+1)).classList.remove('active');
    i=(j+i+1)%j;
    document.getElementById('content' + (i+1)).classList.add('active');
    document.getElementById('text' + (i+1)).classList.add('active');
    document.getElementById('skill' + (i+1)).classList.add('active');
    document.getElementById('skills-desc' + (i+1)).classList.add('active');
}

function throttle(func, limit){
    let inThrottle;
    return function(){
        const args = arguments;
        const context = this;
        if (!inThrottle){
            func.apply(context, args);
            inThrottle = true;
            setTimeout(()=> (inThrottle =false), limit); 
        }
    };
}

init();