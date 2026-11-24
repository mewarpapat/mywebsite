// สร้าง payload PromptPay (EMVCo / Thai QR Payment) แบบ dynamic พร้อมยอดเงิน
function tlv(id: string, value: string) {
  return id + value.length.toString().padStart(2, "0") + value;
}

function crc16(data: string) {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function promptpayPayload(id: string, amount?: number) {
  const digits = id.replace(/\D/g, "");
  let target: string;
  let tag: string;
  if (digits.length >= 13) {
    tag = digits.length === 15 ? "03" : "02"; // e-wallet / national ID / tax ID
    target = digits;
  } else {
    tag = "01"; // mobile: 0812345678 -> 0066812345678
    target = ("0000000000000" + digits.replace(/^0/, "66")).slice(-13);
  }
  const merchant = tlv("00", "A000000677010111") + tlv(tag, target);
  let payload =
    tlv("00", "01") +
    tlv("01", amount ? "12" : "11") +
    tlv("29", merchant) +
    tlv("58", "TH") +
    tlv("53", "764");
  if (amount) payload += tlv("54", amount.toFixed(2));
  payload += "6304";
  return payload + crc16(payload);
}
