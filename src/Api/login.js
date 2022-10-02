import { get } from '@/request'


// 获取二维码key 
export const getQrKey = () => get('/login/qr/key', { timerstamp: Date.now() })

// 生成二维码
export const crateQr = (key, qrimg = true) => get('/login/qr/create', { key, qrimg, timerstamp: Date.now() })

// 轮询二维码登录状态
export const reQrStatus = (key) => get('/login/qr/check', { key, timerstamp: Date.now() })