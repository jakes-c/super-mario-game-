import * as Scenery from '../entities/scenery';
import Block from '../entities/block';
import Breakable from '../entities/breakable';
// Import your level files
import level_1_1 from '../map/level_1-1';
import level_1_2 from '../map/level_1-2';
import level_1_3 from '../map/level_1-3';

export default class MapBuilder {
  constructor(level, tileset, spriteSheet) {
    this.level = level;
    this.tileset = tileset;
    this.spriteSheet = spriteSheet;
    this.currentLevelName = this.getCurrentLevelName(level); // Track current level

    this.mountainSheet = new Image();
    this.mountainSheet.src = './assets/sprites/mountain.png';
    this.cloudsSheet = new Image();
    this.cloudsSheet.src = './assets/sprites/clouds.png';
    this.castleSheet = new Image();
    this.castleSheet.src = './assets/sprites/castle.png';

    this.sceneryEntities = [];
    this.brickEntities = [];
    this.breakableEntities = [];
    this.blockEntities = [];

    // Level progression mapping
    this.levelProgression = {
      'level_1-1': level_1_2,
      'level_1-2': level_1_3,
      'level_1-3': null // End of current levels
    };

    this.buildLevel(level);
  }

  buildLevel(level) {
    // Clear existing entities
    this.sceneryEntities = [];
    this.brickEntities = [];
    this.breakableEntities = [];
    this.blockEntities = [];

    // Safely get arrays or fallback to []
    const getArr = (arr) => Array.isArray(arr) ? arr : [];

    // --- ORIGINAL HANDLING ---

    getArr(level.ground).forEach((ground) => {
      this.sceneryEntities.push(
        new Scenery.Ground(this.tileset, ground.x, ground.y, ground.width, ground.height),
      );
    });

    getArr(level.shrubs).forEach((shrub) => {
      this.sceneryEntities.push(
        new Scenery.Shrub(this.tileset, shrub.x, shrub.y, shrub.width, shrub.height),
      );
    });

    getArr(level.mountains).forEach((mountain) => {
      this.sceneryEntities.push(
        new Scenery.Mountain(
          this.mountainSheet, mountain.x, mountain.y, mountain.width, mountain.height),
      );
    });

    getArr(level.pipes).forEach((pipe) => {
      this.sceneryEntities.push(
        new Scenery.Pipe(this.tileset, pipe.x, pipe.y, pipe.width, pipe.height),
      );
    });

    getArr(level.smallClouds).forEach((smallCloud) => {
      this.sceneryEntities.push(
        new Scenery.SmallCloud(
          this.cloudsSheet, smallCloud.x, smallCloud.y, smallCloud.width, smallCloud.height,
      ));
    });

    getArr(level.mediumClouds).forEach((mediumCloud) => {
      this.sceneryEntities.push(
        new Scenery.MediumCloud(
          this.cloudsSheet, mediumCloud.x, mediumCloud.y, mediumCloud.width, mediumCloud.height,
      ));
    });

    getArr(level.largeClouds).forEach((largeCloud) => {
      this.sceneryEntities.push(
        new Scenery.LargeCloud(
          this.cloudsSheet, largeCloud.x, largeCloud.y, largeCloud.width, largeCloud.height,
      ));
    });

    getArr(level.blocks).forEach((block) => {
      this.blockEntities.push(
        new Block(block.type || 'coin', this.tileset, block.x, block.y, block.width || 16, block.height || 16),
      );
    });

    getArr(level.mushrooms).forEach((block) => {
      this.blockEntities.push(
        new Block('mushroom', this.tileset, block.x, block.y, block.width || 16, block.height || 16),
      );
    });

    getArr(level.breakables).forEach((breakable) => {
      this.breakableEntities.push(
        new Breakable(this.tileset, breakable.x, breakable.y, breakable.width || 16, breakable.height || 16),
      );
    });

    getArr(level.bricks).forEach((brick) => {
      this.sceneryEntities.push(
        new Scenery.Brick(this.tileset, brick.x, brick.y, brick.width || 16, brick.height || 16));
    });

    // --- NEW: GENERIC SCENERY HANDLING FOR "scenery" ARRAY IN LEVEL FILES ---
    // This allows legacy or flexible level files using scenery: [{ type: ... }, ...].
    getArr(level.scenery).forEach((scn) => {
      switch (scn.type) {
        case "pipe":
          this.sceneryEntities.push(new Scenery.Pipe(this.tileset, scn.x, scn.y, scn.width, scn.height));
          break;
        case "ceiling":
          this.sceneryEntities.push(new Scenery.Brick(this.tileset, scn.x, scn.y, scn.width, scn.height));
          break;
        case "brickPlatform":
        case "stair":
          this.sceneryEntities.push(new Scenery.Brick(this.tileset, scn.x, scn.y, scn.width || 16, scn.height || 16));
          break;
        case "movingPlatform":
          if (Scenery.MovingPlatform) {
            this.sceneryEntities.push(new Scenery.MovingPlatform(
              this.tileset, scn.x, scn.y, scn.width, scn.height, scn.pathLength, scn.speed));
          }
          break;
        case "flagpole":
          this.sceneryEntities.push(
            new Scenery.Flagpole(this.tileset, scn.x, scn.y, scn.width || 16, scn.height || 112)
          );
          break;
        case "castle":
          this.sceneryEntities.push(
            new Scenery.Castle(this.castleSheet, scn.x, scn.y, scn.width, scn.height)
          );
          break;
        // Add more types as needed
        default:
          // Unknown type, do nothing
          break;
      }
    });
    // --- END OF GENERIC SCENERY HANDLING ---

    // Flag, Flagpole, Castle
    if (level.flag) {
      this.sceneryEntities.push(
        new Scenery.Flag(this.tileset, level.flag.x, level.flag.y, level.flag.width, level.flag.height),
      );
    }

    if (level.flagpole) {
      this.sceneryEntities.push(
        new Scenery.Flagpole(
          this.tileset, level.flagpole.x, level.flagpole.y, level.flagpole.width, level.flagpole.height),
      );
    }

    if (level.castle) {
      this.sceneryEntities.push(
        new Scenery.Castle(
          this.castleSheet, level.castle.x, level.castle.y, level.castle.width, level.castle.height),
      );
    }
  }

  // Get current level name based on level data
  getCurrentLevelName(level) {
    if (level === level_1_1) return 'level_1-1';
    if (level === level_1_2) return 'level_1-2';
    if (level === level_1_3) return 'level_1-3';
    return 'level_1-1'; // default
  }

  // Method to progress to next level
  nextLevel() {
    const nextLevelData = this.levelProgression[this.currentLevelName];
    if (nextLevelData) {
      this.level = nextLevelData;
      this.currentLevelName = this.getCurrentLevelName(nextLevelData);
      this.buildLevel(nextLevelData);
      return true;
    } else {
      this.showGameComplete();
      return false;
    }
  }

  // Method to check if player reached the end (flag/castle)
  checkLevelComplete(playerX, playerY) {
    const flag = this.sceneryEntities.find(entity => entity instanceof Scenery.Flag);
    const castle = this.sceneryEntities.find(entity => entity instanceof Scenery.Castle);

    if (flag && this.isPlayerNear(playerX, playerY, flag)) {
      return true;
    }
    if (castle && this.isPlayerNear(playerX, playerY, castle)) {
      return true;
    }
    return false;
  }

  // Helper method to check if player is near an entity
  isPlayerNear(playerX, playerY, entity, threshold = 50) {
    return Math.abs(playerX - entity.xPos) < threshold && 
           Math.abs(playerY - entity.yPos) < threshold;
  }

  showGameComplete() {
    console.log('Game Complete! All levels finished!');
  }

  create(data) {
    this.sceneryEntities.forEach((scene) => {
      data.entities.scenery.push(scene);
    });
    this.breakableEntities.forEach((breakable) => {
      data.entities.scenery.push(breakable);
    });
    this.blockEntities.forEach((block) => {
      data.entities.scenery.push(block);
    });
  }

  renderMap(data) {
    this.sceneryEntities.forEach((scene) => {
      this.drawEntity(scene, data);
    });
    this.brickEntities.forEach((brick) => {
      this.drawEntity(brick, data);
    });
    this.breakableEntities.forEach((breakable) => {
      this.drawEntity(breakable, data);
    });
    this.blockEntities.forEach((block) => {
      this.drawEntity(block, data);
    });
  }

  drawEntity(entity, data) {
    const ctx = data.canvas.ctx;
    const viewport = data.viewport;

    // Only draw the entity if it is inside the viewport
    if (
      (entity.xPos + entity.width >= viewport.vX &&
        entity.xPos <= viewport.vX + viewport.width) &&
      (entity.yPos + entity.height >= viewport.vY &&
        entity.yPos <= viewport.vY + viewport.height)
    ) {
      if (typeof entity.draw === 'function') {
        entity.draw(ctx, data);
      }
    }
  }
}