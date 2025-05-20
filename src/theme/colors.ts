const whites = {
    white: "#FFFFFF",
    "white-50": "#F9FAFB",
    "white-100": "#F3F4F6",
    "white-200": "#E5E7EB",
    "white-300": "#D1D5DB",
    "white-400": "#9CA3AF",
    "white-500": "#6B7280",
    "white-600": "#4B5563",
    "white-700": "#374151",
    "white-800": "#1F2937",
    "white-900": "#111827",
} as const

const blues = {
    "blue-50": "#EFF6FF",
    "blue-100": "#DBEAFE",
    "blue-200": "#BFDBFE",
    "blue-300": "#93C5FD",
    "blue-400": "#60A5FA",
    "blue-500": "#3B82F6",
    "blue-600": "#2563EB",
    "blue-700": "#1D4ED8",
    "blue-800": "#1E40AF",
    "blue-900": "#1E3A8A",
    "blue-950": "#172554",
    "blue-disabled": "#94B5F8",
} as const

export const colors = {
    ...whites,
    ...blues,
} as const
