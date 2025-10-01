'use client';

import { useId} from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useCommentsStore } from '@/store/store';

export default function VerifiedCheck() {
  const id = useId();
  const isCheck = useCommentsStore((state) => state.verified);
  const setIsCheck = useCommentsStore((state) => state.setVerified);

  return (
    <div className="flex items-center space-x-2 mt-5 mdmt-10">
      <Checkbox id={id} checked={isCheck} onCheckedChange={(value) => setIsCheck(!!value)} />
      <Label htmlFor={id}>Verified Account</Label>
    </div>
  );
}
