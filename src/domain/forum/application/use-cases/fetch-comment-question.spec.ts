import { MakeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comment-repository'
import { FetchCommentQuestionUseCase } from './fetch-comment-question'
import { MakeCommentQuestion } from 'test/factories/make-comment-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: FetchCommentQuestionUseCase

describe('Fetch question comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new FetchCommentQuestionUseCase(inMemoryQuestionCommentRepository)
  })

  it('Should be able to fetch comments in a question', async () => {
    const question = MakeQuestion()

    await inMemoryQuestionRepository.create(question)

    for (let i = 0; i < 5; i++) {
      const QuestionComment = MakeCommentQuestion({
        questionId: question.id,
      })

      await inMemoryQuestionCommentRepository.create(QuestionComment)
    }

    const { CommentQuestions } = await sut.execute({
      questionID: question.id.toString(),
      page: 1,
    })

    expect(CommentQuestions).toHaveLength(5)
  })

  it('Should be able to paginated comments in a question', async () => {
    const question = MakeQuestion()

    await inMemoryQuestionRepository.create(question)

    for (let i = 0; i < 22; i++) {
      const QuestionComment = MakeCommentQuestion({
        questionId: question.id,
      })

      await inMemoryQuestionCommentRepository.create(QuestionComment)
    }

    const { CommentQuestions } = await sut.execute({
      questionID: question.id.toString(),
      page: 2,
    })

    expect(CommentQuestions).toHaveLength(2)
  })
})
