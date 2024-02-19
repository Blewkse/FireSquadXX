import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { randomUUID } from 'node:crypto'

export default class AddUidMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    ctx.request.updateBody({ uid: randomUUID() })

    return await next()
  }
}
