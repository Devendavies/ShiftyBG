/* Archimedes was here */
const PI2 = Math.PI * 2;

/* Great balls are fire */
class GlowyBoy {
  constructor(x, y, radius, rgb){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.rgb = rgb;
    this.vx = Math.random() * 4;
    this.vy = Math.random() * 4;
    this.sinValue = Math.random();
  }

  /* Playin field */
  animate(ctx, stageWidth, stageHeight){
    this.sinValue = this.sinValue + 0.01;
    this.radius = this.radius + Math.sin(this.sinValue);
    this.x += this.vx;
    this.y += this.vy;

    // Make them walls
    if (this.x < 0){
      this.vx *= -1;
      this.x += 10;
    } else if (this.x > stageWidth){
      this.vx *= -1;
      this.x -= 10;
    }

    // Make dat floor and roof
    if (this.y < 0){
      this.vy *= -1;
      this.y += 10;
    } else if (this.y > stageHeight){
      this.vy *= -1;
      this.y -= 10;
    }

    /* It was all a blur */
    ctx.beginPath();
    const g = ctx.createRadialGradient(
      this.x,
      this.y,
      this.radius * 0.01,
      this.x,
      this.y,
      this.radius
    );
    g.addColorStop(0, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 1)`);
    g.addColorStop(1, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 0)`);

    /* no friggin clue why, but works better as a child val */
    ctx.fillStyle = g;
    ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
    ctx.fill();
  }
}

/* Get out the CRAYONS!!! - commented out boring ones */
const COLORS = [
   // { r: 128, g: 233, b: 255 }, // blendBackground
   // { r: 0, g: 72, b: 229 },    // blendIntersection
   // { r: 122, g: 115, b: 255 }, // blendForeground
   { r: 169, g: 96, b: 238 },  // gradientColorZero
   { r: 255, g: 51, b: 61 },   // gradientColorOne
   { r: 144, g: 224, b: 255 }, // gradientColorTwo
   { r: 255, g: 203, b: 87 },  // gradientColorThree
   // { r: 2, g: 188, b: 245 },   // shadeOneColor
   // { r: 0, g: 115, b: 230 },   // shadeTwoColor
   // { r: 0, g: 58, b: 185 },    // shadeThreeColor
   // { r: 99, g: 91, b: 255 },   // shadeFourColor
   // { r: 0, g: 44, b: 89 },     // shadeFiveColor
   // { r: 9, g: 203, b: 203 }    // shadeSixColor
];

// Getting classy with our organization
class App {
   constructor(){
      let target = document.body; // Where we puttin this shiz??

      // Add canvas to target
      this.canvas = document.createElement('canvas');
      target.appendChild(this.canvas);
      this.ctx = this.canvas.getContext('2d');

      /* Options */
      this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;
      this.totalParticles = 42;
      this.particles = [];
      this.maxRadius = 600;
      this.minRadius = 400;

      /* Stay limber my friends */
      window.addEventListener('resize', this.resize.bind(this), false);
      this.resize();

      window.requestAnimationFrame(this.animate.bind(this));
   }

   /* drive responsivebly  */
   resize(){
      // Life is but a stage
      this.stageWidth = document.body.clientWidth;
      this.stageHeight = document.body.clientHeight;

      this.canvas.width = this.stageWidth * this.pixelRatio;
      this.canvas.height = this.stageHeight * this.pixelRatio;
      this.ctx.scale(this.pixelRatio, this.pixelRatio);

      /* Think css 'background-filter' values */
      this.ctx.globalCompositeOperation = 'luminosity';


      this.createParticles();
   }

   /* Let there be BRIGHT */
   createParticles(){
      let curColor = 0;
      this.particles = [];

      // thems a SPICY meatballs
      for(let i = 0;i < this.totalParticles; i++){
         const item = new GlowyBoy(
            Math.random() * this.stageWidth,
            Math.random() * this.stageHeight,
            Math.random() *
            (this.maxRadius - this.minRadius) + this.minRadius,
            COLORS [curColor]
         );

         if (++curColor >= COLORS.length){
            curColor = 0;
         }

         this.particles[i] = item;
      }
   }

   /* Don't judge me... thats what it DOES.. */
   animate(){
      window.requestAnimationFrame(this.animate.bind(this));
      // dis is box
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

      // dis is balls flopped into box - big'ns
      for (let i=0; i < this.totalParticles; i++){
         const item = this.particles[i];
         item.animate(this.ctx, this.stageWidth, this.stageHeight);
      }
   }
}

/* Lets a ROLLLLLLLL */
window.onload = () => {
 new App();
}