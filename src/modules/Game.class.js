'use strict';

/**
 * This class represents the game.
 * Now it has a basic structure, that is needed for testing.
 * Feel free to add more props and methods if needed.
 */
class Game {
  /**
   * Creates a new game instance.
   *
   * @param {number[][]} initialState
   * The initial state of the board.
   * @default
   * [[0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0]]
   *
   * If passed, the board will be initialized with the provided
   * initial state.
   */
  constructor(initialState) {
    // eslint-disable-next-line no-console
    console.log(initialState);

    this.score = 0;
    this.status = 'idle';

    if (initialState) {
      this.board = initialState;
    } else {
      this.board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
    }
  }

  moveLeft() {
    for (let row = 0; row < 4; row++) {
      const currentRow = this.board[row];
      const filtered = currentRow.filter((x) => x !== 0);

      const merged = [];

      for (let i = 0; i < filtered.length; i++) {
        if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
          merged.push(filtered[i] * 2);
          i++;
        } else {
          merged.push(filtered[i]);
        }
      }

      while (merged.length < 4) {
        merged.push(0);
      }
      this.board[row] = merged;
      this.updateView();
    }
  }
  moveRight() {
    for (let row = 0; row < 4; row++) {
      const currentRow = this.board[row];
      const filtered = currentRow.filter((x) => x !== 0);

      const merged = [];

      for (let i = filtered.length - 1; i >= 0; i--) {
        if (i > 0 && filtered[i] === filtered[i - 1]) {
          merged.unshift(filtered[i] * 2);
          i--;
        } else {
          merged.unshift(filtered[i]);
        }
      }

      while (merged.length < 4) {
        merged.unshift(0);
      }
      this.board[row] = merged;
      this.updateView();
    }
  }
  moveUp() {}
  moveDown() {}

  /**
   * @returns {number}
   */
  getScore() {}

  /**
   * @returns {number[][]}
   */
  getState() {}

  /**
   * Returns the current game status.
   *
   * @returns {string} One of: 'idle', 'playing', 'win', 'lose'
   *
   * `idle` - the game has not started yet (the initial state);
   * `playing` - the game is in progress;
   * `win` - the game is won;
   * `lose` - the game is lost
   */
  getStatus() {
    return this.status;
  }

  /**
   * Starts the game.
   */
  start() {
    if (this.status === 'idle') {
      this.status = 'playing';
      this.addRandomTile();
      this.addRandomTile();

      const startButton = document.querySelector('button');

      startButton.className = 'button';

      startButton.classList.add('restart');

      startButton.textContent = 'Restart';

      this.updateView();
    }
  }

  /**
   * Resets the game.
   */
  restart() {
    this.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    this.addRandomTile();
    this.addRandomTile();

    this.score = 0;
    this.status = 'playing';

    this.updateView();
  }

  addRandomTile() {
    const emptyCells = [];

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (this.board[row][col] === 0) {
          emptyCells.push({ row, col });
        }
      }
    }

    if (emptyCells.length === 0) {
      return;
    }

    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    const value = Math.random() < 0.9 ? 2 : 4;

    this.board[randomCell.row][randomCell.col] = value;
  }

  updateView() {
    const cells = document.querySelectorAll('.field-cell');

    for (let i = 0; i < 16; i++) {
      const row = Math.floor(i / 4);
      const col = i % 4;
      const value = this.board[row][col];

      const cell = cells[i];

      cell.textContent = value || '';

      cell.className = 'field-cell';

      if (value > 0) {
        cell.classList.add(`field-cell--${value}`);
      }
    }
  }
}

module.exports = Game;
