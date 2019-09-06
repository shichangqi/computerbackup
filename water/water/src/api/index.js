import request from '@/utils/fetch'

// 获取token
export const queryToken = data => request.get('/wx_code/wx-token', data)
// 根据经纬度或id查询水质
export const getDetails = data => request.get('/wx/monitoring/details', data)
// 根据名称查询省市区
export const getAddress = data => request.get('/wx/monitoring/getAddress', data)