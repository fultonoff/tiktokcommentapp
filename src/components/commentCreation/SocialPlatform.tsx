
import { Palette } from 'lucide-react'

import { PlatformIcon } from './PlatformIcon'
import { PLATFORMS } from '@/constants/commentCreation/commentConstants'

const SocialPlatform = ({ setActivePlatform, activePlatform }: any) => {
  return (
    <section className="bg-white sm:p-6 rounded-[32px] border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5 flex items-center gap-2">
              <Palette className="w-3.5 h-3.5" /> 1. Social Platform
            </h2>
            <div className="grid grid-cols-5 gap-2.5">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePlatform(p.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${activePlatform === p.id ? "bg-indigo-600 border-indigo-600 text-white shadow-lg scale-105" : "bg-white border-slate-100 text-slate-400 hover:bg-slate-50"}`}
                >
                  <PlatformIcon platform={p.id} className="w-5 h-5" />
                </button>
              ))}
            </div>
          </section>
  )
}

export default SocialPlatform
