const cron = require("node-cron");
const db = require("../config/db"); // Đường dẫn tới kết nối DB
const dayjs = require("dayjs");

cron.schedule("0 0 * * *", async () => {
  console.log("⏰ Kiểm tra mã giảm giá hết hạn...");
  const now = dayjs().format("YYYY-MM-DD HH:mm:ss");

  const [expiredPromos] = await db.execute(
    "SELECT id FROM promotion WHERE isActive = 1 AND end_date < ?",
    [now]
  );

  if (expiredPromos.length > 0) {
    const ids = expiredPromos.map((p) => p.id);
    await db.execute(
      `UPDATE promotion SET isActive = 0 WHERE id IN (${ids.map(() => "?").join(",")})`,
      ids
    );
    console.log(`✅ Đã tắt ${ids.length} mã giảm giá`);
  } else {
    console.log("✅ Không có mã nào hết hạn.");
  }
});
