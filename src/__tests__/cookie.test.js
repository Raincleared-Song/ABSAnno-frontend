import getCookie from '@/utils/getCookie'
import setCookie from "@/utils/setCookie";

describe('getCookie', () => {
    it('Test the function getCookie', () => {
        document.cookie = "a=bc;d=ef";
        expect(getCookie('a')).toBe('bc')
        expect(getCookie('b')).toBe(null)
    })
    it('Test the function setCookie', () => {
        setCookie('a', 'bb')
        expect(document.cookie).toBe("a=bb")
        setCookie('g', 'hi')
        expect(document.cookie).toBe("a=bb; g=hi")
        setCookie('a', 'cc')
        expect(document.cookie).toBe("a=cc; g=hi")
    })
})
