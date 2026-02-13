
import { handleAvatarUpload } from '@/lib/commentCreation/handleAvatarUpload'
import { addReply, updateReply } from '@/lib/commentCreation/helpers'
import { Plus, Type } from 'lucide-react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Input } from '../ui/input'



const EditReply = ({ commentData, setCommentData, focusedId, t, setFocusedId, fileInputRef, setActiveUploadId, renderCommentEditor }: any) => {
  return (
     <Card className=" p-6 sm:p-10 border shadow-sm space-y-8 sm:space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-4">
              <div className="flex flex-col">
                <h3 className="font-black text-xl flex items-center gap-2.5">
                  <Type className="w-6 h-6 text-indigo-600" /> Editor & Replies
                </h3>
                <p className="text-[10px] text-muted-foreground font-bold tracking-wider">
                  Click a bubble preview to select or add replies below
                </p>
              </div>
              <Button
                onClick={() => addReply(setCommentData, setFocusedId)}
                className="flex items-center justify-center gap-2 px-6 py-3 transition-all font-bold text-sm shadow-xl active:scale-95 group"
              >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />{" "}
                {t.addReply}
              </Button>
            </div>
            <Separator/>

            <div className="space-y-8 sm:space-y-12">
              {renderCommentEditor(commentData, true)}
              <Input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={  (e) => handleAvatarUpload(e, focusedId, setCommentData, updateReply, setActiveUploadId) }
              />
            </div>
          </Card>
  )
}

export default EditReply
