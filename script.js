
const chat = document.getElementById("chat");
const input = document.getElementById("pesan");
const tombol = document.getElementById("kirimBtn");

tombol.addEventListener("click", kirim);

input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        kirim();
    }
});

async function kirim(){
  if(!cekBatasChat()) return;

    const pesan = input.value.trim();

    if(pesan==="") return;

   tambahChat();

   chat.innerHTML += `
        <div class="user">
            ${pesan}
        </div>
    `;

    input.value="";

    chat.scrollTop = chat.scrollHeight;

    try{

        const response = await fetch(
            "https://chat-bot-mrr-ai-production.up.railway.app/chat",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    pesan:pesan
                })
            }
        );

        const data = await response.json();

        chat.innerHTML += `
            <div class="bot">
                ${data.jawaban}
            </div>
        `;

        chat.scrollTop = chat.scrollHeight;

    }catch(error){

        chat.innerHTML += `
            <div class="bot">
                Server tidak dapat dihubungi.
            </div>
        `;

    }

}
/* ==========================================
   MRR AI
   BATAS CHAT GRATIS
========================================== */

const MAX_CHAT = 5;

// false = belum login
// true = sudah login
let isLogin = false;

// Jumlah chat tersimpan
let chatCount = Number(localStorage.getItem("chatCount")) || 0;


/* ==========================================
   CEK BATAS CHAT
========================================== */

function cekBatasChat(){

    if(isLogin) return true;

    if(chatCount >= MAX_CHAT){

        tampilkanPopup();

        document.getElementById("pesan").disabled = true;
        document.getElementById("kirimBtn").disabled = true;

        return false;

    }

    return true;

}


/* ==========================================
   TAMBAH CHAT
========================================== */

function tambahChat(){

    chatCount++;

    localStorage.setItem("chatCount", chatCount);

}


/* ==========================================
   RESET CHAT
========================================== */

function resetChat(){

    chatCount = 0;

    localStorage.setItem("chatCount",0);

}


/* ==========================================
   POPUP LOGIN
========================================== */

function tampilkanPopup(){

    if(document.getElementById("popupLogin")) return;

    const popup = document.createElement("div");

    popup.id = "popupLogin";

    popup.innerHTML = `

        <div class="popup-box">

            <h2>MRR AI</h2>

            <p>
                Anda telah menggunakan
                <b>20 chat gratis</b>.
                <br><br>
                Silakan masuk akun terlebih dahulu
                untuk melanjutkan percakapan.
            </p>

            <button id="btnMasuk">

                Masuk

            </button>

        </div>

    `;

    document.body.appendChild(popup);

}


/* ==========================================
   LOGIN BERHASIL
========================================== */

function loginBerhasil(){

    isLogin = true;

    document.getElementById("popupLogin").remove();

    document.getElementById("pesan").disabled = false;

    document.getElementById("kirimBtn").disabled = false;

}
const inputArea = document.querySelector(".input-area");

if (window.visualViewport) {

    window.visualViewport.addEventListener("resize", () => {

        const keyboardHeight =
            window.innerHeight - window.visualViewport.height;

        inputArea.style.bottom = keyboardHeight + "px";

    });

}
window.visualViewport.addEventListener("resize", () => {

    const keyboardHeight =
        window.innerHeight - window.visualViewport.height;

    if (keyboardHeight > 0) {

        inputArea.style.bottom = keyboardHeight + "px";

    } else {

        inputArea.style.bottom = "0px";

    }

});
// ==============================
// RESET CHAT (sementara)
// ==============================

chatCount = 0;
localStorage.setItem("chatCount", chatCount);
