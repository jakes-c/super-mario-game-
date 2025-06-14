// lib/map/level_1-2.js - Underground Level (spritesheet2.png)
function createLevel1_2() {
    return {
        id: "1-2",
        name: "World 1-2 - Underground",
        theme: "underground",
        timeLimit: 400,
        backgroundMusic: "underground_theme",
        spritesheet: "spritesheet2.png",

        // Level dimensions
        width: 3392,
        height: 240,

        // Spawn point
        spawnPoint: { x: 32, y: 176 },

        // Background color for underground theme
        backgroundColor: "#000000",

        // Static scenery (pipes, platforms, etc.)
        scenery: [
            // Entry pipe
            { type: "pipe", x: 32, y: 144, width: 32, height: 96, variant: "green" },

            // Long ceiling spanning most of the level
            { type: "ceiling", x: 0, y: 32, width: 3072, height: 16 },

            // Brick platforms and staircases
            { type: "brickPlatform", x: 128, y: 208, width: 96, height: 16 },
            { type: "stair", x: 240, y: 208, steps: 4, direction: "right", stepWidth: 16, stepHeight: 16 },
            { type: "brickPlatform", x: 288, y: 176, width: 64, height: 16 },
            { type: "brickPlatform", x: 416, y: 144, width: 96, height: 16 },
            { type: "stair", x: 576, y: 208, steps: 5, direction: "right", stepWidth: 16, stepHeight: 16 },
            { type: "brickPlatform", x: 768, y: 176, width: 64, height: 16 },
            { type: "brickPlatform", x: 896, y: 144, width: 32, height: 16 },
            { type: "brickPlatform", x: 1024, y: 208, width: 160, height: 16 },
            { type: "brickPlatform", x: 1248, y: 176, width: 96, height: 16 },
            { type: "brickPlatform", x: 1408, y: 144, width: 64, height: 16 },
            { type: "stair", x: 1536, y: 208, steps: 5, direction: "left", stepWidth: 16, stepHeight: 16 },

            // More ceiling elements and platforms to reflect the map
            { type: "ceiling", x: 3072, y: 32, width: 256, height: 16 },

            // Mid-level pipes
            { type: "pipe", x: 656, y: 144, width: 32, height: 96, variant: "green" },
            { type: "pipe", x: 1088, y: 144, width: 32, height: 96, variant: "green" },
            { type: "pipe", x: 1632, y: 144, width: 32, height: 96, variant: "green" },

            // Moving platforms and bridges
            { type: "movingPlatform", x: 2300, y: 128, width: 48, height: 16, pathLength: 128, speed: 1 },
            { type: "movingPlatform", x: 2600, y: 128, width: 48, height: 16, pathLength: 96, speed: 1 },

            // Exit pipe (to ground)
            { type: "pipe", x: 3296, y: 144, width: 32, height: 96, variant: "green" }
        ],

        // Blocks (breakable and question blocks)
        blocks: [
            // Question blocks with coins and powerups
            { type: "question", x: 256, y: 144, contents: "coin" },
            { type: "question", x: 368, y: 112, contents: "coin" },
            { type: "question", x: 480, y: 144, contents: "powerup" },
            { type: "question", x: 640, y: 176, contents: "coin" },
            { type: "question", x: 832, y: 112, contents: "coin" },
            { type: "question", x: 1056, y: 176, contents: "coin" },
            { type: "question", x: 1280, y: 144, contents: "powerup" },

            // Breakable brick blocks
            { type: "brick", x: 224, y: 144 },
            { type: "brick", x: 288, y: 144 },
            { type: "brick", x: 336, y: 112 },
            { type: "brick", x: 400, y: 112 },
            { type: "brick", x: 512, y: 144 },
            { type: "brick", x: 608, y: 176 },
            { type: "brick", x: 672, y: 176 },
            { type: "brick", x: 864, y: 112 },
            { type: "brick", x: 1024, y: 176 },
            { type: "brick", x: 1088, y: 176 },
            { type: "brick", x: 1248, y: 144 },
            { type: "brick", x: 1312, y: 144 },
            // Warp Zone blocks
            { type: "brick", x: 3136, y: 128 },
            { type: "brick", x: 3168, y: 128 },
            { type: "brick", x: 3200, y: 128 }
        ],

        // Enemies
        enemies: [
            { type: "goomba", x: 200, y: 192, direction: -1 },
            { type: "goomba", x: 350, y: 160, direction: 1 },
            { type: "koopa", x: 500, y: 192, direction: -1, variant: "green" },
            { type: "goomba", x: 650, y: 192, direction: -1 },
            { type: "goomba", x: 800, y: 160, direction: 1 },
            { type: "koopa", x: 950, y: 192, direction: -1, variant: "red" },
            { type: "goomba", x: 1100, y: 192, direction: 1 },
            { type: "goomba", x: 1300, y: 160, direction: -1 },
            { type: "koopa", x: 1450, y: 192, direction: 1, variant: "green" }
            // Add more as needed for greater accuracy
        ],

        // Collectible coins
        coins: [
            { x: 160, y: 176 }, { x: 192, y: 176 }, { x: 320, y: 144 },
            { x: 448, y: 112 }, { x: 544, y: 176 }, { x: 704, y: 144 },
            { x: 800, y: 144 }, { x: 960, y: 176 }, { x: 1152, y: 144 },
            { x: 1376, y: 112 },
            // Secret area coins
            { x: 720, y: 48 }, { x: 752, y: 48 }, { x: 784, y: 48 }, { x: 816, y: 48 }
        ],

        // Power-ups
        powerups: [
            { type: "mushroom", x: 384, y: 160 },
            { type: "fireflower", x: 1200, y: 160 }
        ],

        // Warp Zone (end of level)
        warpZone: {
            pipes: [
                { x: 3136, y: 144, width: 32, height: 96, destination: "4-1" },
                { x: 3168, y: 144, width: 32, height: 96, destination: "3-1" },
                { x: 3200, y: 144, width: 32, height: 96, destination: "2-1" }
            ],
            label: { x: 3120, y: 80, text: "WELCOME TO WARP ZONE!" }
        },

        // Secret area accessible via pipe
        secretArea: {
            entryPipe: { x: 656, y: 144 },
            coins: [
                { x: 680, y: 80 }, { x: 712, y: 80 }, { x: 744, y: 80 }, { x: 776, y: 80 },
                { x: 808, y: 80 }, { x: 840, y: 80 }, { x: 872, y: 80 }, { x: 904, y: 80 }
            ]
        },

        // Level exit (warp pipe or flag)
        exit: {
            type: "pipe",
            x: 3296,
            y: 144,
            nextLevel: "1-3"
        },

        // Ground tiles for collision detection
        ground: [
            // Main floor
            { x: 0, y: 224, width: 3392, height: 16 }
        ]
    };
}

// Export for use in level loader
export default createLevel1_2;