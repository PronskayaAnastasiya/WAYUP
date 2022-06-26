const tabs = document.getElementById('tabs');
const contents = document.querySelectorAll('.content');

const tabs2 = document.getElementById('tabs2');
const contents2 = document.querySelectorAll('.content2');

const changeClass = e1 => {
    for (let i = 0; i < tabs.children.length; i++){

        tabs.children[i].classList.remove('active');
    }
    e1.classList.add('active');
}

tabs.addEventListener('click', e => {
    const currTab = e.target.dataset.btn;
    changeClass(e.target);
    for (let i = 0; i < contents.length; i++){
        contents[i].classList.remove('active');
        if (contents[i].dataset.content == currTab) {
            contents[i].classList.add('active');
        }
    }
})

const changeClass2 = e1 => {
    for (let i = 0; i < tabs2.children.length; i++) {

        tabs2.children[i].classList.remove('active');
    }
    e1.classList.add('active');
}


tabs2.addEventListener('click', e => {
    changeClass2(e.target);
    const currTab2 = e.target.dataset.btn2;
    for (let i = 0; i < contents2.length; i++){
        contents2[i].classList.remove('active');
        if (contents2[i].dataset.content2 == currTab2) {
            contents2[i].classList.add('active');
        }
    }

})


