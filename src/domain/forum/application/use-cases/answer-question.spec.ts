import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '../../../repositories/answers-repository'
import { Answer } from '../../../entities/answer'

const fakeAnswersRepository: AnswerRepository = {
  /* eslint-disable-next-line */
  create: async (answer: Answer) => {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '2',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
