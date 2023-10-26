// 當輸入時會即時更新
document.addEventListener("DOMContentLoaded", function () {

    fetch("https://tw.rter.info/capi.php")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.USDTWD && data.USDJPY) {
                const usdToTwd = data.USDTWD.Exrate;
                const usdToJpy = data.USDJPY.Exrate;

                const exchangeRate = (usdToTwd / usdToJpy).toFixed(3); // 查詢最新匯率
                // 獲取元素
                const yenInput = document.getElementById("yen");
                const twdInput = document.getElementById("twd");
                const toNTDInput = document.getElementById("toNTD");
                const resultInput = document.getElementById("result");
                const calculateButton = document.querySelector("button");

                yenInput.addEventListener("input", function () {
                    // 確保輸入的值為有效數字
                    const yenAmount = parseFloat(yenInput.value);
                    if (!isNaN(yenAmount)) {
                        // 將日幣轉換為新台幣
                        const ntdAmount = yenAmount * exchangeRate;
                        toNTDInput.value = ntdAmount.toFixed(3); // 四捨五入至3位小數
                    } else {
                        toNTDInput.value = "";
                    }
                    // 設置“計算”按鈕的點擊事件
                    calculateButton.addEventListener("click", function () {
                        const priceDifference = toNTDInput.value - twdInput.value;
                        resultInput.value = priceDifference.toFixed(3);
                    });
                });
            } else {
                console.error("Data for USDTWD and/or USDJPY not found in the response.");
            }
        })
        .catch(error => {
            console.error(`There was a problem with the fetch operation: ${error.message}`);
        });
})

