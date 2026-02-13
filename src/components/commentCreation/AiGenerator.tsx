
import { TONES } from '@/constants/commentCreation/commentConstants';
import { Languages, Loader2, Search, Send } from 'lucide-react';
import React, { useState } from 'react'
import { Locale, translations } from './translations';
import { handleGenerate } from '@/lib/commentCreation/helpers';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';

const AiGenerator = ({ context, setContext, setSelectedTone, selectedTone, setIsGenerating, isGenerating, focusedId, setCommentData, updateReply, activePlatform }: any) => {
    const [locale, setLocale] = useState<Locale>("en");
    const t = translations[locale];
  return (
    <Card className="p-5 sm:p-6 shadow-sm space-y-5 transition-all">
                <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Languages className="w-3.5 h-3.5" /> 2. AI Generator
                </h2>
                <div className="relative group">
                  <Textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder={t.contextPlaceholder}
                    className="w-full h-24 p-4  text-sm resize-none transition-all "
                  />
                  <Search className="absolute bottom-3 right-3 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {TONES.map((tone) => (
                    <Badge
                      key={tone}
                      onClick={() => setSelectedTone(tone)}
                      className={` cursor-pointer tracking-wide transition-all ${selectedTone === tone ? "bg-primary text-white shadow-md" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
                    >
                      {tone}
                    </Badge>
                  ))}
                </div>
                <Button
                  onClick={() => handleGenerate(context, locale, activePlatform, selectedTone, focusedId, setCommentData, updateReply, setIsGenerating)}
                  disabled={isGenerating || !context.trim()}
                  className="w-full flex items-center justify-center gap-2  transition-all font-bold disabled:opacity-50 shadow-lg active:scale-95"
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
                </Button>
              </Card>
  )
}

export default AiGenerator
