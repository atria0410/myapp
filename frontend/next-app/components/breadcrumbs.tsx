import { useState } from 'react'
import Link from 'next/link'
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material'

type Breadcrumbs = { text: string; link: string }

type Props = {
  breadcrumbs: Breadcrumbs[]
}

export default function Breadcrumbs({ breadcrumbs }: Props) {
  const [isHover, setIsHover] = useState<boolean>(false)

  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMouseLeave = () => {
    setIsHover(false)
  }

  return (
    <MuiBreadcrumbs aria-label="breadcrumb" sx={{ mb: 1.5 }}>
      {breadcrumbs.map((item, index) =>
        index + 1 < breadcrumbs.length ? (
          <Link
            key={index}
            href={item.link}
            style={{ color: 'inherit', textDecoration: isHover ? 'underline' : 'none' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {item.text}
          </Link>
        ) : (
          <Typography key={index} color="text.primary">
            {item.text}
          </Typography>
        )
      )}
    </MuiBreadcrumbs>
  )
}
