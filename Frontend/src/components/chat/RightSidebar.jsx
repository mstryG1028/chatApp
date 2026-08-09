import { useState } from "react";
import ChatHeader from "./ChatHeader";
import EmptyChat from "./EmptyChat";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

const RightSidebar = ({ selectedConversation, messages }) => {
  console.log("convId from rightBar:", selectedConversation);
  return (
    <section className="flex h-full flex-1 flex-col bg-background">
      {selectedConversation ? (
        <>
          <ChatHeader user={selectedConversation} />

          <MessageList messages={messages} />

          <MessageInput conversationId={selectedConversation?._id} />
        </>
      ) : (
        <EmptyChat />
      )}
    </section>
  );
};

export default RightSidebar;

//note:
/* 
how data is passed from one compo to another
inside rightChatBar we are getting selectedConveration from ChatPage so here parent is chatPage
now similarly messageInput needs converationId so we are sending from RightSideBar so here parent is rightSideBar
now messageInput can get id inside props
*/
