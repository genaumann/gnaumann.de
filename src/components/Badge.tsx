import clsx from 'clsx'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'danger' | 'warning' | 'success' | 'info'
}

const Badge: React.FunctionComponent<BadgeProps> = ({
  variant = 'neutral',
  className,
  ...props
}) => {
  const variantMap = {
    'bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20':
      variant === 'neutral',
    'bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20':
      variant === 'danger',
    'bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20':
      variant === 'warning',
    'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20':
      variant === 'success',
    'bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30':
      variant === 'info'
  }
  return (
    <span
      {...props}
      className={clsx(
        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
        variantMap,
        className
      )}></span>
  )
}

export default Badge
