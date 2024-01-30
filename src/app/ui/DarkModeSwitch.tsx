import React, { useId } from 'react';
import { useSpring, animated } from '@react-spring/web';

export const properties = {
  dark: {
    circle: {
      r: 9,
    },
    mask: {
      cx: '50%',
      cy: '23%',
    },
    svg: {
      transform: 'rotate(40deg)',
    },
    lines: {
      opacity: 0,
    },
  },
  light: {
    circle: {
      r: 5,
    },
    mask: {
      cx: '100%',
      cy: '0%',
    },
    svg: {
      transform: 'rotate(90deg)',
    },
    lines: {
      opacity: 1,
    },
  },
  springConfig: { mass: 4, tension: 250, friction: 35 },
};

type SVGProps = Omit<React.HTMLAttributes<HTMLOrSVGElement>, 'onChange'>;

interface Props extends SVGProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
}

const DarkModeSwitch: React.FC<Props> = ({
  checked = false,
  children,
  onChange,
  ...rest
}) => {
  const id = useId();
  const { circle, svg, lines, mask } = properties[checked ? 'dark' : 'light'];

  const svgContainerProps = useSpring({
    ...svg,
    config: properties.springConfig,
  });

  const centerCircleProps = useSpring({
    ...circle,
    config: properties.springConfig,
  });

  const maskedCircleProps = useSpring({
    ...mask,
    config: properties.springConfig,
  });

  const linesProps = useSpring({
    ...lines,
    config: properties.springConfig,
  });

  return (
    <button
      onClick={() => onChange(!checked)}
      aria-label={checked ? 'Activate light mode' : 'Activate dark mode'}
    >
      <animated.svg
        viewBox="0 0 24 24"
        fill="none"
        color="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        style={svgContainerProps}
        {...rest}
      >
        <mask id={`moon-${id}`}>
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <animated.circle
            style={maskedCircleProps}
            r="9"
            fill="black"
            strokeWidth="0"
          />
        </mask>

        <animated.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask={`url(#moon-${id})`}
          style={centerCircleProps}
        />

        <animated.g style={linesProps}>
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </animated.g>
      </animated.svg>
    </button>
  );
};

export default DarkModeSwitch;
