'use client'

import React, { useState, useRef, useEffect } from "react";
import {
  RefreshCw,
  Upload,
  User,
  Plus,
  Trash2,
  ShieldCheck,
  MessageCircle,
  Clock,
  ThumbsUp,
} from "lucide-react";
import { AVATARS, COLOR_TEMPLATES, FONT_OPTIONS, TONES } from "@/constants/commentCreation/commentConstants";
import { CommentData, Platform } from "@/types/commentCreation/commentTypes";
import { addReply, removeReply, updateReply } from "@/lib/commentCreation/helpers";
import { addNestedReply } from "@/lib/commentCreation/addNestedReply";
import DownloadButton from "@/components/commentCreation/DownloadButton";
import SocialPlatform from "@/components/commentCreation/SocialPlatform";
import AiGenerator from "@/components/commentCreation/AiGenerator";
import ColorsAndStyle from "@/components/commentCreation/ColorsAndStyle";
import PreviewCard from "@/components/commentCreation/PreviewCard";
import EditReply from "@/components/commentCreation/EditReply";
import { handleAvatarUpload } from "@/lib/commentCreation/handleAvatarUpload";
import { Locale, translations } from "@/components/commentCreation/translations";
import { ModeToggle } from "@/components/mode-toggle";


const App: React.FC = () => {
  const [locale, setLocale] = useState<Locale>("en");
  const t = translations[locale];

  const [activePlatform, setActivePlatform] = useState<Platform>("tiktok");
  const [context, setContext] = useState("");
  const [selectedTone, setSelectedTone] = useState(TONES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [focusedId, setFocusedId] = useState<string | null>("root");

  const [commentData, setCommentData] = useState<CommentData>({
    id: "root",
    text: "This group feature is exactly what I needed for my presentation! ✨",
    authorName: "VibeCreator",
    authorHandle: "vibe_check",
    authorAvatar: AVATARS[0],
    timestamp: "2m",
    likes: "842",
    isVerified: true,
    replies: [
      {
        id: "reply-1",
        text: "Clean, professional, and authentic. Love it! 🚀",
        authorName: "DesignEnthusiast",
        authorHandle: "design_pro",
        authorAvatar: AVATARS[2],
        timestamp: "1m",
        likes: "42",
        isVerified: false,
        replies: [],
        backgroundColor: COLOR_TEMPLATES[1].bg,
        textColor: COLOR_TEMPLATES[1].text,
        isDark: COLOR_TEMPLATES[1].isDark,
        fontFamily: "'Inter', sans-serif",
        fontSize: 16,
      },
    ],
    backgroundColor: COLOR_TEMPLATES[0].bg,
    textColor: COLOR_TEMPLATES[0].text,
    isDark: COLOR_TEMPLATES[0].isDark,
    fontFamily: "'Inter', sans-serif",
    fontSize: 16,
    replyBgEnabled: true,
    replyBgColor: "#F0F9FF",
  });

  const commentRef = useRef<HTMLDivElement>(null!);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);

  useEffect(() => {
    if (focusedId && editorRefs.current[focusedId]) {
      editorRefs.current[focusedId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [focusedId]);


  const renderCommentEditor = (data: CommentData, isMain: boolean = false) => {
    const isFocused = focusedId === data.id;
    const handleUpdate = (updates: Partial<CommentData>) => {
      if (isMain) setCommentData((prev) => ({ ...prev, ...updates }));
      else updateReply(data.id, updates, setCommentData);
    };

    return (
      <div
        ref={(el) => {
          if (el) editorRefs.current[data.id] = el;
        }}
        onClick={() => setFocusedId(data.id)}
        className={`p-4 sm:p-5 rounded-[2rem] transition-all duration-300 border-2 cursor-pointer relative ${isFocused ? "bg-white border-indigo-500 shadow-xl scale-[1.01]" : "bg-slate-50 border-transparent border-slate-200 grayscale-[0.2] opacity-70 hover:opacity-100 hover:grayscale-0"} space-y-4`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${isFocused ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"}`}
            >
              {isMain ? (
                <User className="w-4 h-4" />
              ) : (
                <MessageCircle className="w-4 h-4" />
              )}
            </div>
            <span
              className={`text-xs font-black uppercase tracking-widest ${isFocused ? "text-indigo-600" : "text-slate-400"}`}
            >
              {isMain ? "ROOT" : "REPLY"}
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addNestedReply(data.id, setCommentData, setFocusedId);
              }}
              title="Add Nested Reply"
              className="p-2 text-indigo-500 hover:text-indigo-700 transition-colors bg-indigo-50 rounded-xl"
            >
              <Plus className="w-4 h-4" />
            </button>
            {!isMain && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeReply(data.id, focusedId, setCommentData, setFocusedId);
                }}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors bg-white rounded-xl border border-slate-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleUpdate({ isVerified: !data.isVerified });
              }}
              className={`p-2 rounded-xl border transition-all ${data.isVerified ? "bg-blue-600 border-blue-600 text-white shadow-sm" : "bg-white border-slate-200 text-slate-400"}`}
              title="Verified Status"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isFocused ? (
          <div className="space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                  Name
                </label>
                <input
                  type="text"
                  value={data.authorName}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleUpdate({ authorName: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                  Username
                </label>
                <input
                  type="text"
                  value={data.authorHandle}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) =>
                    handleUpdate({ authorHandle: e.target.value })
                  }
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                Message
              </label>
              <textarea
                value={data.text}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleUpdate({ text: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm h-20 outline-none resize-none focus:ring-2 focus:ring-indigo-500/10"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 flex items-center gap-1">
                  <ThumbsUp className="w-2.5 h-2.5" /> Likes
                </label>
                <input
                  type="text"
                  value={data.likes}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleUpdate({ likes: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" /> Time
                </label>
                <input
                  type="text"
                  value={data.timestamp}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleUpdate({ timestamp: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                  Bubble Bg
                </label>
                <input
                  type="color"
                  value={data.backgroundColor}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) =>
                    handleUpdate({ backgroundColor: e.target.value })
                  }
                  className="w-full h-8 rounded-lg outline-none cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                  Text Color
                </label>
                <input
                  type="color"
                  value={data.textColor}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleUpdate({ textColor: e.target.value })}
                  className="w-full h-8 rounded-lg outline-none cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-100/50 rounded-2xl border border-slate-200">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                  font family
                </label>
                <select
                  value={data.fontFamily}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleUpdate({ fontFamily: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500/10"
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                  font size
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="10"
                    max="32"
                    step="1"
                    value={data.fontSize || 16}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      handleUpdate({ fontSize: parseInt(e.target.value) })
                    }
                    className="flex-1 accent-indigo-600"
                  />
                  <span className="text-[10px] font-bold text-slate-500 w-6">
                    {data.fontSize || 16}px
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                Avatar
              </label>
              <div className="flex items-center gap-2 bg-white/50 p-2 rounded-2xl border border-slate-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveUploadId(data.id);
                    fileInputRef.current?.click();
                  }}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-50 shrink-0 shadow-sm"
                >
                  <Upload className="w-4 h-4 text-slate-400" />
                </button>
                <div className="flex gap-1.5 overflow-x-auto py-0.5 no-scrollbar scroll-smooth">
                  {AVATARS.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdate({ authorAvatar: url });
                      }}
                      className={`w-9 h-9 rounded-xl cursor-pointer border-2 transition-all shrink-0 hover:scale-110 ${data.authorAvatar === url ? "border-indigo-500 shadow-md" : "border-transparent opacity-60"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-400 text-xs italic">
            <span className="truncate max-w-[200px]">"{data.text}"</span>
          </div>
        )}

        {data.replies.length > 0 && (
          <div className="mt-4 space-y-4 border-l-2 border-indigo-100 pl-4 py-1">
            {data.replies.map((reply) => (
              <React.Fragment key={reply.id}>
                {renderCommentEditor(reply)}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-12 transition-all">
      <header className="sticky top-0 z-50  backdrop-blur-lg border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="bg-gradient-to-tr from-indigo-600 to-violet-500 p-1.5 sm:p-2 rounded-xl shadow-lg">
            <RefreshCw className="text-white w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl font-black tracking-tight leading-none text-slate-900">
              
              title
            </h1>
            <span className="text-[8px] sm:text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
              subtitle
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <DownloadButton commentRef={commentRef} activePlatform={activePlatform} t={t} />
        <ModeToggle/>
        </div>

      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8 flex flex-col lg:flex-row gap-6 sm:gap-8">
        <div className="lg:w-[380px] shrink-0 space-y-6">
          <SocialPlatform setActivePlatform={setActivePlatform} activePlatform={activePlatform} />
          <AiGenerator context={context} setContext={setContext} setSelectedTone={setSelectedTone} selectedTone={selectedTone} setIsGenerating={setIsGenerating} isGenerating={isGenerating} focusedId={focusedId} setCommentData={setCommentData} updateReply={updateReply} activePlatform={activePlatform} />

         
          <ColorsAndStyle commentData={commentData} setCommentData={setCommentData} updateReply={updateReply} focusedId={focusedId} t={t} />
        </div>

        <div className="flex-1 min-w-0 space-y-6">
          <PreviewCard commentData={commentData} commentRef={commentRef} activePlatform={activePlatform} locale={locale} />
          <EditReply commentData={commentData} setCommentData={setCommentData} focusedId={focusedId} t={t} setFocusedId={setFocusedId} fileInputRef={fileInputRef} setActiveUploadId={setActiveUploadId} handleAvatarUpload={handleAvatarUpload} addReply={addReply} renderCommentEditor={renderCommentEditor} />
        </div>
      </main>
    </div>
  );
};

export default App;
