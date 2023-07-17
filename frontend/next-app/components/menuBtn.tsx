import React from 'react'
import Link from 'next/link'
import { SvgIconComponent } from '@mui/icons-material'
import { Card, CardContent, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

type Props = {
  title: string
  link: string
  icon: SvgIconComponent
}

export default function MenuBtn({ title, link, icon }: Props) {
  const Icon = styled(icon)(({ theme }) => ({
    fontSize: 80
  }))

  return (
    <Link href={link} style={{ textDecoration: 'none' }}>
      <Card sx={{ width: 250, boxShadow: 3 }}>
        <CardContent>
          <Typography align="center" color="primary">
            <Icon />
          </Typography>
          <Typography
            display="flex"
            align="center"
            alignItems="center"
            justifyContent="center"
            color="primary"
            style={{ height: 70, fontSize: `clamp(20px, ${100 / title.length}vw, 30px)` }}
          >
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}
