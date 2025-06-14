export default class Score {
  constructor(xPos, yPos) {
    this.value = 0;
    this.coinCount = 0;
    this.lives = 3;  // Add this line
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = '12px';
    this.font = 'PixelEmulator';
    this.color = 'white';
  }

  // Add these methods
  loseLife() {
    this.lives--;
    if (this.lives <= 0) {
      this.gameOver();
    }
  }

  gainLife() {
    this.lives++;
  }

  getLives() {
    return this.lives;
  }

  gameOver() {
    // Handle game over logic
    alert("Game Over!");
    this.lives = 3; // Reset for new game
    this.value = 0;
    this.coinCount = 0;
  }

  // Method to add score
  addScore(points) {
    this.value += points;
    
    // Give extra life every 100,000 points (classic Mario behavior)
    if (this.value % 100000 === 0 && this.value > 0) {
      this.gainLife();
    }
  }

  // Method to add coins
  addCoin() {
    this.coinCount++;
    this.addScore(200); // Coins give 200 points
    
    // Give extra life every 100 coins
    if (this.coinCount % 100 === 0) {
      this.gainLife();
    }
  }

  // Reset method for new game
  reset() {
    this.value = 0;
    this.coinCount = 0;
    this.lives = 3;
  }
}