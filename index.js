let input = document.getElementById('inputCounter');
let btn = document.getElementById('startCounter');

btn.addEventListener('click', function(e) {
    // دریافت مقداری که کاربر وارد می کند
    let inputVal = parseInt(input.value);
    let radialProgress = document.querySelector('.radial-progress');
    let errorMsg = document.getElementById('errorMessage');
    let orginalInputVal = inputVal;
    let successMsg = document.getElementById('successMessage');
    let loadingMsg = document.getElementById('loadingMessage');
    //اعتبار سنجی اینپوت
    try {
        console.log(inputVal);
        // مشخص کردن متن ارور در صورت خالی بودن و استرینگ بودن
        if (isNaN(inputVal)) {
            radialProgress.setAttribute('data-number', 0);
            radialProgress.setAttribute('data-progress', 0);
            throw new Error('لطفا عدد را به درستی وارد کنید...');
        }else if(!isNaN(inputVal)) {
            setInterval(function() {
                if (inputVal > 0) {
                    loadingMsg.classList.remove('d-none');
                    successMsg.classList.add('d-none');
                    loadingMsg.classList.add('d-block');

                    let percent = Math.abs(Math.floor(((orginalInputVal - inputVal) / orginalInputVal) * 100 - 100));
                    radialProgress.setAttribute('data-number', inputVal);
                    radialProgress.setAttribute('data-progress', percent);
                    inputVal -= 1;
                } else if(inputVal == 0) {
                    successMsg.classList.remove('d-none');
                    loadingMsg.classList.add('d-none');

                    successMsg.classList.add('d-block');
                    radialProgress.setAttribute('data-number', 0);
                    radialProgress.setAttribute('data-progress', 0);
                }
            }, 1000)
        }




    }catch(err) {
        errorMsg.innerHTML = err.message;
    }finally {
        input.value = "";
        setTimeout(function() {
            document.getElementById('errorMessage').innerHTML = "";
        }, 3000)
    }


})