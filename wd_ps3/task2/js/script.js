
const names = ['Poper', 'Noger', 'Ruker', 'Golover', 'Glazer'];

let animate = false;

$('.drop-down .drop-down-arrow').click(function () {
    if (!animate) {
        animate = true;
        $('.drop-down-element').toggle(200, function () {
            animate = false;
        });
    }
});
for (name of names) {
    let elementsDOM = document.createElement('div');
    elementsDOM.setAttribute('class', 'drop-down-element');
//elementsDOM.setAttribute('class', 'drop-down-element');

    let elementLogo = document.createElement('div');
    elementLogo.setAttribute('class', 'drop-down-logo');


    let elementName = document.createElement('div');
    elementName.setAttribute('class', 'drop-down-name');
    elementName.append(name);

    elementsDOM.append(elementLogo);
    elementsDOM.append(elementName);

    elementsDOM.setAttribute('style', 'display: none');

    $('.drop-down-element-main').after(elementsDOM);
}
/*
<div class="drop-down-element">
                <div class="drop-down-logo"><img src=""></div>
                <div class="drop-down-name">Friend 2</div>
                <div class="drop-down-arrow"></div>
            </div>



            <div class="drop-down-element">
                <div class="drop-down-logo"><img src=""></div>
                <div class="drop-down-name">Friend 2</div>
                <div class="drop-down-arrow"></div>
            </div>
* */

