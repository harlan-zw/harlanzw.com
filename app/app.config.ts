export default defineAppConfig({
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'zinc',
    },
    button: {
      slots: {
        base: 'min-h-11 min-w-11 justify-center transition-[color,background-color,border-color,transform] duration-150 active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none',
      },
      defaultVariants: {
        color: 'primary',
        variant: 'solid',
      },
    },
    alert: {
      slots: {
        root: 'rounded-lg border border-default',
        title: 'text-sm font-semibold text-highlighted',
        description: 'text-sm text-default',
      },
      defaultVariants: {
        variant: 'subtle',
      },
    },
    dropdownMenu: {
      slots: {
        content: 'origin-[var(--reka-popper-transform-origin)]',
      },
    },
    prose: {
      codeIcon: {
        'a. scan components': 'i-vscode-icons-file-type-js',
        'b. find the template tags': 'i-vscode-icons-file-type-js',
        'c. match making': 'i-vscode-icons-file-type-js',
        'cardpost.vue - css': 'i-vscode-icons-file-type-vue',
        'cardpost.vue - transpiled': 'i-vscode-icons-file-type-vue',
        'd. insert the new dynamic imports': 'i-vscode-icons-file-type-js',
        'txt': 'i-vscode-icons-file-type-text',
      },
    },
  },
})
