import React from 'react'

type Props = {
  type:
    | 'logo'
    | 'rss'
    | 'navigation'
    | 'sun'
    | 'moon'
    | 'twitter'
    | 'facebook'
    | 'github'
    | 'home'
    | 'clipboard'
    | 'success'
    | 'published'
    | 'modified'
  size: string
  strokeWidth?: number
}

const SvgIcon: React.FC<Props> = ({ type, size, strokeWidth = 2 }) => {
  switch (type) {
    case 'logo':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        >
          <circle cx="34.52" cy="11.43" r="5.82" />
          <circle cx="53.63" cy="31.6" r="5.82" />
          <circle cx="34.52" cy="50.57" r="5.82" />
          <circle cx="15.16" cy="42.03" r="5.82" />
          <circle cx="15.16" cy="19.27" r="5.82" />
          <circle cx="34.51" cy="29.27" r="4.7" />
          <line x1="20.17" y1="16.3" x2="28.9" y2="12.93" />
          <line x1="38.6" y1="15.59" x2="49.48" y2="27.52" />
          <line x1="50.07" y1="36.2" x2="38.67" y2="46.49" />
          <line x1="18.36" y1="24.13" x2="30.91" y2="46.01" />
          <line x1="20.31" y1="44.74" x2="28.7" y2="48.63" />
          <line x1="17.34" y1="36.63" x2="31.37" y2="16.32" />
          <line x1="20.52" y1="21.55" x2="30.34" y2="27.1" />
          <line x1="39.22" y1="29.8" x2="47.81" y2="30.45" />
          <line x1="34.51" y1="33.98" x2="34.52" y2="44.74" />
        </svg>
      )
    case 'rss':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 11a9 9 0 0 1 9 9"></path>
          <path d="M4 4a16 16 0 0 1 16 16"></path>
          <circle cx="5" cy="19" r="1"></circle>
        </svg>
      )
    case 'navigation':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
        </svg>
      )
    case 'sun':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      )
    case 'moon':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      )
    case 'twitter':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        >
          <path
            d="M54.49 12.3c0-.1-.09-.16-.17-.09-1.57 1.36-5.36 2.46-5.84 2.51a.11.11 0 01-.09 0c-2.78-4.44-9.19-3.24-9.19-3.24C29.78 13.48 30.82 23 31 24c0 .05 0 .09-.09.09-10.48.52-19.63-9.22-20.67-10.37a.11.11 0 00-.17 0A10.57 10.57 0 0012.78 27a.11.11 0 010 .19 12.87 12.87 0 01-4-.77c-.06 0-.13 0-.13.1.14 6.2 6.22 9 7.63 9.59a.1.1 0 010 .19 13.4 13.4 0 01-3.85.27.11.11 0 00-.11.14c1.27 4.78 7.5 6.78 8.62 7.11A.11.11 0 0121 44c-3.85 3.44-11.44 4.35-13 4.51a.11.11 0 00-.06.19c5.82 4 21.06 7.32 32.7-2.63A30.3 30.3 0 0051 21.83a.09.09 0 01.05-.08 14.22 14.22 0 005.06-5.06c0-.1 0-.16-.15-.13a5.63 5.63 0 01-3.15.17s1.71-2.96 1.68-4.43z"
            strokeLinecap="round"
          ></path>
        </svg>
      )
    case 'facebook':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      )
    case 'github':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      )
    case 'home':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        >
          <path d="M51.61 25.21L33.2 11.4a2 2 0 00-2.4 0L12.39 25.21a2 2 0 00-.8 1.6v26.64a2 2 0 002 2H25a2 2 0 002-2V45a2 2 0 012-2h7a2 2 0 012 2v8.45a2 2 0 002 2h10.41a2 2 0 002-2V26.81a2 2 0 00-.8-1.6z"></path>
        </svg>
      )
    case 'clipboard':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        >
          <rect x="11.13" y="17.72" width="33.92" height="36.85" rx="2.5"></rect>
          <path d="M19.35 14.23v-1.14a3.51 3.51 0 013.33-3.66h26.86a3.51 3.51 0 013.33 3.66v29.53a3.51 3.51 0 01-3.33 3.66h-1.15"></path>
        </svg>
      )
    case 'success':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        >
          <circle cx="32" cy="32" r="25.3"></circle>
          <path d="M15.79 37.84l11.03 8.34 19.49-27.36"></path>
        </svg>
      )
    case 'published':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        >
          <path d="M45.56 46.83v9.43H7.94V20.6L19.9 7.74h25.66v13.55"></path>
          <path d="M19.92 7.74L19.9 20.6H7.94M13.09 47.67H31.1M13.09 41.14H29.1M13.09 35.04H33.1M13.09 28.94H39.1M34.45 43.23l.15 4.3a.49.49 0 00.62.46l4.13-1.11a.54.54 0 00.34-.23l18.07-24.44a1.23 1.23 0 00-.26-1.72l-3.14-2.34a1.22 1.22 0 00-1.72.26L34.57 42.84a.67.67 0 00-.12.39zM50.2 21.7l5.07 3.87"></path>
        </svg>
      )
    case 'modified':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        >
          <path d="M53.72 36.61a21.91 21.91 0 11-3.35-16.51M51.72 7.85l-.87 12.93-12.93-.88M53.72 36.61a21.91 21.91 0 11-3.35-16.51"></path>
          <path d="M51.72 7.85l-.87 12.93-12.93-.88"></path>
        </svg>
      )
    default:
      return null
  }
}

export default SvgIcon
