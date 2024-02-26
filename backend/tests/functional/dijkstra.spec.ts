import { Dijkstra } from '#app/Classes/Dijkstra'
import { test } from '@japa/runner'

test.group('Dijkstra', () => {
  test('findShortestPath should return correct distance', async ({ assert }) => {
    Dijkstra.setMatrix([
      [1, 1, 1, 1, 1],
      [1, 0, 0, 1, 1],
      [1, 0, 1, 1, 1],
      [1, 0, 0, 1, 1],
    ])
    const { distance } = Dijkstra.findShortestPath({ x: 0, y: 0 }, { x: 3, y: 0 })

    assert.equal(distance, 3)

    const { distance: distance1 } = Dijkstra.findShortestPath({ x: 0, y: 0 }, { x: 0, y: 0 })

    assert.equal(distance1, 0)

    const { distance: distance2 } = Dijkstra.findShortestPath({ x: 0, y: 0 }, { x: 0, y: 3 })

    assert.equal(distance2, 3)

    const { distance: distance3 } = Dijkstra.findShortestPath({ x: 0, y: 0 }, { x: 3, y: 3 })

    assert.equal(distance3, 6)
  })

  test('findShortestPath should find no path', async ({ assert }) => {
    Dijkstra.setMatrix([
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1],
    ])
    const { distance } = Dijkstra.findShortestPath({ x: 0, y: 0 }, { x: 3, y: 2 })

    assert.equal(distance, -1)

    const { distance: distance1 } = Dijkstra.findShortestPath({ x: 0, y: 0 }, { x: 1, y: 1 })

    assert.equal(distance1, -1)

    const { distance: distance2 } = Dijkstra.findShortestPath({ x: 0, y: 0 }, { x: -1, y: -1 })

    assert.equal(distance2, -1)
  })
})
