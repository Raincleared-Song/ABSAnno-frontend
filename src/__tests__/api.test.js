import API from '@/utils/API'

describe('API', () => {
    it('Test the value of API', () => {
        expect(Object.keys(API).length).toBeGreaterThan(0)
    })
})
