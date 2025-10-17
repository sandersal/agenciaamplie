import { Node, mergeAttributes } from '@tiptap/core';

export interface CustomButtonOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customButton: {
      setCustomButton: (options: { text: string; url: string; color: string; bgColor: string }) => ReturnType;
    };
  }
}

export const CustomButton = Node.create<CustomButtonOptions>({
  name: 'customButton',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      text: {
        default: 'Clique aqui',
      },
      url: {
        default: '#',
      },
      color: {
        default: '#ffffff',
      },
      bgColor: {
        default: '#3b82f6',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'a[data-type="custom-button"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'a',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-type': 'custom-button',
        class: 'custom-button',
        style: `display: inline-block; padding: 12px 24px; background-color: ${HTMLAttributes.bgColor}; color: ${HTMLAttributes.color}; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 16px 0;`,
        href: HTMLAttributes.url,
        target: '_blank',
        rel: 'noopener noreferrer',
      }),
      HTMLAttributes.text,
    ];
  },

  addCommands() {
    return {
      setCustomButton:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
