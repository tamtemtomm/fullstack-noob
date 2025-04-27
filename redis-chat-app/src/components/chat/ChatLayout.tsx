"use client";

import { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";

interface ChatLayoutProps {
  defaultLayout?: number[] | undefined;
}

const ChatLayout = ({ defaultLayout = [320, 480] }: ChatLayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };

    //initial check
    checkScreenWidth();

    // event listener for screen width change
    window.addEventListener("resize", checkScreenWidth);

    // cleaning the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full items-stretch bg-background rounded-lg"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`;
      }}
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={8}
        collapsible={true}
        minSize={isMobile ? 0 : 200}
      ></ResizablePanel>
      <ResizableHandle />
      <ResizablePanel></ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ChatLayout;
