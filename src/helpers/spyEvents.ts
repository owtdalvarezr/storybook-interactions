import { fn } from "@storybook/test";
import type { DOMAttributes } from "react";

type SpyEvents = Partial<Record<keyof DOMAttributes<Element>, any>>

export const spyClickEvent = (): SpyEvents => ({
  onClick: fn(),
})

export const spyMouseEvents = (): SpyEvents => ({
  ...spyClickEvent(),
  onMouseDown: fn(),
  onMouseEnter: fn(),
  onMouseMove: fn(),
  onMouseLeave: fn(),
  onMouseOut: fn(),
  onMouseUp: fn(),
  onMouseOver: fn(),
  onScroll: fn(),
  onWheel: fn(),
})

export const spyInputEvents = (): SpyEvents => ({
  onFocus: fn(),
  onBlur: fn(),
  onChange: fn(),
})

export const spyKeyboardEvents = (): SpyEvents => ({
  onKeyDown: fn(),
  onKeyUp: fn(),
})

export const spyClipboardEvents = (): SpyEvents => ({
  onCopy: fn(),
  onCut: fn(),
  onPaste: fn(),
})

export const spyMiscEvents = (): SpyEvents => ({
  onContextMenu: fn(),
  onSubmit: fn(),
})

export const spyAllEvents = (): SpyEvents => ({
  ...spyInputEvents(),
  ...spyMouseEvents(),
  ...spyKeyboardEvents(),
  ...spyClipboardEvents(),
  ...spyMiscEvents(),
})