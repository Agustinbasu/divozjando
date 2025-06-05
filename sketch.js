let imgtrazos = [];

let cantidad = 12;

let trazosActivos = [];

function preload() {

for (let i = 0; i < cantidad; i++) {

let nombre = "data/trazo" + nf(i, 2) + ".png";

imgtrazos[i] = loadImage(nombre);

}

}

function setup() {

createCanvas(windowWidth, windowHeight);

background(255);

for (let i = 0; i < cantidad; i++) {

imgtrazos[i].loadPixels();



for (let j = 0; j < imgtrazos[i].pixels.length; j += 4) {

  let r = imgtrazos[i].pixels[j];

  let g = imgtrazos[i].pixels[j + 1];

  let b = imgtrazos[i].pixels[j + 2];



  if (r > 100 && g > 100 && b > 100) {

   

    imgtrazos[i].pixels[j + 3] = 0;

  } else {

    

    imgtrazos[i].pixels[j] = 255;

    imgtrazos[i].pixels[j + 1] = 255;

    imgtrazos[i].pixels[j + 2] = 255;

  }

}



imgtrazos[i].updatePixels();

}

}

function draw() {

for (let i = 0; i < trazosActivos.length; i++) {

let t = trazosActivos[i];



if (t.marron === true) {

  tint(150, 80, 0, 255); 

} else {

  tint(0, 0, 0, 50); 

}



if (t.orientacion === "horizontal") {

  image(imgtrazos[t.indice], t.x, t.y, t.ancho, t.alto);

  t.ancho += 3;

} else {

  image(imgtrazos[t.indice], t.x, t.y, t.alto, t.ancho);

  t.ancho += 3;

}

}

}

function keyPressed() {

if (key === 'e' || key === 'E') {

for (let i = 0; i < trazosActivos.length; i++) {

  trazosActivos[i].alto = min(trazosActivos[i].alto + 5, 100); // máximo alto

}

}

else if (key === 'r' || key === 'R') {

for (let i = 0; i < trazosActivos.length; i++) {

  trazosActivos[i].alto = max(25, trazosActivos[i].alto - 5); // mínimo alto

}

}

else if (key === 'x' || key === 'X') {

background(255);

trazosActivos = [];

}

let orientacion = null;

let marron = false;

if (key === 'h' || key === 'H') {

orientacion = "horizontal";

} else if (key === 'v' || key === 'V') {

orientacion = "vertical";

} else if (key === 's' || key === 'S') {

if (random() < 0.5) {

  orientacion = "horizontal";

} else {

  orientacion = "vertical";

}

marron = true;

}

if (orientacion !== null) {

let cual = floor(random(cantidad));

let x = random(width - 250);

let y = random(height - 250);



let nuevoTrazo = {

  indice: cual,

  x: x,

  y: y,

  ancho: 10,

  alto: 50,

  orientacion: orientacion,

  marron: marron

};



trazosActivos.push(nuevoTrazo);

}

}