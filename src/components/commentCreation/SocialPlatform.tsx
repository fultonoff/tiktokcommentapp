
import { Palette } from 'lucide-react'

import { PlatformIcon } from './PlatformIcon'
import { PLATFORMS } from '@/constants/commentCreation/commentConstants'
import { Card } from '../ui/card'
import { Button } from '../ui/button'

const SocialPlatform = ({ setActivePlatform, activePlatform }: any) => {
  return (
    <Card className="sm:p-6 border  transition-all">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5 flex items-center gap-2">
              <Palette className="w-3.5 h-3.5" /> 1. Social Platform
            </h2>
            <div className="grid grid-cols-5 gap-2.5">
              {PLATFORMS.map((p) => (
                <Button
                  key={p.id}
                  onClick={() => setActivePlatform(p.id)}
                  className={`flex flex-col items-center gap-2 p-3 cursor-pointer transition-all ${activePlatform === p.id ? "bg-primary border-primary text-white shadow-lg scale-105" : "bg-white border-slate-100 text-slate-400 hover:bg-slate-50"}`}
                >
                  <PlatformIcon platform={p.id} className="w-5 h-5" />
                </Button>
              ))}
            </div>
          </Card>
  )
}

export default SocialPlatform
