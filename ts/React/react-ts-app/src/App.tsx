import * as React from 'react'

interface IProps {
  logo?: string
  className?: string
  alt?: string
}


export const Logo: React.FunctionComponent<IProps> = props => {
  const { logo, className, alt } = props
  
  return (
    <img src={logo} className={className} alt={alt} />
  )
}

export default Logo;
