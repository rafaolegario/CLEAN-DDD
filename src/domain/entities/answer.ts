import { randomUUID } from "crypto"

export class Answer {
  public content: string
  public authorId: string
  public questionId: string
  public id: string
  
  constructor(content: string,authorId: string, questionId:string, id?: string){
    this.content = content
    this.authorId = authorId
    this.questionId = questionId
    this.id = id ?? randomUUID()
  }
}