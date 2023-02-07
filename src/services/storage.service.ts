import type { TTestType } from '@/types'

export interface IStorageServiceDTO {
  name: string
  start?: number | null
  end?: number | null
  activepoints?: ITimePoints[]
  finished?: boolean
  answers?: IAnswers[]
}

export interface ITimePoints {
  start: number
  end: number
}

export interface IAnswers {
  index: number
  answer: string | number | number[] | boolean
  type: TTestType
}

export class StorageService {
  _name: string
  _start: number | null
  _end: number | null
  _activepoints: ITimePoints[]
  _finished: boolean
  _answers: IAnswers[]

  _timer: ReturnType<typeof setInterval> | null = null

  constructor (dto: IStorageServiceDTO) {
    this._name = dto.name
    this._start = Date.now()
    this._end = null
    this._activepoints = []
    this._finished = false
    this._answers = []
  }

  update (): void {
    const data = {
      name: this._name,
      start: this._start,
      end: this._end,
      activepoints: this._activepoints,
      finished: this._finished,
      answers: this._answers
    }

    localStorage.setItem(`data-${this._name}`, JSON.stringify(data))
  }

  getData (): IStorageServiceDTO | null {
    const dataString = localStorage.getItem(`data-${this._name}`)

    if (dataString) {
      const data: IStorageServiceDTO = JSON.parse(dataString)

      return data
    }

    return null
  }

  public set end (time: number) {
    this._end = time
    this.update()
  }

  public set finished (payload: boolean) {
    this._finished = payload
    this.update()
  }

  public get finished () {
    return this._finished
  }

  public get answers () {
    return this._answers
  }

  public set answers (data: IAnswers[]) {
    this._answers = data
    this.update()
  }

  public setAnswer (index: number, answer: string | number | number[] | boolean) {
    this._answers[index].answer = answer
    this.update()
  }

  public getStartDate (): Date | null {
    if (this._start) {
      return new Date(this._start * 1000)
    }

    return null
  }

  public getEndDate (): Date | null {
    if (this._end) {
      return new Date(this._end * 1000)
    }

    return null
  }

  public getActivePoints (): { start: Date, end: Date }[] {
    return this._activepoints.map(point => ({
      start: new Date(point.start * 1000),
      end: new Date(point.end * 1000)
    }))
  }

  public updateActivePoints (data: ITimePoints) {
    this._activepoints.push(data)
    this.update()
  }

  public startActivePointTimer () {
    this._timer = setInterval(() => {
      this._activepoints[this._activepoints.length - 1].end = Date.now()
    }, 60000)
  }
}
