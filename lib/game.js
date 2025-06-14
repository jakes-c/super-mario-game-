import render from './util/render';
import input from './util/input';
import animation from './util/animation';
import movement from './util/movement';
import physics from './util/physics';

import { levelOne } from './map/level_1-1';
import { levelTwo } from './map/level_1-2';
import { levelThree } from './map/level_1-3';
import MapBuilder from './map/map_builder';

import Mario from './entities/mario';
import Goomba from './entities/goomba';
import Koopa from './entities/koopa';
import Score from './entities/score';

// todos: animate blocks. mario duck/run. enemy collisions

class Game {
  constructor() {
    this.currentLevel = 1;
    this.levels = {
      1: levelOne,
      2: levelTwo,
      3: levelThree
    };
    this.gameLoop = null;
    this.muted = false;
    this.spriteSheet = null;
    this.tileset = null;
  }

  init() {
    const canvasEl = document.getElementById('game-canvas');
    const ctx = canvasEl.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
    ctx.scale(3, 3);

    const canvas = {
      canvas: canvasEl,
      ctx,
    };

    const viewport = {
      width: 760,
      height: 600,
      vX: 0,
      vY: 0,
    };

    const backgroundMusic = document.getElementById('background_music');

    // Add mute button
    document.getElementById('mute-button').addEventListener('click', (e) => {
      backgroundMusic.muted = !backgroundMusic.muted;
      if (this.muted) {
        this.muted = false;
        e.target.className = '';
      } else {
        this.muted = true;
        e.target.className += 'muted';
      }
      e.preventDefault();
    }, false);

    // Load sprites once and reuse them
    this.spriteSheet = new Image();
    this.spriteSheet.src = './assets/sprites/spritesheet.png';

    this.tileset = new Image();
    this.tileset.src = './assets/sprites/tileset_gutter.png';

    // Wait for both images to load
    let loadedImages = 0;
    const onImageLoad = () => {
      loadedImages++;
      if (loadedImages === 2) {
        this.loadLevel(this.currentLevel, canvas, viewport, backgroundMusic);
      }
    };

    this.spriteSheet.addEventListener('load', onImageLoad);
    this.tileset.addEventListener('load', onImageLoad);
  }

  // --- Added method below ---
  startWithLevel(level) {
    this.currentLevel = parseInt(level, 10);
    // If spriteSheet and tileset are already loaded, just load the level.
    if (
      this.spriteSheet &&
      this.tileset &&
      this.spriteSheet.complete &&
      this.tileset.complete
    ) {
      // Reuse existing canvas/context
      const canvasEl = document.getElementById('game-canvas');
      const ctx = canvasEl.getContext('2d');
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      ctx.scale(3, 3);
      const canvas = { canvas: canvasEl, ctx };
      const viewport = { width: 760, height: 600, vX: 0, vY: 0 };
      const backgroundMusic = document.getElementById('background_music');
      this.loadLevel(this.currentLevel, canvas, viewport, backgroundMusic);
    } else {
      // If not loaded, initialize fresh (will load images first)
      this.init();
    }
  }
  // --- End added method ---

  loadLevel(levelNumber, canvas, viewport, backgroundMusic) {
    // Ensure levelNumber is an integer
    levelNumber = parseInt(levelNumber, 10);

    const currentLevelData = this.levels[levelNumber];
    
    console.log(`Loading level ${levelNumber}`, currentLevelData);
    
    if (!currentLevelData) {
      console.error(`Level ${levelNumber} not found!`);
      return;
    }

    // Reset viewport position
    viewport.vX = 0;
    viewport.vY = 0;

    // Stop the current game loop if it exists
    if (this.gameLoop) {
      cancelAnimationFrame(this.gameLoop);
      this.gameLoop = null;
    }

    // Clear the canvas
    canvas.ctx.setTransform(1, 0, 0, 1, 0, 0); // Always reset before clear
    canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    canvas.ctx.scale(3, 3);

    const data = {
      spriteSheet: this.spriteSheet,
      canvas,
      viewport,
      animationFrame: 0,
      mapBuilder: new MapBuilder(currentLevelData, this.tileset, this.spriteSheet),
      entities: {},
      sounds: {
        backgroundMusic,
        breakSound: new Audio('./assets/audio/sounds/break_block.wav'),
        levelFinish: new Audio('./assets/audio/music/level_complete.mp3'),
      },
      userControl: true,
      reset: this.reset.bind(this),
      nextLevel: this.nextLevel.bind(this),
      currentLevel: levelNumber,
    };

    const mario = new Mario(this.spriteSheet, 175, 0, 16, 16);
    const score = new Score(270, 15);

    input.init(data);
    data.entities.mario = mario;
    data.entities.score = score;
    data.entities.coins = [];
    data.entities.mushrooms = [];
    data.entities.goombas = [];
    data.entities.koopas = [];

    // Load enemies from current level
    if (currentLevelData.koopas) {
      currentLevelData.koopas.forEach((koopa) => {
        data.entities.koopas.push(
          new Koopa(this.spriteSheet, koopa[0], koopa[1], koopa[2], koopa[3])
        );
      });
    }

    if (currentLevelData.goombas) {
      currentLevelData.goombas.forEach((goomba) => {
        data.entities.goombas.push(
          new Goomba(this.spriteSheet, goomba[0], goomba[1], goomba[2], goomba[3])
        );
      });
    }

    render.init(data);
    this.run(data);
  }

  nextLevel() {
    console.log(`Attempting to go to next level. Current: ${this.currentLevel}`);
    
    // Ensure currentLevel is an integer
    this.currentLevel = parseInt(this.currentLevel, 10);

    if (this.currentLevel < Object.keys(this.levels).length) {
      this.currentLevel++;
      console.log(`Moving to level ${this.currentLevel}`);
      
      // Stop the current game loop
      if (this.gameLoop) {
        cancelAnimationFrame(this.gameLoop);
        this.gameLoop = null;
      }
      
      const canvasEl = document.getElementById('game-canvas');
      const ctx = canvasEl.getContext('2d');
      
      // Reset the canvas transform before clearing
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      ctx.scale(3, 3);
      
      const canvas = { canvas: canvasEl, ctx };
      
      const viewport = {
        width: 760,
        height: 600,
        vX: 0,
        vY: 0,
      };

      const backgroundMusic = document.getElementById('background_music');
      
      // Use already loaded sprites instead of loading new ones
      if (this.spriteSheet && this.tileset) {
        console.log(`Loading level ${this.currentLevel} with existing sprites`);
        this.loadLevel(this.currentLevel, canvas, viewport, backgroundMusic);
      } else {
        console.error('Sprites not loaded properly');
      }
    } else {
      // Game completed
      console.log('All levels completed!');
      alert('Congratulations! You completed all levels!');
      this.reset();
    }
  }

  run(data) {
    const loop = () => {
      input.update(data);
      animation.update(data);
      movement.update(data);
      physics.update(data);

      Game.updateView(data);
      render.update(data);

      data.animationFrame += 1;
      this.gameLoop = window.requestAnimationFrame(loop);
    };

    loop();
  }

  // Update viewport to follow Mario
  static updateView(data) {
    const viewport = data.viewport;
    const margin = viewport.width / 6;
    const center = {
      x: data.entities.mario.xPos + (data.entities.mario.width * 0.5),
      y: data.entities.mario.yPos + (data.entities.mario.height * 0.5),
    };

    if (center.x < viewport.vX + (margin * 2)) {
      viewport.vX = Math.max(center.x - margin, 0);
    } else if (center.x > (viewport.vX + viewport.width) - (margin * 2)) {
      viewport.vX = Math.min((center.x + margin) - viewport.width, 3400 - viewport.width);
    }
  }

  reset() {
    if (this.gameLoop) {
      cancelAnimationFrame(this.gameLoop);
      this.gameLoop = null;
    }
    this.currentLevel = 1;
    location.reload();
  }
}

const game = new Game();
game.init();
export default game;