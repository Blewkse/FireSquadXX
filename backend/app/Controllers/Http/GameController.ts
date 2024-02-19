import Fire from '#app/Classes/Fire'
import Robot from '#app/Classes/Robots/Robot'
import { RobotState } from '#app/Classes/Robots/enumRobot'
import Game from '../../Classes/Game.js'

class GameController {
  public game = new Game()

  main(position: { x: number; y: number }) {
    this.game.createMatrix('Pixil.png')
    this.game.createPyromane(position)
    this.game.createRobots()

    if (this.game.fireList.length > 0) {
      this.game.fireList.forEach((fire: Fire) => {
        this.game.robotList.forEach((robot: Robot) => {
          const { distance, path } = robot.findShortestPathToFire(this.game.matrix, fire)
          if (robot.state === RobotState.free && distance > 0) {
            robot.state = RobotState.travelingToOperation
            let i = 0
            const interval = setInterval(
              () => {
                if (i < path.length) {
                  robot.position = { x: path[i][0], y: path[i][1] }
                  i++
                } else {
                  robot.state = RobotState.inOperation
                  fire.addRobot(robot)
                  clearInterval(interval)
                }
              },
              (robot.speed / 100) * 1000
            )
          }
        })
      })
    }

    this.game.robotList.forEach((robot: Robot) => {
      if (robot.waterLvL === 0) {
        const { distance, path } = robot.findShortestPathToRefuel(this.game.matrix, { x: 0, y: 0 })
        if (distance > 0) {
          robot.state = RobotState.travelingToRefuel
          let i = 0
          const interval = setInterval(
            () => {
              if (i < path.length) {
                robot.position = { x: path[i][0], y: path[i][1] }
                i++
              } else {
                robot.state = RobotState.refueling
                robot.waterLvL = robot.capacity
                robot.state = RobotState.free
                clearInterval(interval)
              }
            },
            (robot.speed / 100) * 1000
          )
        }
      }
    })

    this.game.fireList.forEach((fire: Fire) => {
      if (fire.pdv <= 0) {
        this.game.fireList.splice(this.game.fireList.indexOf(fire), 1)
      }
    })

    if (this.game.fireList.length === 0) {
      this.game.pyromane.throwMolotov()
      this.game.fireList = this.game.pyromane.fires
    }

    return this.game
  }
}

export default GameController
