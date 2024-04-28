export default function jsonValueToBytes32(value: string | number) {
  if (typeof value === "string") {
    const trimmedString = value.slice(0, 32).padEnd(32, "\0");
    const bytes = new Uint8Array(32);
    for (let i = 0; i < trimmedString.length; i++) {
      bytes[i] = trimmedString.charCodeAt(i);
    }
    return bytes;
  } else if (typeof value === "number") {
    const byteArray = new Uint8Array(32);
    const view = new DataView(byteArray.buffer);
    view.setBigUint64(0, BigInt(value), false);
    return byteArray;
  } else {
    throw new Error("Unsupported data type for conversion to bytes32");
  }
}
