
import { TONES } from '@/constants/commentCreation/commentConstants';
import { Languages, Loader2, Search, Send } from 'lucide-react';
import React, { useState } from 'react'
import { Locale, translations } from './translations';
import { handleGenerate } from '@/lib/commentCreation/helpers';

const AiGenerator = ({ context, setContext, setSelectedTone, selectedTone, setIsGenerating, isGenerating, focusedId, setCommentData, updateReply, activePlatform }: any) => {
    const [locale, setLocale] = useState<Locale>("en");
    const t = translations[locale];
  return (
    <section className="bg-white p-5 sm:p-6 rounded-[32px] border border-slate-200 shadow-sm space-y-5 transition-all hover:shadow-md">
                <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Languages className="w-3.5 h-3.5" /> 2. AI Generator
                </h2>
                <div className="relative group">
                  <textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder={t.contextPlaceholder}
                    className="w-full h-24 p-4 rounded-2xl border border-slate-200 text-sm resize-none bg-slate-50 font-medium outline-none transition-all focus:ring-4 focus:ring-indigo-500/10 focus:bg-white"
                  />
                  <Search className="absolute bottom-3 right-3 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {TONES.map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setSelectedTone(tone)}
                      className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wide transition-all ${selectedTone === tone ? "bg-indigo-600 text-white shadow-md" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handleGenerate(context, locale, activePlatform, selectedTone, focusedId, setCommentData, updateReply, setIsGenerating)}
                  disabled={isGenerating || !context.trim()}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-bold disabled:opacity-50 shadow-lg shadow-indigo-100 active:scale-95"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> {t.generating}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> {t.generateBtn}
                    </>
                  )}
                </button>
              </section>
  )
}

export default AiGenerator
