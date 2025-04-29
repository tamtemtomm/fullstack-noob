import { StreamClient } from "@stream-io/node-sdk";

const apiKey = "5s7nqxhaydcj";
const apiSecret = "3pt7uh8ce3nxr3vxndrxa6ts3bkhc288shd7cnyb86hxysbetr7du74ureu5x8rz";

export const client = new StreamClient(apiKey, apiSecret);