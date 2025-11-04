var selector = document.querySelector(".selector_box");
selector.addEventListener('click', () => {
    if (selector.classList.contains("selector_open")){
        selector.classList.remove("selector_open")
    }else{
        selector.classList.add("selector_open")
    }
})

document.querySelectorAll(".date_input").forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector(".date").classList.remove("error_shown")
    })
})

var sex = "m"

document.querySelectorAll(".selector_option").forEach((option) => {
    option.addEventListener('click', () => {
        sex = option.id;
        document.querySelector(".selected_text").innerHTML = option.innerHTML;
    })
})

var upload = document.querySelector(".upload");

// === REPLACED IMAGE UPLOAD SECTION (ImgBB) ===
var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";

upload.addEventListener('click', () => {
    imageInput.value = ""; // reset so user can reselect
    upload.classList.remove("error_shown");
    imageInput.click();
});

imageInput.addEventListener('change', async () => {
    if (!imageInput.files.length) return;

    upload.classList.remove("upload_loaded");
    upload.classList.add("upload_loading");
    upload.removeAttribute("selected");

    const file = imageInput.files[0];
    const data = new FormData();
    data.append("image", file);

    try {
        const res = await fetch("https://api.imgbb.com/1/upload?key=8ca5d96c7a478e5a16bb17c74a37f819", {
            method: "POST",
            body: data
        });
        const response = await res.json();

        if (!response.success) throw new Error("Upload failed");

        const url = response.data.url;

        upload.classList.remove("upload_loading");
        upload.classList.add("upload_loaded");
        upload.querySelector(".upload_uploaded").src = url;
        upload.setAttribute("selected", url);
    } catch (err) {
        console.error(err);
        upload.classList.remove("upload_loading");
        upload.classList.add("error_shown");
    }
});
// === END IMAGE UPLOAD REPLACEMENT ===

document.querySelectorAll(".input_holder").forEach((element) => {

    var input = element.querySelector(".input");
    input.addEventListener('click', () => {
        element.classList.remove("error_shown");
    })

});

document.querySelector(".go").addEventListener('click', () => {

    var empty = [];

    var params = new URLSearchParams();

    params.set("sex", sex)
    if (!upload.hasAttribute("selected")){
        empty.push(upload);
        upload.classList.add("error_shown")
    }else{
        params.set("image", upload.getAttribute("selected"))
    }

    var birthday = "";
    var dateEmpty = false;
    document.querySelectorAll(".date_input").forEach((element) => {
        birthday = birthday + "." + element.value
        if (/^\s*$/.test(element.value)){
            dateEmpty = true;
        }
    })

    birthday = birthday.substring(1);

    if (dateEmpty){
        var dateElement = document.querySelector(".date");
        dateElement.classList.add("error_shown");
        empty.push(dateElement);
    }else{
        params.set("birthday", birthday)
    }

    document.querySelectorAll(".input_holder").forEach((element) => {

        var input = element.querySelector(".input");

        if (/^\s*$/.test(input.value)){
            empty.push(element);
            element.classList.add("error_shown");
        }else{
            params.set(input.id, input.value)
        }

    })

    if (empty.length != 0){
        empty[0].scrollIntoView();
    }else{

        forwardToId(params);
    }

});

function forwardToId(params){

location.href = "/szpeloza/id?" + params


}

var guide = document.querySelector(".guide_holder");
guide.addEventListener('click', () => {

    guide.classList.toggle("unfolded");

})

