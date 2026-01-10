'use client'

import AvatarUpload from '../avatar-upload'
import VerifiedCheck from './verified-check'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useCommentsStore } from '@/store/store'
import DownloadButton from '../DownloadButton'
import { AiDialog } from '../ai/ai-modal'

const MAX_COMMENT_LENGTH = 150
const MAX_NAME_LENGTH = 24

const CommentForm = () => {


  const onComment = useCommentsStore((state) => state.updateText);
  const commentText = useCommentsStore((state) => state.message)
    const userName = useCommentsStore((state) => state.name)
    const onUserName = useCommentsStore((state) => state.updateName)


  return (
    <div>
      <div>
        <AvatarUpload />
        <AiDialog/>
        <VerifiedCheck />

        <div>
          {/* Input with char count */}
          <Input
            placeholder="Enter name..."
            className="mt-5 md:mt-10"
            value={userName}
            onChange={(e) => onUserName(e.target.value)}
            maxLength={MAX_NAME_LENGTH }
          />
          <p className="text-sm text-gray-500 mt-1">
            {userName?.length}/{MAX_NAME_LENGTH }
          </p>

          {/* Textarea with char count */}
          <Textarea
            placeholder="Enter comment..."
            className="mt-5 md:mt-10"
            rows={7}
            value={commentText}
            onChange={(e) => onComment(e.target.value)}
            maxLength={MAX_COMMENT_LENGTH}
          />
          <p className="text-sm text-gray-500 mt-1">
            {commentText?.length}/{MAX_COMMENT_LENGTH}
          </p>
        </div>

        <div className="mt-5 md:mt-10 flex">
          <DownloadButton/>
        </div>
      </div>
    </div>
  )
}

export default CommentForm
