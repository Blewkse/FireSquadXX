import { Position } from './Robots/Robot.js'
import TerritoryBurnable from './TerritoryBurnable.js'
import TerritoryUnburnable from './TerritoryUnburnable.js'

export class Dijkstra {
  private static matrix: number[][]

  static setMatrix(matrix: number[][]) {
    this.matrix = matrix
  }

  static getNumberMatrixFromMatrixTiles(
    matrixTiles: (TerritoryBurnable | TerritoryUnburnable)[][]
  ) {
    const currentMatrix: number[][] = []
    for (const [y, matrixTile] of matrixTiles.entries()) {
      currentMatrix[y] = []
      for (const [x, element] of matrixTile.entries()) {
        switch (element.type) {
          case 'casern':
            currentMatrix[y][x] = 5
            break
          case 'forest':
            currentMatrix[y][x] = 100
            break
          case 'road':
            currentMatrix[y][x] = 5
            break
          case 'mountain':
            currentMatrix[y][x] = 0
            break
          case 'plain':
            currentMatrix[y][x] = 5
            break
          case 'water':
            currentMatrix[y][x] = 0
            break
          case 'village':
            currentMatrix[y][x] = 5
            break
          default:
            break
        }
      }
    }
    this.matrix = currentMatrix
  }

  // Using Dijkstra's algorithm
  static findShortestPath(start: Position, end: Position) {
    const rows = this.matrix.length
    const cols = this.matrix[0].length

    // Helper function to check if a cell is valid
    const isValidCell = (row: number, col: number) => {
      try {
        return row >= 0 && row < rows && col >= 0 && col < cols && this.matrix[col][row] !== 0
      } catch {
        return false
      }
    }

    // Initialize distance and visited arrays
    const distance = Array.from({ length: rows }, () => Array(cols).fill(Number.MAX_SAFE_INTEGER))
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false))
    const path = Array.from({ length: rows }, () => Array(cols).fill(null))

    // Dijkstra's algorithm
    const queue = [{ row: start.x, col: start.y, dist: 0 }]
    distance[start.x][start.y] = 0

    while (queue.length > 0) {
      queue.sort((a, b) => a.dist - b.dist)
      const { row, col, dist } = queue.shift()!

      if (row === end.x && col === end.y) {
        // Found the shortest path
        let currentRow = row
        let currentCol = col
        const pathCoords: number[][] = []

        while (path[currentRow][currentCol] !== null) {
          pathCoords.push([currentRow, currentCol])
          const { r, c } = path[currentRow][currentCol]
          currentRow = r
          currentCol = c
        }

        return {
          distance: pathCoords.length,
          path: pathCoords.reverse(),
        }
      }

      if (!visited[row][col]) {
        visited[row][col] = true

        // Check neighbors
        const neighbors = [
          { r: row - 1, c: col },
          { r: row + 1, c: col },
          { r: row, c: col - 1 },
          { r: row, c: col + 1 },
        ]

        for (const neighbor of neighbors) {
          const { r, c } = neighbor

          if (isValidCell(r, c)) {
            const newDist = dist + this.matrix[r][c]
            if (newDist < distance[r][c]) {
              distance[r][c] = newDist
              queue.push({ row: r, col: c, dist: newDist })
              path[r][c] = { r: row, c: col }
            }
          }
        }
      }
    }

    // No path found
    return {
      distance: -1,
      path: [],
    }
  }
}
