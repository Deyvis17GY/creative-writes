import React from 'react'

export interface IDetailsPost {
  id: number
  time: {
    toDate: () => Date
  }
  avatar: string
  username: string
  message: string
}

export interface IMessageProps {
  children?: React.ReactNode
  avatar: string
  username: string
  description: string
}

export interface ILayoutProps {
  children: React.ReactNode
}

export interface IRouterData {
  id: string
  avatar: string
  username: string
  description: string
}
