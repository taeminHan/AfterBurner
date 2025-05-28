import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { registerList } from '@lexical/list';

export const ListBehaviorPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return registerList(editor); // ✅ 리스트 명령어 및 리스트 탈출 로직 등록
  }, [editor]);

  return null;
};
