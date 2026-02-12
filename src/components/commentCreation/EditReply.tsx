
import { handleAvatarUpload } from '@/lib/commentCreation/handleAvatarUpload'
import { addReply, updateReply } from '@/lib/commentCreation/helpers'
import { Plus, Type } from 'lucide-react'



const EditReply = ({ commentData, setCommentData, focusedId, t, setFocusedId, fileInputRef, setActiveUploadId, renderCommentEditor }: any) => {
  return (
     <div className="bg-white p-6 sm:p-10 rounded-[40px] border border-slate-200 shadow-sm space-y-8 sm:space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-6 gap-4">
              <div className="flex flex-col">
                <h3 className="font-black text-slate-900 text-xl flex items-center gap-2.5">
                  <Type className="w-6 h-6 text-indigo-600" /> Editor & Replies
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Click a bubble preview to select or add replies below
                </p>
              </div>
              <button
                onClick={() => addReply(setCommentData, setFocusedId)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-bold text-sm shadow-xl active:scale-95 group"
              >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />{" "}
                {t.addReply}
              </button>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {renderCommentEditor(commentData, true)}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={  (e) => handleAvatarUpload(e, focusedId, setCommentData, updateReply, setActiveUploadId) }
              />
            </div>
          </div>
  )
}

export default EditReply
