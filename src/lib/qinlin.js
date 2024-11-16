import { MD5 } from 'crypto-js'

// MD5加密函数
function md5Encryption(text) {
  // 由于浏览器环境中没有内置的MD5库，这里使用crypto-js库
  // 在实际使用时需要引入: import { MD5 } from 'crypto-js';
  const hash = MD5(text);
  return hash.toString().toUpperCase();
}

// 计算开门密码
function calcOpenDoorPass(macAddress, communityCode) {
  // 计算时间相关
  const now = new Date();
  const minute = Math.floor(now.getMinutes() / 10) * 10; // 取当前分钟数的十位
  
  // 创建新的日期对象，设置为当前10分钟的起始时间
  const newTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      minute
  );
  
  // 转换为时间戳（毫秒）
  const timestamp = newTime.getTime();

  // 拼接字符串并计算MD5
  const srcStr = `${macAddress}${timestamp}${communityCode}`;
  const md5Str = md5Encryption(srcStr);
  
  // 提取数字字符
  const digits = md5Str.split('').filter(char => /\d/.test(char)).join('');
  
  // 获取最后四位数字
  const lastFourDigits = digits.length >= 4 
      ? digits.slice(-4) 
      : digits.padStart(4, '0'); // 如果不足4位，用0填充
      
  // 返回密码和过期时间
  return [lastFourDigits, newTime];
}

// 使用示例：
// const pass = calcOpenDoorPass("AA:BB:CC:DD:EE:FF", "123456");
// console.log(pass);

export { calcOpenDoorPass };
