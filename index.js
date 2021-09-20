// متغیرها
let input = document.getElementById('inputCounter');
let btn = document.getElementById('startCounter');
function validNum(number) {
    let valid = number.toString();
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i <= arr.length - 1; i++) {
        if (valid[0] == i || valid[1] == i || valid[2] == i || valid[3] == i || valid[4] == i || valid[5] == i || valid[6] == i || valid[7] == i || valid[8] == i || valid[9] == i) {
            return true;
        }else {

            return false
        }
    }
}
btn.addEventListener('click', function(e) {
    // متغیرها
    let inputVal = parseInt(input.value);
    let radialProgress = document.querySelector('.radial-progress');
    let errorMsg = document.getElementById('errorMessage');
    let orginalInputVal = inputVal;
    let successMsg = document.getElementById('successMessage');
    let loadingMsg = document.getElementById('loadingMessage');
    //اعتبار سنجی اینپوت
    try {
        // مشخص کردن متن ارور در صورت خالی بودن و استرینگ بودن
        if (isNaN(input.value) || Math.sign(Number(input.value))== -1) {
            radialProgress.setAttribute('data-number', 0);
            throw new Error('لطفا عدد را به درستی وارد کنید...');
        }else if(!isNaN(inputVal)) {
            // ثانیه شمار
            setInterval(function() {
                // اگر ثانیه بزرگتر از 0 بود
                if (inputVal >= 0) {
                    // نشان دادن وضعیت پروگرس به صورت متن در مرورگر
                    successMsg.classList.add('off');
                    loadingMsg.classList.remove('off');
                    // کم کردن ثانیه شمار و پروگرس بار
                    let percent = Math.abs(Math.floor(((orginalInputVal - inputVal) / orginalInputVal) * 100 - 100));
                    radialProgress.setAttribute('data-number', inputVal);
                    radialProgress.setAttribute('data-progress', percent);
                    inputVal -= 1;
                }
                // اگر ثانیه مساوی 0 شد
                else if (radialProgress.getAttribute('data-number') == 0) {
                    // نشان دادن وضعیت پروگرس به صورت متن در مرورگر
                    successMsg.classList.remove('off');
                    loadingMsg.classList.add('off');
                }
            }, 1000)
        }
    }catch(err) {
        // نمایش ارور در پاراگراف
        errorMsg.innerHTML = err.message;
    }finally {
        // خالی کردن اینپوت برای وارد کردن عدد مجدد در اینپوت
        input.value = "";
        // پاک کردن پیغام ارور بعد از 3 ثانیه
        setTimeout(function() {
            document.getElementById('errorMessage').innerHTML = "";
        }, 3000);
        // به حالت اول برگرداندن پروگرس بار برای استفاده مجدد
        document.querySelector('.radial-progress').setAttribute('data-progress', 100);
    }
});