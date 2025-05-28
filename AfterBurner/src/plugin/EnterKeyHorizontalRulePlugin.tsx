import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import {
  KEY_ENTER_COMMAND,
  COMMAND_PRIORITY_LOW,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
} from 'lexical';
import { $createHorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';

export default function EnterKeyHorizontalRulePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      () => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection) || !selection.isCollapsed()) return false;

        const anchorNode = selection.anchor.getNode();
        const topLevelElement = anchorNode.getTopLevelElementOrThrow();

        const textContent = topLevelElement.getTextContent().trim();

        // 조건: 단일 줄에 --- 또는 *** 또는 ___ 만 있을 때
        if (/^(\-\-\-|\*\*\*|___)$/.test(textContent)) {
          editor.update(() => {
            const hrNode = $createHorizontalRuleNode();
            const paragraph = $createParagraphNode();

            topLevelElement.replace(hrNode);
            hrNode.insertAfter(paragraph);

            // 커서를 새 단락으로 이동
            paragraph.select();
          });
          return true;
        }

        return false;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  return null;
}
