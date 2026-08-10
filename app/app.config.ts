export default defineAppConfig({
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'zinc',
    },
    button: {
      defaultVariants: {
        color: 'primary',
        variant: 'solid',
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
