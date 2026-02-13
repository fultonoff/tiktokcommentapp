import React from 'react'
import { CommentCard } from './CommentCard'
import { Card } from '../ui/card'

const PreviewCard = ({ commentData, commentRef, activePlatform, locale }: any) => {
  return (
     <Card className="rounded-[40px] sm:rounded-[48px] overflow-hidden shadow-2xl bg-checkered min-h-[400px] sm:min-h-[600px] flex items-center justify-center relative group p-4 sm:p-12 overflow-x-auto">
                <div className="w-full max-w-full flex justify-center">
                  <CommentCard
                    platform={activePlatform}
                    data={commentData}
                    cardRef={commentRef}
                    locale={locale}
                  />
                </div>
                <div className="absolute top-4 sm:top-6 right-6 sm:right-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-slate-900/80 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-2 shadow-2xl">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                    <span className="text-[8px] sm:text-[10px] font-black text-white uppercase tracking-widest">
                      Focused Editor v5.2
                    </span>
                  </div>
                </div>
              </Card>
  )
}

export default PreviewCard
