
import React from 'react';
/* Fix: Import required types from types.ts, including ChatMessage for proper typing */

import { ArrowLeft, Video, Phone, Info, MoreVertical, Camera, Mic, Smile, Image as ImageIcon, Check, CheckCheck, Send } from 'lucide-react';
import { ChatMessage, ChatSession } from '@/types/commentCreation/commentTypes';

interface Props {
  session: ChatSession;
  cardRef?: React.RefObject<HTMLDivElement>;
}

export const ChatPreview: React.FC<Props> = ({ session, cardRef }) => {
  const { platform, otherParticipant, messages, themeColor } = session;

  const renderHeader = () => {
    switch (platform) {
      case 'instagram':
        return (
          <div className="flex items-center justify-between p-3 border-b border-slate-100 bg-white">
            <div className="flex items-center gap-3">
              <ArrowLeft className="w-6 h-6" />
              <img src={otherParticipant.avatar} className="w-8 h-8 rounded-full object-cover" />
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-tight">{otherParticipant.name}</span>
                <span className="text-[10px] text-slate-400">{otherParticipant.status}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5" />
              <Video className="w-6 h-6" />
            </div>
          </div>
        );
      case 'messenger':
        return (
          <div className="flex items-center justify-between p-3 shadow-sm bg-white">
            <div className="flex items-center gap-3">
              <ArrowLeft className="w-6 h-6 text-blue-600" />
              <div className="relative">
                <img src={otherParticipant.avatar} className="w-10 h-10 rounded-full object-cover" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">{otherParticipant.name}</span>
                <span className="text-[11px] text-slate-400">{otherParticipant.status}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-blue-600">
              <Phone className="w-5 h-5 fill-current" />
              <Video className="w-6 h-6 fill-current" />
              <Info className="w-5 h-5 fill-current" />
            </div>
          </div>
        );
      case 'telegram':
        return (
          <div className="flex items-center gap-4 p-3 bg-[#517da2] text-white">
            <ArrowLeft className="w-6 h-6" />
            <img src={otherParticipant.avatar} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex flex-col">
              <span className="text-sm font-bold">{otherParticipant.name}</span>
              <span className="text-[11px] opacity-80">{otherParticipant.status}</span>
            </div>
            <MoreVertical className="w-6 h-6 ml-auto" />
          </div>
        );
      case 'snapchat':
        return (
          <div className="flex items-center gap-3 p-4 bg-white border-b border-slate-100">
            <img src={otherParticipant.avatar} className="w-10 h-10 rounded-full border-2 border-yellow-400 p-0.5" />
            <span className="text-lg font-bold">{otherParticipant.name}</span>
          </div>
        );
      case 'whatsapp':
        return (
          <div className="flex items-center gap-3 p-3 bg-[#075e54] text-white">
            <ArrowLeft className="w-5 h-5" />
            <img src={otherParticipant.avatar} className="w-9 h-9 rounded-full object-cover" />
            <div className="flex flex-col flex-1">
              <span className="text-sm font-bold">{otherParticipant.name}</span>
              <span className="text-[10px] opacity-80">{otherParticipant.status}</span>
            </div>
            <div className="flex gap-4">
              <Video className="w-5 h-5" />
              <Phone className="w-5 h-5" />
              <MoreVertical className="w-5 h-5" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  /* Fix: Changed parameter type from 'any' to 'ChatMessage' for type safety */
  const renderMessage = (msg: ChatMessage) => {
    const isMe = msg.senderId === 'me';
    
    switch (platform) {
      case 'messenger':
        return (
          <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-2 items-end gap-2 px-3`}>
            {!isMe && <img src={otherParticipant.avatar} className="w-7 h-7 rounded-full object-cover mb-1" />}
            <div 
              style={{ backgroundColor: isMe ? (themeColor || '#0084ff') : '#e4e6eb', color: isMe ? '#fff' : '#000' }}
              className={`max-w-[70%] px-3 py-2 rounded-[1.2rem] text-sm ${isMe ? 'rounded-br-none' : 'rounded-bl-none'}`}
            >
              {msg.text}
            </div>
          </div>
        );
      case 'instagram':
        return (
          <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-1.5 px-3`}>
            <div 
              className={`max-w-[75%] px-4 py-2 rounded-[1.5rem] text-sm border ${isMe ? 'bg-white text-black border-slate-200' : 'bg-[#efefef] text-black border-transparent'}`}
            >
              {msg.text}
            </div>
          </div>
        );
      case 'telegram':
        return (
          <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-2 px-3`}>
            <div className={`relative max-w-[80%] px-3 py-1.5 rounded-lg text-sm shadow-sm ${isMe ? 'bg-[#effdde] text-black' : 'bg-white text-black'}`}>
              {msg.text}
              <div className="flex justify-end items-center gap-1 mt-1">
                <span className="text-[9px] opacity-40">{msg.timestamp}</span>
                {isMe && <CheckCheck className="w-3 h-3 text-blue-400" />}
              </div>
            </div>
          </div>
        );
      case 'whatsapp':
        return (
          <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-1 px-4`}>
            <div className={`relative max-w-[85%] px-2 py-1 rounded-lg text-sm shadow-sm ${isMe ? 'bg-[#dcf8c6] text-black' : 'bg-white text-black'}`}>
              {msg.text}
              <div className="flex justify-end items-center gap-1 mt-0.5 ml-4">
                <span className="text-[9px] opacity-40">{msg.timestamp}</span>
                {isMe && <CheckCheck className="w-3.5 h-3.5 text-blue-400" />}
              </div>
            </div>
          </div>
        );
      case 'snapchat':
        return (
          <div key={msg.id} className={`flex mb-4 px-4 gap-3`}>
            <div className={`w-[2px] h-full ${isMe ? 'bg-blue-400' : 'bg-red-400'}`}></div>
            <div className="flex flex-col">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isMe ? 'text-blue-400' : 'text-red-400'}`}>
                {isMe ? 'ME' : otherParticipant.name}
              </span>
              <span className="text-sm text-black">{msg.text}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderInput = () => {
    switch (platform) {
      case 'messenger':
        return (
          <div className="p-3 bg-white flex items-center gap-3">
            <div className="flex gap-3 text-blue-600">
              <ImageIcon className="w-6 h-6" />
              <Mic className="w-6 h-6" />
            </div>
            <div className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm text-slate-400">Aa</div>
            <Send className="w-6 h-6 text-blue-600" />
          </div>
        );
      case 'whatsapp':
        return (
          <div className="p-2 bg-[#ece5dd] flex items-center gap-2">
            <div className="flex-1 bg-white rounded-full flex items-center px-3 py-2 gap-3">
              <Smile className="w-6 h-6 text-slate-400" />
              <span className="flex-1 text-slate-400 text-sm">Type a message</span>
              <Camera className="w-6 h-6 text-slate-400" />
            </div>
            <div className="w-10 h-10 bg-[#075e54] rounded-full flex items-center justify-center text-white">
              <Mic className="w-5 h-5" />
            </div>
          </div>
        );
      case 'instagram':
        return (
          <div className="p-3 bg-white">
            <div className="border border-slate-200 rounded-full px-4 py-2 flex items-center gap-3">
              <Camera className="w-5 h-5 bg-blue-500 text-white rounded-full p-1" />
              <span className="flex-1 text-slate-400 text-sm">Message...</span>
              <Mic className="w-5 h-5" />
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const bgStyle = platform === 'telegram' ? {
    backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
    backgroundSize: 'cover'
  } : platform === 'whatsapp' ? {
    backgroundColor: '#e5ddd5'
  } : {
    backgroundColor: '#f8fafc'
  };

  return (
    <div ref={cardRef} className="w-full max-w-[400px] h-[650px] bg-white rounded-[3rem] border-[10px] border-slate-900 overflow-hidden shadow-2xl flex flex-col relative">
      {renderHeader()}
      <div style={bgStyle} className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        {messages.map(renderMessage)}
      </div>
      {renderInput()}
    </div>
  );
};
