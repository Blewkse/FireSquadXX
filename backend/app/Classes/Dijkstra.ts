import { Position } from "./Robots/Robot.js";

export class Dijkstra {
  // Using Dijkstra's algorithm
  static findShortestPath(matrix: number[][], start: Position, end: Position) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    // Helper function to check if a cell is valid
    const isValidCell = (row: number, col: number) =>
      row >= 0 &&
      row < rows &&
      col >= 0 &&
      col < cols &&
      matrix[row][col] !== 0;

    // Initialize distance and visited arrays
    const distance = Array.from({ length: rows }, () =>
      Array(cols).fill(Number.MAX_SAFE_INTEGER)
    );
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const path = Array.from({ length: rows }, () => Array(cols).fill(null));

    // Dijkstra's algorithm
    const queue = [{ row: start.x, col: start.y, dist: 0 }];
    distance[start.x][start.y] = 0;

    while (queue.length > 0) {
      queue.sort((a, b) => a.dist - b.dist);
      const { row, col, dist } = queue.shift()!;

      if (row === end.x && col === end.y) {
        // Found the shortest path
        let currentRow = row;
        let currentCol = col;
        const pathCoords: number[][] = [];

        while (path[currentRow][currentCol] !== null) {
          pathCoords.push([currentRow, currentCol]);
          const { r, c } = path[currentRow][currentCol];
          currentRow = r;
          currentCol = c;
        }

        return {
          distance: dist,
          path: pathCoords.reverse(),
        };
      }

      if (!visited[row][col]) {
        visited[row][col] = true;

        // Check neighbors
        const neighbors = [
          { r: row - 1, c: col },
          { r: row + 1, c: col },
          { r: row, c: col - 1 },
          { r: row, c: col + 1 },
        ];

        for (const neighbor of neighbors) {
          const { r, c } = neighbor;

          if (isValidCell(r, c)) {
            const newDist = dist + matrix[r][c];
            if (newDist < distance[r][c]) {
              distance[r][c] = newDist;
              queue.push({ row: r, col: c, dist: newDist });
              path[r][c] = { r: row, c: col };
            }
          }
        }
      }
    }

    // No path found
    return {
      distance: -1,
      path: [],
    };
  }
}
