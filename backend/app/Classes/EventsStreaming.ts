import type { HttpContext, Request, Response } from '@adonisjs/core/http'
import transmit from '@adonisjs/transmit/services/main'

export class EventsStreaming {
  constructor() {}

  static initializeStream(request: Request, response: Response) {
    transmit.$createStream(request, response)
  }

  static async subscribeToGameEvents(uid: string, context: HttpContext) {
    await transmit.$subscribeToChannel(uid, 'game', context)
  }

  static sendGameEventToClient(event: Record<string, unknown>) {
    console.log(event)

    transmit.broadcast('game', event)
  }
}
