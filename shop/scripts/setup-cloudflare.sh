#!/usr/bin/env bash
# ตั้งค่า Cloudflare Pages custom domain + DNS สำหรับ shop.arpdevelopment.com
#
# ต้องมี API token ที่มีสิทธิ์:
#   - Account › Cloudflare Pages › Edit
#   - Zone › DNS › Edit  (โซน arpdevelopment.com)
# ใช้งาน:
#   CLOUDFLARE_API_TOKEN=xxxx CLOUDFLARE_ACCOUNT_ID=yyyy ./scripts/setup-cloudflare.sh
set -euo pipefail

ZONE_NAME="${ZONE_NAME:-arpdevelopment.com}"
SUBDOMAIN="${SUBDOMAIN:-shop}"
PROJECT="${PROJECT:-arp-shop}"
FQDN="$SUBDOMAIN.$ZONE_NAME"
API="https://api.cloudflare.com/client/v4"
: "${CLOUDFLARE_API_TOKEN:?ต้องตั้ง CLOUDFLARE_API_TOKEN}"
: "${CLOUDFLARE_ACCOUNT_ID:?ต้องตั้ง CLOUDFLARE_ACCOUNT_ID}"

cf() { curl -sS -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" -H "Content-Type: application/json" "$@"; }

echo "→ หา zone $ZONE_NAME"
ZONE_ID=$(cf "$API/zones?name=$ZONE_NAME" | jq -r '.result[0].id // empty')
[ -n "$ZONE_ID" ] || { echo "ไม่พบ zone $ZONE_NAME ในบัญชีนี้"; exit 1; }

echo "→ ตรวจ Pages project $PROJECT"
if ! cf "$API/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/$PROJECT" | jq -e '.success' >/dev/null; then
  echo "  สร้าง project ใหม่ (direct upload)"
  cf -X POST "$API/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects" \
    --data "{\"name\":\"$PROJECT\",\"production_branch\":\"main\"}" | jq -e '.success' >/dev/null
fi

echo "→ ผูก custom domain $FQDN กับ Pages"
cf -X POST "$API/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/$PROJECT/domains" \
  --data "{\"name\":\"$FQDN\"}" | jq -c '{success, errors: [.errors[]?.message]}'

echo "→ สร้าง/อัปเดต DNS CNAME $FQDN → $PROJECT.pages.dev (proxied)"
RECORD=$(cf "$API/zones/$ZONE_ID/dns_records?name=$FQDN")
RECORD_ID=$(echo "$RECORD" | jq -r '.result[0].id // empty')
DATA="{\"type\":\"CNAME\",\"name\":\"$FQDN\",\"content\":\"$PROJECT.pages.dev\",\"proxied\":true,\"ttl\":1,\"comment\":\"Cloudflare Pages: $PROJECT\"}"
if [ -n "$RECORD_ID" ]; then
  cf -X PUT "$API/zones/$ZONE_ID/dns_records/$RECORD_ID" --data "$DATA" | jq -c '{success, errors: [.errors[]?.message]}'
else
  cf -X POST "$API/zones/$ZONE_ID/dns_records" --data "$DATA" | jq -c '{success, errors: [.errors[]?.message]}'
fi

echo "✓ เสร็จ — รอ SSL ออกใบรับรองสักครู่ แล้วเปิด https://$FQDN"
