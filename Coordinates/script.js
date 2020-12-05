const horizontal = document.querySelector('.horizontal');
const vertical = document.querySelector('.vertical');
const target = document.querySelector('.target');
const targetRect = target.getBoundingClientRect();
const targetHalfWidth = targetRect.width / 2;
const targetHalfHeight = targetRect.height / 2;
const tag = document.querySelector('.tag');


document.addEventListener('mousemove', (e)=> {
    const x = e.clientX;
    const y = e.clientY;

    horizontal.style.transform = `translateY(${y}px)`;
    vertical.style.transform = `translateX(${x}px)`;
    
    target.style.transform = `translate(${x-targetHalfWidth}px, ${y-targetHalfHeight}px)`;

    tag.style.transform = `translate(${x+20}px, ${y+20}px)`;
    tag.innerText = `${x}px, ${y}px`
})

