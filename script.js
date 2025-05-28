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
  createCanvas(1200, 600);
  background(255);
  for (let i = 0; i < cantidad; i++) {
    imgtrazos[i].loadPixels();
    for (let j = 0; j < imgtrazos[i].pixels.length; j += 4) {
      let r = imgtrazos[i].pixels[j];
      let g = imgtrazos[i].pixels[j + 1];
      let b = imgtrazos[i].pixels[j + 2];
      if (r > 100 && g > 100 && b > 100) {
        imgtrazos[i].pixels[j + 3] = 0;
      }
    }
    imgtrazos[i].updatePixels();
  }
}

function draw() {
  for (let t of trazosActivos) {
    if (t.sombra) {
  drawingContext.shadowColor = color(150, 80, 0); 
  drawingContext.shadowBlur = 20;
} else {
  drawingContext.shadowBlur = 0;
}

    tint(0, 0, 0, 50);
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
    for (let t of trazosActivos) {
      t.alto += 5;
    }
  } else if (key === 'r' || key === 'R') {
    for (let t of trazosActivos) {
      t.alto = max(5, t.alto - 5);
    }
  } else if (key === 'x' || key === 'X') { 
    background(255);
    trazosActivos = [];
  }

  let orientacion = (key === 'h' || key === 'H') ? "horizontal" :
                    (key === 'v' || key === 'V') ? "vertical" :
                    (key === 's' || key === 'S') ? (random() < 0.5 ? "horizontal" : "vertical") : null;

  if (orientacion) {
    let cual = floor(random(cantidad));
    let x = random(width - 250);
    let y = random(height - 250);

    trazosActivos.push({
      indice: cual,
      x: x,
      y: y,
      ancho: 10,
      alto: 50,
      orientacion: orientacion,
      sombra: (key === 's' || key === 'S') && random() < 0.5
    });
  }
}
