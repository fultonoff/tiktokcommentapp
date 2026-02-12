
import { COLOR_TEMPLATES } from '@/constants/commentCreation/commentConstants'
import { applyTemplate } from '@/lib/commentCreation/applyTemplate'
import { resetToDefault } from '@/lib/commentCreation/resetToDefault'
import { Layers, PaintBucket, Palette, RotateCcw } from 'lucide-react'
import React, { useState } from 'react'

const ColorsAndStyle = ({commentData, setCommentData, updateReply, focusedId, t }: any) => {
    
  return (
    <section className="bg-white p-5 sm:p-6 rounded-[32px] border border-slate-200 shadow-sm space-y-6 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Palette className="w-3.5 h-3.5" /> 3. Theme & Style
              </h2>
              <button
                onClick={() => resetToDefault(focusedId, setCommentData, updateReply)}
                className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 uppercase transition-colors"
                title="Reset active selection styles"
              >
                <RotateCcw className="w-3 h-3" /> {t.resetBtn}
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">
                Color Presets
              </label>
              <div className="grid grid-cols-4 gap-2">
                {COLOR_TEMPLATES.map((tmpl, idx) => (
                  <button
                    key={idx}
                    onClick={() => applyTemplate(tmpl, focusedId, setCommentData, updateReply)}
                    className={`group relative h-10 w-full rounded-xl border overflow-hidden hover:scale-110 transition-all shadow-sm border-slate-100 active:scale-90`}
                    title={tmpl.name}
                  >
                    <div
                      style={{ backgroundColor: tmpl.bg }}
                      className="h-full w-full flex items-center justify-center"
                    >
                      <span
                        style={{ color: tmpl.text }}
                        className="text-[9px] font-black"
                      >
                        Aa
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-indigo-50/30">
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span className="text-[11px] font-black text-slate-600 uppercase tracking-tight">
                    Conversation Container
                  </span>
                </div>
                <button
                  onClick={() =>
                    setCommentData((p:any) => ({
                      ...p,
                      replyBgEnabled: !p.replyBgEnabled,
                    }))
                  }
                  className={`w-10 h-5.5 rounded-full transition-all relative ${commentData.replyBgEnabled ? "bg-indigo-600" : "bg-slate-300"}`}
                >
                  <div
                    className={`absolute top-0.75 left-0.75 w-4 h-4 bg-white rounded-full shadow-sm transition-all transform ${commentData.replyBgEnabled ? "translate-x-4.5" : "translate-x-0"}`}
                  />
                </button>
              </div>

              {commentData.replyBgEnabled && (
                <div className="space-y-4 p-5 rounded-2xl border border-indigo-100 bg-white shadow-xl animate-in slide-in-from-top-4 duration-500">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1 flex items-center gap-1.5">
                      <Palette className="w-3 h-3" /> Group Background
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {COLOR_TEMPLATES.map((tmpl, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            setCommentData((p: any) => ({
                              ...p,
                              replyBgColor: tmpl.bg,
                            }))
                          }
                          className={`h-8 w-full rounded-lg border transition-all hover:scale-105 ${commentData.replyBgColor === tmpl.bg ? "ring-2 ring-indigo-500 border-transparent shadow-md" : "border-slate-100"}`}
                          style={{ backgroundColor: tmpl.bg }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1 flex items-center gap-1.5">
                      <PaintBucket className="w-3 h-3" /> Custom Hex
                    </label>
                    <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <input
                        type="color"
                        value={commentData.replyBgColor || "#ffffff"}
                        onChange={(e) =>
                          setCommentData((p:any) => ({
                            ...p,
                            replyBgColor: e.target.value,
                          }))
                        }
                        className="w-10 h-10 rounded-lg overflow-hidden p-0 border-0 bg-transparent cursor-pointer shadow-sm"
                      />
                      <span className="text-[11px] font-mono font-black text-indigo-600 uppercase tracking-tighter">
                        {commentData.replyBgColor || "#FFFFFF"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
  )
}

export default ColorsAndStyle
