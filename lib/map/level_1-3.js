// lib/map/level_1-3.js - World 1-3 (spritesheet3.png) - Treetop Outdoor Level
function createLevel1_3() {
    return {
        id: "1-3",
        name: "World 1-3 - Treetop",
        theme: "overworld",
        timeLimit: 300,
        backgroundMusic: "overworld_theme",
        spritesheet: "spritesheet3.png",

        // Level dimensions (approximate for NES SMB 1-3)
        width: 2048,
        height: 240,

        // Spawn point
        spawnPoint: { x: 32, y: 176 },

        // Background color
        backgroundColor: "#75baff",

        // Static scenery (platforms, pillars, clouds, castle)
        scenery: [
            // Starting castle
            { type: "castle", x: 0, y: 160, width: 64, height: 80 },

            // Pillar platforms and ground
            { type: "pillarPlatform", x: 128, y: 112, width: 128, height: 16 },   // first tall platform
            { type: "pillar", x: 128, y: 128, width: 32, height: 96 },
            { type: "pillar", x: 224, y: 128, width: 32, height: 96 },

            { type: "pillarPlatform", x: 320, y: 160, width: 64, height: 16 },
            { type: "pillar", x: 320, y: 176, width: 32, height: 48 },

            { type: "pillarPlatform", x: 416, y: 80, width: 128, height: 16 },
            { type: "pillar", x: 416, y: 96, width: 32, height: 128 },
            { type: "pillar", x: 512, y: 96, width: 32, height: 128 },

            { type: "pillarPlatform", x: 608, y: 144, width: 96, height: 16 },
            { type: "pillar", x: 608, y: 160, width: 32, height: 64 },
            { type: "pillar", x: 672, y: 160, width: 32, height: 64 },

            { type: "pillarPlatform", x: 736, y: 112, width: 96, height: 16 },
            { type: "pillar", x: 736, y: 128, width: 32, height: 96 },
            { type: "pillar", x: 800, y: 128, width: 32, height: 96 },

            { type: "pillarPlatform", x: 864, y: 176, width: 96, height: 16 },
            { type: "pillar", x: 864, y: 192, width: 32, height: 32 },
            { type: "pillar", x: 928, y: 192, width: 32, height: 32 },

            // More pillar platforms and gaps
            { type: "pillarPlatform", x: 1024, y: 128, width: 128, height: 16 },
            { type: "pillar", x: 1024, y: 144, width: 32, height: 80 },
            { type: "pillar", x: 1120, y: 144, width: 32, height: 80 },

            { type: "pillarPlatform", x: 1216, y: 176, width: 96, height: 16 },
            { type: "pillar", x: 1216, y: 192, width: 32, height: 32 },
            { type: "pillar", x: 1280, y: 192, width: 32, height: 32 },

            { type: "pillarPlatform", x: 1376, y: 112, width: 128, height: 16 },
            { type: "pillar", x: 1376, y: 128, width: 32, height: 96 },
            { type: "pillar", x: 1472, y: 128, width: 32, height: 96 },

            { type: "pillarPlatform", x: 1536, y: 160, width: 96, height: 16 },
            { type: "pillar", x: 1536, y: 176, width: 32, height: 48 },
            { type: "pillar", x: 1600, y: 176, width: 32, height: 48 },

            // Brick stairs and end castle
            { type: "stair", x: 1728, y: 192, steps: 6, direction: "right", stepWidth: 16, stepHeight: 16 },
            { type: "castle", x: 1920, y: 160, width: 64, height: 80 },

            // Flagpole
            { type: "flagpole", x: 1856, y: 112, height: 112 }
        ],

        // Moving platforms
        movingPlatforms: [
            { x: 560, y: 96, width: 48, height: 8, pathLength: 96, speed: 1 },
            { x: 880, y: 80, width: 48, height: 8, pathLength: 112, speed: 1 },
            { x: 1240, y: 64, width: 48, height: 8, pathLength: 96, speed: 1 }
        ],

        // Blocks (mostly question blocks)
        blocks: [
            { type: "question", x: 704, y: 96, contents: "coin" },
            { type: "question", x: 1440, y: 96, contents: "powerup" }
        ],

        // Enemies (few in 1-3)
        enemies: [
            { type: "goomba", x: 480, y: 208, direction: 1 },
            { type: "koopa", x: 1000, y: 208, direction: -1, variant: "green" },
            { type: "goomba", x: 1200, y: 208, direction: 1 }
        ],

        // Coins
        coins: [
            { x: 176, y: 80 }, { x: 208, y: 80 }, { x: 240, y: 80 },
            { x: 464, y: 48 }, { x: 496, y: 48 },
            { x: 576, y: 64 }, { x: 608, y: 64 },
            { x: 776, y: 48 }, { x: 808, y: 48 }, { x: 840, y: 48 },
            { x: 1120, y: 80 }, { x: 1152, y: 80 }, { x: 1184, y: 80 },
            { x: 1440, y: 80 }, { x: 1472, y: 80 },
            { x: 1552, y: 80 }, { x: 1584, y: 80 },
            { x: 1800, y: 160 }, { x: 1824, y: 160 }
        ],

        // Power-ups
        powerups: [
            { type: "mushroom", x: 1440, y: 80 }
        ],

        // Level exit (flagpole)
        exit: {
            type: "flagpole",
            x: 1856,
            y: 112,
            nextLevel: "1-4"
        },

        // Ground tiles for collision detection
        ground: [
            // Main floor (not walkable everywhere, but for collision at bottom)
            { x: 0, y: 224, width: 2048, height: 16 }
        ]
    };
}

// Export for use in level loader
export default createLevel1_3;