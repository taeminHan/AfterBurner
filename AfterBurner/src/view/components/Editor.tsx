
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { CODE, TRANSFORMERS } from '@lexical/markdown';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';

import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { ParagraphNode, LineBreakNode } from 'lexical';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';

import './editor/editor.css';
import { ListBehaviorPlugin } from '@/plugin/ListBehaviorPlugin';
import EnterKeyHorizontalRulePlugin from '@/plugin/EnterKeyHorizontalRulePlugin';

function onError(error: Error) {
  console.error('에디터 오류:', error);
}


const initialConfig = {
  namespace: 'MyEditor',
  onError,
  nodes: [
    ParagraphNode,
    LineBreakNode,
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    LinkNode,
    HorizontalRuleNode,
    CodeHighlightNode
  ],
  theme: {
    paragraph: 'editor-paragraph',
    text: {
      bold: 'editor-text-bold',
      italic: 'editor-text-italic',
    },
  },
};

export const Editor = () => {
  return (
    <div className="editor-container">
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-content">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="content-editable" />
            }
            placeholder={
              <div className="placeholder">
                여기에 내용을 입력하세요...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <EnterKeyHorizontalRulePlugin />
          <MarkdownShortcutPlugin transformers={[...TRANSFORMERS, CODE]} />
          <ListBehaviorPlugin />
        </div>
        
      </LexicalComposer>
    </div>
  );
};

export default Editor;