let image = document.getElementById("img");
let currentImg = 0;
let images = ["assets/Photo.jpg", "assets/Photo_A.png"]
let img = document.querySelector("img");
let point1 = document.querySelector("#point_1");
let point2 = document.querySelector("#point_2");
let reload_img_btn = document.querySelector("#reload_img_btn");
let change_color_btn = document.querySelector("#change_color_btn");
let go_back_btn = document.querySelector("#go_back_btn");
var p5_img;
var colors;

// Changing images by time
function displayNextImage() {
    if (++currentImg >= images.length)
        currentImg = 0;

    image.src = images[currentImg];
}
setInterval(displayNextImage, 3000);


//Submit image URL
document.getElementById("submit-button").addEventListener("click", myFunction);
function myFunction() {
    // window.location.href = "index_2.html";
    document.querySelector("#page_1").classList.add("hidden_content");
    document.querySelector("#page_2").classList.remove("hidden_content");
    // Get the image url input .image_input
    p5_img = loadImage(document.querySelector(".image_input").value, function () { draw(); });
}

// Select images
point_1.addEventListener('click', function () {
    img.src = 'assets/Photo.jpg';
})

point_2.addEventListener('click', function () {
    img.src = 'assets/Photo_A.png';
})


reload_img_btn.addEventListener('click', function () {
    draw();
});

change_color_btn.addEventListener('click', function () {
    let random_color = colors[Math.floor(Math.random() * colors.length)].color;
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = random_color;
});

go_back_btn.addEventListener('click', function () {
    document.querySelector("#page_1").classList.remove("hidden_content");
    document.querySelector("#page_2").classList.add("hidden_content");
    document.body.style.backgroundImage = "url('assets/Violet-Blue.jpg')";
});


function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent('canvas_container');
}

function draw() {
    if (typeof (p5_img) != 'undefined') {
        p5_img.resize(400, 400);
        for (let col = 0; col < 400; col += 5) {
            for (let row = 0; row < 400; row += 5) {
                let xPos = col;
                let yPos = row;
                let c = p5_img.get(xPos, yPos);
                push();
                translate(xPos, yPos);
                rotate(radians(random(180)));
                noFill();
                stroke(color(c));
                strokeWeight(random(9));
                point(xPos*1.75, yPos);
                strokeWeight(random(4));
                curve(
                    xPos,
                    yPos,
                    sin(xPos) * random(60),
                    cos(xPos) * sin(xPos) * random(30),
                    random(10),
                    random(60),
                    cos(yPos) * sin(yPos) * random(120),
                    cos(xPos) * sin(xPos) * random(40)
                );
                pop();
            }
        }
    }
    noLoop();
}


window.addEventListener('load', function () {
    console.log('page is loaded');
    this.fetch('web_colors.json')
        .then(response => response.json())
        .then(data => {
            colors = data.colors;
        })
});