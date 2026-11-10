import type { AriaAttributes, HTMLAttributes } from 'vue'

declare module 'vue' {
  // Components pass these standard attributes and listeners through $attrs.
  interface ComponentCustomProps extends AriaAttributes, Pick<HTMLAttributes, 'id' | 'role' | 'tabindex' | 'onInput' | 'onKeydown' | 'onKeyup' | 'onPointerdown'> {
    onClick?: ((event: MouseEvent) => void) | Array<(event: MouseEvent) => void>
  }
}
