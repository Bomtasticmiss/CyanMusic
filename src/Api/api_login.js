import { get } from '@/request'



export const phoneLogin = (phone,captcha) => get('/login/cellphone', { phone, captcha,timestamp: Date.now() })

/* 发送验证码 */
export const getCode = (phone) => get('/captcha/sent', { phone, timestamp: Date.now() })

export const checkCode = (phone,captcha) => get('/captcha/verify', { phone,captcha, timestamp: Date.now() })



// 获取二维码key 
export const getQrKey = () => get('/login/qr/key', { timerstamp: Date.now() })

// 生成二维码
export const crateQr = (key, qrimg = true) => get('/login/qr/create', { key, qrimg, timerstamp: Date.now() })

// 轮询二维码登录状态 
// 轮询二维码状态 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
export const reQrStatus = (key) => get('/login/qr/check', { key, timerstamp: Date.now() })