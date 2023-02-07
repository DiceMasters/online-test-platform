export type TTestType = 'text' | 'checkbox' | 'radio' | 'separator' | 'code' | 'codepen'
export type TLink = {
  title: string
  link: string
}
export type TCodeSection = Record<string, string>

export interface IPack {
  title: string
  type: string
  icon: string
  json: string
}

export interface ITestData {
  briefing: ITestBriefing
  data: ITestQuestion[]
}

export interface ITestBriefing {
  title: string
  text: string
  links: TLink[]
}

export interface ITestQuestion {
  type?: TTestType
  name?: string
  description?: string
  answer?: number
  codes?: TCodeSection
  comment?: string
  options?: string[]
  figma?: string
}

export interface ITestQModel extends ITestQuestion {
  value: string | number | number[] | boolean
}
