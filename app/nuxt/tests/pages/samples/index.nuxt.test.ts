import { test, expect } from 'vitest'
import { render } from '@testing-library/vue'
import Index from '@/pages/samples/index.vue'

test('my test', () => {
  const { container } = render(Index)
  const h1 = container.querySelector<HTMLHeadingElement>('h1')
  if (h1) {
    expect(h1.textContent).toBe('Hello World')
  } else {
    throw new Error('h1 element not found')
  }
})
