"use server";

import { Message } from "@/db/dummy";
import { redis } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type SendMessageActionArgs = {
  content: string;
  receiverId: string;
  messageType: "text" | "image";
};

export async function sendMessageAction({
  content,
  messageType,
  receiverId,
}: SendMessageActionArgs) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return { success: false, message: "User not authenticated" };

  const senderId = user.id;
  const conversationId = `conversation:${[senderId, receiverId]
    .sort()
    .join(":")}`;

  // Check the conversation exist
  const conversationExists = await redis.exists(conversationId);

  // If not, create, the conversation
  if (!conversationExists) {
    // Make in redis
    await redis.hset(conversationId, {
      participant1: senderId,
      participant2: receiverId,
    });

    await redis.sadd(`user: ${senderId}:conversations`, conversationId);
    await redis.sadd(`user: ${receiverId}:conversations`, conversationId);
  }

  // Generate unique message id
  const messageId = `message:${Date.now()}:${Math.random()
    .toString(36)
    .substring(2, 9)}`;
  const timestamp = Date.now();

  // Create the message hash
  await redis.hset(messageId, {
    senderId,
    content,
    timestamp,
    messageType,
  });

  await redis.zadd(`${conversationId}:messages`, {
    score: timestamp,
    member: JSON.stringify(messageId),
  });

  return { success: true, conversationId, messageId };
}

export async function getMessages(
  selectedUserId: string,
  currentUserId: string
) {
  const conversationId = `conversation:${[selectedUserId, currentUserId]
    .sort()
    .join(":")}`;

  const messageIds = await redis.zrange(`${conversationId}:messages`, 0, -1);

  if (messageIds.length === 0) return [];

  const pipeline = redis.pipeline();
  messageIds.forEach((messageId) => pipeline.hgetall(messageId as string));
  const messages = (await pipeline.exec()) as Message[];

  return messages;
}
