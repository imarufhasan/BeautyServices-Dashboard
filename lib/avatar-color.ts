// Deterministic color assignment based on a string seed (e.g. a name or id)
// rather than array index — so colors stay stable even if the underlying
// list is sorted, filtered, or paginated differently by a real API.
const PALETTE = [
  "bg-[#F4B6C2]",
  "bg-[#B8D8BA]",
  "bg-[#B8C7E8]",
  "bg-[#F4D9A0]",
  "bg-[#D9B8E8]",
  "bg-[#F4B67C]",
];

export function avatarColor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}