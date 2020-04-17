/**
 * @description test demo
 * @author  rong
 */

function sum(a, b) {
    return a + b
}

//jest自带test函数      第一个参数可以随便写   第二个为方法
test('10+20 == 30', () => {
    const res = sum(10, 20)
    // expect方法执行结果
    // 经常用到toBe或者  not.toBe
    expect(res).toBe(30)
})