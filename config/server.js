module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'), // กำหนด host เป็น 0.0.0.0
  port: env.int('PORT', 1337),  // ใช้ port จาก environment variable หรือค่าเริ่มต้นคือ 1337
  app: {
    keys: env.array('APP_KEYS'), // ใช้สำหรับการตั้งค่า keys ของแอป
  },
});
