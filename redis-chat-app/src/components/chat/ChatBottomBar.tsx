import React, { useRef, useState } from "react";
import {
  Image as ImageIcon,
  Loader,
  SendHorizonalIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Textarea } from "../ui/textarea";
import EmojiPicker from "./EmojiPicker";
import { Button } from "../ui/button";
import useSound from "use-sound";
import { usePreferences } from "@/store/usePreferences";

const ChatBottomBar = () => {
  const [message, setMessage] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const isPending = false;

  const { soundEnabled } = usePreferences();

  const [playSound1] = useSound("/sounds/keystroke1.mp3", { volume: 0.2 });
  const [playSound2] = useSound("/sounds/keystroke2.mp3", { volume: 0.2 });
  const [playSound3] = useSound("/sounds/keystroke3.mp3", { volume: 0.3 });
  const [playSound4] = useSound("/sounds/keystroke4.mp3", { volume: 0.3 });

  const playSoundFunctions = [playSound1, playSound2, playSound3, playSound4];
  const playRandomKeystrokeSound = () => {
    const randomIndex = Math.floor(Math.random() * playSoundFunctions.length);
    soundEnabled && playSoundFunctions[randomIndex]();
  };

  return (
    <div className="p-2 flex justify-between w-full items-center gap-2 ">
      {!message.trim() && (
        <ImageIcon size={20} className="cursor-pointer text-muted-foreground" />
      )}

      <AnimatePresence>
        <motion.div
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.5 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
          className="w-full relative"
        >
          <Textarea
            autoComplete="off"
            placeholder="Aa"
            rows={1}
            className="w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background min-h-0"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              playRandomKeystrokeSound();
            }}
            ref={textAreaRef}
          />
          <div className="absolute right-2 bottom-0.5">
            <EmojiPicker
              onChange={(emoji) => {
                setMessage(message + emoji);
                if (textAreaRef.current) {
                  textAreaRef.current.focus();
                }
              }}
            />
          </div>
        </motion.div>

        {message.trim() ? (
          <Button
            className="h-9 w-9 dark:bg-muted"
            variant={"ghost"}
            size={"icon"}
          >
            <SendHorizonalIcon size={20} className="text-muted-foreground" />
          </Button>
        ) : (
          <Button
            className="h-9 w-9 dark:bg-muted"
            variant={"ghost"}
            size={"icon"}
          >
            {!isPending ? (
              <ThumbsUpIcon size={20} className="text-muted-foreground" />
            ) : (
              <Loader size={20} className="animate-spin" />
            )}
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBottomBar;
