import clsx from 'clsx';
import { Link } from './Link';
import { ArrowRight } from './Svg';

export const LinkButton = ({
  to,
  className,
  children = 'Continue the flow',
  disabled,
  arrow = true,
  ...props
}) => {
  return (
    <Link
      to={to}
      className={clsx(
        'flex items-center mt-4 gap-2 rounded-full text-white hover:bg-tartleGreen-400 px-4 py-2 bg-tartleGreen-400/90 transition-colors duration-200 sm:text-sm lg:text-base text-xs',
        disabled ? 'pointer-events-none opacity-50' : 'opacity-100',
        className
      )}
      {...props}
    >
      {children}
      {arrow ? (
        <div className='flex items-center opacity-50 group-hover/btn:opacity-100 transition-opacity'>
          <ArrowRight />
        </div>
      ) : null}
    </Link>
  );
};
