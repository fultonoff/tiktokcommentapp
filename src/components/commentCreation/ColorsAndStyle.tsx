
import { COLOR_TEMPLATES } from '@/constants/commentCreation/commentConstants'
import { applyTemplate } from '@/lib/commentCreation/applyTemplate'
import { resetToDefault } from '@/lib/commentCreation/resetToDefault'
import { Layers, PaintBucket, Palette, RotateCcw } from 'lucide-react'
import React, { useState } from 'react'
import { Card, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Input } from '../ui/input'

const ColorsAndStyle = ({commentData, setCommentData, updateReply, focusedId, t }: any) => {
    
  return (
    <Card className=" p-5 sm:p-6  border shadow-sm space-y-6 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Palette className="w-3.5 h-3.5" /> 3. Theme & Style
              </h2>
              <Button
              variant={'secondary'}
                onClick={() => resetToDefault(focusedId, setCommentData, updateReply)}
                className="text-[10px] font-bold   flex items-center gap-1.5  transition-colors"
                title="Reset active selection styles"
              >
                <RotateCcw className="w-3 h-3" /> {t.resetBtn}
              </Button>
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] font-black  uppercase tracking-wider ml-1">
                Color Presets
              </Label>
              <div className="grid grid-cols-4 gap-2">
                {COLOR_TEMPLATES.map((tmpl, idx) => (
                  <Button
                    key={idx}
                    onClick={() => applyTemplate(tmpl, focusedId, setCommentData, updateReply)}
                    className={`group relative h-10 w-full rounded-xl overflow-hidden hover:scale-110 transition-all shadow-sm p-0 active:scale-90`}
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
                  </Button>
                ))}
              </div>
            </div>
                <Separator/>
            <div className=" space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl border">
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-primary" />
                  <span className="text-[11px] font-black tracking-tight">
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
                <div className="space-y-4 p-5 rounded-sm border shadow-xl animate-in slide-in-from-top-4 duration-500">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1 flex items-center gap-1.5">
                      <Palette className="w-3 h-3" /> Group Background
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {COLOR_TEMPLATES.map((tmpl, idx) => (
                        <Button
                          key={idx}
                          onClick={() =>
                            setCommentData((p: any) => ({
                              ...p,
                              replyBgColor: tmpl.bg,
                            }))
                          }
                          className={`h-8 w-full border transition-all hover:scale-105 ${commentData.replyBgColor === tmpl.bg ? "ring-2 ring-primary border-transparent shadow-md" : "border-slate-100"}`}
                          style={{ backgroundColor: tmpl.bg }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1 flex items-center gap-1.5">
                      <PaintBucket className="w-3 h-3" /> Custom Hex
                    </Label>
                    <div className="flex items-center gap-3 p-2.5 border rounded-sm">
                      <Input
                        type="color"
                        value={commentData.replyBgColor || "#ffffff"}
                        onChange={(e) =>
                          setCommentData((p:any) => ({
                            ...p,
                            replyBgColor: e.target.value,
                          }))
                        }
                        className="w-10 h-10 rounded-lg overflow-hidden p-0 border-0 bg-transparent cursor-pointer"
                      />
                      <span className="text-[11px] font-mono font-black text-indigo-600 uppercase tracking-tighter">
                        {commentData.replyBgColor || "#FFFFFF"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
  )
}

export default ColorsAndStyle
