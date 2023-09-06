import {Box, Flex} from '@chakra-ui/react'
import {motion} from 'framer-motion'

interface Props {
  isChecked: boolean
  onValueChange: (value: boolean) => void
}

const MotionBox = motion(Box)

const NiceSwitch = ({
  isChecked,
  onValueChange,
  size,
}: Props & {size?: 'md' | 'xs' | 'sm' | 'lg' | undefined}) => {
  let w = size === 'sm' ? 55 : 80,
    h = w / 1.6
  const color = 'chakra-subtle-bg'

  return (
    <Flex
      aria-checked={isChecked}
      onClick={() => onValueChange(!isChecked)}
      w={`${w}px`}
      h={`${h}px`}
      bgColor='rgba(255, 255, 255, 0.4)'
      justifyContent='flex-start'
      borderRadius={`${h}px`}
      border='solid 3px'
      borderColor={color}
      p={0.5}
      cursor='pointer'
      _checked={{justifyContent: 'flex-end', backgroundColor: color}}>
      <MotionBox
        layout
        transition={spring}
        w={`${h - 10}px`}
        h={`${h - 10}px`}
        bgColor='white'
        borderRadius={`${h - 10}px`}
        boxShadow='1px 1px 8px rgba(0, 0, 0, .3)'
      />
    </Flex>
  )
}

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
}

export default NiceSwitch
