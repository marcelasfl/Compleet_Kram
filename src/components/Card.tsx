import { tv } from 'tailwind-variants'

type CardProps = {
  rounded?: boolean
} & React.ComponentProps<'div'>
export function Card({ rounded, className, children }: CardProps) {
  return <div className={styles({ rounded, className })}>{children}</div>
}

const styles = tv({
  base: 'max-w-sm overflow-hidden shadow-lg',
  variants: {
    rounded: {
      true: 'rounded',
    },
  },
  defaultVariants: {
    rounded: true,
  },
})
