const dec = document.querySelector(".dec");
const inc = document.querySelector(".inc");
const qty = document.querySelector(".qty");
let a = 1;
inc.addEventListener('click', () =>
{
    a++;
    console.log("a");
    a = (a<10)? "0"+a : a;
    qty.innerText = a;
})
dec.addEventListener('click', () =>
{
    if (a>1)
    {
        a--;
        a = (a<10)? "0"+a : a;
        qty.innerText = a;
    }
})