let container = document.querySelector('.container'),
    gridBtn = document.getElementById('submit-grid'),
    clearGridBtn = document.getElementById('clear-grid'),
    gridWidth = document.getElementById('width-range'),
    gridHeight = document.getElementById('height-range'),
    colorBtn = document.getElementById('color-input'),
    eraseBtn = document.getElementById('erase-btn'),
    paintBtn = document.getElementById('paint-btn'),
    widthValue = document.getElementById('width-value'),
    heightValue = document.getElementById('height-value');

let events = {
    mouse: {
        down: 'mousedown', // detecta cuando un botón del ratón está siendo presionado
        move: 'mousemove', //  es activado cuando el ratón se mueve dentro del elemento.
        up: 'mouseup', // detecta cuando el botón se ha dejado de presionar.
    },
    touch: {
        down: 'touchstart',
        move: 'touchmove',
        up: 'touchend'
    },
};

let deviceType = '';

let draw = false;
let erase = false;

const isTouchDevice = () =>{
    try{
        document.createEvent('TouchEvent');
        deviceType = 'touch';
        return true;
    }  catch (e){
        deviceType = 'mouse';
        return false;
    }
};

isTouchDevice();

gridBtn.addEventListener('click', ()=> {
    container.innerHTML = '';
    let count = 0;
    for(let i = 0; i < gridHeight.value; i++){
        count += 2;
        let div = document.createElement('DIV');
        div.classList.add('gridRow');

        for(let j = 0; j <  gridWidth.value; j++ ){
            count += 2;
            let col = document.createElement('DIV');
            col.classList.add('gridCol'); 
            col.setAttribute('id', `gridCol${count}`);
            col.addEventListener(events[deviceType].down, ()=>{
                draw = true;
                if(erase){
                    col.style.backgroundColor = 'transparent'
                } else{
                    col.style.backgroundColor = colorBtn.value;
                }
            })

           col.addEventListener(events[deviceType].move, (e)=>{
            let elementId = document.elementFromPoint(
                !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                !isTouchDevice() ? e.clientY : e.touches[0].clientY
            ).id;
            checker(elementId);
           }) ;

           col.addEventListener(events[deviceType].up, ()=>{
            draw = false;
           });

           div.appendChild(col);

        }

        container.appendChild(div);
    }
});

function checker(elementId){
    let gridColums = document.querySelectorAll('.gridCol');
    gridColums.forEach((element)=>{
        if(elementId == element.id){
            if(draw && !erase){
                element.style.backgroundColor = colorBtn.value;
            } else if(draw && erase){
                element.style.backgroundColor = 'transparent';
            }
        }
    });
}

clearGridBtn.addEventListener('click', ()=>{
    container.innerHTML = '';
})

eraseBtn.addEventListener('click', ()=>{
    erase = true;
})

paintBtn.addEventListener('click', ()=>{
    erase = false;
})

gridWidth.addEventListener('input', ()=>{
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
})

gridHeight.addEventListener('input', ()=>{
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
})

window.onload = () =>{
    gridHeight.value = 0;
    gridWidth.value = 0;
}