export class GameLoop {
  private running = false
  private lastTime = 0
  private accumulator = 0
  private readonly fixedStep: number

  constructor(
    private readonly update: (dt: number) => void,
    private readonly render: () => void,
    fps: number = 60,
  ) {
    this.fixedStep = 1000 / fps
  }

  start() {
    this.running = true
    this.lastTime = performance.now()
    requestAnimationFrame(this.loop)
  }

  stop() {
    this.running = false
  }

  private loop = (now: number) => {
    if (!this.running) return

    const frameTime = now - this.lastTime
    this.lastTime = now
    this.accumulator += frameTime

    while (this.accumulator >= this.fixedStep) {
      this.update(this.fixedStep)
      this.accumulator -= this.fixedStep
    }

    this.render()
    requestAnimationFrame(this.loop)
  }
}
